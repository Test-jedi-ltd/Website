import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import ToastNotification from "../ToastNotification"

describe("ToastNotification", () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it.each([
    { type: "success", title: "Success!", role: "status", duration: 4000 },
    { type: "error", title: "Error", role: "alert", duration: 5000 },
    { type: "warning", title: "Warning", role: "alert", duration: 5000 },
    { type: "info", title: "Info", role: "status", duration: 5000 },
  ])(
    "shows $type notifications and dismisses after $duration ms",
    ({ type, title, role, duration }) => {
      jest.useFakeTimers()
      const onDismiss = jest.fn()

      render(
        <ToastNotification
          type={type}
          message="Notification message"
          onDismiss={onDismiss}
        />
      )

      expect(screen.getByRole(role)).toHaveTextContent(title)
      expect(screen.getByText("Notification message")).toBeInTheDocument()
      expect(screen.getByRole(role).querySelector("div[style]")).toHaveStyle({
        animationDuration: `${duration}ms`,
      })

      act(() => {
        jest.advanceTimersByTime(duration)
      })
      expect(onDismiss).toHaveBeenCalledTimes(1)
    }
  )

  it("can be dismissed manually", () => {
    const onDismiss = jest.fn()
    render(
      <ToastNotification
        type="success"
        message="Notification message"
        onDismiss={onDismiss}
      />
    )

    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })
})
