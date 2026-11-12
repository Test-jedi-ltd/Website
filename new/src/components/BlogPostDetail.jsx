import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getBlogPostBySlug } from "../lib/firestore"
import PostContent from "./PostContent"

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

export default function BlogPostDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      const postData = await getBlogPostBySlug(slug)

      if (postData) {
        setPost(postData)
      } else {
        // Post not found, go back to blog
        navigate("/blog")
      }
      setLoading(false)
    }

    fetchPost()
  }, [slug, navigate])

  if (loading) {
    return <p className="py-12 text-center">Loading post...</p>
  }

  if (!post) {
    return <p className="py-12 text-center">Post not found</p>
  }

  const publishedDate = formatDate(post.publishedAt || post.createdAt)

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10">
      <h1 className="text-[32px] font-bold mb-6 text-center text-dark-brown">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 mb-8">
        <p className="text-[12px] uppercase tracking-[0.1em] text-[#7A7780]">
          by {post.author || "Admin"}
        </p>
        {publishedDate && (
          <p className="text-[12px] uppercase tracking-[0.1em] text-[#7A7780]">
            {publishedDate}
          </p>
        )}
      </div>

      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.featuredImageAlt || post.title}
          loading="lazy"
          className="w-full max-h-[420px] object-cover rounded-lg mb-8"
        />
      )}

      <PostContent
        html={post.content}
        className="text-dark-brown [&_a]:text-accent-brown"
      />

      <div className="text-right mt-10">
        <Link
          to="/blog"
          className="text-[12px] uppercase tracking-[0.1em] text-[#7A7780] hover:text-dark-brown transition-colors"
        >
          ← Back to all posts
        </Link>
      </div>
    </div>
  )
}
