import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Skeleton } from "antd"
import { Icon } from "@iconify/react"
import { getPostStats, getRecentPosts } from "../../lib/firestore"
import { useAuth } from "../AuthContext"

const statCards = [
  {
    key: "total",
    label: "Total posts",
    icon: "mdi:post-outline",
    accent: "#151240",
  },
  {
    key: "draft",
    label: "Drafts",
    icon: "mdi:pencil-outline",
    accent: "#964A21",
  },
  {
    key: "published",
    label: "Published",
    icon: "mdi:check-circle-outline",
    accent: "#6F7D5B",
  },
  {
    key: "archived",
    label: "Archived",
    icon: "mdi:archive-outline",
    accent: "#7A7780",
  },
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

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadDashboard = useCallback(async () => {
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
      console.error("Dashboard load error:", err)
      setError("Could not load dashboard data. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  return (
    <div className="min-h-screen bg-[#FDF9D2] p-5 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#645F70] mb-2">
            {user?.email || "Admin"}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[#151240]">Test Jedi Admin</h1>
          <p className="text-[13px] text-[#645F70] mt-1">
            Blog activity, publishing status, and quick actions.
          </p>
        </div>
        <Link
          to="/admin/blog/new-post"
          className="bg-[#964A21] text-white px-5 py-3 rounded-lg text-[13px] font-semibold hover:bg-[#7d3d1b] transition-colors shadow-sm"
        >
          + New Post
        </Link>
      </div>

      {error && <p className="mb-6 text-[#FF5F5F] text-sm">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.key}
className="admin-surface rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-[0.1em] text-[#645F70]">
                {card.label}
              </span>
              <Icon
                icon={card.icon}
                style={{ fontSize: "20px", color: card.accent }}
              />
            </div>
            {loading ? (
              <Skeleton
                active
                title={{ width: 60 }}
                paragraph={false}
                style={{ margin: 0 }}
              />
            ) : (
              <p className="text-[36px] leading-none font-bold text-[#151240]">
                {stats?.[card.key] ?? 0}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="admin-surface overflow-hidden rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9C5B2] px-5 py-4">
          <h2 className="text-[20px] font-bold text-[#151240]">
            Recent activity
          </h2>
          <Link
            to="/admin/blog"
            className="text-[12px] uppercase tracking-[0.1em] text-[#645F70] hover:text-[#964A21]"
          >
            View all posts
          </Link>
        </div>

        {loading ? (
          <div className="p-5">
            <Skeleton active paragraph={{ rows: 5 }} />
          </div>
        ) : recent.length === 0 ? (
          <div className="p-10 text-center">
            <Icon
              icon="mdi:post-outline"
              style={{ fontSize: "40px", color: "#964A21" }}
            />
            <p className="text-[#151240] font-semibold mt-3">No posts yet</p>
            <p className="text-[13px] text-[#645F70] mt-1 mb-4">
              Create your first post to see activity here.
            </p>
            <Link
              to="/admin/blog/new-post"
              className="inline-block bg-[#964A21] text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-[#7d3d1b] transition-colors"
            >
              Add your first post
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-[#D9C5B2]">
            {recent.map((post) => (
              <li
                key={post.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
              >
                <div className="min-w-0">
                  <Link
                    to={`/admin/blog/edit/${post.slug}`}
                    className="text-[14px] font-medium text-[#151240] hover:text-[#964A21] transition-colors"
                  >
                    {post.title}
                  </Link>
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
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to={`/admin/blog/preview/${post.slug}`}
                    className="text-[12px] text-[#645F70] hover:text-[#964A21]"
                  >
                    Preview
                  </Link>
                  <Link
                    to={`/admin/blog/edit/${post.slug}`}
                    className="text-[12px] text-[#645F70] hover:text-[#964A21]"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}