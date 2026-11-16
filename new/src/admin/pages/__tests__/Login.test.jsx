import { fireEvent, render, screen } from "@testing-library/react"
import Login from "../Login"

const mockNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  Navigate: () => null,
  useLocation: () => ({ state: null }),
  useNavigate: () => mockNavigate,
}))

jest.mock("../../AuthContext", () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    isAdmin: false,
    signIn: jest.fn(),
    signOut: jest.fn(),
  }),
}))

describe("Admin login", () => {
  it("toggles password visibility without changing the entered value", () => {
    render(<Login />)

    const password = screen.getByLabelText("Password")
    fireEvent.change(password, { target: { value: "secret123" } })

    expect(password.type).toBe("password")
    expect(password.value).toBe("secret123")

    fireEvent.click(screen.getByRole("button", { name: "Show password" }))

    expect(password.type).toBe("text")
    expect(password.value).toBe("secret123")
    expect(screen.getByRole("button", { name: "Hide password" }).getAttribute("aria-pressed")).toBe("true")

    fireEvent.click(screen.getByRole("button", { name: "Hide password" }))

    expect(password.type).toBe("password")
    expect(password.value).toBe("secret123")
  })
})
