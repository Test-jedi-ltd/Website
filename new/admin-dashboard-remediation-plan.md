# Admin Dashboard Remediation Plan

Step-by-step remediation for the outstanding items in
[`admin-dashboard-implementation-plan.md`](./admin-dashboard-implementation-plan.md).

> **Scope:** Phases 1-4 gaps plus all of Phases 5-7.
> **Current status:** Phases 1-4 are largely implemented with gaps; Phases 5-7 are outstanding.
> **Last updated:** 2026-11-12

---

## 1. Purpose

This document turns the annotated gaps into an ordered, executable plan. It is
deliberately sequenced so that security and data integrity are fixed before UX
polish and optional features.

## 2. Current State Snapshot

| Area | Status | Notes |
|------|--------|-------|
| Admin shell, sidebar, routing | Done | Nested routes in `new/src/App.js`; sidebar collapses |
| Real authentication | Missing | `AdminShell` defaults to authenticated; no login page |
| Firestore CRUD service | Done | `new/src/lib/firestore.js`; soft archive; client-side sorting |
| Firestore rules | Partial | Require `role == "admin"` / `admin == true` claim; no claim setup tooling |
| Post form + Tiptap + image upload | Done | No slug uniqueness, inline images, or compression |
| Blog list, filters, search, bulk actions | Done | Search is title/excerpt only; no preview action |
| Preview + publish notifications | Missing | No read-only preview, confirmation, or toasts |
| Dashboard stats, widget, autosave | Missing | Dashboard cards are static placeholders |
| Tests, performance, XSS sanitization | Missing | No test files; `dangerouslySetInnerHTML` unsanitized |

## 3. How To Use This Plan

- Work phases in order: **R0 -> R1 -> R2 -> R3 -> R4 -> R5 -> R7**. Treat **R6** as optional/deferred.
- Each task is a checkbox. Mark it only when the acceptance criteria are met.
- Every phase ends with `npm run --prefix new build` and the manual checks listed.
- Do not start optional features (R6) until R1-R5 are complete.

## 4. Decisions To Lock Before Starting (R0)

1. **Language:** stay on JavaScript + JSDoc. Do not migrate to TypeScript now.
2. **Sanitization:** use `dompurify` for every rendered post body.
3. **Image optimization:** use client-side compression before upload
   (`browser-image-compression` preferred; a canvas utility is an acceptable
   zero-dependency alternative).
4. **Delete policy:** keep soft archive (`status: "archived"`) as the default.
   No client-side hard deletes. Hard delete, if ever needed, happens via the
   Admin SDK only.
5. **Admin claim mechanism:** set `role: "admin"` with the Firebase Admin SDK
   (Cloud Shell script or Cloud Function). Document it in the README.
6. **Search strategy:** client-side search over a stored `contentText` field.
   Do not add composite indexes until server-side search is actually required.
7. **Slug uniqueness:** enforce in the service layer before create/update.

## 5. Dependency & Tooling Additions

| Package | Type | Purpose |
|---------|------|---------|
| `dompurify` | dependency | Sanitize rendered HTML |
| `@tiptap/extension-link` | dependency | Links in the editor |
| `@tiptap/extension-image` | dependency | Inline images in the editor |
| `browser-image-compression` | dependency | Compress images before Storage upload |
| `papaparse` | optional dependency | CSV export (R6) |
| `gray-matter` | optional dependency | Markdown import (R6) |
| `firebase-admin` | **tool only** | Claim script; do NOT add to app dependencies |

Add test script:

```json
"test:ci": "react-scripts test --watchAll=false --passWithNoTests"
```

## 6. Firebase Setup Prerequisites

- [ ] Enable **Email/Password** sign-in in Firebase Authentication.
- [ ] Create at least one admin user (email/password).
- [ ] Set the custom claim on that user:
  ```js
  // Run in Cloud Shell or a standalone tools/ script with firebase-admin
  await admin.auth().setCustomUserClaims(uid, { role: "admin" });
  ```
