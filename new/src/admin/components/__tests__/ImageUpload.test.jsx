import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useState } from "react"
import ImageUpload from "../ImageUpload"
import { uploadImage } from "../../../lib/storage"

jest.mock("../../../lib/storage", () => ({
  uploadImage: jest.fn(),
  formatFileSize: jest.fn((size) => `${size} B`),
  validateImageFile: jest.fn(() => null),
}))
jest.mock("@iconify/react", () => ({ Icon: () => null }))
jest.mock("../ImageEditor", () => ({ file, onApply, onCancel }) => (
  <div role="dialog" aria-label="Edit featured image">
    <span>{file.name}</span>
    <button type="button" onClick={() => onApply(file)}>Use this image</button>
    <button type="button" onClick={onCancel}>Cancel editor</button>
  </div>
))

describe("ImageUpload", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("opens the editor before uploading, then reports progress and returns the URL", async () => {
    const onUpload = jest.fn()
    let finishUpload
    uploadImage.mockImplementation((_file, { onProgress }) => {
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

    expect(await screen.findByRole("dialog", { name: "Edit featured image" })).toBeInTheDocument()
    expect(uploadImage).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole("button", { name: "Use this image" }))

    expect(await screen.findByText("50% uploaded")).toBeInTheDocument()
    finishUpload()
    await waitFor(() => {
      expect(onUpload).toHaveBeenCalledWith("https://storage.example/cover.png")
    })
    expect(uploadImage).toHaveBeenCalledWith(file, {
      onProgress: expect.any(Function),
    })
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

    fireEvent.click(await screen.findByRole("button", { name: "Use this image" }))
    expect(await screen.findByText("Upload stalled. Try again.")).toBeInTheDocument()
    expect(screen.getByText("Click or drag an image here")).toBeInTheDocument()
  })

  it("loads an existing upload into the editor for adjustments", async () => {
    const originalFetch = global.fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      blob: async () => new Blob(["existing image"], { type: "image/png" }),
    })

    try {
      const { container } = render(<ImageUpload url="https://storage.example/cover.png" />)
      const fileInput = container.querySelector('input[type="file"]')
      const filePicker = jest.spyOn(fileInput, "click")

      fireEvent.click(screen.getByRole("button", { name: "Edit uploaded image" }))

      expect(await screen.findByRole("dialog", { name: "Edit featured image" })).toBeInTheDocument()
      expect(global.fetch).toHaveBeenCalledWith("https://storage.example/cover.png")
      expect(filePicker).not.toHaveBeenCalled()
      expect(uploadImage).not.toHaveBeenCalled()
    } finally {
      global.fetch = originalFetch
    }
  })
})
