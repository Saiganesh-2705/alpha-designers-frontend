import { Link } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";
import { useLang } from "../context/LangContext";
import { SITE, waLink, telLink, mapsSearch } from "../config/site";
import { WaIcon } from "./FloatingWhatsApp";

const explore = [["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Projects", "/projects"], ["FAQs", "/faqs"], ["Contact Us", "/contact"]];

const Footer = () => {
  const { openQuote } = useQuote();
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#0E1113] text-white/70 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative container-px pt-16 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12 border-b border-white/10">
          <h2 className="font-display font-extrabold text-white text-4xl md:text-6xl leading-[1.02] max-w-2xl">Have a plot, a plan or just an idea?<span className="text-amber"> Let's build it.</span></h2>
          <button onClick={openQuote} className="btn-primary btn-shine !px-8 !py-4 text-[15px]">{t("Get free quote")} <span aria-hidden>&rarr;</span></button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          <div>
            <p className="font-display font-extrabold text-white text-2xl flex items-center gap-2"><svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><rect width="34" height="34" fill="#E6B832" /><path d="M6 27 17 7l11 20" fill="none" stroke="#15181B" strokeWidth="3" /><rect x="12" y="21" width="10" height="3.5" fill="#15181B" /></svg>Alpha</p>
            <p className="text-sm mt-4 max-w-xs leading-relaxed">{SITE.description}</p>
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-4">Explore</p>
            <ul className="space-y-2 text-sm">{explore.map(([l, to]) => <li key={to}><Link to={to} className="hover:text-amber transition-colors">{t(l)}</Link></li>)}</ul>
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-4">Visit us</p>
            <address className="not-italic text-sm leading-relaxed">{SITE.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
            <a href={mapsSearch()} target="_blank" rel="noreferrer" className="inline-block mt-3 text-amber text-sm font-semibold hover:underline">Open in Maps &rarr;</a>
          </div>
          <div>
            <p className="text-white font-bold text-sm mb-4">Talk to us</p>
            <a href={telLink()} className="block text-white text-lg font-bold hover:text-amber transition-colors">{SITE.phones[0]}</a>
            <a href={`mailto:${SITE.email}`} className="block text-sm mt-1 hover:text-amber">{SITE.email}</a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 bg-[#25D366] text-white px-4 py-2.5 text-sm font-bold"><WaIcon size={16} /> WhatsApp</a>
            <p className="text-xs mt-4">{SITE.hours.map((h) => `${h.days}: ${h.time}`).join(" | ")}</p>
          </div>
        </div>
      </div>

      {/* giant wordmark */}
      <div className="relative select-none pointer-events-none leading-none text-center font-display font-extrabold text-[26vw] md:text-[19vw] tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.12)" }} aria-hidden>ALPHA</div>
      <div className="relative container-px py-5 border-t border-white/10 flex flex-wrap justify-between gap-2 text-xs">
        <p>&copy; {year} {SITE.fullName}. All rights reserved.</p>
        <p>{SITE.shortLocation}</p>
      </div>
    </footer>
  );
};

export default Footer;
