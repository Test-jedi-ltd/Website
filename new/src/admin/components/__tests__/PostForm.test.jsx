import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Modal } from "antd"
import PostForm from "../PostForm"

const mockNavigate = jest.fn()
const mockIsSlugUnique = jest.fn()
const mockCreateBlogPost = jest.fn()
const mockUpdateBlogPost = jest.fn()

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}))

jest.mock("antd", () => ({
  Modal: { confirm: jest.fn() },
  message: { success: jest.fn(), error: jest.fn() },
}))

jest.mock("../TiptapEditor", () => () => null)
jest.mock("../ImageUpload", () => () => null)

jest.mock("../../../lib/firestore", () => ({
  createBlogPost: (...args) => mockCreateBlogPost(...args),
  updateBlogPost: (...args) => mockUpdateBlogPost(...args),
  isSlugUnique: (...args) => mockIsSlugUnique(...args),
}))

const fillRequiredFields = () => {
  fireEvent.change(screen.getByLabelText("Title"), {
    target: { value: "Hello World" },
  })
  fireEvent.change(screen.getByLabelText("Excerpt"), {
    target: { value: "Summary" },
  })
}

describe("PostForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    mockIsSlugUnique.mockResolvedValue(true)
  })

  it("shows a validation error when the title is empty", () => {
    render(<PostForm />)

    fireEvent.click(screen.getByRole("button", { name: "Save Draft" }))

    expect(screen.getByText("Title is required.")).toBeTruthy()
    expect(mockCreateBlogPost).not.toHaveBeenCalled()
  })

  it("blocks saving when the slug is already taken", async () => {
    mockIsSlugUnique.mockResolvedValue(false)

    render(<PostForm />)
    fillRequiredFields()

    fireEvent.click(screen.getByRole("button", { name: "Save Draft" }))

    expect(
      await screen.findByText(
        "That slug is already in use. Choose a different one."
      )
    ).toBeTruthy()
    expect(mockCreateBlogPost).not.toHaveBeenCalled()
  })

  it("saves a draft with the generated slug", async () => {
    mockCreateBlogPost.mockResolvedValue({ id: "new-post" })

    render(<PostForm />)
    fillRequiredFields()

    fireEvent.click(screen.getByRole("button", { name: "Save Draft" }))

    await waitFor(() => expect(mockCreateBlogPost).toHaveBeenCalled())

    expect(mockCreateBlogPost).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Hello World",
        slug: "hello-world",
        excerpt: "Summary",
        status: "draft",
      })
    )
  })

  it("asks for confirmation before publishing", async () => {
    render(<PostForm />)
    fillRequiredFields()

    fireEvent.click(screen.getByRole("button", { name: "Publish" }))

    await waitFor(() => expect(Modal.confirm).toHaveBeenCalled())
    expect(mockCreateBlogPost).not.toHaveBeenCalled()
  })
})
