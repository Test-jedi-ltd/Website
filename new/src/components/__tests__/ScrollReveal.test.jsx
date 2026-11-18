import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import ScrollReveal from "../ScrollReveal"

jest.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/test" }),
}))

describe("ScrollReveal", () => {
  const originalIntersectionObserver = global.IntersectionObserver
  let observer

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver
  })

  it("reveals sections as they enter the viewport", () => {
    global.IntersectionObserver = jest.fn((callback) => {
      observer = {
        callback,
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }
      return observer
    })

    const { unmount } = render(
      <>
        <main>
          <section>
            <h2>Section content</h2>
          </section>
        </main>
        <ScrollReveal />
      </>
    )
    const section = screen.getByRole("heading", { name: "Section content" }).closest("section")

    expect(section).toHaveClass("scroll-reveal")
    expect(observer.observe).toHaveBeenCalledWith(section)

    observer.callback([{ isIntersecting: true, target: section }])

    expect(section).toHaveClass("scroll-reveal-visible")
    expect(observer.unobserve).toHaveBeenCalledWith(section)

    unmount()
    expect(observer.disconnect).toHaveBeenCalled()
  })

  it("leaves sections visible when IntersectionObserver is unavailable", () => {
    global.IntersectionObserver = undefined

    render(
      <>
        <main>
          <section>
            <h2>Always visible</h2>
          </section>
        </main>
        <ScrollReveal />
      </>
    )

    expect(screen.getByRole("heading", { name: "Always visible" }).closest("section"))
      .not.toHaveClass("scroll-reveal")
  })
})
