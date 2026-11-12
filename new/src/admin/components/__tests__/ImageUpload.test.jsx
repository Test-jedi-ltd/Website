import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useState } from "react"
import ImageUpload from "../ImageUpload"
import { uploadImage } from "../../../lib/storage"

jest.mock("../../../lib/storage", () => ({
  uploadImage: jest.fn(),
  formatFileSize: jest.fn((size) => `${size} B`),
}))
jest.mock("@iconify/react", () => ({ Icon: () => null }))

describe("ImageUpload", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("uploads the selected image, reports progress, and returns its URL", async () => {
    const onUpload = jest.fn()
    let finishUpload
    uploadImage.mockImplementation((_file, { onProgress, onStage }) => {
      onStage("uploading")
      onProgress(50)
      return new Promise((resolve) => {
        finishUpload = () =>
          resolve({
            url: "https://storage.example/cover.png",
            size: 50,
            name: "cover.png",
          })
      })
    })

    const UploadHarness = () => {
      const [url, setUrl] = useState("")
      return (
        <ImageUpload
          url={url}
          onUpload={(nextUrl) => {
            onUpload(nextUrl)
            setUrl(nextUrl)
          }}
        />
      )
    }

    const { container } = render(<UploadHarness />)
    const file = new File(["image data"], "cover.png", { type: "image/png" })
    fireEvent.change(container.querySelector('input[type="file"]'), {
      target: { files: [file] },
    })

    expect(await screen.findByText("50% uploaded")).toBeInTheDocument()
    finishUpload()
    await waitFor(() => {
      expect(onUpload).toHaveBeenCalledWith("https://storage.example/cover.png")
    })
    expect(uploadImage).toHaveBeenCalledWith(
      file,
      expect.objectContaining({
        onProgress: expect.any(Function),
        onStage: expect.any(Function),
      })
    )
    expect(screen.getByLabelText("Image alt text")).toBeInTheDocument()
    expect(screen.queryByText("Uploading image...")).not.toBeInTheDocument()
  })

  it("shows upload errors and lets the user retry", async () => {
    uploadImage.mockRejectedValueOnce(new Error("Upload stalled. Try again."))
    const { container } = render(<ImageUpload />)
    const file = new File(["image data"], "cover.png", { type: "image/png" })

    fireEvent.change(container.querySelector('input[type="file"]'), {
      target: { files: [file] },
    })

    expect(await screen.findByText("Upload stalled. Try again.")).toBeInTheDocument()
    expect(screen.getByText("Click or drag an image here")).toBeInTheDocument()
  })
})
