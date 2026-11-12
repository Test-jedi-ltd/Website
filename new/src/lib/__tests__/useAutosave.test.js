import { act, renderHook } from "@testing-library/react"
import { useAutosave, loadAutosavedDraft } from "../useAutosave"

describe("useAutosave", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it("saves to localStorage after the debounce delay", async () => {
    const { result, rerender } = renderHook(
      ({ data }) => useAutosave({ storageKey: "draft-key", data, delay: 1000 }),
      { initialProps: { data: { title: "Initial" } } }
    )

    rerender({ data: { title: "Updated" } })
    expect(result.current.status).toBe("unsaved")

    await act(async () => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.status).toBe("saved")
    expect(loadAutosavedDraft("draft-key")).toMatchObject({ title: "Updated" })
    expect(result.current.lastSavedAt).toBeInstanceOf(Date)
  })

  it("does not autosave when disabled", async () => {
    const { rerender } = renderHook(
      ({ data, enabled }) =>
        useAutosave({ storageKey: "draft-key", data, enabled, delay: 1000 }),
      { initialProps: { data: { title: "Initial" }, enabled: false } }
    )

    rerender({ data: { title: "Updated" }, enabled: false })

    await act(async () => {
      jest.advanceTimersByTime(5000)
    })

    expect(loadAutosavedDraft("draft-key")).toBeNull()
  })

  it("clears the saved draft", async () => {
    const { result, rerender } = renderHook(
      ({ data }) => useAutosave({ storageKey: "draft-key", data, delay: 1000 }),
      { initialProps: { data: { title: "Initial" } } }
    )

    rerender({ data: { title: "Updated" } })
    await act(async () => {
      jest.advanceTimersByTime(1000)
    })

    expect(loadAutosavedDraft("draft-key")).not.toBeNull()

    act(() => {
      result.current.clearDraft()
    })

    expect(loadAutosavedDraft("draft-key")).toBeNull()
    expect(result.current.status).toBe("idle")
  })
})
