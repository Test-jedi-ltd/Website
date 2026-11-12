import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Drawer, Skeleton } from "antd"
import { Icon } from "@iconify/react"
import { getPostStats, getRecentPosts } from "../../lib/firestore"

const statItems = [
  { key: "total", label: "Total" },
  { key: "draft", label: "Drafts" },
  { key: "published", label: "Published" },
  { key: "archived", label: "Archived" },
]

const statusStyles = {
  published: "bg-[#964A21] text-white",
  draft: "bg-[#151240] text-white",
  archived: "bg-[#645F70] text-white",
}

const toMillis = (value) => {
  if (!value) return null
  if (typeof value.toMillis === "function") return value.toMillis()
  if (typeof value.toDate === "function") return value.toDate().getTime()
  const parsed = new Date(value).getTime()
  return Number.isNaN(parsed) ? null : parsed
}

const formatRelative = (value) => {
  const millis = toMillis(value)
  if (!millis) return "No date"

  const diff = Date.now() - millis
  if (diff < 60000) return "just now"
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`
  return new Date(millis).toLocaleDateString()
}

const WidgetContent = ({ stats, recent, loading, error, onRefresh, onClose }) => (
  <div className="flex h-full flex-col">
    <div className="flex items-center justify-between px-5 py-4 border-b border-[#D9C5B2]">
      <div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#645F70]">
          Admin
        </p>
        <h2 className="text-[18px] font-bold text-[#151240]">Overview</h2>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          aria-label="Refresh overview"
          className="text-[#645F70] hover:text-[#151240] transition-colors"
        >
          <Icon icon="mdi:refresh" style={{ fontSize: "20px" }} />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close overview"
          className="text-[#645F70] hover:text-[#151240] transition-colors"
        >
          <Icon icon="mdi:close" style={{ fontSize: "20px" }} />
        </button>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
      {error && <p className="text-[#FF5F5F] text-[12px]">{error}</p>}

      <section>
        <h3 className="text-[11px] uppercase tracking-[0.12em] text-[#645F70] mb-3">
          Quick stats
        </h3>
        {loading ? (
          <Skeleton active paragraph={{ rows: 2 }} />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {statItems.map((item) => (
              <div
                key={item.key}
                className="rounded-lg border border-[#D9C5B2] bg-[#FDF9D2] p-3"
              >
                <p className="text-[22px] font-bold text-[#151240]">
                  {stats?.[item.key] ?? 0}
                </p>
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#645F70]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="text-[11px] uppercase tracking-[0.12em] text-[#645F70] mb-3">
          Recent activity
        </h3>
        {loading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : recent.length === 0 ? (
          <p className="text-[12px] text-[#645F70]">No posts yet.</p>
        ) : (
          <ul className="space-y-3">
            {recent.map((post) => (
              <li key={post.id}>
                <Link to={`/admin/blog/edit/${post.slug}`} className="block group">
                  <p className="text-[13px] text-[#151240] group-hover:text-[#964A21] truncate">
                    {post.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`text-[10px] uppercase px-1.5 py-0.5 rounded ${
                        statusStyles[post.status] || statusStyles.draft
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="text-[11px] text-[#645F70]">
                      {formatRelative(post.updatedAt || post.createdAt)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>

    <div className="px-5 py-4 border-t border-[#D9C5B2]">
      <Link
        to="/admin/blog/new-post"
        className="inline-flex items-center gap-2 bg-[#964A21] text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-[#7d3d1b] transition-colors"
      >
        <Icon icon="mdi:plus" style={{ fontSize: "18px" }} />
        Add Post
      </Link>
    </div>
  </div>
)

const RightWidget = ({ open, onOpenChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadWidgetData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [nextStats, nextRecent] = await Promise.all([
        getPostStats(),
        getRecentPosts(5),
      ])
      setStats(nextStats)
      setRecent(nextRecent)
    } catch (err) {
      console.error("Overview widget error:", err)
      setError("Could not load overview.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadWidgetData()
  }, [loadWidgetData])

  useEffect(() => {
    if (open) {
      loadWidgetData()
    }
  }, [open, loadWidgetData])

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-label={open ? "Close overview" : "Open overview"}
        className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 items-center justify-center w-8 h-16 rounded-l-lg bg-[#FFFEFA] border border-r-0 border-[#D9C5B2] text-[#151240] hover:bg-[#FDF9D2] transition-colors"
      >
        <Icon
          icon={open ? "mdi:chevron-right" : "mdi:chevron-left"}
          style={{ fontSize: "20px" }}
        />
      </button>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open overview"
        className="lg:hidden fixed bottom-24 right-5 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-[#FFFEFA] border border-[#D9C5B2] text-[#151240] shadow-lg"
      >
        <Icon icon="mdi:view-dashboard-outline" style={{ fontSize: "22px" }} />
      </button>

      <aside
        className={`hidden lg:block fixed right-0 top-0 bottom-0 w-[320px] bg-[#FFFEFA] border-l border-[#D9C5B2] z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <WidgetContent
          stats={stats}
          recent={recent}
          loading={loading}
          error={error}
          onRefresh={loadWidgetData}
          onClose={() => onOpenChange(false)}
        />
      </aside>

      <Drawer
        placement="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        width={300}
        styles={{
          body: { padding: 0, background: "#FFFEFA" },
          header: { display: "none" },
          content: { background: "#FFFEFA" },
        }}
      >
        <WidgetContent
          stats={stats}
          recent={recent}
          loading={loading}
          error={error}
          onRefresh={loadWidgetData}
          onClose={() => setMobileOpen(false)}
        />
      </Drawer>
    </>
  )
}

export default RightWidget
