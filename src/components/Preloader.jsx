import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../config/site";

const KEY = "ds_intro";

/** Short intro shown once per session: a plan draws itself, then the screen lifts away. */
const Preloader = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(() => {
    if (pathname.startsWith("/admin")) return false;
    try { return !sessionStorage.getItem(KEY); } catch { return false; }
  });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!show) return undefined;
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    const a = setTimeout(() => setLeaving(true), 1700);
    const b = setTimeout(() => setShow(false), 2500);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [show]);

  if (!show) return null;
  return (
    <div className={`fixed inset-0 z-[400] bg-ink flex flex-col items-center justify-center ${leaving ? "preloader-out" : ""}`} role="status" aria-label="Loading">
      <svg viewBox="0 0 240 120" className="w-56 sm:w-72" fill="none" stroke="#E6B832" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path className="draw-path pre-1" pathLength="1" d="M10 110 H230" />
        <path className="draw-path pre-2" pathLength="1" d="M30 110 V62 L120 14 L210 62 V110 M30 62 H210" />
        <path className="draw-path pre-3" pathLength="1" d="M60 62 L120 30 L180 62 M70 74 H100 V110 M140 74 H170 V96 H140z" />
        <path className="draw-path pre-4" pathLength="1" d="M80 62 L120 41 L160 62" />
      </svg>
      <p className="font-display font-extrabold text-white text-2xl tracking-[0.25em] mt-8 animate-fade-up delay-300">{SITE.name.toUpperCase()}</p>
      <div className="w-40 h-[3px] bg-white/10 mt-6 overflow-hidden"><div className="h-full bg-amber pre-bar" /></div>
    </div>
  );
};

export default Preloader;
