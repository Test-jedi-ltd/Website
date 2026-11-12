import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { Icon } from "@iconify/react"
import Sidebar from "./components/Sidebar"
import ErrorBoundary from "./components/ErrorBoundary"
import ProtectedRoute from "./components/ProtectedRoute"
import RightWidget from "./components/RightWidget"

const AdminShell = () => {
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  )
  const [widgetOpen, setWidgetOpen] = useState(false)
  const handleWidgetOpenChange = (open) => setWidgetOpen(open)

  return (
    <ProtectedRoute>
      <ErrorBoundary>
        <div className="admin-shell relative min-h-screen bg-[#FDF9D2] text-[#151240]">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div
            className={`${collapsed ? "ml-20" : "ml-[280px]"} ${
              widgetOpen ? "lg:mr-[320px]" : ""
            } min-h-screen transition-all duration-300 max-[767px]:ml-20`}
          >
            <Outlet />
          </div>
          <Link
            to="/admin/blog/new-post"
            aria-label="Add post"
            className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#964A21] text-[#FDF9D2] shadow-lg hover:bg-[#7d3d1b] transition-colors"
          >
            <Icon icon="mdi:plus" style={{ fontSize: "26px" }} />
          </Link>
          <RightWidget open={widgetOpen} onOpenChange={handleWidgetOpenChange} />
        </div>
      </ErrorBoundary>
    </ProtectedRoute>
  )
}

export default AdminShell
