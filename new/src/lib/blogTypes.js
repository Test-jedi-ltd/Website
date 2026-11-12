/**
 * Blog post data model shared across the admin dashboard and the public site.
 * This project is JavaScript + JSDoc; these typedefs are for editor tooling
 * and documentation only and are erased at build time.
 */

/**
 * @typedef {"draft" | "published" | "archived"} BlogPostStatus
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} content
 * @property {string} [contentText] Plain-text version of `content` used for search.
 * @property {string} [featuredImage]
 * @property {string} [featuredImageAlt] Accessible description of the featured image.
 * @property {string} [author]
 * @property {BlogPostStatus} status
 * @property {import("firebase/firestore").Timestamp | string | Date | null} [createdAt]
 * @property {import("firebase/firestore").Timestamp | string | Date | null} [updatedAt]
 * @property {import("firebase/firestore").Timestamp | string | Date | null} [publishedAt]
 * @property {string} [metaDescription]
 * @property {string} [canonicalUrl]
 * @property {number} [readingTime]
 * @property {string[]} [tags]
 * @property {string} [category]
 */

/**
 * @typedef {Object} BlogPostInput
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} content
 * @property {string} [contentText]
 * @property {string} [featuredImage]
 * @property {string} [featuredImageAlt]
 * @property {string} [author]
 * @property {BlogPostStatus} status
 */

/**
 * @typedef {Object} PostStats
 * @property {number} total
 * @property {number} draft
 * @property {number} published
 * @property {number} archived
 */

export {}
