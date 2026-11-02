import { useNavigate } from "react-router-dom";
import Navbar from "../sections/Navbar";

const contents = [
  ["Where load tests lie", "where-load-tests-lie"],
  ["Queue depth over CPU", "queue-depth-over-cpu"],
  ["Modelling real arrival", "modelling-real-arrival"],
  ["What to report", "what-to-report"],
];

const chartRows = [
  ["CPU utilisation", "58%", "58%", "bg-medium-brown"],
  ["Worker pool saturation", "97%", "97%", "bg-accent-brown"],
  ["p95 time in queue", "4.2s", "84%", "bg-accent-brown"],
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

const Chart = () => (
  <div className="mt-[13px] w-full bg-dark-brown px-[18px] pb-[16px] pt-[26px]">
    <p className="text-[8px] font-semibold uppercase leading-none tracking-[0.14em] text-medium-brown">
      <span className="font-['DM_Sans'] font-semibold">
        Soak run &middot; 5K concurrent sessions
      </span>
    </p>
    <div className="mt-[17px] space-y-[12px]">
      {chartRows.map(([label, value, width, tone]) => (
        <div key={label}>
          <div className="flex items-center justify-between text-[10px] leading-none text-light-brown">
            <span className="font-['DM_Sans']">{label}</span>
            <span className="font-['DM_Sans']">{value}</span>
          </div>
          <div className="mt-[6px] h-[6px] w-full bg-light-brown">
            <div className={`h-[6px] ${tone}`} style={{ width }} />
          </div>
        </div>
      ))}
    </div>
  </div>
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
                  <span className="block">Load testing what</span>
                  <span className="block">actually breaks</span>
                </span>
              </h1>

              <div className="mt-[20px] max-w-[663px] text-[18px] leading-[31px] text-dark-brown/85 sm:text-[20px]">
                <span className="font-['DM_Sans']">
                  <span className="block">
                    Most peak-traffic tests pass because they measure the wrong thing.
                  </span>
                  <span className="block">
                    The server holds; the queue behind it does not.
                  </span>
                </span>
              </div>

              <div className="mt-[22px] h-[2px] w-[64px] bg-accent-brown" aria-hidden="true" />

              <div className="mt-[145px]">
                <Heading id="queue-depth-over-cpu">Queue depth over CPU</Heading>
                <Body>
                  We watch queue depth and time-in-queue before CPU. In four of the last five
                  performance engagements, the first failure was a worker pool saturating while
                  utilisation sat under 60 per cent - a graph that looks healthy right up to the
                  point customers cannot check out.
                </Body>

                <Chart />

                <Heading id="modelling-real-arrival" className="mt-[33px]">
                  Modelling real arrival
                </Heading>
                <Body>
                  Take a week of production logs, find the sharpest minute, and shape the test
                  around that rather than a round number. Add client retries with the same backoff
                  your app ships. The test gets less flattering and much more useful.
                </Body>

                <figure className="mt-[21px] pl-[25px]">
                  <blockquote className="max-w-[638px] text-[19.5px] leading-[30px] text-dark-brown">
                    <span className="font-['DM_Sans']">
                      If your load profile is a straight line, you are testing your load generator.
                    </span>
                  </blockquote>
                </figure>

                <Heading id="what-to-report" className="mt-[31px]">
                  What to report
                </Heading>
                <Body>
                  Three numbers a release manager can act on: the concurrency where p95 crosses
                  your SLA, the component that saturated first, and the cheapest change that moves
                  both. Everything else belongs in the appendix.
                </Body>
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
    </>
  );
};

export default BlogPostPage;
