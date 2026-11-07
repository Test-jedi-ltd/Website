import { Link, useNavigate } from "react-router-dom";
import { labelConfig } from "../assets/static.config";
import { featuredPost, posts } from "../pages/Blog";

const Blog = () => {
  const navigate = useNavigate();

  return (
  <section className="px-5 md:px-[7vw] py-24 md:py-28 bg-white" id="blog">
    <div className="grid md:grid-cols-[1fr_auto] items-end gap-8 mb-16">
      <div><p className="font-bold uppercase tracking-[0.19em] text-accent-brown mb-5">{labelConfig.journalEyebrow}</p><h2 className="font-[Playfair_Display] text-5xl md:text-[88px] text-dark-brown">{labelConfig.journalHeading}</h2></div>
      <button
        className="border-b border-dark-brown pb-2 text-dark-brown font-bold"
        onClick={() => navigate("/blog")}
      >
        {labelConfig.viewAllArticles} <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[featuredPost, ...posts].slice(0, 3).map((post, index) => {
        const card = (
          <>
            <img src={post.image} alt="" loading="lazy" className="mb-6 h-[270px] w-full rounded-[16px] object-cover" />
            <p className="text-accent-brown uppercase tracking-[0.12em] text-[11px]">{post.category}</p>
            <h3 className="my-4 text-3xl leading-tight text-dark-brown">{post.title}</h3>
            {post.excerptLines && <span className="leading-6 text-dark-brown">{post.excerptLines.join(" ")}</span>}
            {post.excerpt && <span className="leading-6 text-dark-brown">{post.excerpt}</span>}
            <span className="absolute right-4 bottom-3 text-dark-brown text-[10px] tracking-[0.15em]">TEST / {String(index + 1).padStart(2, "0")}</span>
          </>
        );
        return post.hasDetail ? (
          <Link key={`${post.category}-${post.title}`} to={post.href} className="relative rounded-[16px] bg-white p-3 ring-1 ring-inset ring-dark-brown/10">{card}</Link>
        ) : (
          <article key={`${post.category}-${post.title}`} className="relative rounded-[16px] bg-white p-3 ring-1 ring-inset ring-dark-brown/10">{card}</article>
        );
      })}
    </div>
  </section>
  );
};

export default Blog;
