import cohortRings from "../assets/cohort-rings.svg";

const Cohorts = () => (
  <section id="cohorts" className="relative overflow-hidden bg-dark-brown px-5 py-20 text-light-brown md:px-[4vw] md:py-28">
    <img src={cohortRings} alt="" className="absolute right-0 top-0 hidden h-full w-[42%] opacity-70 lg:block" />
    <div className="relative max-w-[780px]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-medium-brown">
        <span className="font-['DM_Sans']">Test-Jedi cohorts</span>
      </p>
      <h2 className="mt-5 text-[48px] leading-[0.92] sm:text-[64px] lg:text-[78px]">
        <span className="font-['Barlow_Condensed'] font-bold uppercase">
          Learn quality with
          <br />
          people who practise it.
        </span>
      </h2>
      <p className="mt-6 max-w-[590px] text-[16px] leading-7 text-light-brown/80">
        <span className="font-['DM_Sans']">A structured, mentor-led programme for testers ready to move into automation and high-impact QA work.</span>
      </p>
      <a href="/careers" className="mt-8 inline-flex h-12 items-center bg-accent-brown px-7 text-[13px] font-semibold uppercase tracking-[0.08em] text-light-brown">
        <span className="font-['DM_Sans']">Join the next cohort</span>
      </a>
    </div>
  </section>
);

export default Cohorts;
