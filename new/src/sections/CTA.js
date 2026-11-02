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
    <section className="text-center px-5 md:px-[14vw] py-28 bg-light-brown">
      <p className="text-[11px] uppercase tracking-[0.19em] text-dark-brown">{labelConfig.clientPerspective}</p>
      <blockquote className="font-[Playfair_Display] text-4xl md:text-[74px] leading-[1.05] my-8 text-dark-brown">“{labelConfig.testimonial}”</blockquote>
      <p className="text-xs uppercase tracking-[0.13em] text-dark-brown">{labelConfig.testimonialAuthor}</p>
    </section>
  </>
);

export default CTA;
