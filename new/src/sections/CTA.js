import { labelConfig } from "../assets/static.config";

const CTA = () => (
  <>
    <section className="grid lg:grid-cols-2 gap-[9vw] px-5 md:px-[7vw] py-24 md:py-28 bg-medium-brown" id="contact">
      <div className="text-dark-brown">
        <p className="text-[11px] uppercase tracking-[0.19em] mb-6">{labelConfig.contactEyebrow}</p>
        <h2 className="font-[Playfair_Display] text-5xl md:text-[92px] leading-[0.95]">{labelConfig.readyHeadingLead}<br /><em className="text-accent-brown not-italic">{labelConfig.readyHeadingAccent}</em></h2>
        <p className="max-w-[500px] leading-7 mt-8">{labelConfig.contactIntro}</p>
        <a className="inline-block mt-5 border-b border-dark-brown" href={`mailto:${labelConfig.testJediEmail}`}>{labelConfig.testJediEmail}</a><br />
        <a className="inline-block mt-4 border-b border-dark-brown" href={`tel:${labelConfig.testJediPhone.replace(/[^+\d]/g, "")}`}>{labelConfig.testJediPhone}</a>
      </div>
      <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.12em] text-dark-brown"><span>{labelConfig.fullName}</span><input className="border-0 border-b border-dark-brown bg-transparent py-3" name="name" placeholder={labelConfig.fullName} /></label>
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.12em] text-dark-brown"><span>{labelConfig.email}</span><input className="border-0 border-b border-dark-brown bg-transparent py-3" name="email" type="email" placeholder={labelConfig.email} /></label>
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.12em] text-dark-brown"><span>{labelConfig.companyName}</span><input className="border-0 border-b border-dark-brown bg-transparent py-3" name="company" placeholder={labelConfig.companyName} /></label>
        <label className="grid gap-2 text-[11px] uppercase tracking-[0.12em] text-dark-brown"><span>{labelConfig.message}</span><textarea className="h-24 border-0 border-b border-dark-brown bg-transparent py-3 resize-none" name="message" placeholder={labelConfig.howCanWeHelpYou} /></label>
        <button className="justify-self-start mt-3 px-6 py-4 rounded-full bg-dark-brown text-white" type="submit">{labelConfig.sendMessage} ↗</button>
      </form>
    </section>
    <section className="bg-light-brown px-5 py-20 md:px-[7vw] md:py-28">
      <p className="text-[11px] uppercase tracking-[0.19em] text-dark-brown">{labelConfig.clientPerspective}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {[labelConfig.testimonial, "They found the release blockers nobody else could reproduce, then gave our team a clear test plan for fixing them."].map((quote, index) => (
          <figure key={quote} className="bg-white px-8 py-10 md:px-12 md:py-12">
            <blockquote className="font-[Playfair_Display] text-3xl leading-[1.12] text-dark-brown md:text-[48px]">“{quote}”</blockquote>
            <figcaption className="mt-8 text-xs uppercase tracking-[0.13em] text-dark-brown">{index === 0 ? labelConfig.testimonialAuthor : "Head of Quality · Fintech Platform"}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  </>
);

export default CTA;
