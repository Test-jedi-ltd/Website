import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import CareersPage from "../Careers"

jest.mock("antd", () => ({
  Modal: ({ children, open }) => (open ? <div>{children}</div> : null),
}))
jest.mock("../../sections/Navbar", () => () => <nav>Site navigation</nav>)
jest.mock("../../sections/Footer", () => () => <footer>Site footer</footer>)

const openApplicationForm = () => {
  const { container } = render(<CareersPage />)
  fireEvent.click(screen.getByRole("button", { name: "Apply for cohort" }))
  return container.querySelector("form")
}

const completeFormExcept = (form, { email, phone, track } = {}) => {
  fireEvent.change(screen.getByLabelText("Full name"), {
    target: { value: "Jane Applicant" },
  })
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: email || "jane@example.com" },
  })
  fireEvent.change(screen.getByLabelText("Phone / WhatsApp number"), {
    target: { value: phone || "+234 80 1234 5678" },
  })
  if (track !== false) {
    fireEvent.click(screen.getByLabelText("Manual QA Tester"))
  }
  fireEvent.change(screen.getByLabelText("Current experience level"), {
    target: { value: "Complete beginner" },
  })
  fireEvent.click(screen.getByRole("button", { name: "Yes" }))
  return form
}

describe("cohort application form validation", () => {
  it("reports all unanswered fields and focuses the first one", () => {
    const form = openApplicationForm()

    fireEvent.click(screen.getByRole("button", { name: "Submit cohort application" }))

    expect(screen.getByRole("alert")).toHaveTextContent("Enter your full name.")
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email address.")
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid phone number")
    expect(screen.getByRole("alert")).toHaveTextContent("Select at least one track")
    expect(screen.getByRole("alert")).toHaveTextContent("Select your current experience level.")
    expect(screen.getByRole("alert")).toHaveTextContent("Choose Yes or No")
    expect(form.elements.fullName).toHaveFocus()
    expect(screen.queryByText("Application received")).not.toBeInTheDocument()
  })

  it("focuses the missing track instead of moving on to logistics", () => {
    const form = openApplicationForm()
    completeFormExcept(form, { track: false })

    fireEvent.click(screen.getByRole("button", { name: "Submit cohort application" }))

    expect(screen.getByRole("alert")).toHaveTextContent("Select at least one track of interest.")
    expect(form.querySelector('input[name="tracks"]')).toHaveFocus()
    expect(screen.queryByText("Application received")).not.toBeInTheDocument()
  })

  it("rejects malformed email and phone values", () => {
    const form = openApplicationForm()
    completeFormExcept(form, { email: "not-an-email", phone: "12-AB" })

    fireEvent.click(screen.getByRole("button", { name: "Submit cohort application" }))

    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email address.")
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid phone number with 7–15 digits.")
    expect(form.elements.email).toHaveFocus()
    expect(screen.queryByText("Application received")).not.toBeInTheDocument()
  })

  it("submits when every field is valid", () => {
    const form = openApplicationForm()
    completeFormExcept(form)

    fireEvent.click(screen.getByRole("button", { name: "Submit cohort application" }))

    expect(screen.getByText("Application received")).toBeInTheDocument()
  })
})
