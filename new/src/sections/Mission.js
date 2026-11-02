import nut from "../assets/nut.png";

const intro = "A decade of testing global platforms and fast-moving product teams. The model adapts; the documentation never slips.";

const strengths = [
  ["PROVEN IN THE REAL WORLD", "Everything from global platforms to week-old products. We balance speed, structure and depth without slowing you down."],
  ["FLEXIBLE AS YOU GROW", "Dedicated teams for consistency, crowdsourced bursts for speed, nearshore when you need more lift."],
  ["TRANSPARENCY AT EVERY STEP", "Track execution, review issues, audit performance and see who did the work. Documented and accessible."],
  ["SECURITY YOU CAN COUNT ON", "Certified and built for enterprise scale, from data handling through tester management."],
];

const Mission = () => (
  <section className="relative overflow-hidden bg-[#151240] px-5 pt-16 pb-24 text-[#FDF9D2] md:px-[4vw] md:pt-[73px] md:pb-[75px]" id="mission">
    <img src={nut} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 w-[70vw] max-w-[447px] opacity-[0.64] lg:w-[447px]" />
    <div className="relative z-10 grid gap-12 lg:grid-cols-[52.4%_47.6%] lg:gap-0">
      <div className="lg:pt-[30px]">
        <h2 className="text-[44px] leading-[0.9] tracking-[0.01em] text-[#FDF9D2] sm:text-[50px] lg:text-[56px]">
          <span className="font-['Barlow_Condensed'] font-bold uppercase text-xl md:text-4xl xl:text-7xl">WHY TEAMS KEEP US</span>
        </h2>
        <p className="mt-4 max-w-[600px] text-lg leading-[24px] text-[#BCB8A9]">
          <span className="font-['DM_Sans']">{intro}</span>
        </p>
      </div>

      <div className="border-t border-[#413E5C]">
        {strengths.map(([title, text]) => (
          <article key={title} className="border-b border-[#413E5C] py-7 pb-[18px]">
            <h3 className="text-[26px] leading-[30px] text-[#FDF9D2] lg:text-5xl">
              <span className="font-['Barlow_Condensed'] font-bold uppercase tracking-[0.01em]">{title}</span>
            </h3>
            <p className="mt-[7px] max-w-[618px] text-lg leading-[21px] text-[#B3AFA4]">
              <span className="font-['DM_Sans']">{text}</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Mission;
