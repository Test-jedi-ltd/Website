import { useNavigate } from "react-router-dom";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import detailOne from "../assets/blog-post-detail-1.svg";
import detailTwo from "../assets/blog-post-detail-2.svg";
import detailThree from "../assets/blog-post-detail-3.svg";
import detailFour from "../assets/blog-post-detail-4.svg";

const contents = [
  ["The letter", "the-letter"],
  ["The headers", "the-headers"],
  ["Request and response", "request-response"],
  ["The takeaway", "the-takeaway"],
];

const nextPosts = ["A test suite you can still read in a year", "Access control is a test case"];

const Body = ({ children }) => (
  <p className="mt-[10px] max-w-[663px] text-[16px] leading-[28px] text-dark-brown/80">
    <span className="font-['DM_Sans']">{children}</span>
  </p>
);

const Heading = ({ id, children, className = "" }) => (
  <h2 id={id} className={`scroll-mt-28 text-[36px] leading-none text-dark-brown ${className}`}>
    <span className="font-['Barlow_Condensed'] font-bold uppercase">{children}</span>
  </h2>
);

const BlogPostPage = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact");
  };

  const goToBlog = () => {
    if (document.getElementById("blog")) {
      document.getElementById("blog").scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/");
    window.setTimeout(() => {
      document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-light-brown text-dark-brown">
        <section className="px-5 pb-[46px] pt-12 md:px-[4vw] md:pt-[57px]">
          <div className="grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)_240px] lg:items-start lg:gap-x-[68px]">
            <nav aria-label="Article contents" className="block">
              <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown">
                <span className="font-['DM_Sans'] font-semibold">Contents</span>
              </p>
              <ul className="mt-[15px] flex flex-wrap gap-x-6 gap-y-3 text-[13px] leading-[14px] lg:block lg:space-y-[13px]">
                {contents.map(([label, id], index) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`text-[13px] leading-[14px] ${
                        index === 0 ? "text-accent-brown" : "text-dark-brown/70"
                      }`}
                    >
                      <span className="font-['DM_Sans']">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <article id="where-load-tests-lie" className="max-w-[663px] scroll-mt-28">
              <div className="flex flex-wrap items-center gap-x-[14px] gap-y-3">
                <span className="inline-flex h-[22px] w-[108px] items-center justify-center bg-dark-brown text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-light-brown">
                  <span className="font-['DM_Sans'] font-semibold">Performance</span>
                </span>
                <span className="text-[11px] leading-none text-dark-brown/55">
                  <span className="font-['DM_Sans']">7 min read &middot; 12 August 2026</span>
                </span>
              </div>

              <h1 className="mt-[24px] text-[52px] leading-[0.94] text-dark-brown sm:text-[64px] sm:leading-[58px]">
                <span className="font-['Barlow_Condensed'] font-bold uppercase tracking-[0.005em]">
                  <span className="block">Postman Made Simple #5 :</span>
                  <span className="block">Today's Analogy: Sending a Letter 📩</span>
                </span>
              </h1>

              <div className="mt-[20px] max-w-[663px] text-[18px] leading-[31px] text-dark-brown/85 sm:text-[20px]">
                <span className="font-['DM_Sans']">
                  <span className="block">Headers Aren't as Complicated as They Sound</span>
                  <span className="block">Today's Analogy: Sending a Letter 📩</span>
                </span>
              </div>

              <div className="mt-[22px] h-[2px] w-[64px] bg-accent-brown" aria-hidden="true" />

              <img src={detailOne} alt="" className="mt-[52px] h-auto w-full rounded-[4px]" />
              <div className="mt-[52px]">
                <Heading id="the-letter">Think about sending a letter.</Heading>
                <Body>
                  Last time, we talked about HTTP methods using a restaurant analogy. This week, let's keep the conversation going.
                </Body>
                <Body>The body is the actual letter. It contains the message you want to communicate. But the envelope carries additional information about the letter and how it should be handled. That's essentially what HTTP headers do.</Body>
                <img src={detailTwo} alt="" className="mt-[32px] h-auto w-full rounded-[4px]" />
                <Heading id="the-headers" className="mt-[52px]">The headers</Heading>
                <Body>👤 Authorization → "Here's my ID. I'm allowed to be here."</Body>
                <Body>📦 Content Type → "This is what's inside the envelope."</Body>
                <Body>📬 Accept → "This is the kind of response I'd like back."</Body>
                <Heading id="request-response" className="mt-[52px]">Request and response</Heading>
                <Body>Communication usually goes both ways. You send a request, and you expect a response in return. Interestingly, both can have a body and headers.</Body>
                <Body>The request body contains what you're sending to the server, while request headers provide additional information about how the server should process it.</Body>
                <Body>The response body contains what the server sends back, while response headers provide additional information about that response.</Body>
                <Body>And to our Jedi younglings currently going through the ongoing Test-Jedi cohort, I hope this makes the whole headers conversation a little easier to understand. 😊</Body>
                <img src={detailThree} alt="" className="mt-[32px] h-auto w-full rounded-[4px]" />
                <Heading id="the-takeaway" className="mt-[52px]">The takeaway</Heading>
                <Body>When you're working with an API, remember: Body = The message. Headers = Extra information about how the message should be handled.</Body>
                <Body>The next time you see a bunch of headers in Postman, don't let them intimidate you. 😄 They're basically the information written on the envelope.</Body>
                <Body>And just like you wouldn't send a letter without an address on the envelope, an API request sometimes needs its headers to know exactly what to do with your message.</Body>
                <Body>Class dismissed. See you next week. 😄</Body>
                <img src={detailFour} alt="" className="mt-[32px] h-auto w-full rounded-[4px]" />
              </div>
            </article>

            <aside className="w-full lg:w-[240px]">
              <div className="bg-medium-brown px-[23px] pb-[22px] pt-[24px]">
                <p className="text-[20px] leading-[19px] text-dark-brown">
                  <span className="font-['Barlow_Condensed'] font-bold uppercase">
                    <span className="block">Need a performance</span>
                    <span className="block">pass?</span>
                  </span>
                </p>
                <p className="mt-[14px] text-[14px] leading-[20px] text-dark-brown">
                  <span className="font-['DM_Sans']">
                    Send us the build and the peak you&rsquo;re planning for.
                  </span>
                </p>
                <button
                  type="button"
                  onClick={goToContact}
                  className="mt-[15px] h-[38px] w-full bg-accent-brown text-[13px] leading-none text-light-brown sm:w-[196px]"
                >
                  <span className="font-['DM_Sans']">Propose a project</span>
                </button>
              </div>

              <div className="mt-[21px] h-px w-full bg-dark-brown" aria-hidden="true" />

              <p className="mt-[17px] text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown">
                <span className="font-['DM_Sans'] font-semibold">Next</span>
              </p>
              <div className="mt-[11px] flex flex-col gap-[12px]">
                {nextPosts.map((title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={goToBlog}
                    className="max-w-[240px] text-left text-[15px] leading-[18px] text-dark-brown hover:underline hover:underline-offset-4"
                  >
                    <span className="font-['DM_Sans']">{title}</span>
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPostPage;
