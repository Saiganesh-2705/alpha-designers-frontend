import Reveal from "./Reveal";
import { SITE, waLink, telLink } from "../config/site";
import { WaIcon } from "./FloatingWhatsApp";
import { useQuote } from "../context/QuoteContext";

/** Three big ways to get in touch. */
const QuickContact = () => {
  const { openQuote } = useQuote();
  const card = "group block h-full rounded-2xl p-6 md:p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl";
  return (
    <section className="container-px py-16 md:py-24">
      <Reveal className="text-center max-w-2xl mx-auto">
        <p className="eyebrow">Get in touch</p>
        <h2 className="section-title mt-3">Talk to us in the way you prefer.</h2>
        <p className="text-stone mt-4 text-sm md:text-base">We usually reply within minutes. Open 24 hours, 7 days a week.</p>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-10">
        <Reveal delay={0}>
          <a href={telLink()} className={`${card} bg-ink text-white`}>
            <span className="text-amber text-xs font-bold tracking-widest">CALL</span>
            <p className="font-display font-extrabold text-2xl md:text-3xl mt-3">{SITE.phones[0]}</p>
            <p className="text-white/60 text-sm mt-2">Speak to an expert now</p>
            <span className="inline-block mt-6 text-amber font-semibold group-hover:translate-x-2 transition-transform">Call now &rarr;</span>
          </a>
        </Reveal>
        <Reveal delay={120}>
          <a href={waLink()} target="_blank" rel="noreferrer" className={`${card} bg-[#25D366] text-white`}>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest"><WaIcon size={16} /> WHATSAPP</span>
            <p className="font-display font-extrabold text-2xl md:text-3xl mt-3">Send photos & size</p>
            <p className="text-white/85 text-sm mt-2">Get a rough estimate on chat</p>
            <span className="inline-block mt-6 font-semibold group-hover:translate-x-2 transition-transform">Chat now &rarr;</span>
          </a>
        </Reveal>
        <Reveal delay={240}>
          <button onClick={openQuote} className={`${card} w-full bg-amber text-ink`}>
            <span className="text-xs font-bold tracking-widest">FREE QUOTE</span>
            <p className="font-display font-extrabold text-2xl md:text-3xl mt-3">Book a free site visit</p>
            <p className="text-ink/70 text-sm mt-2">Fill a 1-minute form</p>
            <span className="inline-block mt-6 font-semibold group-hover:translate-x-2 transition-transform">Get quote &rarr;</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
};
export default QuickContact;