- [ ] Sign out and back in (or force `getIdToken(true)`) so the claim appears on the token.
- [ ] Enable Firebase Storage and apply Storage rules.
- [ ] Create `firebase.json` and `.firebaserc` so rules can be deployed:
  ```json
  {
    "firestore": { "rules": "src/firebase/firestore.rules" },
    "storage": { "rules": "storage.rules" }
  }
  ```
- [ ] Deploy rules: `firebase deploy --only firestore:rules,storage`.
- [ ] (Optional) Move the Firebase config to `REACT_APP_FIREBASE_*` env vars and add `.env.example`.

---

## Phase R0 - Foundations (0.5 day)

**Goal:** Lock decisions, add tooling, and make the project ready for the remediation work.

- [x] R0.1 Confirm the decisions in section 4 and record them in the README.
- [x] R0.2 Add `src/lib/blogTypes.js` containing a JSDoc `@typedef` for `BlogPost` (`id`, `title`, `slug`, `excerpt`, `content`, `contentText`, `featuredImage`, `author`, `status`, `createdAt`, `updatedAt`, `publishedAt`, optional SEO/tag fields).
- [x] R0.3 Create `firebase.json` and `.firebaserc`; add `storage.rules`.
- [x] R0.4 Add the `test:ci` script to `new/package.json`.
- [x] R0.5 Install the dependencies from section 5.
- [x] R0.6 Add `.env.example` and (optionally) migrate `src/firebase/config.js` to env vars.
- [x] R0.7 Add a `tools/set-admin-claim.mjs` script (separate `tools/package.json` with `firebase-admin`) or document the Cloud Shell snippet.

**Acceptance criteria**
- [x] `npm run --prefix new build` still compiles with no warnings.
- [x] `npm run --prefix new test:ci` exits successfully (no tests yet).
- [ ] `firebase deploy --only firestore:rules --dry-run` resolves the rules path. (Firebase CLI is not installed locally; `firebase.json` paths were validated and both rules files exist.)

**Files:** `new/package.json`, `new/firebase.json`, `new/.firebaserc`, `new/storage.rules`, `new/src/lib/blogTypes.js`, `new/.env.example`, `new/tools/`

---

## Phase R1 - Authentication & Authorization (2-3 days) [CRITICAL]

**Goal:** Replace the permissive auth stub with real sign-in and admin-claim enforcement.

- [x] R1.1 Create `src/admin/AuthContext.jsx` with an `AuthProvider` and `useAuth()` hook exposing `{ user, role, loading, isAdmin, signIn, signOut }`.
  - Subscribe with `onAuthStateChanged`.
  - On user change, call `user.getIdTokenResult(true)` and read `claims.role` / `claims.admin`.
  - Expose `loading` while the token/claims resolve.
- [x] R1.2 Create `src/admin/pages/Login.jsx` with email/password fields, error display, and redirect to `/admin` on success.
- [x] R1.3 Add public route `/admin/login` in `src/App.js` (outside `AdminShell`).
- [x] R1.4 Wrap the app (or the `/admin` subtree) in `AuthProvider`.
- [x] R1.5 Create `src/admin/components/ProtectedRoute.jsx` that:
  - Shows a full-screen loader while `loading`.
  - Redirects unauthenticated users to `/admin/login` with `state.from`.
  - Shows an "Access denied" screen for authenticated non-admins.
- [x] R1.6 Rewrite `AdminShell.jsx` to remove `useState(true)` defaults and use `useAuth()`; render `<ProtectedRoute>` around the shell/`<Outlet />`.
- [x] R1.7 Update `Sidebar.jsx`: show real email/role, add a **Sign out** button, hide admin links for non-admins, remove the fake "Signed in as admin" text.
- [x] R1.8 Handle token refresh: if the claim is missing, show guidance to sign out/in or contact an admin.
- [x] R1.9 Update `README.md` with login and custom-claim setup instructions.

**Acceptance criteria** (code implemented; live Firebase browser verification pending)
- [ ] Visiting `/admin/blog` while signed out redirects to `/admin/login`.
- [ ] A signed-in non-admin sees "Access denied" and no admin data loads.
- [ ] A signed-in admin sees the dashboard; sign-out returns to the login page.
- [ ] Deep links survive the login redirect.

