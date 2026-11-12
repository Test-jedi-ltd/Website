import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import imageCompression from "browser-image-compression"
import { storage } from "../firebase/admin"
import { createAppError } from "./errors"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]
const MAX_SIZE = 5 * 1024 * 1024
const TARGET_MAX_SIZE_MB = 1
const MAX_DIMENSION = 1600
const UPLOAD_STALL_TIMEOUT_MS = 60 * 1000

/**
 * @param {File | null | undefined} file
 * @returns {string | null} Validation error message, or null when valid.
 */
export const validateImageFile = (file) => {
  if (!file) return "Choose an image to upload."
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Please upload a JPG, PNG, GIF, or WebP image."
  }
  if (file.size > MAX_SIZE) {
    return "Image must be smaller than 5MB."
  }
  return null
}

const compressImage = async (file) => {
  // GIF compression can break animations, so upload GIFs as-is.
  if (file.type === "image/gif") return file

  try {
    return await imageCompression(file, {
      maxSizeMB: TARGET_MAX_SIZE_MB,
      maxWidthOrHeight: MAX_DIMENSION,
      useWebWorker: false,
    })
  } catch (error) {
    console.warn("Image compression failed; uploading original file.", error)
    return file
  }
}

/**
 * Validate, compress, and upload an image to Firebase Storage.
 *
 * @param {File} file
 * @param {{
 *   onProgress?: (percent: number) => void,
 *   onStage?: (stage: "preparing" | "uploading") => void
 * }} [options]
 * @returns {Promise<{ url: string, size: number, name: string }>}
 */
export const uploadImage = async (file, { onProgress, onStage } = {}) => {
  const validationError = validateImageFile(file)
  if (validationError) {
    throw createAppError("storage/invalid-file", validationError)
  }

  if (onStage) onStage("preparing")
  const compressed = await compressImage(file)
  const safeName = (file.name || "image").replace(/[^a-zA-Z0-9._-]/g, "-")
  const storageRef = ref(storage, `blog-posts/${Date.now()}-${safeName}`)

  if (onStage) onStage("uploading")

  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, compressed, {
      contentType: compressed.type || file.type,
    })
    let settled = false
    let timeoutId
    let unsubscribe

    const cleanup = () => {
      clearTimeout(timeoutId)
      if (unsubscribe) unsubscribe()
    }

    const fail = (error) => {
      if (settled) return
      settled = true
      cleanup()
      reject(error)
    }

    const resetStallTimeout = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        task.cancel()
        fail(
          createAppError(
            "storage/timeout",
            "Upload stalled. Check your connection and try again."
          )
        )
      }, UPLOAD_STALL_TIMEOUT_MS)
    }

    resetStallTimeout()

    unsubscribe = task.on(
      "state_changed",
      (snapshot) => {
        resetStallTimeout()
        if (onProgress) {
          onProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        }
      },
      fail,
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref)
          if (settled) return
          settled = true
          cleanup()
          resolve({ url, size: compressed.size, name: safeName })
        } catch (error) {
          fail(error)
        }
      }
    )
  })
}

/**
 * @param {number} bytes
 * @returns {string}
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB"
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
