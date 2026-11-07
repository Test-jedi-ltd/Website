const copy = {
  eyebrow: "Real Reviews FROM OUR CLIENTS",
  headingLines: ["Test jedi supplied", "a really valuable", "Resource"],
  link: "READ THE CASE STUDY",
  noteLabel: "Client Testimonial",
  quote:
    "“Test-Jedi gave us a team of skilled testers who found and reported bugs quickly. The attention to detail and thoroughness was impressive.”",
  author: "QA LEAD PAYMENTS PLATFORM",
};

const CaseStudy = () => {
  return (
    <section
      id="case-studies"
      className="bg-[#FDF9D2] px-5 pt-16 pb-16 md:px-[4vw] md:pt-[108px] md:pb-[68px]"
    >
    <div className="grid gap-12 lg:grid-cols-[52.4%_47.6%] lg:gap-0">
      <div className="lg:pt-1">
        <p className="font-bold uppercase tracking-[0.12em] text-[#964A21]">
          <span className="font-['DM_Sans'] font-bold uppercase">
            {copy.eyebrow}
          </span>
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

        <p className="mt-[26px] max-w-[800px] leading-[26px] text-[#4F4B65] flex flex-col sm:text-[18px] sm:leading-[28px] lg:mt-[34px] lg:leading-[30px]">
          <span className="font-['DM_Sans']">
            "Working with Test-Jedi was a genuinely great experience. From the
            very first email through the final call, the organization's
            operational accuracy and professionalism stood out at every stage.
          </span>{" "}
          <br />
          <span className="font-['DM_Sans']">
            I also want to commend the resource I worked with. She went above
            and beyond — not just available, but fully invested, personalizing
            the project . She was teachable, contributed immensely to the
            project's success. She didn’t just find bugs, she gave feedback
            that helped improve the product. She is exactly the kind of talent
            I'd recommend For a role at my own company if a vacancy came up".
          </span>
        </p>

        <p className="mt-5">
          <span className="font-['DM_Sans'] font-bold text-[#964A21] tracking-[0.12em] border-b border-[#964A21] pb-1 text-[14px] sm:text-[16px] lg:mt-[34px] lg:text-[18px]">
            · PAUL OLUWAGBEMIGA
          </span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-10 p-8 lg:mx-6 lg:min-h-[392px] lg:px-[31px] lg:pb-0 lg:pt-[34px]">
        <div className="bg-[#D9C5B2] p-10">
          <p className="font-bold uppercase tracking-[0.14em] text-[#964A21]">
            <span className="font-['DM_Sans'] font-bold">
              {copy.noteLabel}
            </span>
          </p>
          <blockquote className="mt-[26px] max-w-[600px] text-lg leading-[27px] text-[#151240]">
            <span className="font-['DM_Sans']">
              “We have been impressed with your performance and are confident
              that you will continue to make valuable contributions to our
              team.”
            </span>
          </blockquote>
          <p className="mt-[24px] font-bold uppercase tracking-[0.14em] text-[#645A6D]">
            <span className="font-['DM_Sans']">QA Lead · Barge company</span>
          </p>
        </div>

        <div className="bg-[#D9C5B2] p-10">
          <p className="font-bold uppercase tracking-[0.14em] text-[#964A21]">
            <span className="font-['DM_Sans'] font-bold">
              {copy.noteLabel}
            </span>
          </p>
          <blockquote className="mt-[26px] max-w-[600px] text-lg leading-[27px] text-[#151240]">
            <span className="font-['DM_Sans']">
              “We highly value the consistency, knowledge, and quality
              Test-Jedi has brought to the project and would appreciate
              continuing with the same resource.”
            </span>
          </blockquote>
          <p className="mt-[24px] font-bold uppercase tracking-[0.14em] text-[#645A6D]">
            <span className="font-['DM_Sans']">QA Lead · Galafy</span>
          </p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default CaseStudy;
