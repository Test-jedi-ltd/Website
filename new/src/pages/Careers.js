import Navbar from "../sections/Navbar";

const benefits = [
  [
    "Paired from day one",
    "You shadow a lead on a live engagement in week one, not month three.",
  ],
  [
    "Automation track",
    "Funded time and a mentor to move from manual into scripted testing.",
  ],
  [
    "Certification paid",
    "ISTQB and tooling certifications covered once you pass probation.",
  ],
  [
    "Remote, WAT hours",
    "Distributed team, overlapping working hours, quarterly meet-ups.",
  ],
];

const roles = [
  ["QA automation engineer", "Automation", "Mid-Senior"],
  ["Performance test engineer", "Performance", "Senior"],
  ["Manual tester (fintech)", "Delivery", "Junior-Mid"],
  ["QA lead", "Delivery", "Lead"],
];

const Rings = () => (
  <svg
    aria-hidden="true"
    viewBox="1001 84 441 348"
    className="pointer-events-none absolute right-0 top-0 hidden h-auto w-[30.58vw] lg:block"
  >
    <path
      fill="none"
      stroke="#964A21"
      strokeWidth="68.1818"
      d="M1476.11 156.259C1477.53 165.297 1478.27 174.562 1478.27 183.999C1478.27 193.437 1477.53 202.702 1476.11 211.74M1444.43 79.7951C1433.49 64.7609 1420.24 51.5131 1405.2 40.5715M1328.74 8.88443C1319.7 7.46401 1310.44 6.72656 1301 6.72656C1291.56 6.72656 1282.3 7.46401 1273.26 8.88443M1196.8 40.5715C1181.76 51.513 1168.51 64.7609 1157.57 79.7951M1125.88 156.258C1124.46 165.297 1123.73 174.562 1123.73 183.999C1123.73 193.437 1124.46 202.702 1125.88 211.74M1157.57 288.203C1168.51 303.238 1181.76 316.486 1196.8 327.427M1273.26 359.114C1282.3 360.535 1291.56 361.272 1301 361.272C1310.44 361.272 1319.7 360.535 1328.74 359.114M1405.2 327.427C1420.24 316.486 1433.49 303.238 1444.43 288.204"
    />
    <path
      fill="none"
      stroke="#964A21"
      strokeWidth="81.8182"
      d="M1559.3 163.649C1559.83 170.363 1560.09 177.149 1560.09 183.997C1560.09 190.845 1559.83 197.631 1559.3 204.345M1534.91 72.4317C1529.03 60.1326 1522.21 48.3694 1514.55 37.2356M1447.76 -29.5482C1436.63 -37.2147 1424.87 -44.033 1412.57 -49.9098M1321.35 -74.3065C1314.64 -74.8281 1307.85 -75.0938 1301 -75.0938C1294.15 -75.0938 1287.37 -74.8281 1280.65 -74.3065M1189.44 -49.9098C1177.14 -44.033 1165.37 -37.2147 1154.24 -29.5482M1087.46 37.2356C1079.79 48.3694 1072.97 60.1326 1067.09 72.4317M1042.7 163.649C1042.18 170.363 1041.91 177.149 1041.91 183.997C1041.91 190.845 1042.18 197.631 1042.7 204.345M1067.09 295.563C1072.97 307.862 1079.79 319.625 1087.46 330.759M1154.24 397.543C1165.37 405.209 1177.14 412.027 1189.44 417.904M1280.65 442.301C1287.37 442.822 1294.15 443.088 1301 443.088C1307.85 443.088 1314.64 442.822 1321.35 442.301M1412.57 417.904C1424.87 412.027 1436.63 405.209 1447.76 397.543M1514.55 330.759C1522.21 319.625 1529.03 307.862 1534.91 295.563"
    />
  </svg>
);

