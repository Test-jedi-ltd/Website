import {
  db,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  getCountFromServer,
} from "../firebase/admin"
import { createAppError } from "./errors"
import { isValidSlug } from "./slug"

const toMillis = (value) => {
  if (!value) return 0
  if (typeof value.toMillis === "function") return value.toMillis()
  if (typeof value.toDate === "function") return value.toDate().getTime()
  const parsed = new Date(value).getTime()
  return Number.isNaN(parsed) ? 0 : parsed
}

const sortByCreatedDesc = (posts) =>
  posts.sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt))

const fetchAllPosts = async () => {
  const snapshot = await getDocs(collection(db, "blogPosts"))
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/**
 * Strip HTML tags and decode common entities so post bodies can be searched
 * as plain text. Script/style contents are removed entirely.
 *
 * @param {string} html
 * @returns {string}
 */
export const htmlToPlainText = (html) => {
  if (!html) return ""
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Check whether a slug is available.
 *
 * @param {string} slug
 * @param {string | null} [excludeId] Document id allowed to keep the slug (edit mode).
 * @returns {Promise<boolean>}
 */
export const isSlugUnique = async (slug, excludeId = null) => {
  const normalized = (slug || "").trim()
  if (!normalized) return false

  const snapshot = await getDocs(
    query(collection(db, "blogPosts"), where("slug", "==", normalized))
  )

  return snapshot.docs.every((d) => d.id === excludeId)
}

const ensureSlugAvailable = async (slug, excludeId = null) => {
  const unique = await isSlugUnique(slug, excludeId)
  if (!unique) {
    throw createAppError(
      "slug-taken",
      "That slug is already in use. Choose a different one."
    )
  }
}

const VALID_STATUSES = ["draft", "published", "archived"]

const isHttpUrl = (value) => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const validatePostFields = (postData, { requireContent = false } = {}) => {
  if (requireContent) {
    if (!postData.title || !String(postData.title).trim()) {
      throw createAppError("invalid-post", "Title is required.")
    }
    if (!postData.excerpt || !String(postData.excerpt).trim()) {
      throw createAppError("invalid-post", "Excerpt is required.")
    }
  }

  if (postData.slug !== undefined) {
    const slug = (postData.slug || "").trim()
    if (!slug) {
      throw createAppError("invalid-slug", "Slug is required.")
    }
    if (!isValidSlug(slug)) {
      throw createAppError(
        "invalid-slug",
        "Slug must use lowercase letters, numbers, and hyphens only."
      )
    }
  }

  if (postData.status !== undefined && !VALID_STATUSES.includes(postData.status)) {
    throw createAppError("invalid-status", "Post status is invalid.")
  }

  if (postData.featuredImage && !isHttpUrl(postData.featuredImage)) {
    throw createAppError(
      "invalid-url",
      "Featured image URL must start with http:// or https://."
    )
  }
}

export const getBlogPosts = async (publishedOnly = true, statusFilter) => {
  const postsCol = collection(db, "blogPosts")
  let snapshot

  if (statusFilter) {
    snapshot = await getDocs(query(postsCol, where("status", "==", statusFilter)))
  } else if (publishedOnly) {
    snapshot = await getDocs(query(postsCol, where("status", "==", "published")))
  } else {
    snapshot = await getDocs(postsCol)
  }

  const posts = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
  return sortByCreatedDesc(posts)
}

export const getRecentPosts = async (max = 5) => {
  const snapshot = await getDocs(
    query(collection(db, "blogPosts"), orderBy("updatedAt", "desc"), limit(max))
  )
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export const getBlogPostById = async (id) => {
  const snap = await getDoc(doc(db, "blogPosts", id))
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() }
  }
  return null
}

export const getBlogPostBySlug = async (slug, includeUnpublished = false) => {
  if (!slug) return null

  const constraints = [where("slug", "==", slug)]
  if (!includeUnpublished) {
    constraints.push(where("status", "==", "published"))
  }

  const snapshot = await getDocs(query(collection(db, "blogPosts"), ...constraints))
  if (snapshot.empty) return null
  const docSnap = snapshot.docs[0]
  return { id: docSnap.id, ...docSnap.data() }
}

export const createBlogPost = async (postData) => {
  validatePostFields(postData, { requireContent: true })
  const slug = (postData.slug || "").trim()
  if (!slug) {
    throw createAppError("invalid-slug", "Slug is required.")
  }
  await ensureSlugAvailable(slug)

  const postWithDefaults = {
    ...postData,
    slug,
    contentText:
      postData.contentText !== undefined
        ? postData.contentText
        : htmlToPlainText(postData.content),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: postData.status === "published" ? serverTimestamp() : null,
  }

  const docRef = await addDoc(collection(db, "blogPosts"), postWithDefaults)
  return { id: docRef.id, ...postWithDefaults }
}

export const updateBlogPost = async (id, postData) => {
  validatePostFields(postData)

  const updatedData = {
    ...postData,
    updatedAt: serverTimestamp(),
  }

  if (postData.slug !== undefined) {
    const slug = (postData.slug || "").trim()
    if (!slug) {
      throw createAppError("invalid-slug", "Slug is required.")
    }
    await ensureSlugAvailable(slug, id)
    updatedData.slug = slug
  }

  if (postData.content !== undefined && postData.contentText === undefined) {
    updatedData.contentText = htmlToPlainText(postData.content)
  }

  if (postData.status === "published") {
    updatedData.publishedAt = postData.publishedAt || serverTimestamp()
  } else if (postData.status) {
    updatedData.publishedAt = null
  }

  await updateDoc(doc(db, "blogPosts", id), updatedData)
  return { id, ...updatedData }
}

/**
 * Archive a post. Posts are never hard-deleted from the client so they remain
 * available in the admin dashboard for reference.
 */
export const archiveBlogPost = async (id) => {
  await updateDoc(doc(db, "blogPosts", id), {
    status: "archived",
    updatedAt: serverTimestamp(),
    publishedAt: null,
  })
}

/**
 * @deprecated Use `archiveBlogPost`. Kept for backwards compatibility.
 */
export const deleteBlogPost = archiveBlogPost

export const searchPosts = async (searchTerm) => {
  const term = (searchTerm || "").trim().toLowerCase()
  if (!term) return getBlogPosts(false)

  const posts = await fetchAllPosts()
  return sortByCreatedDesc(
    posts.filter((post) => {
      const title = (post.title || "").toLowerCase()
      const excerpt = (post.excerpt || "").toLowerCase()
      const contentText = (
        post.contentText || htmlToPlainText(post.content)
      ).toLowerCase()
      return (
        title.includes(term) ||
        excerpt.includes(term) ||
        contentText.includes(term)
      )
    })
  )
}

export const getBlogPostsPaginated = async (page = 1, pageSize = 10, statusFilter) => {
  const posts = await getBlogPosts(false, statusFilter)
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return {
    posts: posts.slice(start, end),
    total: posts.length,
    totalPages: Math.max(1, Math.ceil(posts.length / pageSize)),
  }
}

export const countPublishedPosts = async () => {
  const snapshot = await getCountFromServer(
    query(collection(db, "blogPosts"), where("status", "==", "published"))
  )
  return snapshot.data().count
}

/**
 * Counts for every post status. Admin-only (rules require the admin claim).
 *
 * @returns {Promise<import("./blogTypes").PostStats>}
 */
export const getPostStats = async () => {
  const postsCol = collection(db, "blogPosts")

  const [total, draft, published, archived] = await Promise.all([
    getCountFromServer(postsCol),
    getCountFromServer(query(postsCol, where("status", "==", "draft"))),
    getCountFromServer(query(postsCol, where("status", "==", "published"))),
    getCountFromServer(query(postsCol, where("status", "==", "archived"))),
  ])

  return {
    total: total.data().count,
    draft: draft.data().count,
    published: published.data().count,
    archived: archived.data().count,
  }
}
