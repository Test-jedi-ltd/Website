import Navbar from "../sections/Navbar";

const services = [
  {
    number: "03",
    eyebrow: "PERFORMANCE",
    title: ["SPEED UNDER", "REAL LOAD"],
    body:
      "We audit speed and stability, find the gaps and recommend optimisations, so responsiveness holds at peak.",
  },
  {
    number: "04",
    eyebrow: "SECURITY",
    title: ["CERTIFIED AND", "ENTERPRISE-READY"],
    body:
      "Vulnerability testing, access-control checks and secure data handling across tester management.",
  },
  {
    number: "05",
    eyebrow: "FUNCTIONAL",
    title: ["INTENDED OUTPUT,", "EVERY INPUT"],
    body:
      "Rigorous validation so there are no confusing misfires for your customers on release day.",
  },
];

const steps = [
  "We read the scope and come back with questions, in writing.",
  "You get a test plan, a team shape and a price within two days.",
  "Approve it and testing starts - 48 hours for a burst, two weeks for a dedicated team",
];

const deliverables = [
  ["Scope \u00b7 6 modules", "Approved"],
  ["Cases \u00b7 2,148", "Designed"],
  ["Environments \u00b7 3", "Provisioned"],
  ["Exit criteria", "0 blockers"],
];

const framework = [
  ["Smoke \u00b7 84 cases"],
  ["Regression \u00b7 1,206 cases"],
  ["Cross-browser \u00b7 5 targets", "2 failed"],
  ["Visual diff \u00b7 212 screens"],
];

const Eyebrow = ({ children, className = "" }) => (
  <p className={`text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-accent-brown ${className}`}>
    <span className="font-['DM_Sans'] font-semibold">{children}</span>
  </p>
);

const Bullet = ({ children }) => (
  <li className="flex gap-[11px] text-[14px] leading-[14px] text-dark-brown">
    <span aria-hidden="true" className="font-['DM_Sans']">
      -
    </span>
    <span className="font-['DM_Sans']">{children}</span>
  </li>
);

