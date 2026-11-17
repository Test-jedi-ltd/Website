import { Link } from "react-router-dom"
import Navbar from "../sections/Navbar"
import Footer from "../sections/Footer"

const termsSections = [
  {
    title: "Welcome to Test-Jedi",
    paragraphs: [
      "Test-Jedi is a Quality Assurance consultancy providing software testing, QA training, internships, recruitment and talent placement, mentorship, and professional community development.",
      "By accessing our website or using our services, you agree to these Terms of Service.",
    ],
  },
  {
    title: "Our Services",
    intro: "Our services include:",
    bullets: [
      "Manual, functional, exploratory, and regression testing.",
      "API, web, mobile, automation, and performance testing.",
      "QA consultancy and software quality improvement.",
      "QA training, workshops, and professional development.",
      "Internship and practical learning opportunities.",
      "Recruitment, talent sourcing, and candidate placement.",
      "QA community activities, mentorship, and knowledge sharing.",
    ],
    paragraphs: [
      "Specific service requirements and deliverables may be covered by separate agreements.",
    ],
  },
  {
    title: "User Responsibilities",
    intro: "By using our services, you agree to:",
    bullets: [
      "Provide accurate information.",
      "Respect our staff, trainers, clients, and community members.",
      "Avoid fraudulent, abusive, or unlawful activities.",
      "Protect confidential information.",
      "Respect intellectual property rights.",
      "Follow applicable programme and service guidelines.",
    ],
  },
  {
    title: "Payments and Refunds",
    paragraphs: [
      "Fees, payment deadlines, instalment plans, and refund conditions will be communicated before registration or engagement.",
      "Failure to meet agreed payment obligations may result in restricted access to services or programmes, subject to applicable agreements and law.",
    ],
  },
  {
    title: "Training and Internships",
    paragraphs: [
      "Participation in our training and internship programmes requires commitment, active participation, and compliance with programme guidelines.",
      "Completing a programme or internship does not guarantee employment, certification, or job placement unless expressly agreed in writing.",
    ],
  },
  {
    title: "Client Services",
    paragraphs: [
      "Clients must provide accurate project information and authorised access to applications, systems, and testing environments.",
      "Test-Jedi will perform agreed testing activities within the approved project scope. Additional services may require separate agreements.",
      "Software testing reduces risks but cannot guarantee completely defect-free software.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "Our website content, branding, training materials, and proprietary resources belong to Test-Jedi or their respective owners.",
      "They must not be copied, sold, redistributed, or used commercially without permission.",
      "Client deliverables and ownership rights will be governed by the relevant service agreement.",
    ],
  },
  {
    title: "Confidentiality and Privacy",
    paragraphs: [
      "We respect the confidentiality of client, trainee, employee, and community information.",
      "Personal information will be handled in accordance with our Privacy Policy and applicable data protection laws.",
    ],
  },
  {
    title: "Suspension and Termination",
    paragraphs: [
      "We reserve the right to suspend or terminate access to our services where users engage in misconduct, fraud, unauthorised activities, or serious violations of these Terms.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "Test-Jedi will take reasonable steps to deliver quality services but does not guarantee specific business, software, training, or employment outcomes.",
      "No exception in these Terms excludes liability that cannot legally be excluded.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms of service when necessary. Updated versions will be published on our website.",
    ],
  },
  {
    title: "Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of the Federal Republic of Nigeria, subject to applicable mandatory laws.",
    ],
  },
  {
    title: "Contact Us",
    intro: "For questions or enquiries:",
    contact: true,
  },
]

