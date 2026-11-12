import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import BlogPage from "../Blog"
import { getBlogPosts } from "../../lib/firestore"

jest.mock("../../sections/Navbar", () => () => <nav>Site navigation</nav>)
jest.mock("../../sections/Footer", () => () => <footer>Site footer</footer>)
jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))
jest.mock("../../lib/firestore", () => ({
  getBlogPosts: jest.fn(),
}))

describe("BlogPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders published posts in the original featured and card layout", async () => {
    getBlogPosts.mockResolvedValue([
      {
        id: "featured",
        slug: "featured-post",
        title: "Featured article",
        category: "POSTMAN",
        featuredImage: "https://images.example/featured.jpg",
        status: "published",
      },
      {
        id: "article",
        slug: "another-article",
        title: "Another article",
        excerpt: "An article excerpt",
        status: "published",
      },
    ])

    render(<BlogPage />)

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /Featured article/ })).toHaveAttribute(
        "href",
        "/blog/featured-post"
      )
    })
    expect(screen.getByRole("link", { name: /Another article/ })).toHaveAttribute(
      "href",
      "/blog/another-article"
    )
    expect(screen.getByText("An article excerpt")).toBeInTheDocument()
    expect(screen.getByText("Site navigation")).toBeInTheDocument()
    expect(screen.getByText("Site footer")).toBeInTheDocument()
    expect(getBlogPosts).toHaveBeenCalledWith(true)
  })

  it("shows a clear empty state when no public posts exist", async () => {
    getBlogPosts.mockResolvedValue([])
    render(<BlogPage />)

    expect(await screen.findByText("No articles are available yet.")).toBeInTheDocument()
  })
})
