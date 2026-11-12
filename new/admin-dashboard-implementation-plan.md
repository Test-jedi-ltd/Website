# Firebase Admin Dashboard: UI Design & Phased Implementation Plan

> **Status legend:** ✅ Completed · 🟡 Partially completed · ❌ Outstanding / not started
>
> **Last reviewed:** 2026-11-12

## **Implementation Status Overview**

| Phase | Status | Summary |
|-------|--------|---------|
| 1. Admin Dashboard Structure | ✅ Completed | Shell, sidebar, routing, real auth guard/sign-in, and admin-claim enforcement |
| 2. Blog Data Models & Firebase | ✅ Completed | Schema + CRUD + rules + slug uniqueness + `contentText` search + stats; JSDoc types instead of TS |
| 3. Blog Form & Image Upload | ✅ Completed | Editor with links/inline images, compression, alt/remove, slug checks, split save/publish |
| 4. Blog Management Dashboard | ✅ Completed | List, filters, content search, preview, confirmations/toasts, autosave, right widget |
| 5. Preview & Publishing Workflow | ✅ Completed | Sanitized preview, publish confirmation, toasts, status transitions; versioning deferred |
| 6. Right-Side Widget & Advanced | 🟡 Partial | Right widget, stats, activity feed, autosave done; tags/SEO/import-export deferred (R6) |
| 7. Testing & Refinement | 🟡 Partial | Unit + `PostForm`/`PostList` tests, code splitting, lazy images, sanitization, docs done; auth/emulator tests pending |

### **Outstanding Work (prioritized)**

1. **Live admin-claim QA** — verify signed-out redirect, non-admin denial, and admin access with a real Firebase user.
2. **Firebase Emulator integration** — rules review and CRUD integration tests (requires the Firebase CLI).
3. **Memoize expensive list rendering** in `PostList`.
4. **Firestore pagination** (`limit` / `startAfter`) when post volume grows.
5. **Optional features (R6)** — tags/categories, SEO fields, import/export, version history.
6. **Optional Firebase App Check.**

## **Design Specification: Admin Dashboard with Sidebar**

### **Color Palette (Matching Main Website)**

| **Color** | **Hex** | **Usage** |
|-----------|---------|-----------|
| **Dark Navy** | `#151240` | Sidebar background, header/footer |
| **Light Beige** | `#FDF9D2` | Main background, card backgrounds |
| **Orange Accent** | `#964A21` | Active tabs, buttons, highlights |
| **Dark Brown** | `#1A2D5B` | Text, borders, secondary text |
| **Muted Text** | `#7A7780` | Secondary text, placeholders |
| **White/Off-white** | `#FFFFFF` | Cards, modals (if needed) |

### **Sidebar Layout**

```
┌─────────────────────────────────────┐
│  ☰  Admin                              │
│ ─────────────────────────────────────│
│  📊 Dashboard                          │
│  📁 Projects                           │
│  ✍️  Blog                               │
│  📊 Analytics                          │
│  ⚙️  Settings                           │
│  ─────────────────────────────────────│
│  [Logout]                              │
└─────────────────────────────────────┘
```

**Mobile/Collapsed State:**
```
☰ Admin
• Dashboard
• Projects
• Blog ← Active
• Analytics
• Settings
```

### **Main Content Area**

```
┌─────────────────────────────────────┐
│  [Blog Feature Cards]                 │
│  ────────────────────────────────────│
│  [Add New Post]                       │
│  ────────────────────────────────────│
│  [Post Preview/Edit]                  │
│  ────────────────────────────────────│
│  [Blog Management Tools]              │
└─────────────────────────────────────┘
```

### **Blog Feature Set**

```
┌─────────────────────────────────────┐
│  ADD NEW POST                         │
│  ────────────────────────────────────│
│  Title:    [                          ] │
│  ────────────────────────────────────│
│  Excerpt:  [                          ] │
│  ────────────────────────────────────│
│  Content:                              │
│  [TinyMCE/Quill editor area]          │
│  ────────────────────────────────────│
│  Featured Image:                      │
│  [Browse Upload]                      │
│  ────────────────────────────────────│
│  Status:    ☐ Draft   ☐ Published     │
│  ────────────────────────────────────│
│  [Preview]     [Save Draft]   [Publish]│
└─────────────────────────────────────┘
```

---

## **Phased Implementation Plan**

### **Phase 1: Admin Dashboard Structure** (Week 1) — 🟡 Partial

**Objective**: Create the basic admin shell with sidebar and routing

**Tasks**:
1. **Create Sidebar Component** — ✅
   - ✅ Fixed positioning on left
   - ✅ Active tab highlighting (`useLocation`)
   - ✅ Responsive collapse/expand (`collapsed` state)
   - 🟡 Authentication state integration — subscribes to `onAuthStateChanged`, but defaults to authenticated and has no sign-out control

