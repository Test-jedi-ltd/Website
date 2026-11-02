import { useNavigate } from "react-router-dom";
import { labelConfig } from "../assets/static.config";

const posts = [
  ["postAutomation", "postAutomationTitle", "postAutomationText", "post-art-1"],
  ["postPerformance", "postPerformanceTitle", "postPerformanceText", "post-art-2"],
  ["postSecurity", "postSecurityTitle", "postSecurityText", "post-art-3"],
];

const Blog = () => {
  const navigate = useNavigate();

  return (
  <section className="px-5 md:px-[7vw] py-24 md:py-28 bg-white" id="blog">
    <div className="grid md:grid-cols-[1fr_auto] items-end gap-8 mb-16">
      <div><p className="font-bold uppercase tracking-[0.19em] text-accent-brown mb-5">{labelConfig.journalEyebrow}</p><h2 className="font-[Playfair_Display] text-5xl md:text-[88px] text-dark-brown">{labelConfig.journalHeading}</h2></div>
      <button
        className="border-b border-dark-brown pb-2 text-dark-brown font-bold"
        onClick={() => navigate("/blog/load-testing-what-actually-breaks")}
      >
        {labelConfig.viewAllArticles} <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map(([categoryKey, titleKey, textKey, artClass], index) => (
        <article key={titleKey}>
          <div className={`post-art ${artClass} h-[270px] mb-6 relative`}><span className="absolute right-4 bottom-3 text-white text-[10px] tracking-[0.15em]">TEST / {String(index + 1).padStart(2, "0")}</span></div>
          <p className="text-accent-brown uppercase tracking-[0.12em] text-[11px]">{labelConfig[categoryKey]}</p>
          <h3 className=" text-3xl leading-tight my-4 text-dark-brown">{labelConfig[titleKey]}</h3>
          <span className="leading-6 text-dark-brown">{labelConfig[textKey]}</span>
        </article>
      ))}
    </div>
  </section>
  );
};

export default Blog;
