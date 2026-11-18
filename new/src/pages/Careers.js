import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import cohortRings from "../assets/cohort-rings.svg";
import { useState } from "react";
import { Modal } from "antd";

const benefits = [
  [
    "Paired from day one",
    "Shadow a lead architect on live distributed testing environments from week one, not month three.",
  ],
  [
    "Applied code track",
    "Move systematically from manual scenarios into TypeScript, Playwright, and resilient CI/CD pipelines.",
  ],
  [
    "Portfolio certified",
    "Graduate with verifiable GitHub automation repos, execution reports, and certified verification badges.",
  ],
  [
    "Flexible cohort hours",
    "Evening live labs, asynchronous code reviews, and weekend architecture clinics tailored for working adults.",
  ],
];

const roles = [
  [
    "Manual QA tester",
    "Find bugs, write test cases, and make sure websites and apps work like they should for real users.",
  ],
  [
    "Automation tester",
    "Write code and scripts to let computer programs test software automatically.",
  ],
  [
    "API & backend tester",
    "Test the hidden databases, servers, and connections that make apps and websites run.",
  ],
  [
    "Performance tester",
    "Run speed and stress tests to see how websites and apps handle thousands of users at once.",
  ],
];

const CareersPage = () => {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasLaptop, setHasLaptop] = useState("");
  const [tracks, setTracks] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const clearValidationError = (field) => {
    setValidationErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const toggleTrack = (track) => {
    clearValidationError("tracks");
    setTracks((current) =>
      current.includes(track)
        ? current.filter((item) => item !== track)
        : [...current, track]
    );
  };

  const submitApplication = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.elements.email;
    const phone = form.elements.phone.value.trim();
    const phoneDigits = phone.replace(/\D/g, "").length;
    const errors = {};

    if (!form.elements.fullName.value.trim()) {
      errors.fullName = "Enter your full name.";
    }
    if (!email.value.trim() || !email.checkValidity()) {
      errors.email = "Enter a valid email address.";
    }
    if (
      !/^\+?[0-9\s().-]+$/.test(phone) ||
      phoneDigits < 7 ||
      phoneDigits > 15
    ) {
      errors.phone = "Enter a valid phone number with 7–15 digits.";
    }
    if (tracks.length === 0) {
      errors.tracks = "Select at least one track of interest.";
    }
    if (!form.elements.experience.value) {
      errors.experience = "Select your current experience level.";
    }
    if (!hasLaptop) {
      errors.hasLaptop = "Choose Yes or No for laptop and internet access.";
    }

    setValidationErrors(errors);
    const firstInvalidField = [
      "fullName",
      "email",
      "phone",
      "tracks",
      "experience",
      "hasLaptop",
    ].find((field) => errors[field]);

    if (firstInvalidField) {
      const invalidElement =
        firstInvalidField === "hasLaptop"
          ? form.querySelector('[data-validation-field="hasLaptop"]')
          : form.querySelector(`[name="${firstInvalidField}"]`);
      if (invalidElement) {
        invalidElement.focus();
        if (typeof invalidElement.scrollIntoView === "function") {
          invalidElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      return;
    }

    setSubmitted(true);
  };

  return (
  <>
    <Navbar />
    <main className="overflow-hidden bg-light-brown text-dark-brown">
      <section className="relative overflow-hidden px-5 pt-[57px] md:px-[4vw]">
        <img
          src={cohortRings}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 hidden h-auto w-full lg:block"
        />
        <div className="relative grid gap-10 py-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] xl:items-start xl:gap-[60px]">
          <div className="">
            <p className="text-[12px] lg:text-[16px] font-semibold uppercase leading-none tracking-[0.14em] text-accent-brown">
              <span className="font-['DM_Sans'] font-semibold">Cohort program</span>
            </p>
            <h1 className="mt-[22px] text-[clamp(2.5rem,7vw,6.25rem)] leading-[0.88] text-dark-brown">
              <span className="font-['Barlow_Condensed'] font-bold uppercase flex flex-col gap-5">
                <span className="block">Build a testing</span>
                <span className="block">career, with</span>
                <span className="block">Test Jedi.</span>
              </span>
            </h1>
          </div>
          <p className="text-[16px] leading-[25px] text-dark-brown/75 xl:mt-[144px] xl:justify-self-end xl:text-[20px]">
            <span className="font-['DM_Sans']">
              Part of our mission is accessible QA expertise and transformative mentorship. Every
              tester here has a lead, a training track and a path off manual-only work.
            </span>
          </p>
        </div>
        <div className="relative mt-[37px] border-t border-dark-brown/15" />
      </section>

      <section className="px-5 md:px-[4vw]">
        <div className="grid gap-8 pt-[27px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
          {benefits.map(([title, body]) => (
            <div key={title} className="flex flex-col lg:gap-[11px] lg:py-10">
              <p className="text-[18px] lg:text-[20px] font-bold uppercase leading-none tracking-[0.12em] text-dark-brown">
                <span className="font-['Barlow_Condensed'] lg:text-2xl font-bold">{title}</span>
              </p>
              <p className="mt-[16px] max-w-[378px] text-[14px] lg:text-[18px] lg:leading-[22px] text-dark-brown/70">
                <span className="font-['DM_Sans']">{body}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[64px] px-5 md:px-[4vw]">
        <h2 className="text-[42px] lg:text-[60px] leading-none text-dark-brown">
          <span className="font-['Barlow_Condensed'] font-bold uppercase">
            We train for these roles
          </span>
        </h2>

        <div className="mt-[27px] hidden grid-cols-[45%_minmax(0,1fr)] items-center text-[12px] lg:text-[16px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown/50 lg:grid">
          <span className="font-['DM_Sans'] font-semibold">Role</span>
          <span className="font-['DM_Sans'] font-semibold">What you will learn</span>
        </div>

        <div className="mt-[16px]">
          {roles.map(([role, learn]) => (
            <div
              key={role}
              className="grid gap-y-2 py-4 lg:min-h-[100px] lg:grid-cols-[45%_minmax(0,1fr)] lg:items-center lg:py-4"
            >
              <p className="text-[30px] lg:text-[40px] leading-[0.97] text-dark-brown">
                <span className="font-['Barlow_Condensed'] font-bold uppercase">{role}</span>
              </p>
              <p className="text-[14px] lg:text-[18px] leading-[22px] text-dark-brown/70">
                <span className="font-['DM_Sans']">{learn}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[64px] bg-accent-brown px-5 pb-[51px] pt-[55px] md:px-[4vw]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[42px] leading-none text-light-brown">
              <span className="font-['Barlow_Condensed'] font-bold uppercase">
                Interested? Register for the cohort.
              </span>
            </h2>
            <p className="mt-[15px] max-w-[560px] text-[16px] leading-[24px] text-light-brown/75">
              <span className="font-['DM_Sans']">
                Secure your spot for the upcoming cohort and elevate your testing skills.
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setValidationErrors({});
              setApplicationOpen(true);
            }}
            className="flex h-[46px] w-[178px] shrink-0 items-center justify-center bg-dark-brown text-[13px] font-semibold uppercase leading-none tracking-[0.08em] text-light-brown"
          >
            <span className="font-['DM_Sans']">Apply for cohort</span>
          </button>
        </div>
      </section>
    </main>
    <Footer hideCta />
    <Modal
      centered
      open={applicationOpen}
      onCancel={() => setApplicationOpen(false)}
      footer={null}
      width={760}
      destroyOnHidden
      closeIcon={<span className="cohort-modal-close" aria-label="Close">×</span>}
      className="cohort-application-modal"
      styles={{
        body: { maxHeight: "calc(100vh - 120px)", overflowY: "auto", padding: 0 },
      }}
    >
      {submitted ? (
        <div className="cohort-modal-success">
          <h2>Application received</h2>
          <p>Thank you for registering your interest. Our team will contact you soon.</p>
          <button type="button" onClick={() => setApplicationOpen(false)}>Close</button>
        </div>
      ) : (
        <form className="cohort-application-form" onSubmit={submitApplication} noValidate>
          <div className="cohort-modal-heading">
            <h2>Apply for cohort</h2>
            <p>Please fill out this quick form to register your interest.</p>
          </div>

          {Object.keys(validationErrors).length > 0 && (
            <div className="cohort-validation-summary" role="alert">
              <p>Please complete or correct the following before submitting:</p>
              <ul>
                {Object.values(validationErrors).map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          )}

          <fieldset>
            <legend>Section 1: Personal details</legend>
            <label>
              Full name
              <input
                name="fullName"
                type="text"
                placeholder="e.g. John Doe"
                required
                aria-invalid={Boolean(validationErrors.fullName)}
                aria-describedby={validationErrors.fullName ? "full-name-error" : undefined}
                onChange={() => clearValidationError("fullName")}
              />
              {validationErrors.fullName && <span className="cohort-field-error" id="full-name-error">{validationErrors.fullName}</span>}
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                placeholder="e.g. johndoe@email.com"
                required
                aria-invalid={Boolean(validationErrors.email)}
                aria-describedby={validationErrors.email ? "email-error" : undefined}
                onChange={() => clearValidationError("email")}
              />
              {validationErrors.email && <span className="cohort-field-error" id="email-error">{validationErrors.email}</span>}
            </label>
            <label>
              Phone / WhatsApp number
              <input
                name="phone"
                type="tel"
                placeholder="e.g. +234 80 1234 5678"
                required
                aria-invalid={Boolean(validationErrors.phone)}
                aria-describedby={validationErrors.phone ? "phone-error" : undefined}
                onChange={() => clearValidationError("phone")}
              />
              {validationErrors.phone && <span className="cohort-field-error" id="phone-error">{validationErrors.phone}</span>}
            </label>
          </fieldset>

          <fieldset>
            <legend>Section 2: Track of interest</legend>
            <p className="cohort-field-question" id="tracks-question">Which testing track are you interested in?</p>
            <div
              className="cohort-track-grid"
              role="group"
              aria-labelledby="tracks-question"
              aria-describedby={validationErrors.tracks ? "tracks-error" : undefined}
            >
              {["Manual QA Tester", "Automation Tester", "API & Backend Tester", "Performance Tester", "Help me choose (Not sure yet)"].map((track) => (
                <label className="cohort-checkbox" key={track}>
                  <input
                    type="checkbox"
                    name="tracks"
                    checked={tracks.includes(track)}
                    aria-invalid={Boolean(validationErrors.tracks)}
                    onChange={() => toggleTrack(track)}
                  />
                  <span>{track}</span>
                </label>
              ))}
            </div>
            {validationErrors.tracks && <p className="cohort-field-error" id="tracks-error">{validationErrors.tracks}</p>}
          </fieldset>

          <fieldset>
            <legend>Section 3: Logistics</legend>
            <label>
              Current experience level
              <select
                name="experience"
                defaultValue=""
                required
                aria-invalid={Boolean(validationErrors.experience)}
                aria-describedby={validationErrors.experience ? "experience-error" : undefined}
                onChange={() => clearValidationError("experience")}
              >
                <option value="" disabled>Select your experience level</option>
                <option>Complete beginner</option>
                <option>Some testing experience</option>
                <option>Working QA professional</option>
              </select>
              {validationErrors.experience && <span className="cohort-field-error" id="experience-error">{validationErrors.experience}</span>}
            </label>
            <div className="cohort-field-question" id="laptop-question">Do you have a laptop &amp; internet access for online live classes?</div>
            <div
              className="cohort-choice-row"
              role="group"
              aria-labelledby="laptop-question"
              aria-describedby={validationErrors.hasLaptop ? "laptop-error" : undefined}
            >
              {["Yes", "No"].map((choice) => (
                <button
                  type="button"
                  key={choice}
                  className={hasLaptop === choice ? "selected" : ""}
                  aria-pressed={hasLaptop === choice}
                  data-validation-field="hasLaptop"
                  onClick={() => {
                    setHasLaptop(choice);
                    clearValidationError("hasLaptop");
                  }}
                >
                  {choice}
                </button>
              ))}
            </div>
            {validationErrors.hasLaptop && <p className="cohort-field-error" id="laptop-error">{validationErrors.hasLaptop}</p>}
          </fieldset>

          <button className="cohort-submit" type="submit">Submit cohort application</button>
        </form>
      )}
    </Modal>
  </>
  );
};

export default CareersPage;
