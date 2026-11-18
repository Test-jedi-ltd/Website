import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getBlogPostBySlug, getBlogPosts } from "../lib/firestore"
import Navbar from "../sections/Navbar"
import Footer from "../sections/Footer"
import PostContent from "./PostContent"
import heroImage from "../assets/blog-detail-cover.png"
import relatedImageOne from "../assets/blog-post-detail-2.svg"
import relatedImageTwo from "../assets/blog-post-related-2.jpg"

const categoryFor = (post) =>
  post.category || post.tags?.[0] || "TEST-JEDI"

const readingTimeFor = (post) => {
  if (Number.isFinite(post.readingTime) && post.readingTime > 0) {
    return post.readingTime
  }

  const words = (post.contentText || post.content || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(words / 200))
}

const authorInitials = (author) =>
  (author || "Test-Jedi")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

const RelatedCard = ({ post, fallbackImage }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="block rounded-[8px] bg-white p-[8px] transition-transform duration-300 hover:-translate-y-0.5"
  >
    <img
      src={post.featuredImage || fallbackImage}
      alt={post.featuredImage ? post.featuredImageAlt || post.title : ""}
      loading="lazy"
      className="aspect-[1.25/1] w-full rounded-[6px] border border-[#ECE9DF] bg-white object-cover object-top"
    />
    <span className="mt-[9px] inline-block text-[8px] text-[#74778A]">
      <span className="font-['DM_Sans']">
        {categoryFor(post)}
      </span>
    </span>
    <h3 className="m-0 text-[11px] leading-[1.5] text-[#1A2D5B]">
      <span className="font-['DM_Sans'] font-semibold">{post.title}</span>
    </h3>
  </Link>
)

const ArticleBody = ({ content }) =>
  content ? (
    <PostContent
      html={content}
      className="blog-post-copy blog-detail-copy text-[#1A2D5B]"
    />
  ) : (
    <p className="font-['DM_Sans'] text-[16px] leading-6 text-[#1A2D5B]">
      This article has no content yet.
    </p>
  )