**Files:** `src/admin/AuthContext.jsx` (new), `src/admin/pages/Login.jsx` (new), `src/admin/components/ProtectedRoute.jsx` (new), `src/admin/AdminShell.jsx`, `src/admin/components/Sidebar.jsx`, `src/App.js`, `README.md`

---

## Phase R2 - Data Integrity & Service Hardening (2 days)

**Goal:** Make slugs unique, add real stats, and make search cover post content.

- [x] R2.1 Create `src/lib/slug.js` exporting `slugify(text)` (move the helper out of `PostForm`).
- [x] R2.2 Add `isSlugUnique(slug, excludeId)` to `src/lib/firestore.js` (query `where("slug", "==", slug)`, allow the current doc id).
- [x] R2.3 Enforce uniqueness in `createBlogPost` / `updateBlogPost` (throw a typed error such as `{ code: "slug-taken" }`).
- [x] R2.4 Add `contentText` to the document on create/update: strip HTML tags from `content` into plain text for search.
- [x] R2.5 Update `searchPosts` to match `title`, `excerpt`, and `contentText`.
- [x] R2.6 Add `getPostStats()` returning `{ total, draft, published, archived }` using the existing queries (or Firestore `getCountFromServer`).
- [x] R2.7 Rename `deleteBlogPost` to `archiveBlogPost` (keep a deprecated alias if other code still imports it) and document that hard delete is not exposed to the client.
- [x] R2.8 Add a small `src/lib/errors.js` helper to normalize Firebase errors into user-facing messages.
- [x] R2.9 Update `PostForm` to call `isSlugUnique` on blur/submit and show an inline error; block submit on collision.
- [x] R2.10 Update `PostList` search placeholder to "Search title, excerpt, or content..." and debounce the query (~300 ms).

**Acceptance criteria**
- Saving a duplicate slug is blocked with a clear message.
- Searching a word that only appears in the body returns the post.
- `getPostStats()` returns correct counts for all four statuses.
- Archiving a post removes it from the public blog and keeps it in the admin list.

**Files:** `src/lib/slug.js` (new), `src/lib/errors.js` (new), `src/lib/firestore.js`, `src/admin/components/PostForm.jsx`, `src/admin/components/PostList.jsx`

---

## Phase R3 - Editor & Media Enhancements (2-3 days)

**Goal:** Complete the editor/media gaps: inline images, links, compression, and split save/publish.

- [x] R3.1 Add `Link` and `Image` Tiptap extensions to `TiptapEditor.jsx`.
- [x] R3.2 Add toolbar buttons: **Link** (small modal or inline input, not `window.prompt`), **Image**, **Clear formatting**.
- [x] R3.3 Add an inline-image flow that reuses the Storage uploader and inserts an image node at the cursor (`editor.chain().focus().setImage({ src }).run()`).
- [x] R3.4 Add a shared `uploadImage(file)` helper in `src/lib/storage.js` used by both `ImageUpload` and the inline-image flow (avoid duplicated upload logic).
- [x] R3.5 Add compression in `ImageUpload` before upload (target < 1 MB, max dimension ~1600 px); show the compressed size in the UI.
- [x] R3.6 Add a **Remove image** action and an optional **Alt text** input for the featured image.
- [x] R3.7 Split actions in `PostForm`: **Save Draft** and **Publish** buttons (each sets the status then submits). Keep a single loading state and disable both while saving.
- [x] R3.8 Add a confirmation for publish when the post has no featured image or empty content (warn, do not block).
- [x] R3.9 Ensure the public `BlogPostDetail` renders inline images correctly (with `img` max-width styling).

**Acceptance criteria**
- Inline images can be inserted, uploaded, and rendered on the public post.
- Links can be added/removed.
- Uploaded images are compressed and still look acceptable.
- Save Draft and Publish behave independently and correctly.

