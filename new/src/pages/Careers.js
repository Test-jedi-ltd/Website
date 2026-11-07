import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import cohortRings from "../assets/cohort-rings.svg";

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

const CareersPage = () => (
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
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_809px] lg:items-start lg:gap-[60px]">
          <div>
            <p className="text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-accent-brown">
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
            <div key={title}>
              <p className="text-[12px] lg:text-[20px] font-bold uppercase leading-none tracking-[0.12em] text-dark-brown">
                <span className="font-['Barlow_Condensed'] font-semibold">{title}</span>
              </p>
              <p className="mt-[16px] max-w-[278px] text-[14px] lg:text-[20px] lg:leading-[22px] text-dark-brown/70">
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
              className="grid gap-y-2 py-4 lg:h-[73px] lg:grid-cols-[45%_minmax(0,1fr)] lg:items-center lg:py-0"
            >
              <p className="text-[30px] lg:text-[40px] leading-[0.97] text-dark-brown">
                <span className="font-['Barlow_Condensed'] font-bold uppercase">{role}</span>
              </p>
              <p className="text-[14px] lg:text-[16px] leading-[22px] text-dark-brown/70">
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
          <a
            href="mailto:careers@test-jedi.com"
            className="flex h-[46px] w-[178px] shrink-0 items-center justify-center bg-dark-brown text-[13px] font-semibold uppercase leading-none tracking-[0.08em] text-light-brown"
          >
            <span className="font-['DM_Sans']">Apply for cohort</span>
          </a>
        </div>
      </section>
    </main>
    <Footer hideCta />
  </>
);

export default CareersPage;
