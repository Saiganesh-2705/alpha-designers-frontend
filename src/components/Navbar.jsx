import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";
import { useLang } from "../context/LangContext";
import { SITE, telLink } from "../config/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact Us" },
];

const Logo = () => (
  <Link to="/" className="flex items-center gap-3" aria-label={SITE.name}>
    <svg width="36" height="36" viewBox="0 0 34 34" aria-hidden="true" className="flex-none"><rect width="34" height="34" fill="#E6B832" /><path d="M6 27 17 7l11 20" fill="none" stroke="#15181B" strokeWidth="3" /><rect x="12" y="21" width="10" height="3.5" fill="#15181B" /></svg>
    <span className="leading-none hidden sm:block">
      <span className="block font-display font-extrabold text-[17px]">Alpha</span>
      <span className="block text-[11px] text-white/60 mt-1">Designers &amp; Builders</span>
    </span>
  </Link>
);

/** Full-width studio header - tightens on scroll, with a Tamil / English switch. */
const Navbar = () => {
  const { pathname } = useLocation();
  const { openQuote } = useQuote();
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const Lang = ({ className = "" }) => (
    <div className={`flex border border-white/25 text-[11px] font-bold ${className}`} role="group" aria-label="Language">
      {[["en", "EN"], ["ta", "தமிழ்"]].map(([k, l]) => (
        <button key={k} onClick={() => setLang(k)} className={`px-2.5 py-1.5 transition-colors ${lang === k ? "bg-amber text-ink" : "text-white/70 hover:text-white"}`}>{l}</button>
      ))}
    </div>
  );

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 text-white nav-bar">
        <nav className={`container-px flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "py-2.5" : "py-4"}`} aria-label="Main">
          <Logo />
          <ul className="hidden md:flex items-center gap-8 text-[14px] font-semibold">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === "/"} className={({ isActive }) => `nav-link ${isActive ? "is-active text-white" : "text-white/70"}`}>{t(l.label)}</NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Lang className="hidden sm:flex" />
            {/* <a href={telLink()} className="hidden xl:inline-flex text-[13px] font-semibold text-white/80 hover:text-white">{SITE.phones[0]}</a> */}
            <button onClick={openQuote} className="btn-primary !py-2.5 !px-4 !text-[13px]">
              {t("Free Quote")} <span aria-hidden>&rarr;</span>
            </button>
            <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="md:hidden w-10 h-10 border border-white/25 grid place-items-center">
              <span className="relative block w-4 h-3">
                <span className={`absolute left-0 w-4 h-0.5 bg-white transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 w-4 h-0.5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 w-4 h-0.5 bg-white transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div className={`md:hidden fixed inset-0 z-40 bg-ink text-white grid-bg transition-all duration-500 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="h-full flex flex-col justify-center px-8 gap-2">
          {links.map((l, i) => (
            <Link key={l.to} to={l.to} style={{ transitionDelay: open ? `${i * 70}ms` : "0ms" }} className={`font-display font-extrabold text-4xl py-2 transition-all duration-500 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${pathname === l.to ? "text-amber" : ""}`}>{t(l.label)}</Link>
          ))}
          <div className="mt-6 flex items-center gap-3"><Lang /><a href={telLink()} className="text-white/70 text-sm">{SITE.phones[0]}</a></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
