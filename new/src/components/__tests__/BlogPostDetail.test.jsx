import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import BlogPostDetail from "../BlogPostDetail"
import { getBlogPostBySlug, getBlogPosts } from "../../lib/firestore"

jest.mock("../../sections/Navbar", () => () => <nav>Site navigation</nav>)
jest.mock("../../sections/Footer", () => () => <footer>Site footer</footer>)
jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useParams: () => ({ slug: "current-article" }),
}))
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
      featuredImage: "https://images.example/article.jpg",
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

  it("renders dynamic content in the redesigned article layout", async () => {
    const { container } = render(<BlogPostDetail />)

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Dynamic article title",
      })
    ).toBeInTheDocument()
    expect(screen.getAllByText("Dynamic article summary")).toHaveLength(2)
    expect(screen.getByText("Dynamic article content.")).toBeInTheDocument()
    expect(screen.getByText("Related dynamic article")).toBeInTheDocument()
    expect(screen.getByText(/1 MIN READ/)).toBeInTheDocument()
    expect(screen.getByText("TJ")).toBeInTheDocument()

    const featuredImage = screen.getByRole("img", { name: "Dynamic article title" })
    expect(featuredImage).toHaveAttribute("src", "https://images.example/article.jpg")
    expect(featuredImage).toHaveClass("w-full", "object-contain")
    expect(featuredImage.parentElement).toHaveClass("rounded-[6px]", "bg-[#F5EDC4]")
    expect(container.querySelector('[aria-label="Related stories"]')).toBeInTheDocument()
    expect(screen.getByText("Site navigation")).toBeInTheDocument()
    expect(screen.getByText("Site footer")).toBeInTheDocument()
    expect(getBlogPostBySlug).toHaveBeenCalledWith("current-article")
  })
})
