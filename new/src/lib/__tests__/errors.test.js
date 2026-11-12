import {
  getErrorMessage,
  isSlugTakenError,
  createAppError,
} from "../errors"

describe("getErrorMessage", () => {
  it("returns the fallback for missing errors", () => {
    expect(getErrorMessage(null)).toBe(
      "Something went wrong. Please try again."
    )
    expect(getErrorMessage(undefined, "Custom fallback")).toBe("Custom fallback")
  })

  it("maps known Firebase codes to friendly messages", () => {
    expect(getErrorMessage({ code: "permission-denied" })).toBe(
      "You do not have permission to do that."
    )
    expect(getErrorMessage({ code: "auth/invalid-credential" })).toBe(
      "Invalid email or password."
    )
    expect(getErrorMessage({ code: "unavailable" })).toBe(
      "Network error. Check your connection and try again."
    )
    expect(getErrorMessage({ code: "storage/bucket-not-found" })).toMatch(
      /Create a Storage bucket/
    )
    expect(
      getErrorMessage({
        code: "storage/unknown",
        serverResponse: "The specified bucket does not exist.",
      })
    ).toMatch(/set REACT_APP_FIREBASE_STORAGE_BUCKET/)
  })

  it("prefers app-specific error messages", () => {
    const error = createAppError("slug-taken", "That slug is taken.")
    expect(getErrorMessage(error)).toBe("That slug is taken.")
    expect(getErrorMessage({ code: "slug-taken" })).toBe(
      "That slug is already in use. Choose a different one."
    )
  })

  it("falls back to the error message or provided fallback", () => {
    expect(getErrorMessage({ message: "Boom" }, "Fallback")).toBe("Boom")
    expect(getErrorMessage({}, "Fallback")).toBe("Fallback")
  })
})

describe("isSlugTakenError", () => {
  it("detects slug-taken errors", () => {
    expect(isSlugTakenError(createAppError("slug-taken", "taken"))).toBe(true)
    expect(isSlugTakenError({ code: "other" })).toBe(false)
    expect(isSlugTakenError(null)).toBe(false)
  })
})