const ArticleLoadingSkeleton = () => (
  <main
    className="overflow-hidden bg-[#FFF9D7] text-[#17234A]"
    aria-busy="true"
  >
    <span className="sr-only" role="status" aria-label="Loading article">
      Loading article...
    </span>
    <section className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-8 px-[22px] py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-[clamp(32px,6vw,88px)] lg:px-[6vw] lg:py-[clamp(48px,7vw,94px)]">
      <header className="w-full max-w-[490px] animate-pulse">
        <div className="h-3 w-36 rounded bg-[#964A21]/20" />
        <div className="mt-6 h-12 w-full rounded bg-[#17234A]/10 sm:h-16" />
        <div className="mt-3 h-12 w-4/5 rounded bg-[#17234A]/10 sm:h-16" />
        <div className="mt-6 h-4 w-full max-w-[390px] rounded bg-[#17234A]/[0.08]" />
        <div className="mt-2 h-4 w-4/5 max-w-[320px] rounded bg-[#17234A]/[0.08]" />
        <div className="mt-8 flex items-center gap-[11px]">
          <div className="h-[39px] w-[39px] rounded-full bg-[#17234A]/15" />
          <div className="h-3 w-24 rounded bg-[#17234A]/10" />
        </div>
      </header>
      <div className="min-h-[260px] animate-pulse rounded-[6px] bg-[#F5EDC4] p-3 shadow-[0_18px_50px_rgba(69,50,23,0.12)] sm:min-h-[320px] sm:p-6" />
    </section>

    <section className="bg-[#FFFDF2] px-[22px] py-[38px] sm:px-8 sm:py-12 lg:px-6 lg:pb-[100px] lg:pt-12">
      <div className="mx-auto grid w-full max-w-[1060px] grid-cols-1 items-start gap-[38px] lg:grid-cols-[230px_minmax(0,720px)] lg:justify-center lg:gap-[clamp(40px,8vw,110px)]">
        <aside className="animate-pulse bg-[#F5F4F2] p-[18px] lg:p-6">
          <div className="h-3 w-24 rounded bg-[#964A21]/20" />
          <div className="mt-4 h-6 w-4/5 rounded bg-[#17234A]/10" />
          <div className="mt-6 aspect-[1.25/1] rounded-[6px] bg-[#E9E4CB]" />
        </aside>
        <article className="animate-pulse pt-2">
          <div className="h-3 w-24 rounded bg-[#964A21]/20" />
          <div className="mt-4 h-8 w-4/5 rounded bg-[#17234A]/10" />
          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-[#17234A]/[0.08]" />
            <div className="h-4 w-full rounded bg-[#17234A]/[0.08]" />
            <div className="h-4 w-5/6 rounded bg-[#17234A]/[0.08]" />
            <div className="h-4 w-full rounded bg-[#17234A]/[0.08]" />
          </div>
        </article>
      </div>
    </section>
  </main>
)

export default function BlogPostDetail() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true

    const fetchPost = async () => {
      setLoading(true)
      setError("")
      setPost(null)
      try {
        const postData = await getBlogPostBySlug(slug)
        if (!postData) {
          if (active) setError("This article could not be found.")
          return
        }

        const publishedPosts = await getBlogPosts(true)
        if (active) {
          setPost(postData)
          setRelatedPosts(
            publishedPosts.filter((item) => item.slug !== postData.slug).slice(0, 2)
          )
        }
      } catch (loadError) {
        console.error("Blog post load error:", loadError)
        if (active) setError("This article could not be loaded. Please try again.")
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchPost()
    return () => {
      active = false
    }
  }, [slug])

  return (
    <>
      <Navbar />
      {loading ? (
        <ArticleLoadingSkeleton />
      ) : error || !post ? (
        <main className="flex min-h-[55vh] flex-col items-center justify-center bg-[#FFF9D7] px-5 text-center text-[#17234A]">
          <p role="alert">{error || "This article could not be found."}</p>
          <Link
            to="/blog"
            className="mt-4 border-b border-[#17234A] pb-1 text-[13px] font-semibold"
          >
            Back to all articles
          </Link>
        </main>
      ) : (
        <main className="overflow-hidden bg-[#FFF9D7] text-[#17234A]">
          <section
            className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-8 px-[22px] py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-[clamp(32px,6vw,88px)] lg:px-[6vw] lg:py-[clamp(48px,7vw,94px)]"
            aria-labelledby="article-title"
          >
            <header className="max-w-[490px]">
              <p className="mb-[22px] text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#99491F]">
                {categoryFor(post)}
                <span className="px-[6px] text-[#C68B4B]" aria-hidden="true">·</span>
                {readingTimeFor(post)} MIN READ
              </p>
              <h1
                id="article-title"
                className="m-0 text-[clamp(38px,5vw,68px)] leading-[1.04] tracking-[-0.045em] text-[#17234A]"
              >
                <span className="font-['Playfair_Display'] font-semibold">{post.title}</span>
              </h1>
              {post.excerpt && (
                <p className="mt-[22px] mb-[30px] max-w-[390px] text-[clamp(15px,1.5vw,18px)] leading-[1.65] text-[#555B6B]">
                  <span className="font-['DM_Sans']">{post.excerpt}</span>
                </p>
              )}
              <div className="flex items-center gap-[11px] text-[12px] text-[#17234A]">
                <span className="grid h-[39px] w-[39px] shrink-0 place-items-center rounded-full bg-[#17234A] text-[11px] font-extrabold text-[#FFF9D7]">
                  {authorInitials(post.author)}
                </span>
                <span>
                  <strong className="block font-['DM_Sans']">
                    {post.author || "Test-Jedi"}
                  </strong>
                </span>
              </div>
            </header>

            <figure className="relative m-0 grid min-h-[260px] min-w-0 place-items-center overflow-hidden rounded-[6px] bg-[#F5EDC4] p-3 shadow-[0_18px_50px_rgba(69,50,23,0.12)] sm:min-h-[320px] sm:p-6">
              <img
                src={post.featuredImage || heroImage}
                alt={
                  post.featuredImage
                    ? post.featuredImageAlt || post.title
                    : "Illustration explaining HTTP headers and message bodies"
                }
                fetchpriority="high"
                className="block max-h-[430px] h-full w-full object-contain"
              />
            </figure>
          </section>

          <section className="bg-[#FFFDF2] px-[22px] py-[38px] sm:px-8 sm:py-12 lg:px-6 lg:pb-[100px] lg:pt-12">
            <div className="mx-auto grid w-full max-w-[1060px] grid-cols-1 items-start gap-[38px] lg:grid-cols-[230px_minmax(0,720px)] lg:justify-center lg:gap-[clamp(40px,8vw,110px)]">
              <aside
                className="grid grid-cols-2 gap-[10px] bg-[#F5F4F2] p-[18px] lg:sticky lg:top-[110px] lg:block lg:p-6"
                aria-label="Related stories"
              >
                <p className="col-span-full mb-0 text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#99491F]">
                  Related stories
                </p>
                <h2 className="col-span-full mb-1 mt-0 font-['Playfair_Display'] text-[25px] font-semibold leading-[1.12] text-[#17234A] lg:mb-6">
                  More stories like this
                </h2>
                {relatedPosts.length ? (
                  relatedPosts.map((relatedPost, index) => (
                    <div className="mt-0 lg:mt-[14px]" key={relatedPost.id || relatedPost.slug}>
                      <RelatedCard
                        post={relatedPost}
                        fallbackImage={index === 0 ? relatedImageOne : relatedImageTwo}
                      />
                    </div>
                  ))
                ) : (
                  <p className="col-span-full mb-0 px-2 text-[14px] text-[#1A2D5B]/70">
                    More articles coming soon.
                  </p>
                )}
              </aside>

              <article className="min-w-0 pt-2">
                <header className="mb-[22px]">
                  <p className="mb-[10px] text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#99491F]">
                    {categoryFor(post)}
                  </p>
                  <h2 className="m-0 text-[clamp(26px,3vw,38px)] leading-[1.15] text-[#17234A]">
                    <span className="font-['Playfair_Display'] font-semibold">{post.title}</span>
                  </h2>
                  {post.excerpt && (
                    <p className="mb-[30px] mt-2 text-[14px] font-semibold text-[#697087]">
                      <span className="font-['DM_Sans']">{post.excerpt}</span>
                    </p>
                  )}
                </header>

                <ArticleBody content={post.content} />

                <div className="mt-10 text-right">
                  <Link
                    to="/blog"
                    className="text-[12px] uppercase tracking-[0.1em] text-[#99491F] transition-colors hover:text-[#17234A]"
                  >
                    ← Back to all articles
                  </Link>
                </div>
              </article>
            </div>
          </section>
        </main>
      )}
      <Footer />
    </>
  )
}
