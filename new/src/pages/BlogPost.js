import { Link } from "react-router-dom";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import detailOne from "../assets/blog-post-detail-1.svg";
import detailTwo from "../assets/blog-post-detail-2.svg";
import detailThree from "../assets/blog-post-detail-3.svg";
import detailFour from "../assets/blog-post-detail-4.svg";
import relatedTwo from "../assets/blog-post-related-2.jpg";
import heroImage from "../assets/blog-post-hero.jpg";

const storyImages = [detailOne, detailTwo, detailThree, detailFour];

const relatedStories = [
  {
    category: "POSTMAN",
    title: "Headers Aren't as Complicated as They Sound",
    excerpt: "Today's Analogy: Sending a Letter",
    image: detailTwo,
    imageClass: "h-[137px]",
    to: "/postman-made-simple-5-todays-analogy-sending-a-letter",
  },
  {
    category: "TESTING",
    title: "Is it a Frontend bug... or a Backend bug?",
    image: relatedTwo,
    imageClass: "h-[132px]",
    to: "/blog",
  },
];

const bodyParagraphs = [
  "Last time, we talked about HTTP methods using a restaurant analogy.",
  "This week, let's keep the conversation going.",
  "Think about sending a letter.",
  "The body is the actual letter. It contains the message you want to communicate.",
  "But the envelope carries additional information about the letter and how it should be handled.",
  "That's essentially what HTTP headers do.",
];

const afterBulletsParagraphs = [
  "And just like sending a letter, communication usually goes both ways.",
  "You send a request, and you expect a response in return.",
  "Interestingly, both can have a body and headers.",
  "The request body contains what you're sending to the server, while the request headers provide additional information about how the server should process it.",
  "The response body contains what the server sends back, while the response headers provide additional information about that response.",
  "And to our Jedi younglings currently going through the ongoing Test-Jedi cohort, I hope this makes the whole headers conversation a little easier to understand. 😊",
  "So, when you're working with an API, remember:",
  "Body = The message.",
  "Headers = Extra information about how the message should be handled.",
  "The next time you see a bunch of headers in Postman, don't let them intimidate you. 😄",
];

const closingParagraphs = [
  "They're basically the information written on the envelope.",
  "And just like you wouldn't send a letter without an address on the envelope, an API request sometimes needs its headers to know exactly what to do with your message.",
  "Class dismissed. See you next week. 😄",
];

const bullets = [
  ["👤", "Authorization", "\"Here's my ID. I'm allowed to be here.\""],
  ["📦", "Content Type", "\"This is what's inside the envelope.\""],
  ["📬", "Accept", "\"This is the kind of response I'd like back.\""],
];

const Body = ({ children, className = "" }) => (
  <p className={`m-0 ${className} text-[16px] lg:text-[18px] font-semibold leading-[24px] text-[#1A2D5B]`}>
    <span className="font-['DM_Sans']">{children}</span>
  </p>
);

const RelatedCard = ({ story }) => (
  <Link
    to={story.to}
    className={`block flex flex-col gap-2 rounded-[12px] bg-white p-[7px] ring-1 ring-inset ring-black/5 transition-transform duration-300 hover:-translate-y-0.5 ${
      story.excerpt ? "pb-[24px]" : "pb-[37px]"
    }`}
  >
    <img
      src={story.image}
      alt=""
      loading="lazy"
      className={`${story.imageClass} w-full min-h-[280px] rounded-[8px] object-cover`}
    />
    <span className="mt-[9px] flex h-[14px] w-fit items-center rounded-full border border-[#C4D5FF] bg-white px-[6px]">
      <span className="font-['DM_Sans'] text-[8px] lg:text-[10px] leading-none text-[#1A2D5B]">
        {story.category}
      </span>
    </span>
    <h3 className="mt-[1px] whitespace-pre-line text-[10px] lg:text-[14px] leading-[14px] text-[#1A2D5B]">
      <span className="font-['DM_Sans'] font-semibold">{story.title}</span>
    </h3>
    {story.excerpt && (
      <p className="text-[10px] lg:text-[14px] leading-[14px] text-[#1A2D5B]/70">
        <span className="font-['DM_Sans']">{story.excerpt}</span>
      </p>
    )}
  </Link>
);

