import { Link } from "react-router-dom";

const copy = {
  headingLines: ["FIVE WAYS", "WE GET IN", "THE WAY OF", "A BAD", "RELEASE"],
  intro: "Engaged as a dedicated team, a crowdsourced burst, or a nearshore extension of yours.",
  allServices: "ALL SERVICES",
  rows: [
    ["01", "Full-cycle Software Testing", "Test strategy, plans and execution from first build to sign-off."],
    ["02", "Test Automation", "Maintainable suites across browsers and devices, wired into your CI."],
    ["03", "Performance Testing", "Load, stress and soak runs with named bottlenecks and fixes to try."],
    ["04", "Security Testing", "Vulnerability and access-control testing against OWASP baselines."],
    ["05", "Functional Testing", "Every input checked against intended output, documented case by case."],
  ],
};

const Services = () => (
  <section id="services" className="bg-[#FDF9D2] px-5 pt-16 pb-24 md:px-[4vw] md:pt-[72px] md:pb-[200px]">
    <div className="grid gap-12 lg:grid-cols-[30.4%_69.6%] lg:gap-0">
      <div className="lg:pt-[30px]">
        <h2 className="text-[44px] leading-[0.9] tracking-[0.01em] text-[#151240] sm:text-[50px] lg:text-[56px]">
          <span className="font-['Barlow_Condensed'] font-bold uppercase text-xl md:text-4xl xl:text-7xl">
            {copy.headingLines.map((line) => <span className="block" key={line}>{line}</span>)}
          </span>
        </h2>
        <div className="mt-4 text-lg leading-[24px] text-[#5B586C]">
          <span className="font-['DM_Sans']">{copy.intro}</span>
        </div>
        <Link to="/services" className="mt-7 inline-block border-b border-[#964A21] pb-[9px] font-bold uppercase leading-none tracking-[0.12em] text-[#964A21]">
          <span className="font-['DM_Sans']">{copy.allServices}</span>
        </Link>
      </div>

      <div className="border-t border-[#DBD8BD]">
        {copy.rows.map(([number, title, text]) => (
          <article key={number} className="grid grid-cols-[48px_1fr] gap-x-4 border-b border-[#DBD8BD] py-7 lg:grid-cols-[77px_minmax(0,1.83fr)_minmax(0,1fr)] lg:gap-x-0">
            <span className="mt-[12px] text-xl leading-none text-[#964A21] font-bold">
              <span className="font-['DM_Sans']">{number}</span>
            </span>
            <h3 className="pr-4 lg:pr-8">
              <span className="font-['Barlow_Condensed'] text-[26px] font-bold uppercase leading-[30px] tracking-[0.01em] text-[#151240] lg:text-5xl">{title}</span>
            </h3>
            <p className="col-start-2 mt-2 text-lg leading-[21px] text-[#5B586C] lg:col-start-3 lg:mt-0">
              <span className="font-['DM_Sans']">{text}</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;