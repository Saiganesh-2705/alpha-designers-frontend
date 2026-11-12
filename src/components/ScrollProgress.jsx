import { useEffect, useState } from "react";

/** Thin amber progress bar at the very top that fills as you scroll. */
const ScrollProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 h-[3px] z-[120] pointer-events-none">
      <div className="h-full bg-amber origin-left" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
};
export default ScrollProgress;
