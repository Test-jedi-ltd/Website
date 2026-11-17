import "@testing-library/jest-dom"
import { render, screen, within } from "@testing-library/react"
import { PrivacyPage, TermsPage } from "../LegalPages"

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))
jest.mock("../../sections/Navbar", () => () => <nav>Site navigation</nav>)
jest.mock("../../sections/Footer", () => () => <footer>Site footer</footer>)

describe("legal pages", () => {
  it("renders the terms of service and its service list", () => {
    render(<TermsPage />)

    expect(screen.getByRole("heading", { name: "Terms of Service" })).toBeInTheDocument()
    expect(screen.getByText("Effective Date: 7th November 2026")).toBeInTheDocument()
    expect(screen.getByText("Software testing reduces risks but cannot guarantee completely defect-free software.")).toBeInTheDocument()
    expect(screen.getByText("Recruitment, talent sourcing, and candidate placement.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "operations@test-jedi.com" })).toHaveAttribute(
      "href",
      "mailto:operations@test-jedi.com"
    )
    expect(screen.getByRole("link", { name: "Contact our team" })).toHaveAttribute("href", "/contact")
    expect(screen.getByText("Site navigation")).toBeInTheDocument()
    expect(screen.getByText("Site footer")).toBeInTheDocument()
  })

  it("renders the privacy policy and its privacy rights list", () => {
    render(<PrivacyPage />)

    expect(screen.getByRole("heading", { name: "Privacy Policy" })).toBeInTheDocument()
    expect(screen.getByText(/including the Nigeria Data Protection Act 2023/)).toBeInTheDocument()
    expect(screen.getByText("Request access to your personal information.")).toBeInTheDocument()
    expect(screen.getByText("Regulatory authorities where legally required.")).toBeInTheDocument()
    expect(screen.getByText("We are committed to handling your personal information responsibly and transparently.")).toBeInTheDocument()
    expect(within(screen.getByRole("navigation", { name: "Privacy Policy sections" })).getAllByRole("listitem")).toHaveLength(11)
  })
})