const CareersPage = () => (
  <>
    <Navbar />
    <main className="overflow-hidden bg-light-brown text-dark-brown">
      <section className="relative overflow-hidden px-5 pt-[57px] md:px-[4vw]">
        <Rings />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-[60px]">
          <div>
            <p className="text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-accent-brown">
              <span className="font-['DM_Sans'] font-semibold">Careers</span>
            </p>
            <h1 className="mt-[22px] text-[48px] leading-[48px] text-dark-brown sm:text-[58px] sm:leading-[58px] lg:text-[72px] lg:leading-[72px]">
              <span className="font-['Barlow_Condensed'] font-bold uppercase">
                <span className="block">Build a testing</span>
                <span className="block">career, not a</span>
                <span className="block">ticket queue</span>
              </span>
            </h1>
          </div>
          <p className="max-w-[377px] text-[16px] leading-[26px] text-dark-brown lg:mt-[144px] lg:justify-self-end">
            <span className="font-['DM_Sans']">
              Part of our mission is accessible QA expertise and transformative mentorship. Every
              tester here has a lead, a training track and a path off manual-only work.
            </span>
          </p>
        </div>
        <div className="relative mt-[37px] border-t-2 border-dark-brown" />
      </section>

      <section className="px-5 md:px-[4vw]">
        <div className="grid gap-8 pt-[23px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
          {benefits.map(([title, body]) => (
            <div key={title}>
              <p className="text-[12px] font-semibold uppercase leading-none tracking-[0.12em] text-dark-brown">
                <span className="font-['DM_Sans'] font-semibold">{title}</span>
              </p>
              <p className="mt-[16px] max-w-[278px] text-[13px] leading-[20px] text-dark-brown">
                <span className="font-['DM_Sans']">{body}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[77px] px-5 md:px-[4vw]">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[36px] leading-[36px] text-dark-brown sm:text-[44px] sm:leading-[44px]">
            <span className="font-['Barlow_Condensed'] font-bold uppercase">Open roles</span>
          </h2>
          <p className="pb-[8px] text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown">
            <span className="font-['DM_Sans'] font-semibold">4 open &middot; Updated weekly</span>
          </p>
        </div>

        <div className="mt-[27px] hidden grid-cols-[minmax(0,1fr)_220px_180px_120px] items-center gap-4 text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-dark-brown lg:grid">
          <span className="font-['DM_Sans'] font-semibold">Role</span>
          <span className="font-['DM_Sans'] font-semibold">Team</span>
          <span className="font-['DM_Sans'] font-semibold">Level</span>
          <span />
        </div>

        <div className="mt-[16px]">
          {roles.map(([role, team, level]) => (
            <div
              key={role}
              className="grid gap-x-4 gap-y-2 py-4 lg:h-[73px] lg:grid-cols-[minmax(0,1fr)_220px_180px_120px] lg:items-center lg:py-0"
            >
              <p className="text-[22px] leading-none text-dark-brown sm:text-[26px] lg:text-[28px]">
                <span className="font-['Barlow_Condensed'] font-bold uppercase">{role}</span>
              </p>
              <p className="text-[13px] leading-none text-dark-brown lg:-translate-y-[4px]">
                <span className="font-['DM_Sans']">{team}</span>
              </p>
              <p className="text-[13px] leading-none text-dark-brown lg:-translate-y-[4px]">
                <span className="font-['DM_Sans']">{level}</span>
              </p>
              <a
                href="mailto:careers@test-jedi.com"
                className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-accent-brown lg:-translate-y-[5px]"
              >
                <span className="font-['DM_Sans'] font-semibold">Apply</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[53px] bg-dark-brown px-5 pb-[51px] pt-[49px] md:px-[4vw]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[32px] leading-[36px] text-light-brown sm:text-[40px] sm:leading-[44px]">
              <span className="font-['Barlow_Condensed'] font-bold uppercase">
                Nothing fits? Send a CV anyway.
              </span>
            </h2>
            <p className="mt-[3px] max-w-[520px] text-[15px] leading-[20px] text-light-brown lg:whitespace-nowrap">
              <span className="font-['DM_Sans']">
                We keep a bench and we hire from it first when an engagement starts.
              </span>
            </p>
          </div>
          <a
            href="mailto:careers@test-jedi.com"
            className="flex h-[45px] w-[129px] shrink-0 items-center justify-center bg-accent-brown text-[13px] leading-none text-light-brown"
          >
            <span className="font-['DM_Sans']">Send a CV</span>
          </a>
        </div>
      </section>
    </main>
  </>
);

export default CareersPage;
