import Navbar from "../sections/Navbar";
import ContactSection from "../sections/ContactSection";
import Footer from "../sections/Footer";
import serviceIllustrationOne from "../assets/illustration-services.svg";
import serviceIllustrationTwo from "../assets/illustration-services-2.svg";

const services = [
  ["03", "Performance", ["Speed under", "real load"], "We audit speed and stability, find the gaps and recommend optimisations, so responsiveness holds at peak."],
  ["04", "Security", ["Certified and", "enterprise-ready"], "Vulnerability testing, access-control checks and secure data handling across tester management."],
  ["05", "Functional", ["Intended output,", "every input"], "Rigorous validation so there are no confusing misfires for your customers on release day."],
];

const Eyebrow = ({ children }) => (
  <p className="text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-accent-brown">
    <span className="font-['DM_Sans'] font-semibold">{children}</span>
  </p>
);

const Bullet = ({ children }) => (
  <li className="flex gap-[11px] text-[14px] leading-5 text-dark-brown">
    <span aria-hidden="true">-</span>
    <span className="font-['DM_Sans']">{children}</span>
  </li>
);

const ServiceOne = () => (
  <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-[56px]">
    <div>
      <Eyebrow>01 Full-cycle testing</Eyebrow>
      <h2 className="mt-[12px] text-[42px] leading-none text-dark-brown">
        <span className="font-['Barlow_Condensed'] font-bold uppercase">Owned end to end</span>
      </h2>
      <p className="mt-[14px] text-[16px] leading-[24px] text-dark-brown lg:text-[20px]">
        <span className="font-['DM_Sans']">
          We write the strategy, build the cases, run them at each milestone and sign off with you.
          Efficient QA across the whole cycle so you launch without a glitch.
        </span>
      </p>
      <ul className="mt-[22px] space-y-[14px]">
        <Bullet>Test strategy and risk map</Bullet>
        <Bullet>Case design and traceability matrix</Bullet>
        <Bullet>Milestone and release sign-off</Bullet>
      </ul>
    </div>
    <img src={serviceIllustrationOne} alt="Full-cycle testing workflow" className="h-auto w-full" />
  </div>
);

const ServiceTwo = () => (
  <div className="mt-[99px] grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-[56px]">
    <img src={serviceIllustrationTwo} alt="Test automation pipeline" className="h-auto w-full lg:order-first" />
    <div>
      <Eyebrow>02 Test automation</Eyebrow>
      <h2 className="mt-[12px] text-[42px] leading-none text-dark-brown">
        <span className="font-['Barlow_Condensed'] font-bold uppercase">Runs while you sleep</span>
      </h2>
      <p className="mt-[14px] text-[16px] leading-[24px] text-dark-brown lg:text-[20px]">
        <span className="font-['DM_Sans']">
          Precisely engineered scripts catch issues across browsers, performance and regression at speed.
          Wired into your CI, reported where your team already looks.
        </span>
      </p>
      <ul className="mt-[22px] space-y-[14px]">
        <Bullet>Framework build and handover</Bullet>
        <Bullet>CI integration and flake control</Bullet>
        <Bullet>Suite maintenance as the product moves</Bullet>
      </ul>
    </div>
  </div>
);

const ServicesPage = () => (
  <>
    <Navbar />
    <main className="overflow-hidden bg-light-brown text-dark-brown">
      <section className="px-5 pb-[72px] pt-16 md:px-[4vw] md:pb-[100px] md:pt-[95px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_388px] lg:items-end lg:gap-[80px]">
          <h1 className="text-[48px] leading-[0.88] sm:text-[64px] md:text-[72px] lg:text-[78px] lg:leading-[68px]">
            <span className="font-['Barlow_Condensed'] font-bold uppercase">
              <span className="block">What we run,</span>
              <span className="block">and what you</span>
              <span className="block">get back</span>
            </span>
          </h1>
          <p className="text-[16px] leading-[25px] lg:text-[20px]">
            <span className="font-['DM_Sans']">
              Each engagement ships the same three artefacts: a test plan you approve up front, a run
              report you can audit, and defect tickets your engineers can act on without asking us a question.
            </span>
          </p>
        </div>
      </section>

      <section className="px-5 pb-[58px] md:px-[4vw]">
        <ServiceOne />
        <ServiceTwo />
        <div className="mt-[124px] grid gap-10 lg:grid-cols-3 lg:gap-[56px]">
          {services.map(([number, eyebrow, title, body]) => (
            <article key={number}>
              <Eyebrow>{number} {eyebrow}</Eyebrow>
              <h2 className="mt-[12px] text-[30px] leading-[0.97]">
                <span className="font-['Barlow_Condensed'] font-bold uppercase">
                  {title.map((line) => <span className="block" key={line}>{line}</span>)}
                </span>
              </h2>
              <p className="mt-[11px] text-[14px] leading-[22px]">
                <span className="font-['DM_Sans']">{body}</span>
              </p>
            </article>
          ))}
        </div>
      </section>
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default ServicesPage;
