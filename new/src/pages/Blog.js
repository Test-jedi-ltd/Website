import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../sections/Navbar"
import Footer from "../sections/Footer"
import { getBlogPosts } from "../lib/firestore"
import blogPost1 from "../assets/blog-post-1.svg"
import blogPost2 from "../assets/blog-post-2.svg"
import blogPost3 from "../assets/blog-post-3.svg"
import blogPost4 from "../assets/blog-post-4.svg"
import blogPost5 from "../assets/blog-post-5.svg"
import blogPost6 from "../assets/blog-post-6.svg"
import blogPost7 from "../assets/blog-post-7.svg"

const cardFallbacks = [
  blogPost1,
  blogPost2,
  blogPost3,
  blogPost4,
  blogPost5,
  blogPost6,
]

const postCategory = (post) =>
  post.category || post.tags?.[0] || "TEST-JEDI"

const BlogCard = ({ post, fallbackImage }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="block rounded-[16px] bg-white p-3 pb-[10px] ring-1 ring-inset ring-dark-brown/10 transition-transform duration-300 hover:-translate-y-1"
  >
    <img
      src={post.featuredImage || fallbackImage}
      alt={post.featuredImage ? post.featuredImageAlt || post.title : ""}
      loading="lazy"
      className="h-auto w-full rounded-[16px]"
    />
    <div className="mt-[16px] flex">
      <span className="inline-flex min-h-[24px] items-center rounded-full border-2 border-[#C4D5FF] px-[6px]">
        <span className="font-['DM_Sans'] text-[12px] leading-[14px] text-[#1A2D5B]">
          {postCategory(post)}
        </span>
      </span>
    </div>
    <div className="mt-[8px] min-h-[96px] text-[16px] leading-[24px] text-dark-brown">
      <h2 className="mb-0 font-['Barlow_Condensed'] text-[20px] font-bold leading-[24px] tracking-[0.02em]">
        {post.title}
      </h2>
      {post.excerpt && (
        <p className="mt-1 font-['DM_Sans'] text-[16px] leading-[24px]">
          {post.excerpt}
        </p>
      )}
    </div>
  </Link>
)

const FeaturedPost = ({ post }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group relative block h-[220px] overflow-hidden rounded-[12px] sm:h-[240px] lg:h-[257px]"
  >
    <img
      src={post.featuredImage || blogPost7}
      alt={post.featuredImage ? post.featuredImageAlt || post.title : ""}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
    />
    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,#132247_90.5%,#132247_100%)]" />
    <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-[34px]">
      <span className="inline-flex min-h-[22px] items-center rounded-full bg-white px-[10px] text-[11px] font-semibold uppercase text-[#1A2D5B]">
        {postCategory(post)}
      </span>
      <span className="mt-[14px] block font-['Barlow_Condensed'] text-[22px] font-bold leading-tight text-light-brown sm:text-[28px] lg:text-[34px]">
        {post.title}
      </span>
    </span>
  </Link>
)

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let active = true

    const fetchPosts = async () => {
      setLoading(true)
      setError("")
      try {
        const publishedPosts = await getBlogPosts(true)
        if (active) setPosts(publishedPosts)
      } catch (loadError) {
        console.error("Blog page load error:", loadError)
        if (active) setError("Blog articles could not be loaded. Please try again.")
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchPosts()
    return () => {
      active = false
    }
  }, [reloadToken])

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <>
      <Navbar />
      <main className="min-h-[55vh] bg-light-brown pb-20 sm:pb-24 lg:pb-[132px]">
        <h1 className="sr-only">Test-Jedi blog</h1>
        <div className="mx-auto w-full max-w-[1176px] px-5">
          {loading ? (
            <p className="py-16 text-center text-[#1A2D5B]">Loading blog posts...</p>
          ) : error ? (
            <div className="py-16 text-center" role="alert">
              <p className="text-[#1A2D5B]">{error}</p>
              <button
                type="button"
                onClick={() => setReloadToken((token) => token + 1)}
                className="mt-4 border-b border-dark-brown pb-1 font-semibold text-dark-brown"
              >
                Reload blog
              </button>
            </div>
          ) : posts.length === 0 ? (
            <p className="py-16 text-center text-[#1A2D5B]">
              No articles are available yet.
            </p>
          ) : (
            <>
              {featuredPost && (
                <section className="pt-[21px]" aria-label="Featured article">
                  <FeaturedPost post={featuredPost} />
                </section>
              )}
              {remainingPosts.length > 0 && (
                <section
                  className="mt-8 grid grid-cols-1 gap-x-[26px] gap-y-9 sm:mt-10 sm:grid-cols-2 lg:mt-[49px] lg:grid-cols-3 lg:gap-y-[37px]"
                  aria-label="Blog articles"
                >
                  {remainingPosts.map((post, index) => (
                    <BlogCard
                      key={post.id || post.slug}
                      post={post}
                      fallbackImage={cardFallbacks[index % cardFallbacks.length]}
                    />
                  ))}
                </section>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