**Files:** `src/admin/components/TiptapEditor.jsx`, `src/admin/components/ImageUpload.jsx`, `src/admin/components/PostForm.jsx`, `src/lib/storage.js` (new), `src/components/BlogPostDetail.jsx`

---1. Take note of your session ID:

   108AB

2. Visit the URL below on any device and follow the instructions to get your cod
e:

   https://auth.firebase.tools/login?code_challenge=jX2xBfWc4tF4WgEWrzuXaqTwIHvh
8DmlDeHRaKRtLiY&session=108abe04-a4b8-4c27-aa60-f58d7abf09a7&attest=hsfqAKriOgbo
wgTW-7YZe1rpIoctmh2FUL4H1s9BAxU

3. Paste or enter the authorization code below once you have it:

? Enter authorization code:

## Phase R4 - Preview, Publishing Workflow & Notifications (2-3 days)

**Goal:** Add a safe read-only preview, publish confirmation, and user feedback.

- [x] R4.1 Create `src/components/PostContent.jsx` that sanitizes HTML with DOMPurify and renders it; use it in both admin preview and `BlogPostDetail`.
- [x] R4.2 Create `src/admin/pages/PreviewPost.jsx` (route `/admin/blog/preview/:slug`) using `getBlogPostBySlug(slug, true)`.
  - Show featured image at top, title, author/date, sanitized content.
  - Include **Back to editor** and **Edit** actions.
- [x] R4.3 Add a **Preview** action to `PostList` and a **Preview** button in `PostForm` (for saved posts; for new posts, save the draft first or open a local preview modal).
- [x] R4.4 Add a confirmation dialog for publish/unpublish/archive (use Ant Design `Modal.confirm` or a small custom modal).
- [x] R4.5 Add toast feedback using Ant Design `message` / `notification` for create, update, publish, unpublish, archive, and bulk actions.
- [x] R4.6 Show a "View live" link for published posts (opens `/blog/:slug` in a new tab).
- [x] R4.7 Add an error toast for failed operations; keep inline errors for form validation.

**Acceptance criteria**
- Preview shows unpublished posts to admins only and never executes injected scripts.
- Publish/unpublish/archive ask for confirmation and show a success toast.
- Public post rendering uses the same sanitized component.

**Files:** `src/components/PostContent.jsx` (new), `src/admin/pages/PreviewPost.jsx` (new), `src/App.js`, `src/admin/components/PostForm.jsx`, `src/admin/components/PostList.jsx`, `src/components/BlogPostDetail.jsx`

---

## Phase R5 - Dashboard Widget, Stats & Autosave (3 days)

**Goal:** Replace static dashboard placeholders and add draft autosave.

- [x] R5.1 Create `src/admin/components/RightWidget.jsx`: collapsible panel (desktop) / drawer (mobile) containing:
  - Quick stats (total, drafts, published, archived) from `getPostStats()`.
  - Recent activity (latest 5 posts by `updatedAt`) with status and timestamp.
  - **Add Post** button.
- [x] R5.2 Add a floating **+ Add Post** button (FAB) on admin pages, linking to `/admin/blog/new-post`.
- [x] R5.3 Rewrite `Dashboard.jsx` to show real stat cards + recent posts; add loading skeletons and an empty state.
- [x] R5.4 Add `src/lib/useAutosave.js`:
  - Debounced autosave every 30 s for drafts (and on significant changes).
  - Save to `localStorage` first (keyed by post id or `new`), then optionally to Firestore for existing drafts.
  - Return `{ status, lastSavedAt }` for UI feedback.
- [x] R5.5 Integrate autosave into `PostForm`; show "Saved at HH:MM" / "Saving..." / "Unsaved changes".
- [x] R5.6 On opening a new post, detect an unsaved local draft and offer **Restore** / **Discard**.
- [x] R5.7 Clear the local draft after a successful save/publish.
- [x] R5.8 Add loading states/skeletons to `EditPost` and `PostForm`.

**Acceptance criteria**
- Dashboard numbers match Firestore.
- Widget toggles on desktop and opens as a drawer on mobile.
- Draft edits autosave and can be restored after a reload.
- No autosave writes occur for published posts.

