import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import BlogPostDetail from "../BlogPostDetail"
import { getBlogPostBySlug, getBlogPosts } from "../../lib/firestore"

jest.mock("../../sections/Navbar", () => () => <nav>Site navigation</nav>)
jest.mock("../../sections/Footer", () => () => <footer>Site footer</footer>)
jest.mock("../../lib/firestore", () => ({
  getBlogPostBySlug: jest.fn(),
  getBlogPosts: jest.fn(),
}))

describe("BlogPostDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getBlogPostBySlug.mockResolvedValue({
      id: "current",
      slug: "current-article",
      title: "Dynamic article title",
      excerpt: "Dynamic article summary",
      content: "<p>Dynamic article content.</p>",
      author: "Test Jedi",
      category: "API Testing",
      status: "published",
    })
    getBlogPosts.mockResolvedValue([
      {
        id: "current",
        slug: "current-article",
        title: "Dynamic article title",
      },
      {
        id: "related",
        slug: "related-article",
        title: "Related dynamic article",
        excerpt: "Related summary",
      },
    ])
  })

  it("renders dynamic article content in the original hero and related-story layout", async () => {
    render(
      <MemoryRouter initialEntries={["/blog/current-article"]}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
        </Routes>
      </MemoryRouter>
    )

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Dynamic article title",
      })
    ).toBeInTheDocument()
    expect(screen.getByText("Dynamic article summary")).toBeInTheDocument()
    expect(screen.getByText("Dynamic article content.")).toBeInTheDocument()
    expect(screen.getByText("Related dynamic article")).toBeInTheDocument()
    expect(screen.getByText("Site navigation")).toBeInTheDocument()
    expect(screen.getByText("Site footer")).toBeInTheDocument()
    expect(getBlogPostBySlug).toHaveBeenCalledWith("current-article")
  })
})
