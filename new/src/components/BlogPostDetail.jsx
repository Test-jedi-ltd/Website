import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getBlogPostBySlug, getBlogPosts } from "../lib/firestore"
import Navbar from "../sections/Navbar"
import Footer from "../sections/Footer"
import PostContent from "./PostContent"
import heroImage from "../assets/blog-post-hero.jpg"
import relatedImageOne from "../assets/blog-post-detail-2.svg"
import relatedImageTwo from "../assets/blog-post-related-2.jpg"

const categoryFor = (post) =>
  post.category || post.tags?.[0] || "TEST-JEDI"

const RelatedCard = ({ post, fallbackImage }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="block rounded-[12px] bg-white p-[7px] ring-1 ring-inset ring-black/5 transition-transform duration-300 hover:-translate-y-0.5"
  >
    <img
      src={post.featuredImage || fallbackImage}
      alt={post.featuredImage ? post.featuredImageAlt || post.title : ""}
      loading="lazy"
      className="h-[190px] w-full rounded-[8px] object-cover sm:h-[220px]"
    />
    <span className="mt-[9px] flex min-h-[18px] w-fit items-center rounded-full border border-[#C4D5FF] bg-white px-[6px]">
      <span className="font-['DM_Sans'] text-[9px] leading-none text-[#1A2D5B]">
        {categoryFor(post)}
      </span>
    </span>
    <h3 className="mt-2 text-[14px] leading-[18px] text-[#1A2D5B]">
      <span className="font-['DM_Sans'] font-semibold">{post.title}</span>
    </h3>
    {post.excerpt && (
      <p className="mt-1 text-[12px] leading-[17px] text-[#1A2D5B]/70">
        <span className="font-['DM_Sans']">{post.excerpt}</span>
      </p>
    )}
  </Link>
)

const ArticleBody = ({ content }) =>
  content ? (
    <PostContent
      html={content}
      className="blog-post-copy text-[#1A2D5B]"
    />
  ) : (
    <p className="font-['DM_Sans'] text-[16px] leading-6 text-[#1A2D5B]">
      This article has no content yet.
    </p>
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
        <main className="flex min-h-[55vh] items-center justify-center bg-[#FDFADC] px-5 text-[#1A2D5B]">
          <p>Loading article...</p>
        </main>
      ) : error || !post ? (
        <main className="flex min-h-[55vh] flex-col items-center justify-center bg-[#FDFADC] px-5 text-center text-[#1A2D5B]">
          <p role="alert">{error || "This article could not be found."}</p>
          <Link
            to="/blog"
            className="mt-4 border-b border-[#1A2D5B] pb-1 text-[13px] font-semibold"
          >
            Back to all articles
          </Link>
        </main>
      ) : (
        <main className="overflow-hidden bg-[#FDFADC] text-[#1A2D5B]">
          <section className="relative h-[420px] overflow-hidden bg-[#FDFADC] sm:h-[500px] lg:h-[537px]">
            <img
              src={post.featuredImage || heroImage}
              alt={post.featuredImage ? post.featuredImageAlt || post.title : ""}
              className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03102E]/90 via-[#1A2D5B]/35 to-transparent" />
            <div className="relative z-10 flex h-full items-end px-5 pb-[70px] sm:px-[5vw] lg:pb-[140px]">
              <h1 className="m-0 max-w-[980px] text-[26px] leading-[32px] text-white sm:text-[29px] sm:leading-[36px] lg:text-[31px] lg:leading-[38px]">
                <span className="font-['DM_Sans'] font-bold">{post.title}</span>
              </h1>
            </div>
          </section>

          <section className="px-5 pb-[64px] pt-[56px] sm:px-8 lg:px-0 lg:pt-[96px]">
            <div className="mx-auto grid w-full max-w-[980px] grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-x-[80px]">
              <aside className="order-2 mx-auto w-full max-w-[480px] bg-[#FAFAFA] px-4 pb-[53px] pt-[42px] lg:order-1 lg:mx-0">
                <div className="bg-[#F8F4D4] px-4 pb-[58px] pt-[36px]">
                  <span className="flex h-[19px] w-fit items-center rounded-full bg-white/25 px-[10px]">
                    <span className="font-['DM_Sans'] text-[9px] font-semibold uppercase leading-none tracking-[0.08em] text-[#964A21]">
                      Related stories
                    </span>
                  </span>
                  <h2 className="mt-[10px] text-[30px] leading-[38px] text-[#1A2D5B]">
                    <span className="font-['DM_Sans'] font-semibold">
                      <span className="block">More stories</span>
                      <span className="block">like this</span>
                    </span>
                  </h2>
                </div>

                <div className="mt-[40px] space-y-[18px] sm:mt-[59px]">
                  {relatedPosts.length ? (
                    relatedPosts.map((relatedPost, index) => (
                      <RelatedCard
                        key={relatedPost.id || relatedPost.slug}
                        post={relatedPost}
                        fallbackImage={index === 0 ? relatedImageOne : relatedImageTwo}
                      />
                    ))
                  ) : (
                    <p className="px-2 font-['DM_Sans'] text-[14px] text-[#1A2D5B]/70">
                      More articles coming soon.
                    </p>
                  )}
                </div>
              </aside>

              <article className="order-1 lg:order-2">
                <header className="mb-[22px]">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#964A21]">
                    {categoryFor(post)}
                  </p>
                  <h2 className="m-0 text-[29px] leading-[34px] text-[#132247]">
                    <span className="font-['DM_Sans'] font-semibold">{post.title}</span>
                  </h2>
                  {post.excerpt && (
                    <p className="mt-[18px] text-[16px] leading-[24px] text-[#1A2D5B]">
                      <span className="font-['DM_Sans'] font-medium">{post.excerpt}</span>
                    </p>
                  )}
                  <p className="mt-3 text-[11px] uppercase tracking-[0.1em] text-[#1A2D5B]/65">
                    <span className="font-['DM_Sans']">
                      By {post.author || "Test-Jedi"}
                    </span>
                  </p>
                </header>

                <ArticleBody content={post.content} />

                <div className="mt-10 text-right">
                  <Link
                    to="/blog"
                    className="text-[12px] uppercase tracking-[0.1em] text-[#964A21] transition-colors hover:text-[#132247]"
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