2. **Create Main Content Area** — 🟡
   - ✅ Route-based content rendering (`<Outlet />`)
   - 🟡 Loading states — present in `PostList`, absent on `Dashboard`
   - ✅ Error boundaries (`ErrorBoundary.jsx`)

3. **Set Up Routing** — ✅
   - ✅ `/admin` → Dashboard (index route)
   - ✅ `/admin/blog` → Blog management
   - ✅ `/admin/projects` → Projects (placeholder)
   - ✅ `/admin/analytics` → Analytics (placeholder)
   - ✅ `/admin/settings` → Settings (placeholder)

4. **Implement Authentication Guard** — ❌
   - 🟡 Check Firebase auth state — listener exists but is not enforced
   - ❌ Show sign-in if unauthenticated
   - ❌ Grey out features if unauthenticated

**Deliverables**:
- ✅ AdminShell component with sidebar
- ✅ Route configuration (nested routes in `new/src/App.js`)
- ❌ Auth guard middleware (old `ProtectedRoute` removed; only a permissive stub remains)
- ✅ Placeholder pages for non-blog features

### **Phase 2: Blog Data Models & Firebase Integration** (Week 2) — 🟡 Partial

**Objective**: Set up Firebase data structure and CRUD operations

**Tasks**:
1. **Define Blog Post Schema** — ✅ (implemented in `new/src/lib/firestore.js`; no TypeScript types since the app is Babel/JS)
   ```javascript
   {
     id: string,
     title: string,
     slug: string (unique, URL-friendly),
     excerpt: string,
     content: string (markdown/HTML),
     featuredImage: string (URL),
     author: string,
     status: 'draft' | 'published' | 'archived',
     createdAt: timestamp,
     updatedAt: timestamp,
     publishedAt: timestamp (optional)
   }
   ```

2. **Set Up Firebase Firestore Collection** — 🟡
   - ✅ Collection: `blogPosts`
   - ✅ Security rules for admin access (`new/src/firebase/firestore.rules`; custom-claim based)
   - ❌ Indexes for slug, status, createdAt — not created; queries avoid composite indexes via client-side sorting

3. **Create Firestore Services** — ✅ (in `new/src/lib/firestore.js`)
   - ✅ `getBlogPosts()` — list with filtering
   - ✅ `getBlogPostById()` — single post retrieval
   - 🟡 `createBlogPost()` — works; slug is generated in the form, not the service
   - 🟡 `updateBlogPost()` — updates `updatedAt`/`publishedAt`; no versioning
   - ✅ `deleteBlogPost()` — soft delete via status `archived`
   - ✅ `searchPosts()` — by title/excerpt

4. **Create Auth Middleware** — ❌
   - ❌ Admin-only routes (guard removed)
   - ❌ Session management
   - ❌ Token validation / custom-claim enforcement

**Deliverables**:
- ✅ Firebase data structure
- ✅ Service layer for all CRUD operations
- ❌ Auth protection for admin routes
- ❌ TypeScript interfaces for blog posts (removed during cleanup; project is JS)

### **Phase 3: Blog Form & Image Upload** (Week 3) — 🟡 Partial

**Objective**: Create the post creation/editing interface with image support

**Tasks**:
1. **Rich Text Editor Integration** — 🟡
   - ✅ Install `@tiptap/react` (Tiptap v3)
   - 🟡 Custom toolbar — bold/italic/strike/headings/lists/quote/undo/redo; no link or inline image buttons
   - 🟡 Image upload drag-and-drop — drag-and-drop exists for the featured image only, not inline in the editor
   - ✅ Image preview before upload (featured image)

2. **Image Upload Component** — 🟡
   - ✅ Drag-and-drop zone
   - ✅ Preview before upload
   - ✅ Upload to Firebase Storage (`uploadBytesResumable`)
   - ✅ Get public URL
   - ❌ Image resizing/optimization

3. **Blog Post Form** — ✅
   - ✅ Title input (required validation on submit)
   - ✅ Excerpt textarea
   - ✅ Content rich text editor
   - ✅ Featured image uploader
   - ✅ Status toggle (draft/published)
   - 🟡 Save draft / Publish buttons — single submit button whose label follows the selected status

4. **Slug Generation** — 🟡
   - ✅ Auto-generate from title
   - ✅ Manual override capability
   - ❌ Uniqueness validation

