import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "../firebase/admin"

const AuthContext = createContext(null)

const resolveRole = (claims) => {
  if (!claims) return "user"
  if (claims.role) return claims.role
  if (claims.admin === true) return "admin"
  return "user"
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      if (!active) return

      setUser(nextUser)

      if (!nextUser) {
        setRole(null)
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const tokenResult = await nextUser.getIdTokenResult(true)
        if (!active) return
        setRole(resolveRole(tokenResult.claims))
      } catch (error) {
        console.error("Failed to read auth claims:", error)
        if (active) setRole("user")
      } finally {
        if (active) setLoading(false)
      }
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  const signIn = useCallback(
    (email, password) => signInWithEmailAndPassword(auth, email, password),
    []
  )

  const signOut = useCallback(() => firebaseSignOut(auth), [])

  const refreshClaims = useCallback(async () => {
    const currentUser = auth.currentUser
    if (!currentUser) return null

    try {
      const tokenResult = await currentUser.getIdTokenResult(true)
      const nextRole = resolveRole(tokenResult.claims)
      setRole(nextRole)
      return nextRole
    } catch (error) {
      console.error("Failed to refresh auth claims:", error)
      setRole("user")
      return null
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      role,
      loading,
      isAdmin: role === "admin",
      signIn,
      signOut,
      refreshClaims,
    }),
    [user, role, loading, signIn, signOut, refreshClaims]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default AuthContext
