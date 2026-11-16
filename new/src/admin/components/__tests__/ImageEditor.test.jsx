import "@testing-library/jest-dom"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { StrictMode } from "react"
import ImageEditor from "../ImageEditor"

describe("ImageEditor", () => {
  const originalImage = global.Image
  const originalCreateObjectUrl = URL.createObjectURL
  const originalRevokeObjectUrl = URL.revokeObjectURL
  let toBlob

  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => "blob:featured-image")
    URL.revokeObjectURL = jest.fn()
    global.Image = class {
      naturalWidth = 800
      naturalHeight = 600

      set src(value) {
        this.source = value
        setTimeout(() => this.onload(), 0)
      }
    }

    const context = {
      fillRect: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      drawImage: jest.fn(),
    }
    jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(context)
    toBlob = jest
      .spyOn(HTMLCanvasElement.prototype, "toBlob")
      .mockImplementation((callback, type) => callback(new Blob(["edited"], { type })))
  })

  afterEach(() => {
    cleanup()
    global.Image = originalImage
    URL.createObjectURL = originalCreateObjectUrl
    URL.revokeObjectURL = originalRevokeObjectUrl
    jest.restoreAllMocks()
  })

  it("uses the original file when no edits are made", async () => {
    const file = new File(["original"], "cover.png", { type: "image/png" })
    const onApply = jest.fn()
    render(<ImageEditor file={file} onApply={onApply} onCancel={jest.fn()} />)

    await screen.findByLabelText("Image crop preview. Drag to reposition.")
    fireEvent.click(screen.getByRole("button", { name: "Use this image" }))

    expect(onApply).toHaveBeenCalledWith(file)
    expect(toBlob).not.toHaveBeenCalled()
  })

  it("applies rotation and exports an edited image", async () => {
    const file = new File(["original"], "cover.png", { type: "image/png" })
    const onApply = jest.fn()
    render(<ImageEditor file={file} onApply={onApply} onCancel={jest.fn()} />)

    await screen.findByLabelText("Image crop preview. Drag to reposition.")
    fireEvent.click(screen.getByRole("button", { name: "Rotate right" }))
    fireEvent.click(screen.getByRole("button", { name: "Use this image" }))

    await waitFor(() => expect(onApply).toHaveBeenCalled())
    const editedFile = onApply.mock.calls[0][0]
    expect(editedFile).not.toBe(file)
    expect(editedFile.type).toBe("image/png")
    expect(editedFile.name).toBe("cover-edited.png")
    expect(toBlob).toHaveBeenCalled()
  })

  it("ignores load failures from a revoked URL during StrictMode remounts", async () => {
    URL.createObjectURL
      .mockReturnValueOnce("blob:revoked-preview")
      .mockReturnValueOnce("blob:active-preview")
    global.Image = class {
      naturalWidth = 800
      naturalHeight = 600

      set src(value) {
        setTimeout(() => {
          if (value === "blob:revoked-preview") {
            this.onerror()
          } else {
            this.onload()
          }
        }, value === "blob:revoked-preview" ? 0 : 10)
      }
    }

    const file = new File(["original"], "cover.png", { type: "image/png" })
    const onApply = jest.fn()
    render(
      <StrictMode>
        <ImageEditor file={file} onApply={onApply} onCancel={jest.fn()} />
      </StrictMode>
    )

    await screen.findByLabelText("Image crop preview. Drag to reposition.")
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:revoked-preview")
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Use this image" }))
    expect(onApply).toHaveBeenCalledWith(file)
  })
})
