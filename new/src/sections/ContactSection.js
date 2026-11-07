const steps = [
  "We read the scope and come back with questions, in writing.",
  "You get a test plan, a team shape and a price within two days.",
  "Approve it and testing starts - 48 hours for a burst, two weeks for a dedicated team",
];

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
        href="mailto:operations@test-jedi.com"
        className="text-[13px] leading-none text-dark-brown underline-offset-4 hover:underline"
      >
        <span className="font-['DM_Sans']">Or email operations@test-jedi.com</span>
      </a>
    </div>
  </form>
);

const NextSteps = () => (
  <div className="min-h-[241px] bg-dark-brown px-[28px] pb-[26px] pt-[29px]">
    <p className="text-[10px] lg:text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-medium-brown">
      <span className="font-['DM_Sans'] font-semibold">What happens next</span>
    </p>
    <div className="mt-[15px] space-y-[14px]">
      {steps.map((step, index) => (
        <div key={step} className="grid grid-cols-[14px_minmax(0,1fr)] gap-x-[32px]">
          <span className="mt-1 text-[14px] font-bold leading-none text-accent-brown">
            <span className="font-['DM_Sans']">{`0${index + 1}`}</span>
          </span>
          <p className="max-w-[579px] text-[14px] lg:text-[18px] leading-[22px] text-light-brown">
            <span className="font-['DM_Sans']">{step}</span>
          </p>
        </div>
      ))}
    </div>
  </div>
);

const ContactDetails = () => (
  <div className="mt-[23px] min-h-[220px] border border-dark-brown bg-white px-[28px] pb-[24px] pt-[27px]">
    <p className="text-[10px] lg:text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown">
      <span className="font-['DM_Sans'] font-semibold">Direct</span>
    </p>
    <div className="mt-[19px] space-y-[18px]">
      <div>
        <p className="text-[10px] lg:text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown">
          <span className="font-['DM_Sans'] font-semibold">Email</span>
        </p>
        <a href="mailto:operations@test-jedi.com" className="mt-[7px] block text-[15px] lg:text-[16px] leading-none text-dark-brown">
          <span className="font-['DM_Sans']">operations@test-jedi.com</span>
        </a>
      </div>
      <div>
        <p className="text-[10px] lg:text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown">
          <span className="font-['DM_Sans'] font-semibold">Phone</span>
        </p>
        <a href="tel:+2347010621362" className="mt-[7px] block text-[15px] lg:text-[16px]  leading-none text-dark-brown">
          <span className="font-['DM_Sans']">+234 701 062 1362</span>
        </a>
      </div>
      <div>
        <p className="text-[10px] lg:text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown">
          <span className="font-['DM_Sans'] font-semibold">Hours</span>
        </p>
        <p className="mt-[7px] text-[15px] lg:text-[16px] leading-none text-dark-brown">
          <span className="font-['DM_Sans']">Mon-Fri, WAT</span>
        </p>
      </div>
    </div>
  </div>
);

const Testimonial = () => (
  <figure className="mt-[23px] min-h-[220px] bg-medium-brown px-[32px] py-[32px] sm:px-[40px] sm:py-[36px]">
    <blockquote className="text-[16px] lg:text-[18px] leading-[24px] text-dark-brown">
      <span className="font-['DM_Sans']">
        &ldquo;They replied with a plan, not a sales call. We started four days later.&rdquo;
      </span>
    </blockquote>
    <figcaption className="mt-[12px] text-[10px] lg:text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-[#645A6D]">
      <span className="font-['DM_Sans'] font-semibold">
        Head of engineering &middot; Logistics platform
      </span>
    </figcaption>
  </figure>
);

const ContactSection = () => (
  <section id="contact" className="border-t border-dark-brown px-5 pb-[58px] pt-[54px] md:px-[4vw]">
    <div className="lg:grid lg:grid-cols-2 lg:justify-between lg:gap-12">
      <div className="flex flex-col gap-5">
        <p className="text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-accent-brown">
          <span className="font-['DM_Sans'] font-semibold">Propose a project</span>
        </p>
        <h2 className="mt-[16px] text-[46px] leading-[44px] tracking-[0.015em] text-dark-brown sm:text-[56px] sm:leading-[53px] lg:text-[80px] lg:leading-[60px]">
          <span className="font-['Barlow_Condensed'] font-bold uppercase flex flex-col gap-4">
            <span className="block">Tell us the scope</span>
            <span className="block">and the deadline</span>
          </span>
        </h2>
        <p className="mt-[15px] max-w-[579px] text-[16px] lg:text-[20px] leading-[26px] text-dark-brown">
          <span className="font-['DM_Sans']">
            We reply within two working days with a test plan, a team shape and a price. No
            discovery call required first.
          </span>
        </p>
        <ContactForm />
      </div>

      <div className="lg:mt-10">
        <NextSteps />
        <ContactDetails />
        <Testimonial />
      </div>
    </div>
  </section>
);

export default ContactSection;
