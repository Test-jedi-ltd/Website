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

  it("renders dynamic article content in the original hero and related-story layout", async () => {
    const { container } = render(<BlogPostDetail />)

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Dynamic article title",
      })
    ).toBeInTheDocument()
    expect(screen.getByText("Dynamic article summary")).toBeInTheDocument()
    expect(screen.getByText("Dynamic article content.")).toBeInTheDocument()
    expect(screen.getByText("Related dynamic article")).toBeInTheDocument()
    const featuredImage = screen.getByRole("img", { name: "Dynamic article title" })
    expect(featuredImage).toHaveAttribute("src", "https://images.example/article.jpg")
    expect(featuredImage).toHaveClass("h-full", "w-full", "object-center")
    expect(featuredImage.parentElement.parentElement).toHaveClass("mx-auto", "w-2/3")
    expect(featuredImage.parentElement).toHaveStyle({
      maskImage: "linear-gradient(90deg, transparent 0%, black 22%, black 78%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 22%, black 78%, transparent 100%)",
    })
    const blurredCover = Array.from(container.querySelectorAll("img")).find((image) =>
      image.classList.contains("blur-[24px]")
    )
    expect(blurredCover).toBeInTheDocument()
    expect(featuredImage).not.toHaveClass("mix-blend-multiply")
    expect(screen.getByText("Site navigation")).toBeInTheDocument()
    expect(screen.getByText("Site footer")).toBeInTheDocument()
    expect(getBlogPostBySlug).toHaveBeenCalledWith("current-article")
  })
})
