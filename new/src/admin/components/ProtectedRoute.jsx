import { useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../AuthContext"

const FullScreenLoader = () => (
  <div className="admin-login min-h-screen bg-[#FDF9D2] flex items-center justify-center text-[#151240]">
    <div className="text-center">
      <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#964A21] border-t-transparent" />
      <p className="text-sm text-[#645F70]">Checking your access...</p>
    </div>
  </div>
)

const AccessDenied = ({ email, role, onRefresh, onSignOut, refreshing }) => (
  <div className="admin-login min-h-screen bg-[#FDF9D2] flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-lg rounded-2xl border border-[#D9C5B2] bg-[#FFFEFA] p-6 sm:p-8 text-[#151240] shadow-xl">
      <h1 className="text-2xl font-bold mb-3">Access denied</h1>
      <p className="text-[13px] text-[#645F70] mb-2">
        You are signed in as <span className="font-semibold">{email || "unknown user"}</span>
        {role ? ` (${role})` : ""}, but this account does not have admin access.
      </p>
      <p className="text-[13px] text-[#645F70] mb-6">
        If you were just granted admin access, refresh below. Otherwise ask an
        administrator to set the <code>role: "admin"</code> custom claim, then sign
        out and back in.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="bg-[#964A21] text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-[#7d3d1b] transition-colors disabled:opacity-60"
        >
          {refreshing ? "Refreshing..." : "Refresh access"}
        </button>
        <button
          type="button"
          onClick={onSignOut}
          className="border border-[#D9C5B2] text-[#151240] px-4 py-2.5 rounded-lg text-[13px] hover:text-[#964A21] hover:border-[#964A21] transition-colors"
        >
          Sign out
        </button>
        <a
          href="/"
          className="px-4 py-2.5 text-[13px] text-[#645F70] hover:text-[#964A21] transition-colors"
        >
          Back to site
        </a>
      </div>
    </div>
  </div>
)

export default function ProtectedRoute({ children }) {
  const { user, role, loading, isAdmin, refreshClaims, signOut } = useAuth()
  const location = useLocation()
  const [refreshing, setRefreshing] = useState(false)

  if (loading) {
    return <FullScreenLoader />
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  if (!isAdmin) {
    const handleRefresh = async () => {
      setRefreshing(true)
      try {
        await refreshClaims()
      } finally {
        setRefreshing(false)
      }
    }

    return (
      <AccessDenied
        email={user.email}
        role={role}
        onRefresh={handleRefresh}
        onSignOut={signOut}
        refreshing={refreshing}
      />
    )
  }

  return children
}
