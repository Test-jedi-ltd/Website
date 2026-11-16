jest.mock("../../firebase/admin", () => ({ storage: {} }))
jest.mock("firebase/storage", () => ({
  ref: jest.fn((_storage, path) => ({ path })),
  uploadBytesResumable: jest.fn(),
  getDownloadURL: jest.fn(),
}))

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { uploadImage, validateImageFile } from "../storage"
import { waitFor } from "@testing-library/react"

const makeFile = (name = "cover.png", type = "image/png", size = 100) =>
  new File([new Uint8Array(size)], name, { type })

describe("validateImageFile", () => {
  it("accepts supported image files within the size limit", () => {
    expect(validateImageFile(makeFile())).toBeNull()
  })

  it("rejects unsupported, oversized, and missing files", () => {
    expect(validateImageFile(null)).toMatch(/Choose an image/)
    expect(validateImageFile(makeFile("cover.bmp", "image/bmp"))).toMatch(
      /JPG, PNG, GIF, or WebP/
    )
    expect(validateImageFile(makeFile("large.png", "image/png", 5 * 1024 * 1024 + 1))).toMatch(
      /smaller than 5MB/
    )
  })
})

describe("uploadImage", () => {
  let callbacks
  let task
  let unsubscribe

  beforeEach(() => {
    jest.clearAllMocks()
    callbacks = null
    unsubscribe = jest.fn()
    task = {
      snapshot: { ref: { path: "blog-posts/cover.png" } },
      cancel: jest.fn(),
      on: jest.fn((_event, next, error, complete) => {
        callbacks = { next, error, complete }
        return unsubscribe
      }),
    }
    uploadBytesResumable.mockReturnValue(task)
    getDownloadURL.mockResolvedValue("https://storage.example/cover.png")
  })

  it("uploads the original file and completes the Storage upload", async () => {
    const file = makeFile("my cover.png")
    const onProgress = jest.fn()
    const onStage = jest.fn()
    uploadBytesResumable.mockImplementation((_ref, uploadedFile, metadata) => {
      expect(uploadedFile).toBe(file)
      expect(metadata).toEqual({ contentType: "image/png" })
      return task
    })

    const resultPromise = uploadImage(file, { onProgress, onStage })
    await waitFor(() => expect(uploadBytesResumable).toHaveBeenCalled())

    expect(onStage.mock.calls).toEqual([["uploading"]])

    callbacks.next({ bytesTransferred: 50, totalBytes: 100 })
    expect(onProgress).toHaveBeenCalledWith(50)
    callbacks.complete()

    await expect(resultPromise).resolves.toEqual({
      url: "https://storage.example/cover.png",
      size: file.size,
      name: "my-cover.png",
    })
    expect(ref).toHaveBeenCalledWith({}, expect.stringMatching(/^blog-posts\/\d+-my-cover\.png$/))
    expect(unsubscribe).toHaveBeenCalled()
  })

  it("rejects Storage errors and removes upload listeners", async () => {
    const resultPromise = uploadImage(makeFile())
    await waitFor(() => expect(uploadBytesResumable).toHaveBeenCalled())
    callbacks.error({ code: "storage/unauthorized" })

    await expect(resultPromise).rejects.toMatchObject({
      code: "storage/unauthorized",
    })
    expect(unsubscribe).toHaveBeenCalled()
  })

  it("times out stalled Storage uploads and cancels the task", async () => {
    jest.useFakeTimers()
    try {
      const resultPromise = uploadImage(makeFile())
      for (let tick = 0; tick < 10 && !uploadBytesResumable.mock.calls.length; tick += 1) {
        await Promise.resolve()
      }
      expect(uploadBytesResumable).toHaveBeenCalled()
      jest.advanceTimersByTime(60 * 1000)

      await expect(resultPromise).rejects.toMatchObject({
        code: "storage/timeout",
      })
      expect(task.cancel).toHaveBeenCalled()
    } finally {
      jest.useRealTimers()
    }
  })
})
