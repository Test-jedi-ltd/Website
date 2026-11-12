import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Skeleton } from "antd"
import PostForm from "../components/PostForm"
import { getBlogPostBySlug } from "../../lib/firestore"

export default function EditPost() {
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
        console.error("Error loading post:", err)
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
    return (
      <div className="p-8">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    )
  }

  if (notFound || !post) {
    return <p className="p-8 text-[#645F70]">Post not found.</p>
  }

  return (
    <div className="p-5 sm:p-8">
      <PostForm initialPost={post} />
    </div>
  )
}