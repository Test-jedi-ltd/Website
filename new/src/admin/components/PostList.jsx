import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { Modal, message } from "antd"
import {
  getBlogPostsPaginated,
  searchPosts,
  updateBlogPost,
  archiveBlogPost,
} from "../../lib/firestore"
import { getErrorMessage } from "../../lib/errors"

const statusBadge = (status) => {
  if (status === "published") {
    return <span className="bg-[#964A21] text-white text-xs px-2 py-1 rounded-full">Published</span>
  }
  if (status === "draft") {
    return <span className="bg-[#151240] text-white text-xs px-2 py-1 rounded-full">Draft</span>
  }
  return <span className="bg-[#645F70] text-white text-xs px-2 py-1 rounded-full">Archived</span>
}

const formatDate = (value) => {
  if (!value) return "N/A"
  try {
    if (typeof value.toDate === "function") {
      return value.toDate().toLocaleDateString()
    }
    return new Date(value).toLocaleDateString()
  } catch {
    return "N/A"
  }
}

const confirmAction = ({ title, content, okText = "Confirm" }) =>
  new Promise((resolve) => {
    Modal.confirm({
      title,
      content,
      okText,
      cancelText: "Cancel",
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    })
  })

const PostList = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [selectedIds, setSelectedIds] = useState([])

  const loadPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (searchQuery.trim()) {
        const results = await searchPosts(searchQuery.trim())
        const filtered =
          statusFilter === "all"
            ? results
            : results.filter((post) => post.status === statusFilter)
        setPosts(filtered)
        setTotal(filtered.length)
        setTotalPages(1)
      } else {
        const result = await getBlogPostsPaginated(
          page,
          pageSize,
          statusFilter === "all" ? undefined : statusFilter
        )
        setPosts(result.posts)
        setTotal(result.total)
        setTotalPages(result.totalPages)
      }
    } catch (err) {
      console.error("Error loading posts:", err)
      setError(getErrorMessage(err, "Failed to load posts. Please try again."))
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, statusFilter, searchQuery])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput.trim())
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  useEffect(() => {
    setSelectedIds([])
  }, [page, statusFilter, searchQuery])

  const handleDelete = async (id) => {
    const confirmed = await confirmAction({
      title: "Archive this post?",
      content:
        "Archived posts are removed from the public blog but remain available in the admin list.",
      okText: "Archive",
    })
    if (!confirmed) return

    try {
      await archiveBlogPost(id)
      message.success("Post archived.")
      await loadPosts()
    } catch (err) {
      console.error("Archive post error:", err)
      const errorMessage = getErrorMessage(err, "Failed to archive post.")
      setError(errorMessage)
      message.error(errorMessage)
    }
  }

  const handleStatusChange = async (post) => {
    const newStatus = post.status === "published" ? "draft" : "published"
    const action = newStatus === "published" ? "Publish" : "Unpublish"

    const confirmed = await confirmAction({
      title: `${action} this post?`,
      content:
        newStatus === "published"
          ? "This post will be visible on the public blog."
          : "This post will be hidden from the public blog.",
      okText: action,
    })
    if (!confirmed) return

    try {
      await updateBlogPost(post.id, { status: newStatus })
      message.success(newStatus === "published" ? "Post published." : "Post unpublished.")
      await loadPosts()
    } catch (err) {
      console.error("Status change error:", err)
      const errorMessage = getErrorMessage(err, "Failed to update post status.")
      setError(errorMessage)
      message.error(errorMessage)
    }
  }

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const allSelected = posts.length > 0 && selectedIds.length === posts.length
  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : posts.map((post) => post.id))
  }

  const bulkUpdateStatus = async (newStatus) => {
    if (selectedIds.length === 0) return
    const count = selectedIds.length
    const action = newStatus === "published" ? "Publish" : "Move to draft"

    const confirmed = await confirmAction({
      title: `${action} ${count} post(s)?`,
      content:
        newStatus === "published"
          ? "The selected posts will be visible on the public blog."
          : "The selected posts will be hidden from the public blog.",
      okText: action,
    })
    if (!confirmed) return

    try {
      await Promise.all(selectedIds.map((id) => updateBlogPost(id, { status: newStatus })))
      setSelectedIds([])
      message.success(`${count} post(s) updated.`)
      await loadPosts()
    } catch (err) {
      console.error("Bulk update error:", err)
      const errorMessage = getErrorMessage(err, "Failed to update selected posts.")
      setError(errorMessage)
      message.error(errorMessage)
    }
  }

  const bulkArchive = async () => {
    if (selectedIds.length === 0) return
    const count = selectedIds.length

    const confirmed = await confirmAction({
      title: `Archive ${count} selected post(s)?`,
      content:
        "Archived posts are removed from the public blog but remain available in the admin list.",
      okText: "Archive",
    })
    if (!confirmed) return

    try {
      await Promise.all(selectedIds.map((id) => archiveBlogPost(id)))
      setSelectedIds([])
      message.success(`${count} post(s) archived.`)
      await loadPosts()
    } catch (err) {
      console.error("Bulk archive error:", err)
      const errorMessage = getErrorMessage(err, "Failed to archive selected posts.")
      setError(errorMessage)
      message.error(errorMessage)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#151240]">Blog Posts</h2>
        <Link
          to="/admin/blog/new-post"
          className="bg-[#964A21] text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-[#7d3d1b] transition-colors"
        >
          + New Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-[#151240]">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="w-full rounded-lg px-4 py-3 text-[#151240] focus:outline-none"
          >
            <option value="all">All Posts</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#151240]">Search</label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search title, excerpt, or content..."
            className="w-full rounded-lg px-4 py-3 text-[#151240] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[#151240]">Posts per page</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value, 10))
              setPage(1)
            }}
            className="w-full rounded-lg px-4 py-3 text-[#151240] focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-4 p-3 rounded-lg bg-[#FDF9D2] border border-[#D9C5B2]">
          <span className="text-[13px] text-[#645F70]">{selectedIds.length} selected</span>
          <button
            type="button"
            onClick={() => bulkUpdateStatus("published")}
            className="text-white text-[12px] bg-[#964A21] px-3 py-1.5 rounded-md hover:bg-[#7d3d1b]"
          >
            Publish
          </button>
          <button
            type="button"
            onClick={() => bulkUpdateStatus("draft")}
            className="text-white text-[12px] bg-[#151240] px-3 py-1.5 rounded-md hover:bg-[#302A62]"
          >
            Move to Draft
          </button>
          <button
            type="button"
            onClick={bulkArchive}
            className="text-[#9B332B] text-[12px] px-3 py-1.5 rounded-md border border-[#9B332B] hover:bg-[#9B332B] hover:text-white"
          >
            Archive
          </button>
        </div>
      )}

      {error && <p className="mb-4 text-[#9B332B] text-sm">{error}</p>}

      {loading ? (
        <p className="py-12 text-center text-[#645F70]">Loading posts...</p>
      ) : posts.length === 0 ? (
        <div className="py-12 text-center text-[#645F70]">
          {searchQuery ? (
            <p>No posts found matching "{searchQuery}"</p>
          ) : (
            <p>
              No posts yet.{" "}
              <Link to="/admin/blog/new-post" className="text-[#964A21] font-medium">
                Add your first post
              </Link>
            </p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="admin-surface w-full border-collapse overflow-hidden rounded-xl text-[#151240]">
            <thead>
              <tr className="text-left text-[12px] uppercase tracking-[0.1em] text-[#645F70]">
                <th className="py-3 px-3 border-b border-[#D9C5B2] w-10">
                  <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                </th>
                <th className="py-3 px-3 border-b border-[#D9C5B2]">Title</th>
                <th className="py-3 px-3 border-b border-[#D9C5B2]">Author</th>
                <th className="py-3 px-3 border-b border-[#D9C5B2]">Status</th>
                <th className="py-3 px-3 border-b border-[#D9C5B2]">Date</th>
                <th className="py-3 px-3 border-b border-[#D9C5B2] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="text-[13px] border-b border-[#E8E0D4] hover:bg-[#FDF9D2]/50">
                  <td className="py-3 px-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(post.id)}
                      onChange={() => toggleSelect(post.id)}
                    />
                  </td>
                  <td className="py-3 px-3">
                    <Link
                      to={`/admin/blog/edit/${post.slug}`}
                      className="font-medium text-[#151240] hover:text-[#964A21] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-3 px-3 text-[#645F70]">{post.author || "Unknown"}</td>
                  <td className="py-3 px-3">{statusBadge(post.status)}</td>
                  <td className="py-3 px-3 text-[#645F70]">{formatDate(post.createdAt)}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex flex-wrap gap-3 justify-end">
                      <Link
                        to={`/admin/blog/edit/${post.slug}`}
                        className="text-[#645F70] hover:text-[#964A21] text-[12px]"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/admin/blog/preview/${post.slug}`}
                        className="text-[#645F70] hover:text-[#964A21] text-[12px]"
                      >
                        Preview
                      </Link>
                      {post.status === "published" && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#645F70] hover:text-[#964A21] text-[12px]"
                        >
                          View live ↗
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleStatusChange(post)}
                        className="text-[#645F70] hover:text-[#964A21] text-[12px]"
                      >
                        {post.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        className="text-[#9B332B] hover:text-[#151240] text-[12px]"
                      >
                        Archive
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && posts.length > 0 && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between text-[13px] text-[#645F70]">
          <span>
            Page {page} of {totalPages} ({total} posts)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-md border border-[#D9C5B2] hover:border-[#964A21] disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-md border border-[#D9C5B2] hover:border-[#964A21] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostList
