import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import ContactSection from "../ContactSection"

describe("ContactSection notifications", () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    if (originalFetch) {
      global.fetch = originalFetch
    } else {
      delete global.fetch
    }
  })

  const submitContactForm = () => {
    const form = screen.getByRole("button", { name: "Send us a message" }).closest("form")
    fireEvent.submit(form)
  }

  it("shows a success toast after a successful submission", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    })
    render(<ContactSection />)

    submitContactForm()

    expect(await screen.findByRole("status")).toHaveTextContent("Success!")
    expect(screen.getByText("Message sent successfully. We'll be in touch soon.")).toBeInTheDocument()
  })

  it("shows an error toast when the submission fails", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: "Please try again." }),
    })
    render(<ContactSection />)

    submitContactForm()

    expect(await screen.findByRole("alert")).toHaveTextContent("Error")
    expect(screen.getByText("Please try again.")).toBeInTheDocument()
  })
})
