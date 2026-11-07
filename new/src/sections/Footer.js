import { Link } from "react-router-dom";
import footerLogo from "../assets/footer-logo.svg";

const services = [
  ["Full-cycle testing", "#services"],
  ["Automation", "#services"],
  ["Performance", "#services"],
  ["Security", "#services"],
];

const company = [
  ["Mission", "#mission"],
  ["Cohorts", "#cohorts"],
  ["Blog", "#blog"],
];

const contact = [
  ["hello@test-jedi.com", "mailto:hello@test-jedi.com"],
  ["+234 806 726 8511", "tel:+2348067268511"],
  ["Propose a project", "/contact"],
];

const Footer = ({ hideCta = false }) => (
  <footer className="bg-[#151240] p-0 text-[#FDF9D2]">
    {!hideCta && (
    <section className="bg-[#964A21] px-5 pb-12 pt-16 md:px-[4vw] md:pb-[56px] md:pt-[62px]">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div>
          <h2 className="text-[44px] leading-[0.9] tracking-[0.01em] text-[#FDF9D2] sm:text-[50px] lg:text-[56px]">
            <span className="font-['Barlow_Condensed'] text-xl font-bold uppercase md:text-4xl xl:text-7xl">
              <span className="block">SEND US THE BUILD.</span>
              <span className="block">WE’LL SEND BACK THE TRUTH.</span>
            </span>
          </h2>
          <p className="mt-[6px] leading-[24px] text-[#E8D6AF]">
            <span className="font-['DM_Sans']">
              Tell us the scope and the deadline. We’ll reply with a test plan and a price within two working days.
            </span>
          </p>
        </div>

        <Link
          to="/contact"
          className="inline-flex h-12 shrink-0 items-center justify-center self-start bg-[#FDF9D2] px-[30px] text-[15px] text-[#964A21] lg:self-center"
        >
          <span className="font-['DM_Sans'] font-bold">Propose a project</span>
        </Link>
      </div>
    </section>
    )}

    <section className="px-5 pt-16 text-[#FDF9D2] md:px-[4vw] md:pt-[52px]">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[32%_23.7%_23.7%_auto] lg:gap-0">
        <div>
          <img
            src={footerLogo}
            alt="Test-Jedi"
            className="ml-4 mt-[11px] h-auto w-[92px] sm:w-[110px] lg:w-[129px]"
          />
          <p className="mt-[26px] max-w-[400px] leading-[21px] text-[#9E8F90]">
            <span className="font-['DM_Sans']">
              Independent QA and software testing.
              <br />
              Bringing the force of software quality.
            </span>
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#D9C5B2]">
            <span className="font-['DM_Sans'] font-semibold">SERVICES</span>
          </p>
          <ul className="mt-[11px] text-[14px] leading-[22px] text-[#9E8F90]">
            {services.map(([label, href]) => (
              <li key={label}>
                <a className="transition-colors hover:text-[#FDF9D2]" href={href}>
                  <span className="font-['DM_Sans']">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#D9C5B2]">
            <span className="font-['DM_Sans'] font-semibold">COMPANY</span>
          </p>
          <ul className="mt-[11px] text-[14px] leading-[22px] text-[#9E8F90]">
            {company.map(([label, href]) => (
              <li key={label}>
                <a className="transition-colors hover:text-[#FDF9D2]" href={href}>
                  <span className="font-['DM_Sans']">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#D9C5B2]">
            <span className="font-['DM_Sans'] font-semibold">CONTACT</span>
          </p>
          <ul className="mt-[11px] space-y-[7px] text-[14px] leading-[22px] text-[#9E8F90]">
            {contact.map(([label, href]) => (
              <li key={label}>
                {href.startsWith("/") ? (
                  <Link
                    className={`transition-colors hover:text-[#FDF9D2] ${
                      label === "Propose a project" ? "text-[#D9C5B2]" : ""
                    }`}
                    to={href}
                  >
                    <span className="font-['DM_Sans']">{label}</span>
                  </Link>
                ) : (
                  <a
                    className={`transition-colors hover:text-[#FDF9D2] ${
                      label === "Propose a project" ? "text-[#D9C5B2]" : ""
                    }`}
                    href={href}
                  >
                    <span className="font-['DM_Sans']">{label}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-[28px] flex flex-col gap-4 border-t border-[#3A3757] pb-8 pt-4 text-[11px] text-[#7A7780] sm:flex-row sm:items-center sm:justify-between">
        <span>
          <span className="font-['DM_Sans']">© 2026 Test-Jedi</span>
        </span>
        <div className="flex gap-3">
          <a className="transition-colors hover:text-[#D9C5B2]" href="#privacy">
            <span className="font-['DM_Sans']">Privacy</span>
          </a>
          <a className="transition-colors hover:text-[#D9C5B2]" href="#terms">
            <span className="font-['DM_Sans']">Terms</span>
          </a>
        </div>
      </div>
    </section>
  </footer>
);

export default Footer;
