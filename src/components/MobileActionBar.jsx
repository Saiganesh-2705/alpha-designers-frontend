import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";
import { waLink, telLink } from "../config/site";
import { WaIcon } from "./FloatingWhatsApp";

const Ico = ({ d }) => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
);

/** Phones only: three separate floating buttons (Call / WhatsApp / Free Quote) with clear gaps. */
const MobileActionBar = () => {
  const { pathname } = useLocation();
  const { openQuote } = useQuote();
  const [hidden, setHidden] = useState(false);

  // Slide the dock away while scrolling down, bring it back on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;
  const base = "flex-1 flex items-center justify-center gap-2 h-12 rounded-full text-[13px] font-bold shadow-lg active:scale-95 transition-transform";
  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex gap-2 transition-transform duration-300 pointer-events-none ${hidden ? "translate-y-[140%]" : "translate-y-0"}`}
    >
      <a href={telLink()} aria-label="Call us" className={`${base} pointer-events-auto bg-ink text-white ring-1 ring-white/10`}>
        <Ico d="M3 5a2 2 0 012-2h3.3a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2l-2.26 1.13a11 11 0 005.52 5.52l1.13-2.26a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6z" />
        Call
      </a>
      <a href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className={`${base} pointer-events-auto bg-[#25D366] text-white`}>
        <WaIcon size={19} /> WhatsApp
      </a>
      <button onClick={openQuote} className={`${base} pointer-events-auto bg-amber text-ink animate-soft-pulse`}>
        <Ico d="M9 7h6m-6 4h6m-7 8h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        Free Quote
      </button>
    </div>
  );
};

export default MobileActionBar;