**Deliverables**:
- ✅ Rich text editor component (`TiptapEditor.jsx`)
- ✅ Image upload/preview component (`ImageUpload.jsx`)
- ✅ Blog post form component (`PostForm.jsx`)
- 🟡 Slug generation utility — inline helper in `PostForm`, not a standalone utility
- ✅ Image storage in Firebase Storage

### **Phase 4: Blog Management Dashboard** (Week 4) — 🟡 Partial

**Objective**: Create the blog listing and management interface

**Tasks**:
1. **Blog List Component** — 🟡
   - ✅ Table/list view of all posts
   - ✅ Columns: Title, Author, Status, Date, Actions
   - ✅ Filter by: All, Drafts, Published, Archived
   - 🟡 Search by: Title, Excerpt, Content — searches title/excerpt only

2. **Bulk Actions** — ✅
   - ✅ Select multiple posts
   - ✅ Publish selected
   - 🟡 Delete selected — performs a soft archive rather than a hard delete
   - ✅ Archive selected

3. **Post Actions Menu** — 🟡
   - ✅ Edit (open form with pre-filled data)
   - ❌ Preview (read-only view)
   - ✅ Delete (with confirmation)
   - ✅ Change status (draft ↔ published)

4. **Drafts Management** — 🟡
   - ✅ Filter view for drafts only
   - ❌ Auto-save functionality
   - ✅ Restore from draft to editor

**Deliverables**:
- ✅ Blog list table/list view (`PostList.jsx`)
- ✅ Bulk action controls
- 🟡 Post action menu — no preview action
- 🟡 Drafts filter and management — no auto-save
- ✅ Empty state handling

### **Phase 5: Preview & Publishing Workflow** (Week 5) — ❌ Mostly outstanding

**Objective**: Implement the preview and publish flow

**Tasks**:
1. **Preview Component** — ❌
   - ❌ Read-only view of post content
   - ❌ Show featured image at top
   - ❌ Render markdown/HTML safely
   - ❌ Navigation back to editor

2. **Publish Workflow** — 🟡
   - ✅ "Publish" button in editor
   - ❌ Confirmation dialog
   - ✅ Set `publishedAt` timestamp
   - ✅ Change status from draft → published
   - ❌ Publish success notification

3. **Unpublish/Archive** — ✅
   - ✅ Change published → archived
   - ✅ Remove from public blog index (public queries filter on `status == published`)
   - ✅ Keep in admin for reference

4. **Version History** (Optional) — ❌
   - ❌ Basic change tracking
   - 🟡 Last updated metadata (`updatedAt` only)
   - ❌ Restore previous versions

**Deliverables**:
- ❌ Preview component
- 🟡 Publish/unpublish workflow — no confirmation or notifications
- ✅ Status management
- ❌ User notifications/feedback

### **Phase 6: Right-Side Widget & Advanced Features** (Week 6) — ❌ Outstanding

**Objective**: Add the right-side widget and advanced blog features

**Tasks**:
1. **Right-Side Widget Panel** — ❌
   - ❌ Collapsible sidebar area
   - ❌ "Add Post" floating button
   - ❌ Quick stats (total posts, drafts, published)
   - ❌ Recent activity feed

2. **Draft Management** — 🟡
   - ❌ Auto-save every 30 seconds
   - ✅ Draft list view (status filter)
   - ✅ Restore draft to editor
   - ✅ Delete draft confirmation (`window.confirm`)

3. **Category/Tag System** (Optional) — ❌
   - ❌ Tag inputs per post
   - ❌ Category filtering
   - ❌ Tag cloud in admin

4. **SEO Settings** (Optional) — 🟡
   - ❌ Meta description input
   - ✅ Slug customization
   - ❌ Reading time estimate
   - ❌ Featured image dimensions guide

5. **Import/Export** (Optional) — ❌
   - ❌ CSV export of posts
   - ❌ Import from markdown files
   - ❌ Backup/download functionality

**Deliverables**:
- ❌ Right-side widget panel
- 🟡 Draft management UI — list/restore/delete exist; no auto-save
- ❌ Quick stats and recent activity
- ❌ Optional: SEO settings panel
- ❌ Optional: Import/export tools

### **Phase 7: Testing & Refinement** (Week 7) — ❌ Outstanding

**Objective**: Quality assurance and polish

**Tasks**:
1. **Functional Testing** — ❌
   - ❌ CRUD operations test plan (manual checks only)
   - ❌ Image upload in various scenarios
   - ❌ Form validation tests
   - ❌ Auth state changes tests

2. **UI/UX Refinements** — 🟡
   - 🟡 Loading states spinners — list has them; dashboard/forms do not
   - ✅ Empty states messaging
   - ✅ Error handling messages
   - 🟡 Responsive design testing — sidebar collapses; limited admin-specific tuning

