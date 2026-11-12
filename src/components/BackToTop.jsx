import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/** Round "back to top" button. Sits above the mobile dock / desktop WhatsApp button. */
const BackToTop = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (pathname.startsWith("/admin")) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-4 md:right-6 bottom-24 md:bottom-24 z-30 w-11 h-11 rounded-full bg-ink text-amber shadow-xl flex items-center justify-center hover:bg-amber hover:text-ink transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 19V5m-6 6l6-6 6 6" /></svg>
    </button>
  );
};
export default BackToTop;
