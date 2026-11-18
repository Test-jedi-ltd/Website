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

  const fillRequiredFields = (email = "jane@example.com") => {
    fireEvent.change(screen.getByLabelText("Full name"), {
      target: { value: "Jane Applicant" },
    })
    fireEvent.change(screen.getByLabelText("Work email"), {
      target: { value: email },
    })
    fireEvent.change(screen.getByLabelText("Company"), {
      target: { value: "Example Co" },
    })
    fireEvent.change(screen.getByLabelText("What needs testing?"), {
      target: { value: "A web application" },
    })
  }

  it("shows a success toast after a successful submission", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    })
    render(<ContactSection />)
    fillRequiredFields()

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
    fillRequiredFields()

    submitContactForm()

    expect(await screen.findByRole("alert")).toHaveTextContent("Error")
    expect(screen.getByText("Please try again.")).toBeInTheDocument()
  })

  it("blocks submission when the work email is malformed", () => {
    render(<ContactSection />)
    fillRequiredFields("not-an-email")

    const email = screen.getByLabelText("Work email")
    fireEvent.click(screen.getByRole("button", { name: "Send us a message" }))

    expect(email.validity.typeMismatch).toBe(true)
    expect(global.fetch).not.toHaveBeenCalled()
  })
})