**Files:** `src/admin/components/RightWidget.jsx` (new), `src/lib/useAutosave.js` (new), `src/admin/pages/Dashboard.jsx`, `src/admin/components/PostForm.jsx`, `src/admin/AdminShell.jsx`

---

## Phase R6 - Optional Advanced Features (3-4 days, defer if needed)

**Goal:** Add the optional features from the original plan.

### R6a - Tags & Categories
- [ ] Add `tags: string[]` and `category: string` to the post model.
- [ ] Add a tag input (chips) and category select to `PostForm`.
- [ ] Add category/tag filters to `PostList` and a tag cloud to the admin dashboard.

### R6b - SEO Settings
- [ ] Add `metaDescription` (max ~160 chars), `canonicalUrl`, and computed `readingTime`.
- [ ] Show a live search-result preview and character counts.
- [ ] Add featured-image dimension guidance.

### R6c - Import / Export
- [ ] CSV export of posts (`papaparse`).
- [ ] JSON backup download.
- [ ] Markdown import with front matter (`gray-matter`), previewed before creating.

### R6d - Version History
- [ ] Write a `blogPosts/{id}/versions/{versionId}` document on update.
- [ ] Add a version list and **Restore** action in the editor.

**Acceptance criteria:** each feature is independently usable, validated, and documented; optional features do not block R7.

**Files:** `src/admin/components/PostForm.jsx`, `PostList.jsx`, `src/lib/firestore.js`, `src/lib/seo.js` (new), `src/lib/importExport.js` (new), `src/admin/pages/*`

---

## Phase R7 - Testing, Performance, Security & Docs (3-4 days)

**Goal:** Prove the remediation works and harden the app.

### R7a - Tests
- [x] Unit tests for `slugify`, `isSlugUnique`, `searchPosts` filtering, `getPostStats`, and the autosave hook (mock Firebase modules).
- [x] Component tests for `PostForm` validation/slug errors.
- [x] Component tests for `PostList` filter/bulk flows.
- [ ] Auth tests: unauthenticated redirect, non-admin denial, admin access.
- [ ] (Recommended) Add Firebase Emulator Suite config and an integration test for CRUD.
- [x] Add a manual QA checklist for upload, preview, publish, and archive.

### R7b - Performance
- [x] Lazy-load admin routes with `React.lazy` + `Suspense`.
- [x] Debounce search.
- [ ] Memoize expensive list rendering.
- [x] Add `loading="lazy"` to post images.
- [ ] Move pagination to Firestore `limit` / `startAfter` if post volume grows (deferred; add the needed index at that point).
- [x] Record a before/after bundle size note in the README.

### R7c - Security
- [x] Sanitize all rendered HTML with DOMPurify (`PostContent`); excerpts are rendered as text.
- [x] Validate/normalize inputs in the service layer (slug format, status enum, URL fields).
- [ ] Review Firestore rules with the emulator (blocked: Firebase CLI not installed).
- [x] Confirm the admin claim is required for all writes and unpublished reads.
- [ ] (Optional) Enable Firebase App Check (deferred).

### R7d - Documentation
- [x] Update `README.md`: setup, env vars, login, claim script, rules deployment, test commands.
- [x] Update the implementation plan status table to reflect remediation progress.
- [x] Document the delete policy (archive) and the search strategy (client-side).

**Acceptance criteria**
- `npm run --prefix new test:ci` passes.
- `npm run --prefix new build` compiles with no warnings.
- Security checklist complete; no unsanitized HTML render paths remain.
- README lets a new developer set up auth, claims, and rules from scratch.

---

## 7. Sequencing & Estimate

| Phase | Focus | Estimate | Dependency | Status |
|-------|-------|----------|------------|--------|
| R0 | Foundations | 0.5 day | - | Done |
| R1 | Auth & authorization | 2-3 days | R0 | Done (live admin-claim QA pending) |
| R2 | Data integrity & services | 2 days | R1 (for admin writes) | Done |
| R3 | Editor & media | 2-3 days | R2 | Done |
| R4 | Preview, publish, notifications | 2-3 days | R3 | Done |
| R5 | Widget, stats, autosave | 3 days | R4 | Done |
| R6 | Optional advanced features | 3-4 days | R5 (optional) | Deferred |
| R7 | Testing, performance, security, docs | 3-4 days | R1-R5 | Mostly done; emulator/auth tests pending |
| **Total** | | **~18-24 days** | | |

## 8. Mapping To The Original Plan

| Original phase | Remediation phases |
|----------------|--------------------|
| Phase 1 - Admin structure (auth gap) | R1 |
| Phase 2 - Data models & Firebase (slug, search, stats, auth middleware) | R1, R2 |
| Phase 3 - Form & image upload (inline images, compression, slug, save/publish) | R2, R3 |
| Phase 4 - Management dashboard (preview, content search, autosave) | R2, R4, R5 |
| Phase 5 - Preview & publishing workflow | R4 |
| Phase 6 - Right-side widget & advanced features | R5, R6 |
| Phase 7 - Testing & refinement | R7 |

## 9. Definition Of Done

- [x] Admin routes require a signed-in user with the `role: "admin"` claim. (Implemented; live claim QA pending.)
- [ ] Sign-in, sign-out, and access-denied flows work and are tested.
- [x] Slug collisions are impossible from the UI and service layer.
- [x] Search covers title, excerpt, and content.
- [ ] Inline images and links work in the editor and render safely. (Implemented; manual QA pending.)
- [ ] Images are compressed before upload. (Implemented; manual QA pending.)
- [ ] Preview renders sanitized HTML and unpublished posts only for admins. (Implemented; live auth QA pending.)
- [ ] Publish/unpublish/archive use confirmation + toast feedback. (Implemented; manual QA pending.)
- [ ] Dashboard shows real stats and recent activity; the right widget works. (Implemented; manual QA pending.)
- [ ] Drafts autosave and can be restored. (Hook tested; UI restore manual QA pending.)
- [x] No `dangerouslySetInnerHTML` path bypasses DOMPurify.
- [x] Admin routes are code-split.
- [x] Tests pass and the production build is warning-free.
- [x] README documents auth, claims, rules, tests, and env setup.

## 10. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Custom claims are not visible until token refresh | Call `getIdTokenResult(true)` on load; prompt sign-out/in if missing |
| Users get "permission-denied" with valid login | Check claim setup and rules; surface a clear error screen |
| Slug collisions race between check and write | Re-check in the service; optionally use slug as the document id |
| Autosave overwrites newer edits | Keep local drafts versioned by timestamp; never autosave published posts |
| DOMPurify strips legitimate editor HTML | Configure an allowlist that matches Tiptap output; test with sample posts |
| Image compression degrades quality | Set a sensible max dimension/quality and show the result before upload |
| Client-side search does not scale | Store `contentText`, debounce, cap results; migrate to server-side search if volume grows |
| CRA lazy loading errors | Use `React.lazy` + `Suspense` with a fallback; verify the production build |

## 11. Manual Verification Checklist

- [ ] Signed out: `/admin`, `/admin/blog`, `/admin/blog/new-post` all redirect to login.
- [ ] Non-admin login: access denied, no Firestore reads succeed.
- [ ] Admin login: dashboard loads stats; sidebar links work; sign-out works.
- [ ] Create a draft with a duplicate slug: blocked with a message.
- [ ] Create a post with inline images and links: renders on `/blog/:slug`.
- [ ] Upload a large image: compressed and uploaded successfully.
- [ ] Preview an unpublished post as admin: visible; as public: not found.
- [ ] Publish with confirmation: success toast, `publishedAt` set, appears publicly.
- [ ] Unpublish/archive: confirmation, removed from public index, kept in admin.
- [ ] Autosave: edit a draft, reload, restore prompt appears.
- [ ] Bulk publish/draft/archive: selected posts update and toasts appear.
- [ ] Production build: `npm run --prefix new build` is warning-free.
- [ ] Tests: `npm run --prefix new test:ci` passes.
