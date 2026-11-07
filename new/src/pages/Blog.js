import { Link } from "react-router-dom";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import blogPost1 from "../assets/blog-post-1.svg";
import blogPost2 from "../assets/blog-post-2.svg";
import blogPost3 from "../assets/blog-post-3.svg";
import blogPost4 from "../assets/blog-post-4.svg";
import blogPost5 from "../assets/blog-post-5.svg";
import blogPost6 from "../assets/blog-post-6.svg";
import blogPost7 from "../assets/blog-post-7.svg";

export const articleHref = "/postman-made-simple-5-todays-analogy-sending-a-letter";

export const featuredPost = {
  category: "POSTMAN",
  title: "Postman Made Simple #5 : Today's Analogy: Sending a Letter 📩",
  image: blogPost7,
  href: articleHref,
  hasDetail: true,
};

export const posts = [
  {
    category: "Automation Testing",
    title: "CSS Selectors:",
    excerptLines: [
      "Ever wrestled with your automation tool",
      "failing to generate the perfect selector",
      "for your test case?",
    ],
    image: blogPost1,
  },
  {
    category: "Automation Testing",
    title: "Send and Download on Postman -",
    excerpt: "1 Click, 2 Functions",
    image: blogPost2,
  },
  {
    category: "Automation Testing",
    title: "Solving the age old issue of OTP validation in automated tests",
    image: blogPost3,
  },
  {
    category: "API Testing",
    title: "A few things make automated regression actually work well",
    image: blogPost4,
  },
  {
    category: "POSTMAN",
    title: "Postman Made Simple #5 :",
    excerpt: "Today's Analogy: Sending a Letter",
    image: blogPost5,
    href: articleHref,
    hasDetail: true,
  },
  {
    category: "Technology & Software",
    title: "How a gaming software company leveraged Lenkie's credit facility for growth",
    image: blogPost6,
  },
];

const BlogCard = ({ post }) => (
  <>
    <img src={post.image} alt="" loading="lazy" className="h-auto w-full rounded-[16px]" />
    <div className="mt-[16px] flex">
      <span className="inline-flex h-[24px] items-center rounded-full border-2 border-[#C4D5FF] px-[6px]">
        <span className="font-['DM_Sans'] text-[12px] leading-[14px] text-[#1A2D5B]">
          {post.category}
        </span>
      </span>
    </div>
    <p className="mt-[8px] min-h-[96px] text-[16px] leading-[24px] text-dark-brown">
      <span className="font-['DM_Sans']">
        <span className="block font-['Barlow_Condensed'] text-[20px] font-bold leading-[24px] tracking-[0.02em]">
          {post.title}
        </span>
        {post.excerptLines && post.excerptLines.map((line) => (
          <span key={line} className="block">{line}</span>
        ))}
        {post.excerpt && <span className="block">{post.excerpt}</span>}
      </span>
    </p>
  </>
);

const BlogPage = () => (
  <>
    <Navbar />
    <main className="bg-light-brown pb-20 sm:pb-24 lg:pb-[132px]">
      <h1 className="sr-only">Test-Jedi blog</h1>
      <div className="mx-auto w-full max-w-[1176px] px-5">
        <section className="pt-[21px]" aria-label="Featured article">
          <Link to={featuredPost.href} className="group relative block h-[220px] overflow-hidden rounded-[12px] sm:h-[240px] lg:h-[257px]">
            <img src={featuredPost.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,#132247_90.5%,#132247_100%)]" />
            <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-[34px]">
              <span className="inline-flex h-[22px] items-center rounded-full bg-white px-[10px] text-[11px] font-semibold uppercase text-[#1A2D5B]">
                {featuredPost.category}
              </span>
              <span className="mt-[14px] block font-['Barlow'] text-[22px] font-bold leading-none text-light-brown sm:text-[28px] lg:text-[34px]">
                {featuredPost.title}
              </span>
            </span>
          </Link>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-x-[26px] gap-y-9 sm:mt-10 sm:grid-cols-2 lg:mt-[49px] lg:grid-cols-3 lg:gap-y-[37px]" aria-label="Blog articles">
          {posts.map((post) => {
            const className = "block rounded-[16px] bg-white p-3 pb-[10px] ring-1 ring-inset ring-dark-brown/10";
            return post.hasDetail ? (
              <Link key={`${post.category}-${post.title}`} to={post.href} className={`${className} transition-transform duration-300 hover:-translate-y-1`}>
                <BlogCard post={post} />
              </Link>
            ) : (
              <article key={`${post.category}-${post.title}`} className={className}>
                <BlogCard post={post} />
              </article>
            );
          })}
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default BlogPage;