const ServiceOne = () => (
  <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_652px] lg:gap-[63px]">
    <div>
      <Eyebrow>01 Full-cycle testing</Eyebrow>
      <h2 className="mt-[12px] text-[42px] leading-none text-dark-brown">
        <span className="font-['Barlow_Condensed'] font-bold uppercase">Owned end to end</span>
      </h2>
      <p className="mt-[14px] max-w-[613px] text-[15px] leading-[24px] text-dark-brown">
        <span className="font-['DM_Sans']">
          We write the strategy, build the cases, run them at each milestone and sign off with you.
          <br />
          Efficient QA across the whole cycle so you launch without a glitch.
        </span>
      </p>
      <ul className="mt-[22px] space-y-[14px]">
        <Bullet>Test strategy and risk map</Bullet>
        <Bullet>Case design and traceability matrix</Bullet>
        <Bullet>Milestone and release sign-off</Bullet>
      </ul>
    </div>

    <div className="relative w-full bg-dark-brown px-4 pb-4 pt-10 lg:-mt-[3px] lg:max-w-[652px] lg:justify-self-end">
      <p className="absolute left-[21px] top-[19px] text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-medium-brown">
        <span className="font-['DM_Sans'] font-semibold">Deliverable &middot; Test plan vs</span>
      </p>
      <div className="bg-white lg:h-[202px]">
        <div className="flex h-[51px] items-center px-[18px] pt-[3px]">
          <p className="text-[15px] font-medium uppercase tracking-[-0.005em] text-dark-brown">
            <span className="font-['DM_Sans'] font-medium">Checkout release 4.2</span>
          </p>
        </div>
        {deliverables.map(([label, status], index) => (
          <div
            key={label}
            className="mx-[18px] flex h-[33px] items-center justify-between border-t border-dark-brown"
          >
            <span className="text-[13px] leading-none text-dark-brown">
              <span className="font-['DM_Sans']">{label}</span>
            </span>
            <span
              className={`text-[13px] leading-none ${
                index === deliverables.length - 1 ? "text-accent-brown" : "text-dark-brown"
              }`}
            >
              <span className="font-['DM_Sans']">{status}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ServiceTwo = () => (
  <div className="mt-[99px] grid gap-10 lg:grid-cols-[662px_minmax(0,1fr)] lg:gap-[56px]">
    <div className="bg-medium-brown p-[26px]">
      <div className="flex gap-[15px] text-[10px] font-semibold uppercase leading-none tracking-[0.16em] text-dark-brown">
        <span className="font-['DM_Sans'] font-semibold">Pipeline</span>
        <span className="font-['DM_Sans'] font-semibold">Nightly</span>
      </div>
      <div className="mt-[17px] space-y-[10px]">
        {framework.map(([label, status]) => (
          <div
            key={label}
            className="flex h-[36px] items-center justify-between bg-white px-[15px]"
          >
            <span className="text-[13px] leading-none text-dark-brown">
              <span className="font-['DM_Sans']">{label}</span>
            </span>
            {status ? (
              <span className="text-[12px] leading-none text-accent-brown">
                <span className="font-['DM_Sans']">{status}</span>
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>

    <div className="lg:max-w-[533px] lg:pt-[3px]">
      <Eyebrow>02 Test automation</Eyebrow>
      <h2 className="mt-[12px] text-[42px] leading-none text-dark-brown">
        <span className="font-['Barlow_Condensed'] font-bold uppercase">Runs while you sleep</span>
      </h2>
      <p className="mt-[14px] text-[15px] leading-[24px] text-dark-brown">
        <span className="font-['DM_Sans']">
          Precisely engineered scripts catch issues across browsers, performance and
          <br />
          regression at
          <br />
          speed. Wired into your CI, reported where your team already looks.
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

const ServiceGrid = () => (
  <div className="mt-[124px] grid gap-10 lg:grid-cols-3 lg:gap-[56px] lg:pr-[14px]">
    {services.map((service) => (
      <article key={service.number}>
        <Eyebrow>
          {service.number} {service.eyebrow}
        </Eyebrow>
        <h2 className="mt-[12px] text-[30px] leading-[0.97] text-dark-brown">
          <span className="font-['Barlow_Condensed'] font-bold uppercase">
            {service.title.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </span>
        </h2>
        <p className="mt-[11px] max-w-[410px] text-[14px] leading-[22px] text-dark-brown">
          <span className="font-['DM_Sans']">{service.body}</span>
        </p>
      </article>
    ))}
  </div>
);

const Field = ({ label, id, type = "text", placeholder, select = false }) => (
  <label className="block leading-none text-dark-brown" htmlFor={id}>
    <span className="block text-[12px] font-semibold uppercase leading-none tracking-[0.12em]">
      <span className="font-['DM_Sans'] font-semibold">{label}</span>
    </span>
    {select ? (
      <select
        id={id}
        defaultValue=""
        className="mt-[6px] h-[52px] w-full appearance-none border border-dark-brown bg-white px-4 text-[15px] text-dark-brown outline-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        <option>Full-cycle testing</option>
        <option>Test automation</option>
        <option>Performance testing</option>
        <option>Security testing</option>
        <option>Functional testing</option>
      </select>
    ) : (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="mt-[6px] h-[52px] w-full border border-dark-brown bg-white px-4 text-[15px] text-dark-brown outline-none placeholder:text-[#757575]"
      />
    )}
  </label>
);

const ContactForm = () => (
  <form onSubmit={(event) => event.preventDefault()} className="mt-[15px] w-full max-w-[844px] bg-medium-brown p-5 sm:px-[31px] sm:pb-[32px] sm:pt-[50px]">
    <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
      <Field id="full-name" label="Full name" placeholder="Your name" />
      <Field id="work-email" label="Work email" type="email" placeholder="name@company.com" />
      <Field id="company" label="Company" placeholder="Company name" />
      <Field id="service" label="Service needed" placeholder="Select a service" select />
    </div>

    <p className="mt-[18px] text-[12px] font-semibold uppercase leading-none tracking-[0.12em] text-dark-brown">
      <span className="font-['DM_Sans'] font-semibold">Target date</span>
    </p>
    <div className="mt-[5px] flex flex-wrap gap-[6px]">
      {["This month", "Next quarter", "Ongoing"].map((option) => (
        <button
          key={option}
          type="button"
          className="h-[38px] border border-dark-brown bg-white px-[18px] text-[13px] leading-none text-dark-brown"
        >
          <span className="font-['DM_Sans']">{option}</span>
        </button>
      ))}
    </div>

    <label className="mt-[17px] block leading-none text-dark-brown" htmlFor="testing-scope">
      <span className="block text-[12px] font-semibold uppercase leading-none tracking-[0.12em]">
        <span className="font-['DM_Sans'] font-semibold">What needs testing?</span>
      </span>
      <textarea
        id="testing-scope"
        placeholder="Product, platforms, what's already covered"
        className="mt-[6px] h-[114px] w-full resize-none border border-dark-brown bg-white px-4 pb-4 pt-[14px] text-[15px] leading-[22px] text-dark-brown outline-none placeholder:text-[#757575]"
      />
    </label>

    <div className="mt-[23px] flex flex-wrap items-center gap-[18px]">
      <button
        type="submit"
        className="h-[45px] bg-accent-brown px-[31px] text-[15px] leading-none text-light-brown"
      >
        <span className="font-['DM_Sans']">Send us a message</span>
      </button>
      <a
        href="mailto:hello@test-jedi.com"
        className="text-[13px] leading-none text-dark-brown underline-offset-4 hover:underline"
      >
        <span className="font-['DM_Sans']">Or email hello@test-jedi.com</span>
      </a>
    </div>
  </form>
);

const NextSteps = () => (
  <div className="min-h-[241px] bg-dark-brown px-[28px] pb-[26px] pt-[29px]">
    <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-medium-brown">
      <span className="font-['DM_Sans'] font-semibold">What happens next</span>
    </p>
    <div className="mt-[15px] space-y-[14px]">
      {steps.map((step, index) => (
        <div key={step} className="grid grid-cols-[14px_minmax(0,1fr)] gap-x-[24px]">
          <span className="mt-1 text-[10px] font-bold leading-none text-accent-brown">
            <span className="font-['DM_Sans']">{`0${index + 1}`}</span>
          </span>
          <p className="max-w-[300px] text-[14px] leading-[22px] text-light-brown">
            <span className="font-['DM_Sans']">{step}</span>
          </p>
        </div>
      ))}
    </div>
  </div>
);

const ContactDetails = () => (
  <div className="mt-[23px] min-h-[220px] border border-dark-brown bg-white px-[28px] pb-[24px] pt-[27px]">
    <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown">
      <span className="font-['DM_Sans'] font-semibold">Direct</span>
    </p>
    <div className="mt-[19px] space-y-[18px]">
      <div>
        <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown">
          <span className="font-['DM_Sans'] font-semibold">Email</span>
        </p>
        <a href="mailto:hello@test-jedi.com" className="mt-[7px] block text-[15px] leading-none text-dark-brown">
          <span className="font-['DM_Sans']">hello@test-jedi.com</span>
        </a>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown">
          <span className="font-['DM_Sans'] font-semibold">Phone</span>
        </p>
        <a href="tel:+2348067268511" className="mt-[7px] block text-[15px] leading-none text-dark-brown">
          <span className="font-['DM_Sans']">+234 806 726 8511</span>
        </a>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown">
          <span className="font-['DM_Sans'] font-semibold">Hours</span>
        </p>
        <p className="mt-[7px] text-[15px] leading-none text-dark-brown">
          <span className="font-['DM_Sans']">Mon-Fri, WAT</span>
        </p>
      </div>
    </div>
  </div>
);

const Testimonial = () => (
  <figure className="mt-[23px] bg-medium-brown px-[24px] pb-[24px] pt-[24px]">
    <blockquote className="text-[16px] leading-[24px] text-dark-brown">
      <span className="font-['DM_Sans']">
        &ldquo;They replied with a plan, not a sales call. We started four days later.&rdquo;
      </span>
    </blockquote>
    <figcaption className="mt-[12px] text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-[#645A6D]">
      <span className="font-['DM_Sans'] font-semibold">
        Head of engineering &middot; Logistics platform
      </span>
    </figcaption>
  </figure>
);

const ServicesPage = () => (
  <>
    <Navbar />
    <main className="overflow-hidden bg-light-brown text-dark-brown">
      <section className="px-5 pb-[72px] pt-16 md:px-[4vw] md:pb-[100px] md:pt-[95px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_388px] lg:items-end lg:gap-[80px] lg:pr-8">
          <h1 className="text-[48px] leading-[0.88] text-dark-brown sm:text-[64px] md:text-[72px] lg:text-[78px] lg:leading-[68px]">
            <span className="font-['Barlow_Condensed'] font-bold uppercase">
              <span className="block">What we run,</span>
              <span className="block">and what you</span>
              <span className="block">get back</span>
            </span>
          </h1>
          <p className="max-w-[800px] text-[16px] leading-[25px] text-dark-brown lg:translate-y-[2px] lg:justify-self-end">
            <span className="font-['DM_Sans']">
              Each engagement ships the same three artefacts: a test plan you approve up front, a
              run report you can audit, and defect tickets your engineers can act on without asking
              us a question.
            </span>
          </p>
        </div>
      </section>

      <section className="px-5 pb-[58px] md:px-[4vw]">
        <ServiceOne />
        <ServiceTwo />
        <ServiceGrid />
      </section>

      <section id="contact" className="border-t border-dark-brown px-5 pb-[58px] pt-[54px] md:px-[4vw]">
        <div className="grid gap-12 lg:grid-cols-[844px_420px] lg:justify-between lg:gap-0">
          <div>
            <p className="text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-accent-brown">
              <span className="font-['DM_Sans'] font-semibold">Propose a project</span>
            </p>
            <h2 className="mt-[16px] text-[46px] leading-[44px] tracking-[0.015em] text-dark-brown sm:text-[56px] sm:leading-[53px] lg:text-[64px] lg:leading-[60px]">
              <span className="font-['Barlow_Condensed'] font-bold uppercase">
                <span className="block">Tell us the scope</span>
                <span className="block">and the deadline</span>
              </span>
            </h2>
            <p className="mt-[15px] max-w-[479px] text-[16px] leading-[26px] text-dark-brown">
              <span className="font-['DM_Sans']">
                We reply within two working days with a test plan, a team shape and a price. No
                discovery call required first.
              </span>
            </p>
            <ContactForm />
          </div>

          <div>
            <NextSteps />
            <ContactDetails />
            <Testimonial />
          </div>
        </div>
      </section>
    </main>
  </>
);

export default ServicesPage;

