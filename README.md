# Test-Jedi Website

React website with a public marketing site and a Firebase-backed admin dashboard.

## Structure

```
Website/
├─ new/                  # The single application (Create React App)
│  ├─ public/
│  ├─ src/
│  │  ├─ admin/          # Admin dashboard (shell, pages, components)
│  │  ├─ assets/
│  │  ├─ components/
│  │  ├─ firebase/       # Firebase config + initialized services
│  │  ├─ lib/            # Shared data services (Firestore CRUD)
│  │  ├─ pages/
│  │  ├─ sections/
│  │  ├─ App.js
│  │  ├─ index.js
│  │  └─ index.css
│  ├─ package.json
│  └─ tailwind.config.js
├─ api/                  # Vercel serverless API functions
├─ vercel.json           # Deploys the `new/` app
└─ README.md
```

The React application and dependencies live inside `new/`; Vercel serverless
functions live in the root `api/` directory.

## Development

```bash
cd new
npm install
npm run dev
```

The app runs at http://localhost:3000.

## Build

```bash
cd new
npm run build
```

Output is written to `new/build`.

## Configuration

Firebase config is read from `REACT_APP_FIREBASE_*` environment variables (see
`new/.env.example`). Copy it to `new/.env` to override the built-in fallbacks:

```bash
cd new
cp .env.example .env
```

## Contact form email

The shared contact form on `/contact` and `/services` sends submissions through
the Vercel function at `/api/contact`, using the Resend email API. Set these
server-side environment variables in Vercel. For local API testing, use the
root `.env.example` as a template for `.env`, then run `vercel dev`:

- `RESEND_API_KEY`: a Resend API key.
- `CONTACT_FROM_EMAIL`: a sender address on a domain verified with Resend.
- `CONTACT_EMAIL`: destination address (defaults to `operations@test-jedi.com`).

Do not prefix these values with `REACT_APP_`; the API key must remain server
side. The form reports an error instead of claiming success if email delivery
is unavailable.

## Firebase setup

1. Enable **Email/Password** in Firebase Authentication.
2. Create the admin user (or use an existing account).
3. Grant the admin custom claim. Either use the tool script:

   ```bash
   cd new/tools
   npm install
   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json \
     npm run set-admin -- admin@example.com admin
   ```

   Or run this in Google Cloud Shell:

   ```js
   const admin = require("firebase-admin");
   admin.initializeApp();
   const user = await admin.auth().getUserByEmail("admin@example.com");
   await admin.auth().setCustomUserClaims(user.uid, { role: "admin" });
   ```

4. Deploy the security rules:

   ```bash
   cd new
   firebase deploy --only firestore:rules,storage
   ```

   Rules files: `new/src/firebase/firestore.rules` and `new/storage.rules`.

5. Create a Cloud Storage for Firebase bucket in **Firebase Console → Storage**
   if one has not been created yet. Cloud Storage for Firebase now requires the
   Blaze plan. Copy the bucket's exact name into
   `REACT_APP_FIREBASE_STORAGE_BUCKET` in `new/.env` (for example,
   `test-jedi-01.firebasestorage.app` for a new default bucket), then restart
   the dev server or rebuild/redeploy the site. Deploy the Storage rules above
   after creating the bucket.

   If browser uploads report a CORS preflight failure, first verify that the
   configured bucket exists and the Firebase Storage API is enabled. Firebase's
   Web SDK uses the Storage JSON API, which provides CORS responses by default;
   a missing bucket or unavailable Storage service can instead return an error
   response that the browser reports as a failed preflight.

## Admin

- Login: `/admin/login`
- Dashboard: `/admin`
- Blog management: `/admin/blog`
- New post: `/admin/blog/new-post`

All `/admin/*` routes (except `/admin/login`) require a signed-in user whose
token has `role: "admin"` (or `admin: true`). Unauthenticated visitors are
redirected to the login page; authenticated non-admins see an access-denied
screen. After a claim is granted, the user must sign out and back in (or use
**Refresh access**) before it takes effect.

Public visitors can only read posts whose `status` is `"published"`.

## Admin features

- Email/password login gated by the `role: "admin"` custom claim.
- Dashboard with real post counts, recent activity, loading skeletons, and empty states.
- Blog list with 300 ms debounced search across title, excerpt, and stored `contentText`.
- Create/edit form with slug uniqueness checks, split **Save Draft** / **Publish**
  actions, publish confirmation, and toast feedback.
- Rich-text editor with links, inline image uploads, and clear formatting.
- Featured image upload with client-side compression, alt text, and removal.
- Sanitized preview of unpublished posts at `/admin/blog/preview/:slug`.
- Autosave to `localStorage` every 30 seconds with restore/discard on reopen.
- Archive instead of hard delete; bulk publish/draft/archive actions.

## Performance

Admin routes are lazy-loaded with `React.lazy` + `Suspense`, and post images use
`loading="lazy"`. After R7 code-splitting, the initial main bundle dropped from
**463.19 kB gzip** to **297.98 kB gzip**; the admin bundle loads on demand as a
**153.55 kB gzip** chunk. Search is debounced by 300 ms. Firestore pagination
(`limit` / `startAfter`) is deferred until post volume grows.

## Decisions

- JavaScript + JSDoc types (`new/src/lib/blogTypes.js`); no TypeScript migration.
- Rendered post HTML must be sanitized with DOMPurify (Phase R4).
- Images are compressed client-side before upload (Phase R3).
- Deleting a post archives it (`status: "archived"`); no client hard deletes.
- Search is client-side over `title`, `excerpt`, and stored `contentText` (Phase R2).
- Slug uniqueness is enforced in the service layer (Phase R2).

## Testing

```bash
cd new
npm run test:ci
```

Unit tests cover `slugify`, error normalization, `isSlugUnique`, `searchPosts`,
`getPostStats`, service-layer validation, and the autosave hook. `PostForm`
component tests cover required fields, duplicate slugs, draft saves, and publish
confirmation; `PostList` tests cover rendering, debounced search, status
filtering, bulk publish, archive confirmation, and load errors.

Not yet automated: Firebase Emulator CRUD integration and live auth/claim tests
(they require the Firebase CLI and a real admin user).

## Manual QA checklist

- [ ] Signed out: `/admin`, `/admin/blog`, `/admin/blog/new-post` redirect to login.
- [ ] Non-admin login: access denied; Firestore reads fail.
- [ ] Admin login: dashboard stats load; sidebar links and sign-out work.
- [ ] Duplicate slug: blocked with an inline message.
- [ ] Inline images/links: render on `/blog/:slug`.
- [ ] Large featured image: compressed and uploaded.
- [ ] Unpublished preview: visible to admins, not public.
- [ ] Publish: confirmation, success toast, `publishedAt` set, post appears publicly.
- [ ] Unpublish/archive: confirmation, removed from public index, kept in admin.
- [ ] Autosave: edit a draft, reload, restore prompt appears.
- [ ] Bulk publish/draft/archive: selected posts update with toasts.
