/**
 * Normalize Firebase and app-specific errors into user-facing messages.
 *
 * @param {unknown} error
 * @param {string} [fallback]
 * @returns {string}
 */
export const getErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again."
) => {
  if (!error) return fallback

  const code = error.code

  switch (code) {
    case "slug-taken":
      return error.message || "That slug is already in use. Choose a different one."
    case "invalid-slug":
      return error.message || "Enter a valid slug."
    case "permission-denied":
      return "You do not have permission to do that."
    case "unauthenticated":
      return "Your session has expired. Please sign in again."
    case "not-found":
      return "The requested item no longer exists."
    case "unavailable":
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again."
    case "failed-precondition":
      return "The request could not be completed. Please try again."
    case "resource-exhausted":
      return "Too many requests right now. Please try again shortly."
    case "storage/unauthorized":
      return "You do not have permission to upload this file."
    case "storage/canceled":
      return "The upload was canceled."
    case "storage/bucket-not-found":
      return "Firebase Storage is not set up for this project. Create a Storage bucket in the Firebase console, set REACT_APP_FIREBASE_STORAGE_BUCKET to its exact name, and restart the app."
    case "storage/unknown":
      if (/specified bucket does not exist|not found/i.test(error.serverResponse || "")) {
        return "Firebase Storage is not set up for this project. Create a Storage bucket in the Firebase console, set REACT_APP_FIREBASE_STORAGE_BUCKET to its exact name, and restart the app."
      }
      return "Upload failed. Please try again."
    case "auth/invalid-email":
      return "Enter a valid email address."
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password."
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later."
    default:
      return error.message || fallback
  }
}

/**
 * @param {unknown} error
 * @returns {boolean}
 */
export const isSlugTakenError = (error) => error?.code === "slug-taken"

/**
 * Create an Error with a `code` property so it can be normalized by
 * `getErrorMessage` and detected by callers.
 *
 * @param {string} code
 * @param {string} message
 * @returns {Error & { code: string }}
 */
export const createAppError = (code, message) => {
  const error = new Error(message)
  error.code = code
  return error
}
