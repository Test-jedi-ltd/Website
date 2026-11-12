jest.mock("../../firebase/admin", () => ({
  db: {},
  collection: jest.fn((_db, name) => ({ name })),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  query: jest.fn((...args) => ({ args })),
  where: jest.fn((field, op, value) => ({ field, op, value })),
  orderBy: jest.fn(),
  limit: jest.fn(),
  serverTimestamp: jest.fn(() => "SERVER_TIMESTAMP"),
  getCountFromServer: jest.fn(),
}))

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  getCountFromServer,
  serverTimestamp,
} from "../../firebase/admin"
import {
  htmlToPlainText,
  isSlugUnique,
  searchPosts,
  getPostStats,
  createBlogPost,
  updateBlogPost,
} from "../firestore"

const makeDoc = (id, data) => ({ id, data: () => data })

describe("htmlToPlainText", () => {
  it("strips tags and normalizes whitespace", () => {
    expect(htmlToPlainText("<p>Hello <strong>World</strong></p>")).toBe(
      "Hello World"
    )
    expect(htmlToPlainText("")).toBe("")
  })

  it("removes script and style contents", () => {
    expect(
      htmlToPlainText("<script>alert(1)</script><style>p{}</style><p>Hi</p>")
    ).toBe("Hi")
  })
})

describe("isSlugUnique", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns false when another post already uses the slug", async () => {
    getDocs.mockResolvedValue({ docs: [makeDoc("a", {}), makeDoc("b", {})] })
    await expect(isSlugUnique("hello")).resolves.toBe(false)
    await expect(isSlugUnique("hello", "a")).resolves.toBe(false)
  })

  it("allows the current post to keep its slug", async () => {
    getDocs.mockResolvedValue({ docs: [makeDoc("a", {})] })
    await expect(isSlugUnique("hello", "a")).resolves.toBe(true)
  })

  it("rejects empty slugs without querying", async () => {
    await expect(isSlugUnique("   ")).resolves.toBe(false)
    expect(getDocs).not.toHaveBeenCalled()
  })
})

describe("searchPosts", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("matches title, excerpt, and contentText", async () => {
    getDocs.mockResolvedValue({
      docs: [
        makeDoc("1", {
          title: "Alpha",
          excerpt: "Beta",
          contentText: "Gamma",
          createdAt: 1,
        }),
        makeDoc("2", {
          title: "Delta",
          excerpt: "Epsilon",
          contentText: "Zeta",
          createdAt: 2,
        }),
      ],
    })

    await expect(searchPosts("gamma")).resolves.toEqual([
      expect.objectContaining({ id: "1" }),
    ])
    await expect(searchPosts("delta")).resolves.toEqual([
      expect.objectContaining({ id: "2" }),
    ])
    await expect(searchPosts("epsilon")).resolves.toEqual([
      expect.objectContaining({ id: "2" }),
    ])
    await expect(searchPosts("missing")).resolves.toEqual([])
  })

  it("falls back to stripping content when contentText is missing", async () => {
    getDocs.mockResolvedValue({
      docs: [
        makeDoc("3", {
          title: "Title",
          excerpt: "Excerpt",
          content: "<p>hiddenword</p>",
          createdAt: 3,
        }),
      ],
    })

    await expect(searchPosts("hiddenword")).resolves.toEqual([
      expect.objectContaining({ id: "3" }),
    ])
  })
})

describe("getPostStats", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns counts for every status", async () => {
    getCountFromServer
      .mockResolvedValueOnce({ data: () => ({ count: 10 }) })
      .mockResolvedValueOnce({ data: () => ({ count: 3 }) })
      .mockResolvedValueOnce({ data: () => ({ count: 6 }) })
      .mockResolvedValueOnce({ data: () => ({ count: 1 }) })

    await expect(getPostStats()).resolves.toEqual({
      total: 10,
      draft: 3,
      published: 6,
      archived: 1,
    })
  })
})

describe("createBlogPost", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    collection.mockImplementation((_db, name) => ({ name }))
    getDocs.mockResolvedValue({ docs: [] })
    addDoc.mockResolvedValue({ id: "new-id" })
    serverTimestamp.mockReturnValue("SERVER_TIMESTAMP")
  })

  it("rejects a duplicate slug", async () => {
    getDocs.mockResolvedValue({ docs: [makeDoc("existing", {})] })

    await expect(
      createBlogPost({
        title: "Title",
        slug: "hello",
        excerpt: "Excerpt",
        content: "<p>Body</p>",
        status: "draft",
      })
    ).rejects.toMatchObject({ code: "slug-taken" })
  })

  it("rejects an invalid slug", async () => {
    await expect(
      createBlogPost({
        title: "Title",
        slug: "Bad Slug",
        excerpt: "Excerpt",
        content: "",
        status: "draft",
      })
    ).rejects.toMatchObject({ code: "invalid-slug" })
  })

  it("requires a title and excerpt", async () => {
    await expect(
      createBlogPost({
        slug: "hello",
        content: "",
        status: "draft",
      })
    ).rejects.toMatchObject({ code: "invalid-post" })
  })

  it("stores contentText and returns the new id", async () => {
    const result = await createBlogPost({
      title: "Title",
      slug: "hello",
      excerpt: "Excerpt",
      content: "<p>Body text</p>",
      status: "draft",
    })

    expect(addDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        slug: "hello",
        contentText: "Body text",
      })
    )
    expect(result).toMatchObject({ id: "new-id", contentText: "Body text" })
  })
})

describe("updateBlogPost", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    updateDoc.mockResolvedValue()
  })

  it("rejects an invalid status", async () => {
    await expect(
      updateBlogPost("post-1", { status: "bogus" })
    ).rejects.toMatchObject({ code: "invalid-status" })
    expect(updateDoc).not.toHaveBeenCalled()
  })
})
