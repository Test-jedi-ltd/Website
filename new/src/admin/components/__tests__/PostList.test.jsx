import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Modal } from "antd"
import PostList from "../PostList"

const mockGetBlogPostsPaginated = jest.fn()
const mockSearchPosts = jest.fn()
const mockUpdateBlogPost = jest.fn()
const mockArchiveBlogPost = jest.fn()

jest.mock("react-router-dom", () => {
  const React = require("react")
  return {
    Link: ({ to, children, ...props }) =>
      React.createElement(
        "a",
        { href: typeof to === "string" ? to : "#", ...props },
        children
      ),
  }
})

jest.mock("../../../lib/firestore", () => ({
  getBlogPostsPaginated: (...args) => mockGetBlogPostsPaginated(...args),
  searchPosts: (...args) => mockSearchPosts(...args),
  updateBlogPost: (...args) => mockUpdateBlogPost(...args),
  archiveBlogPost: (...args) => mockArchiveBlogPost(...args),
}))

jest.mock("antd", () => ({
  Modal: { confirm: jest.fn() },
  message: { success: jest.fn(), error: jest.fn() },
}))

const posts = [
  {
    id: "1",
    title: "Alpha",
    slug: "alpha",
    author: "Author A",
    status: "draft",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "Beta",
    slug: "beta",
    author: "Author B",
    status: "published",
    createdAt: new Date("2024-02-01"),
  },
]

const renderList = () => render(<PostList />)

describe("PostList", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetBlogPostsPaginated.mockResolvedValue({
      posts,
      total: posts.length,
      totalPages: 1,
    })
    mockSearchPosts.mockResolvedValue(posts)
    mockUpdateBlogPost.mockResolvedValue()
    mockArchiveBlogPost.mockResolvedValue()
    Modal.confirm.mockImplementation(({ onOk }) => {
      if (onOk) onOk()
    })
  })

  it("renders the paginated posts", async () => {
    renderList()

    expect(await screen.findByText("Alpha")).toBeTruthy()
    expect(screen.getByText("Beta")).toBeTruthy()
    expect(mockGetBlogPostsPaginated).toHaveBeenCalledWith(1, 10, undefined)
  })

  it("debounces the search and queries matching posts", async () => {
    renderList()
    await screen.findByText("Alpha")

    fireEvent.change(
      screen.getByPlaceholderText("Search title, excerpt, or content..."),
      { target: { value: "alpha" } }
    )

    await waitFor(() => expect(mockSearchPosts).toHaveBeenCalledWith("alpha"))
  })

  it("reloads with the selected status filter", async () => {
    renderList()
    await screen.findByText("Alpha")

    fireEvent.change(screen.getAllByRole("combobox")[0], {
      target: { value: "published" },
    })

    await waitFor(() =>
      expect(mockGetBlogPostsPaginated).toHaveBeenCalledWith(1, 10, "published")
    )
  })

  it("publishes all selected posts after confirmation", async () => {
    renderList()
    await screen.findByText("Alpha")

    fireEvent.click(screen.getAllByRole("checkbox")[0])
    fireEvent.click(screen.getAllByRole("button", { name: "Publish" })[0])

    await waitFor(() => {
      expect(mockUpdateBlogPost).toHaveBeenCalledWith("1", {
        status: "published",
      })
      expect(mockUpdateBlogPost).toHaveBeenCalledWith("2", {
        status: "published",
      })
    })
  })

  it("archives a post after confirmation", async () => {
    renderList()
    await screen.findByText("Alpha")

    fireEvent.click(screen.getAllByRole("button", { name: "Archive" })[0])

    await waitFor(() => expect(mockArchiveBlogPost).toHaveBeenCalledWith("1"))
  })

  it("shows a fallback error when loading fails", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})
    mockGetBlogPostsPaginated.mockRejectedValue({})

    renderList()

    expect(
      await screen.findByText("Failed to load posts. Please try again.")
    ).toBeTruthy()
    consoleSpy.mockRestore()
  })
})