const privacySections = [
  {
    title: "Introduction",
    paragraphs: [
      "At Test-Jedi, we value your privacy and are committed to protecting your personal information.",
      "This Privacy Policy explains how we collect, use, store, and protect information when you interact with our website, consultancy services, training programmes, internships, recruitment activities, and QA community.",
      "We handle personal information in accordance with applicable data protection laws, including the Nigeria Data Protection Act 2023.",
    ],
  },
  {
    title: "Information We Collect",
    intro: "Depending on how you interact with us, we may collect:",
    bullets: [
      "Personal details such as names, email addresses, and phone numbers.",
      "Educational and professional information.",
      "CVs, portfolios, and employment history.",
      "Training registration, attendance, and assessment records.",
      "Client and business information.",
      "Payment and transaction records.",
      "Website usage and technical information.",
      "Communications, feedback, and community contributions.",
    ],
  },
  {
    title: "How We Use Your Information",
    intro: "We use your information to:",
    bullets: [
      "Provide software testing and consultancy services.",
      "Process training and internship applications.",
      "Manage recruitment and placement activities.",
      "Communicate with clients, trainees, and community members.",
      "Manage payments and registrations.",
      "Monitor training progress and issue certificates.",
      "Improve our services and website.",
      "Send relevant updates and promotional information where permitted.",
      "Meet legal and regulatory obligations.",
    ],
  },
  {
    title: "Sharing Your Information",
    paragraphs: ["We do not sell your personal information."],
    intro: "However, we may share relevant information with:",
    bullets: [
      "Authorised clients and prospective employers for recruitment purposes.",
      "Trainers, mentors, and programme administrators.",
      "Trusted service providers and technology platforms.",
      "Payment providers where necessary.",
      "Regulatory authorities where legally required.",
    ],
    closing: [
      "We only share information where there is an appropriate business or legal reason to do so.",
    ],
  },
  {
    title: "Client Project Information",
    paragraphs: [
      "During software testing engagements, we may access information contained in client applications, databases, websites, and testing environments.",
      "We handle such information only within the authorised project scope and applicable contractual instructions.",
      "Where appropriate, we encourage clients to use anonymised or synthetic test data.",
    ],
  },
  {
    title: "Data Security and Retention",
    paragraphs: [
      "We take reasonable measures to protect personal information against unauthorised access, loss, misuse, or disclosure.",
      "We retain information only for as long as necessary for the purposes for which it was collected or as required by law.",
    ],
  },
  {
    title: "Your Privacy Rights",
    intro: "Subject to applicable law, you may have the right to:",
    bullets: [
      "Request access to your personal information.",
      "Correct inaccurate information.",
      "Request deletion of your information.",
      "Object to certain processing activities.",
      "Request restrictions on processing.",
      "Withdraw consent where processing is based on consent.",
      "Request a copy of your information where applicable.",
      "Lodge a complaint with the relevant data protection authority.",
    ],
  },
  {
    title: "Cookies",
    paragraphs: [
      "Our website may use cookies to improve functionality, understand visitor behaviour, and enhance user experience.",
      "You may manage cookies through your browser or website cookie settings.",
    ],
  },
  {
    title: "Third-Party Platforms",
    paragraphs: [
      "We may use third-party platforms for communication, payments, training, recruitment, analytics, and project management.",
      "These platforms have their own privacy policies, which we encourage you to review.",
    ],
  },
  {
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy when necessary. Changes will be published on our website with an updated effective date.",
    ],
  },
  {
    title: "Contact Us",
    intro: "For privacy-related questions, requests, or complaints, contact:",
    contact: true,
    closing: [
      "We are committed to handling your personal information responsibly and transparently.",
    ],
  },
]

const LegalPage = ({ title, sections }) => (
  <>
    <Navbar />
    <main className="min-h-screen bg-light-brown text-dark-brown">
      <header className="border-b border-dark-brown/15 px-5 pb-12 pt-16 md:px-[8vw] md:pb-16 md:pt-24">
        <div className="mx-auto max-w-[1080px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-brown">
            Test-Jedi &middot; Legal
          </p>
          <h1 className="mt-4 text-[clamp(3rem,8vw,6.5rem)] leading-[0.9]">
            <span className="font-['Barlow_Condensed'] font-bold uppercase">{title}</span>
          </h1>
          <p className="mt-7 inline-flex border border-dark-brown/25 bg-white/60 px-4 py-2 text-[13px]">
            <span className="font-['DM_Sans']">Effective Date: 7th November 2026</span>
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 md:px-[6vw] md:py-16 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label={`${title} sections`} className="h-fit lg:sticky lg:top-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-brown">
            On this page
          </p>
          <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[13px] leading-5 sm:grid-cols-3 lg:grid-cols-1">
            {sections.map((section, index) => (
              <li key={section.title}>
                <a className="text-dark-brown/75 transition-colors hover:text-accent-brown" href={`#section-${index + 1}`}>
                  <span className="mr-2 text-accent-brown">{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <section
              id={`section-${index + 1}`}
              key={section.title}
              className="scroll-mt-8 border border-dark-brown/10 bg-white/65 p-5 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="pt-1 font-['DM_Sans'] text-[12px] font-semibold tracking-[0.1em] text-accent-brown">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[27px] leading-none sm:text-[32px]">
                    <span className="font-['Barlow_Condensed'] font-bold uppercase">{section.title}</span>
                  </h2>
                  {section.intro && (
                    <p className="mt-5 text-[15px] leading-7 text-dark-brown/85">
                      <span className="font-['DM_Sans']">{section.intro}</span>
                    </p>
                  )}
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-[15px] leading-7 text-dark-brown/85">
                      <span className="font-['DM_Sans']">{paragraph}</span>
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-dark-brown/85 marker:text-accent-brown">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>
                          <span className="font-['DM_Sans']">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.contact && (
                    <address className="mt-4 not-italic text-[15px] leading-7 text-dark-brown/85">
                      <span className="block font-['DM_Sans']">Test-Jedi</span>
                      <span className="block font-['DM_Sans']">
                        Email: <a className="text-accent-brown underline underline-offset-4" href="mailto:operations@test-jedi.com">operations@test-jedi.com</a>
                      </span>
                      <span className="block font-['DM_Sans']">Address: Lagos, Nigeria.</span>
                    </address>
                  )}
                  {section.closing?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-[15px] leading-7 text-dark-brown/85">
                      <span className="font-['DM_Sans']">{paragraph}</span>
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}
          <p className="px-1 pt-3 text-[13px] text-dark-brown/70">
            Need clarification?{" "}
            <Link className="text-accent-brown underline underline-offset-4" to="/contact">
              Contact our team
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </>
)

export const TermsPage = () => (
  <LegalPage title="Terms of Service" sections={termsSections} />
)

export const PrivacyPage = () => (
  <LegalPage title="Privacy Policy" sections={privacySections} />
)
