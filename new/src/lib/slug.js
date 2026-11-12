/**
 * Convert arbitrary text into a URL-friendly slug.
 * Lowercases, collapses non-alphanumeric characters into single hyphens,
 * and trims leading/trailing hyphens.
 *
 * @param {string} text
 * @returns {string}
 */
export const slugify = (text) =>
  (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

/**
 * Validate that a slug uses only lowercase letters, numbers, and hyphens,
 * with no leading, trailing, or repeated hyphens.
 *
 * @param {string} slug
 * @returns {boolean}
 */
export const isValidSlug = (slug) =>
  typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)

export default slugify
