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

  const toggleTrack = (track) => {
    setTracks((current) =>
      current.includes(track)
        ? current.filter((item) => item !== track)
        : [...current, track]
    );
  };

  const submitApplication = (event) => {
    event.preventDefault();
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
        <div className="lg:py-10 relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_809px] lg:items-start lg:gap-[60px]">
          <div className="">
            <p className="text-[12px] lg:text-[16px] font-semibold uppercase leading-none tracking-[0.14em] text-accent-brown">
              <span className="font-['DM_Sans'] font-semibold">Cohort program</span>
            </p>
            <h1 className="mt-[22px] text-[48px] leading-[0.88] text-dark-brown sm:text-[64px] md:text-[72px] lg:text-[100px] lg:leading-[68px]">
              <span className="font-['Barlow_Condensed'] font-bold uppercase flex flex-col gap-5">
                <span className="block">Build a testing</span>
                <span className="block">career, with</span>
                <span className="block">Test Jedi.</span>
              </span>
            </h1>
          </div>
          <p className=" text-[16px] leading-[25px] text-dark-brown/75 lg:mt-[144px] lg:translate-x-[29px] lg:justify-self-end lg:text-[20px]">
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
              className="grid gap-y-2 py-4 lg:py-10 lg:h-[100px] lg:grid-cols-[45%_minmax(0,1fr)] lg:items-center lg:py-0"
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
        <form className="cohort-application-form" onSubmit={submitApplication}>
          <div className="cohort-modal-heading">
            <h2>Apply for cohort</h2>
            <p>Please fill out this quick form to register your interest.</p>
          </div>

          <fieldset>
            <legend>Section 1: Personal details</legend>
            <label>
              Full name
              <input name="fullName" type="text" placeholder="e.g. John Doe" required />
            </label>
            <label>
              Email address
              <input name="email" type="email" placeholder="e.g. johndoe@email.com" required />
            </label>
            <label>
              Phone / WhatsApp number
              <input name="phone" type="tel" placeholder="e.g. +234 80 1234 5678" required />
            </label>
          </fieldset>

          <fieldset>
            <legend>Section 2: Track of interest</legend>
            <p className="cohort-field-question">Which testing track are you interested in?</p>
            <div className="cohort-track-grid">
              {["Manual QA Tester", "Automation Tester", "API & Backend Tester", "Performance Tester", "Help me choose (Not sure yet)"].map((track) => (
                <label className="cohort-checkbox" key={track}>
                  <input
                    type="checkbox"
                    checked={tracks.includes(track)}
                    onChange={() => toggleTrack(track)}
                  />
                  <span>{track}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Section 3: Logistics</legend>
            <label>
              Current experience level
              <select name="experience" defaultValue="" required>
                <option value="" disabled>Select your experience level</option>
                <option>Complete beginner</option>
                <option>Some testing experience</option>
                <option>Working QA professional</option>
              </select>
            </label>
            <div className="cohort-field-question">Do you have a laptop &amp; internet access for online live classes?</div>
            <div className="cohort-choice-row" role="group" aria-label="Laptop and internet access">
              {["Yes", "No"].map((choice) => (
                <button
                  type="button"
                  key={choice}
                  className={hasLaptop === choice ? "selected" : ""}
                  aria-pressed={hasLaptop === choice}
                  onClick={() => setHasLaptop(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
          </fieldset>

          <button className="cohort-submit" type="submit">Submit cohort application</button>
        </form>
      )}
    </Modal>
  </>
  );
};

export default CareersPage;
