import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import logo from "../../assets/logo.svg"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../AuthContext"

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: "mdi:view-dashboard-outline" },
  { key: "blog", label: "Blog", icon: "mdi:post-outline" },
  { key: "projects", label: "Projects", icon: "mdi:folder-outline" },
  { key: "analytics", label: "Analytics", icon: "mdi:chart-line" },
  { key: "settings", label: "Settings", icon: "mdi:cog-outline" },
]

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, role, isAdmin, signOut } = useAuth()
  const [signingOut, setSigningOut] = useState(false)

  const toggleCollapsed = () => {
    if (typeof setCollapsed === "function") {
      setCollapsed((prev) => !prev)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && typeof setCollapsed === "function") {
        setCollapsed((prev) => !prev)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [setCollapsed])

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
      navigate("/admin/login", { replace: true })
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setSigningOut(false)
    }
  }

  const sidebarStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    width: collapsed ? "80px" : "280px",
    background: "#FFFEFA",
    height: "100vh",
    zIndex: 100,
    transition: "width 0.3s ease",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid rgba(21, 18, 64, 0.18)",
  }

  const isActive = (key) => {
    if (key === "dashboard") {
      return location.pathname === "/admin" || location.pathname === "/admin/dashboard"
    }
    return location.pathname.startsWith(`/admin/${key}`)
  }

  const visibleItems = isAdmin
    ? menuItems
    : menuItems.filter((item) => item.key === "dashboard")

  return (
    <aside className="admin-sidebar" style={sidebarStyle}>
      <div
style={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "space-between",
              padding: "16px 20px",
              minHeight: "64px",
            }}
          >
            {!collapsed && (
              <Link
                to="/admin"
                style={{
                  color: "#151240",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                <img
                  src={logo}
                  alt="Test-Jedi"
                  style={{ height: "36px", marginRight: "8px" }}
                />
              </Link>
            )}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
              cursor: "pointer",
              color: "#151240",
              fontSize: "20px",
              border: "1px solid rgba(21, 18, 64, 0.22)",
              borderRadius: "8px",
              width: "34px",
              height: "34px",
              justifyContent: "center",
              background: "#FDF9D2",
              display: "flex",
              alignItems: "center",
            }}
          className="admin-sidebar-toggle"
        >
          <Icon icon={collapsed ? "mdi:chevron-right" : "mdi:chevron-left"} />
        </button>
      </div>

      <nav
        style={{
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {visibleItems.map((item) => {
          const active = isActive(item.key)

          return (
            <Link
              key={item.key}
              to={`/admin/${item.key}`}
              title={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "8px",
                color: active ? "#FFFFFF" : "#151240",
                background: active ? "#964A21" : "transparent",
                fontFamily: "'Sora', sans-serif",
                fontSize: "14px",
                textDecoration: "none",
                transition: "background 0.2s ease, color 0.2s ease",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <Icon icon={item.icon} style={{ fontSize: "20px", flexShrink: 0 }} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {!collapsed && (
        <div
          style={{
            marginTop: "auto",
            padding: "20px",
            borderTop: "1px solid rgba(21, 18, 64, 0.18)",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <p
              title={user?.email || ""}
              style={{
                color: "#151240",
                fontSize: "13px",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.email || "Signed in"}
            </p>
            <span
              style={{
                display: "inline-block",
                marginTop: "4px",
                padding: "2px 8px",
                borderRadius: "999px",
                background: isAdmin ? "#151240" : "#645F70",
                color: "#FFFFFF",
                fontSize: "11px",
              }}
            >
              {isAdmin ? "Admin" : role || "No admin role"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid rgba(21, 18, 64, 0.2)",
              background: "transparent",
              color: "#151240",
              fontSize: "13px",
              cursor: signingOut ? "default" : "pointer",
              opacity: signingOut ? 0.6 : 1,
            }}
          >
            <Icon icon="mdi:logout" style={{ fontSize: "18px" }} />
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
          <Link
            to="/"
            style={{
              display: "block",
              marginTop: "10px",
              color: "#964A21",
              fontSize: "13px",
            }}
          >
            Back to site
          </Link>
        </div>
      )}

      {collapsed && (
        <div
          style={{
            marginTop: "auto",
            padding: "20px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            aria-label="Sign out"
            title="Sign out"
style={{
              background: "transparent",
              border: "none",
              color: "#151240",
              cursor: signingOut ? "default" : "pointer",
              fontSize: "20px",
              opacity: signingOut ? 0.6 : 1,
            }}
          >
            <Icon icon="mdi:logout" />
          </button>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
export { Sidebar }
