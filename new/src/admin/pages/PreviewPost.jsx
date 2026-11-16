import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getBlogPostBySlug } from "../../lib/firestore"
import PostContent from "../../components/PostContent"

const formatDate = (value) => {
  if (!value) return null
  try {
    if (typeof value.toDate === "function") {
      return value.toDate().toLocaleDateString()
    }
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString()
  } catch {
    return null
  }
}

export default function PreviewPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true

    const loadPost = async () => {
      setLoading(true)
      setNotFound(false)
      try {
        const result = await getBlogPostBySlug(slug, true)
        if (active) {
          if (result) {
            setPost(result)
          } else {
            setNotFound(true)
          }
        }
      } catch (err) {
        console.error("Preview post error:", err)
        if (active) setNotFound(true)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadPost()

    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return <p className="p-8 text-[#645F70]">Loading preview...</p>
  }

  if (notFound || !post) {
    return (
      <div className="p-8">
        <p className="text-[#645F70] mb-4">Post not found.</p>
        <Link to="/admin/blog" className="text-[#964A21] underline">
          Back to posts
        </Link>
      </div>
    )
  }

  const publishedDate = formatDate(post.publishedAt || post.createdAt)

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-4">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <Link
          to="/admin/blog"
          className="text-[12px] uppercase tracking-[0.1em] text-[#645F70] hover:text-[#964A21] transition-colors"
        >
          ← Back to posts
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          {post.status === "published" && (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] uppercase tracking-[0.1em] text-[#964A21] hover:text-[#151240]"
            >
              View live ↗
            </a>
          )}
          <Link
            to={`/admin/blog/edit/${post.slug}`}
            className="bg-[#964A21] text-white px-4 py-2 rounded-lg text-[12px] font-semibold hover:bg-[#7d3d1b] transition-colors"
          >
            Edit
          </Link>
        </div>
      </div>

      <article className="admin-surface rounded-xl p-5 sm:p-8">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-[11px] uppercase tracking-[0.1em] text-[#645F70]">
          Preview
        </span>
        <span className="text-[11px] uppercase tracking-[0.1em] text-[#964A21]">
          {post.status}
        </span>
      </div>

      <h1 className="text-[32px] font-bold mb-4 text-[#151240]">{post.title}</h1>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-6">
        <p className="text-[12px] uppercase tracking-[0.1em] text-[#645F70]">
          by {post.author || "Admin"}
        </p>
        {publishedDate && (
          <p className="text-[12px] uppercase tracking-[0.1em] text-[#645F70]">
            {publishedDate}
          </p>
        )}
      </div>

      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.featuredImageAlt || post.title}
          loading="lazy"
          className="mb-8 h-auto max-h-[420px] w-full rounded-lg object-contain"
        />
      )}

      <PostContent
        html={post.content}
        className="text-[#151240] [&_a]:text-[#964A21]"
      />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <Link
          to={`/admin/blog/edit/${post.slug}`}
          className="text-[12px] uppercase tracking-[0.1em] text-[#645F70] hover:text-[#964A21] transition-colors"
        >
          ← Back to editor
        </Link>
        {post.status === "published" && (
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] uppercase tracking-[0.1em] text-[#964A21] hover:text-[#151240]"
          >
            View live post ↗
          </a>
        )}
      </div>
      </article>
    </div>
  )
}