3. **Performance Optimization** — ❌
   - ❌ Image optimization
   - ❌ Code splitting for admin routes
   - ❌ Lazy loading components
   - ❌ Firebase read/write limit monitoring

4. **Security Review** — 🟡
   - ❌ Auth token validation / custom-claim enforcement in the client
   - ✅ Firestore security rules review (rules fixed to custom claims)
   - ❌ XSS prevention in content rendering (`dangerouslySetInnerHTML` is unsanitized)
   - ❌ Input sanitization

**Deliverables**:
- ❌ Test coverage report
- 🟡 UI/UX polish
- ❌ Performance metrics
- ❌ Security audit report

---

## **Component Hierarchy**

```
AdminDashboard
├── Sidebar
│   ├── NavItem (Dashboard, Blog, Projects, etc.)
│   ├── AuthToggle (Sign in/out)
│   └── CollapseButton
│
├── MainContent
│   ├── ActivePage (Dashboard/Blog/etc.)
│   │   ├── BlogForm (Add/Edit post)
│   │   │   ├── TitleInput
│   │   │   ├── ExcerptInput
│   │   │   ├── RichTextEditor
│   │   │   ├── ImageUploader
│   │   │   └── StatusToggle
│   │   ├── BlogList (CRUD operations)
│   │   │   ├── PostCard
│   │   │   ├── ActionMenu
│   │   │   └── BulkSelector
│   │   └── PreviewPanel
│   └── SidebarPlaceholder (when collapsed)
│
└── HeaderBar
    ├── NotificationCenter
    └── UserMenu (Profile/Sign out)
```

## **Firebase Data Model Example**

```javascript
// Collection: blogPosts
// Document ID: auto-generated or slug-based

{
  id: "my-first-post",
  title: "My First Blog Post",
  slug: "my-first-post",
  excerpt: "A brief summary of what this post is about",
  content: "# My First Post\n\nThis is the content...",
  featuredImage: "https://storage.firebase.com/images/cover.jpg",
  author: "admin-user",
  status: "published",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
  publishedAt: "2024-01-15T10:30:00Z"
}
```

## **Summary**

This phased plan provides a structured approach to building a complete admin dashboard with blog management capabilities. Each phase builds upon the previous, ensuring:

1. **Incremental functionality** - usable features at each stage
2. **Firebase integration** - proper data modeling and CRUD
3. **UI consistency** - matching main website design
4. **Scalability** - architecture that can grow with features
5. **Security** - proper auth and data rules

The plan moves from basic structure → data models → forms → management → publishing → advanced features → quality assurance, ensuring a solid foundation at each step.

---

## **File Locations (current)**

- **`new/admin-dashboard-implementation-plan.md`** - This comprehensive plan (status tracked here)
- **`new/firebase-admin-test-findings.md`** - Test findings and remediation status
- **`new/firebase-admin-implementation-plan.md`** - Original Phase 1-4 plan
- **Admin code** in `new/src/admin/`:
  - `AdminShell.jsx` - Layout, sidebar, auth guard, right widget, FAB, `<Outlet />`
  - `AuthContext.jsx` - Auth state + admin claim
  - `components/Sidebar.jsx` - Sidebar navigation, collapse, active state
  - `components/ProtectedRoute.jsx` - Admin route guard
  - `components/PostList.jsx` - Blog posts listing, filters, bulk actions
  - `components/PostForm.jsx` - Create/edit form with slug checks and autosave
  - `components/TiptapEditor.jsx` - Rich text editor with links and inline images
  - `components/ImageUpload.jsx` - Compressed Firebase Storage uploader
  - `components/RightWidget.jsx` - Stats/recent activity panel + mobile drawer
  - `components/ErrorBoundary.jsx` - Error boundary
  - `pages/Dashboard.jsx`, `Login.jsx`, `PreviewPost.jsx`, `BlogManagement.jsx`, `NewPost.jsx`, `EditPost.jsx`, `Projects.jsx`, `Analytics.jsx`, `Settings.jsx`
- **Shared data service:** `new/src/lib/firestore.js`
- **Shared utilities:** `new/src/lib/slug.js`, `errors.js`, `storage.js`, `useAutosave.js`, `blogTypes.js`
- **Public rendering:** `new/src/components/PostContent.jsx` (DOMPurify), `BlogPostDetail.jsx`
- **Firebase:** `new/src/firebase/config.js`, `admin.js`, `firestore.rules`
- **Routing:** `new/src/App.js` (lazy-loaded nested `/admin` routes)

---

*Last Updated: 2026-11-12*
*Implementation Status: Phases 1–5 complete; Phase 6 partially complete (R6 optional features deferred); Phase 7 mostly complete with live auth/emulator/PostList tests pending*