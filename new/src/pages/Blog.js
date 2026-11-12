import { useEffect, useState } from "react"
import { getBlogPosts } from "../lib/firestore"
import { Link } from "react-router-dom"
import Navbar from "../sections/Navbar"

// Helper component for blog cards
const BlogCard = ({ post }) => (
  <article className="bg-white rounded-lg p-6 hover:ring-1 hover:ring-inset hover:ring-dark-brown/10 transition-colors">
    <h3 className="text-[20px] font-bold leading-[24px] tracking-[0.02em] mb-2">
      <Link
        to={`/blog/${post.slug}`}
        className="text-dark-brown hover:text-[#1A2D5B] transition-colors"
      >
        {post.title}
      </Link>
    </h3>

    {post.excerpt && (
      <p className="text-[16px] leading-[24px] text-dark-brown">
        {post.excerpt}
      </p>
    )}

    <div className="mt-4 text-sm text-dark-brown/60">
      by {post.author || "Admin"}
    </div>
  </article>
)

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      // Fetch only published posts
      const postsData = await getBlogPosts(true)
      setPosts(postsData)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <p className="py-12 text-center">Loading blog posts...</p>
  }

  return (
    <div className="bg-light-brown pb-20 sm:pb-24 lg:pb-[132px]">
      <h1 className="sr-only">Test-Jedi blog</h1>
      <div className="mx-auto w-full max-w-[1176px] px-5">
        <Navbar />

        <section className="pt-[21px]" aria-label="Blog articles">
          {posts.length === 0 ? (
            <p className="text-center text-[#7A7780] py-12">
              No posts yet. <a href="/admin">Add your first post</a>
            </p>
          ) : (
            <section
              className="mt-8 grid grid-cols-1 gap-x-[26px] gap-y-9 sm:mt-10 sm:grid-cols-2 lg:mt-[49px] lg:grid-cols-3 lg:gap-y-[37px]"
              aria-label="Blog articles"
            >
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </section>
          )}
        </section>
      </div>
    </div>
  )
}