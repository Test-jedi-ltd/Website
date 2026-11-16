import { useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../AuthContext"

const errorMessage = (error) => {
  switch (error?.code) {
    case "auth/invalid-email":
      return "Enter a valid email address."
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password."
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later."
    case "auth/user-disabled":
      return "This account has been disabled."
    default:
      return error?.message || "Unable to sign in. Please try again."
  }
}

export default function Login() {
  const { user, loading, isAdmin, signIn, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from?.pathname || "/admin"

  if (loading) {
    return (
      <div className="admin-login min-h-screen bg-[#FDF9D2] flex items-center justify-center text-[#151240]">
        <p className="text-sm text-[#645F70]">Checking your session...</p>
      </div>
    )
  }

  if (user && isAdmin) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError("Email and password are required.")
      return
    }

    setSubmitting(true)

    try {
      await signIn(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      console.error("Sign in error:", err)
      setError(errorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded text-[#151240] focus:outline-none text-[14px]"

  return (
    <div className="admin-login min-h-screen bg-[#FDF9D2] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#FFFEFA] text-[#151240] border border-[#D9C5B2] rounded-2xl shadow-xl p-8 sm:p-10">
        <h1 className="text-2xl font-bold mb-2">Admin sign in</h1>
        <p className="text-[13px] text-[#645F70] mb-6">
          Sign in with an account that has admin access.
        </p>

        {user && !isAdmin && (
          <div className="mb-5 rounded-lg border border-[#D9C5B2] bg-[#FDF9D2] p-3 text-[12px] text-[#151240]">
            You are signed in as {user.email || "this account"}, but it does not have admin
            access. Sign out and contact an administrator if you believe this is a mistake.
            <button
              type="button"
              onClick={signOut}
              className="mt-2 block font-semibold underline"
            >
              Sign out
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="admin@example.com"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="admin-password">
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-16`}
                placeholder="Your password"
                disabled={submitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-controls="admin-password"
                aria-pressed={showPassword}
                disabled={submitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#964A21] hover:text-[#7D3D1B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#964A21] disabled:opacity-60"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-[#c0392b] text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#964A21] text-white py-3 rounded-lg text-[14px] font-semibold hover:bg-[#7D3D1B] transition-colors disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <a
          href="/"
          className="mt-6 block text-center text-[12px] text-[#151240] hover:text-[#964A21]"
        >
          Back to site
        </a>
      </div>
    </div>
  )
}