const BlogPostPage = () => (
  <>
    <Navbar />
    <main className="overflow-hidden bg-[#FDFADC] text-[#1A2D5B]">
      <section className="relative h-[420px] overflow-hidden bg-[#FDFADC] sm:h-[500px] lg:h-[537px]">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
        />
        <div className="absolute inset-0 opacity-[0.92]" aria-hidden="true">
          <div
            className="absolute rounded-full bg-[#1A2D5B]/[0.37] blur-[90px]"
            style={{ left: 389, top: -45, width: 988, height: 602 }}
          />
          <div
            className="absolute rounded-full bg-[#03102E]/[0.71] blur-[82px]"
            style={{ left: -138, top: -101, width: 942, height: 729 }}
          />
        </div>
        <div className="relative z-10 flex h-full items-end px-5 pb-[70px] sm:px-[5vw] lg:pb-[140px]">
          <h1 className="m-0  text-[26px] leading-[32px] text-white sm:text-[29px] sm:leading-[36px] lg:text-[31px] lg:leading-[38px]">
            <span className="font-['DM_Sans'] font-bold">
              <span className="block">Postman Made Simple #5 :</span>
              <span className="block">Today's Analogy: Sending a Letter 📩</span>
            </span>
          </h1>
        </div>
      </section>

      <section className="px-5 pb-[64px] pt-[56px] sm:px-8 lg:px-0 lg:pt-[96px]">
        <div className="mx-auto grid w-full max-w-[980px] grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-x-[80px]">
          <aside className="mx-auto w-full max-w-[480px] bg-[#FAFAFA] px-4 pb-[53px] pt-[42px] lg:order-1 lg:mx-0">
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

            <div className="mt-[59px] space-y-[18px]">
              {relatedStories.map((story) => (
                <RelatedCard key={story.title} story={story} />
              ))}
            </div>
          </aside>

          <article className="order-1 lg:order-2 ">
            <header>
              <h1 className="m-0 text-[29px] leading-[34px] text-[#132247]">
                <span className="font-['DM_Sans'] font-semibold">
                  Postman Made Simple #5
                </span>
              </h1>
              <p className="mt-[22px] text-[16px] leading-[24px] text-[#1A2D5B]">
                <span className="font-['DM_Sans'] font-medium">
                  Headers Aren't as Complicated as They Sound
                </span>
              </p>
              <p className="m-0 text-[16px] leading-[24px] text-[#1A2D5B]">
                <span className="font-['DM_Sans'] font-medium">
                  Today's Analogy: Sending a Letter 📩
                </span>
              </p>
            </header>

            <div className="mt-[22px]">
              {bodyParagraphs.map((text) => (
                <Body key={text}>{text}</Body>
              ))}

              <ul className="m-0 list-none p-0">
                {bullets.map(([icon, label, quote]) => (
                  <li key={label}>
                    <p className="m-0 text-[16px] leading-[24px] text-[#1A2D5B]">
                      <span className="font-['DM_Sans']">
                        <span className="mr-[4px]">{icon}</span>
                        {label} &rarr; {quote}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>

              {afterBulletsParagraphs.map((text) => (
                <Body key={text}>{text}</Body>
              ))}

              {closingParagraphs.map((text) => (
                <Body
                  key={text}
                  className={
                    text.startsWith("And just like you")
                      ? "max-w-[630px]"
                      : "max-w-[626px]"
                  }
                >
                  {text}
                </Body>
              ))}
            </div>

            <div className="mt-[64px] lg:space-y-[76px]">
              {storyImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  loading="lazy"
                  className="h-[240px] lg:h-full w-full rounded-[12px] object-fill"
                />
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default BlogPostPage;
