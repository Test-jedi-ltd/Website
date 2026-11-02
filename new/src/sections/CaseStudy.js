import { useNavigate } from "react-router-dom";

const copy = {
  eyebrow: "Selected work · anonymised",
  headingLines: ["SIX BLOCKERS,", "FOUR DAYS BEFORE", "LAUNCH"],
  summary:
    "A pan-African payments platform brought us in for a pre-release regression pass. We rebuilt the checkout suite, ran it against four locales and three card schemes, and filed every failure with reproduction steps.",
  stats: [
    ["6", "RELEASE BLOCKERS"],
    ["4d", "BEFORE SHIP DATE"],
    ["0", "POST-LAUNCH ROLLBACKS"],
  ],
  link: "READ THE CASE STUDY",
  noteLabel: "CLIENT NOTE",
  quote:
    "“Test-Jedi gave us a team of skilled testers who found and reported bugs quickly. The attention to detail and thoroughness was impressive.”",
  author: "QA LEAD PAYMENTS PLATFORM",
};

const CaseStudy = () => {
  const navigate = useNavigate();

  return (
  <section
    id="case-studies"
    className="bg-[#FDF9D2] px-5 pt-16 pb-16 md:px-[4vw] md:pt-[108px] md:pb-[68px]"
  >
    <div className="grid gap-12 lg:grid-cols-[52.4%_47.6%] lg:gap-0">
      <div className="lg:pt-1">
        <p className="font-bold uppercase tracking-[0.12em] text-[#964A21]">
          <span className="font-['DM_Sans'] font-bold uppercase">{copy.eyebrow}</span>
        </p>

        <h2 className="mt-5 text-[44px] leading-[0.9] tracking-[0.01em] text-[#151240] sm:text-[50px] lg:text-[56px]">
          <span className="font-['Barlow_Condensed'] text-xl font-bold uppercase md:text-4xl xl:text-7xl">
            {copy.headingLines.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </span>
        </h2>

        <p className="mt-[26px] max-w-[600px] text-lg leading-[26px] text-[#4F4B65]">
          <span className="font-['DM_Sans']">{copy.summary}</span>
        </p>

        <div className="mt-[30px] grid max-w-[500px] grid-cols-3 gap-4 lg:grid-cols-[167px_162px_auto] lg:gap-0">
          {copy.stats.map(([value, label]) => (
            <div key={label}>
              <div className="text-[44px] leading-none text-[#964A21]">
                <span className="font-['Barlow_Condensed'] font-bold">{value}</span>
              </div>
              <div className="mt-[8px] text-[10px] uppercase leading-none tracking-[0.14em] text-[#7E7A82]">
                <span className="font-['DM_Sans'] font-bold">{label}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("/case-studies")}
          className="mt-[36px] inline-block border-b border-[#964A21] pb-[9px] font-bold uppercase leading-none tracking-[0.12em] text-[#964A21]"
        >
          <span className="font-['DM_Sans']">{copy.link}</span>
        </button>
      </div>

      <div className="bg-[#D9C5B2] p-8 lg:mx-6 lg:min-h-[392px] lg:px-[31px] lg:pb-0 lg:pt-[34px]">
        <p className="font-bold uppercase tracking-[0.14em] text-[#964A21]">
          <span className="font-['DM_Sans'] font-bold">{copy.noteLabel}</span>
        </p>
        <blockquote className="mt-[26px] max-w-[600px] text-lg leading-[27px] text-[#151240]">
          <span className="font-['DM_Sans']">{copy.quote}</span>
        </blockquote>
        <p className="mt-[24px] font-bold uppercase tracking-[0.14em] text-[#645A6D]">
          <span className="font-['DM_Sans']">{copy.author}</span>
        </p>
      </div>
    </div>
  </section>
  );
};

export default CaseStudy;
