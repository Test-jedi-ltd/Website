import { render } from "@testing-library/react"
import { useLocation } from "react-router-dom"
import ScrollToTop from "../ScrollToTop"

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}))

describe("ScrollToTop", () => {
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    useLocation.mockReturnValue({ pathname: "/start" })
    jest.spyOn(window, "scrollTo").mockImplementation(() => {})
    window.matchMedia = jest.fn().mockReturnValue({ matches: false })
  })

  afterEach(() => {
    jest.restoreAllMocks()
    if (originalMatchMedia) {
      window.matchMedia = originalMatchMedia
    } else {
      delete window.matchMedia
    }
  })

  it("smoothly scrolls to the top when the route changes", () => {
    const { rerender } = render(<ScrollToTop />)

    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: "smooth" })

    useLocation.mockReturnValue({ pathname: "/next" })
    rerender(<ScrollToTop />)

    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: "smooth" })
  })

  it("uses instant scrolling when reduced motion is requested", () => {
    window.matchMedia.mockReturnValue({ matches: true })

    render(<ScrollToTop />)

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" })
  })
})
