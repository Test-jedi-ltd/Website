import { slugify, isValidSlug } from "../slug"

describe("slugify", () => {
  it("lowercases and replaces spaces and punctuation with hyphens", () => {
    expect(slugify("Hello World!")).toBe("hello-world")
    expect(slugify("C++ & JavaScript")).toBe("c-javascript")
  })

  it("collapses repeated separators and trims edges", () => {
    expect(slugify("  A -- B__C  ")).toBe("a-b-c")
    expect(slugify("---leading-and-trailing---")).toBe("leading-and-trailing")
  })

  it("returns an empty string for empty or missing input", () => {
    expect(slugify("")).toBe("")
    expect(slugify(null)).toBe("")
    expect(slugify(undefined)).toBe("")
  })
})

describe("isValidSlug", () => {
  it("accepts lowercase alphanumeric slugs with single hyphens", () => {
    expect(isValidSlug("hello-world")).toBe(true)
    expect(isValidSlug("post-2")).toBe(true)
    expect(isValidSlug("abc123")).toBe(true)
  })

  it("rejects invalid slugs", () => {
    expect(isValidSlug("Hello-World")).toBe(false)
    expect(isValidSlug("hello world")).toBe(false)
    expect(isValidSlug("-hello")).toBe(false)
    expect(isValidSlug("hello-")).toBe(false)
    expect(isValidSlug("hello--world")).toBe(false)
    expect(isValidSlug("")).toBe(false)
    expect(isValidSlug(null)).toBe(false)
  })
})
