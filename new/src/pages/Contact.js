import Navbar from "../sections/Navbar";

const steps = [
  "We read the scope and come back with questions, in writing.",
  "You get a test plan, a team shape and a price within two days.",
  "Approve it and testing starts - 48 hours for a burst, two weeks for a dedicated team.",
];

const Field = ({ label, id, type = "text", placeholder, select = false, required = false }) => (
  <label className="block leading-none text-dark-brown" htmlFor={id}>
    <span className="flex items-center text-[12px] font-semibold uppercase leading-none tracking-[0.12em]">
      <span className="font-['DM_Sans'] font-semibold">{label}</span>
      {required ? <span aria-hidden="true" className="ml-[6px] h-[3px] w-[3px] rounded-full bg-accent-brown" /> : null}
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
      <Field id="contact-name" label="Full name" placeholder="Your name" required />
      <Field id="contact-email" label="Work email" type="email" placeholder="name@company.com" required />
      <Field id="contact-company" label="Company" placeholder="Company name" required />
      <Field id="contact-service" label="Service needed" placeholder="Select a service" select />
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

    <label className="mt-[17px] block leading-none text-dark-brown" htmlFor="contact-scope">
      <span className="block text-[12px] font-semibold uppercase leading-none tracking-[0.12em]">
        <span className="font-['DM_Sans'] font-semibold">What needs testing?</span>
      </span>
      <textarea
        id="contact-scope"
        placeholder="Product, platforms, what's already covered"
        className="mt-[6px] h-[114px] w-full resize-none border border-dark-brown bg-white px-4 pb-4 pt-[14px] text-[15px] leading-[22px] text-dark-brown outline-none placeholder:text-[#757575]"
      />
    </label>

    <div className="mt-[23px] flex flex-wrap items-center gap-[18px]">
      <button
        type="submit"
        className="h-[45px] w-[195px] bg-accent-brown text-[15px] leading-none text-light-brown"
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
    <div className="mt-[16px] space-y-[14px]">
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

const ContactPage = () => (
  <>
    <Navbar />
    <main className="overflow-hidden bg-light-brown text-dark-brown">
      <section className="px-5 pb-[57px] pt-[57px] md:px-[4vw]">
        <div className="grid gap-12 lg:grid-cols-[844px_420px] lg:justify-between lg:gap-0">
          <div>
            <p className="text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-accent-brown">
              <span className="font-['DM_Sans'] font-semibold">Propose a project</span>
            </p>
            <h1 className="mt-[17px] text-[46px] leading-[44px] tracking-[0.015em] text-dark-brown sm:text-[56px] sm:leading-[53px] lg:text-[64px] lg:leading-[60px]">
              <span className="font-['Barlow_Condensed'] font-bold uppercase">
                <span className="block">Tell us the scope</span>
                <span className="block">and the deadline</span>
              </span>
            </h1>
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

export default ContactPage;
