import { useEffect, useRef, useState } from "react";
import { img, PHOTOS } from "../config/images";
import StatsBar from "./StatsBar";

// The studio statement. Words are plain strings; { photo } entries become small inline photographs.
const TOKENS = [
  "We", "design", "the", "room", { photo: PHOTOS.interiorB }, "and", "build", "the", "roof.",
  "Kitchens,", "ceilings", "and", "wardrobes", "inside;", "sheet", "roofs,", "trusses", "and", "waterproofing", { photo: PHOTOS.houseRoof2 },
  "above.", "One", "crew,", "one", "schedule,", "one", "warranty", { photo: PHOTOS.crew }, "from", "Mannargudi.",
];

/** Large editorial statement that "reads in" word by word as the visitor scrolls. */
const StudioStatement = () => {
  const box = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setP(1); return undefined; }
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = box.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top enters the lower third, 1 once its bottom reaches the upper third
      setP(Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.35))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const lit = Math.round(p * (TOKENS.length + 2));

  return (
    <section className="bg-sand">
      <div className="container-px pt-24 md:pt-36 pb-10 grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
        <p className="eyebrow self-start">About the studio</p>
        <p ref={box} className="font-display font-bold text-[clamp(1.9rem,4.6vw,3.8rem)] leading-[1.14] max-w-5xl">
          {TOKENS.map((t, i) =>
            typeof t === "string" ? (
              <span key={i} className={`transition-colors duration-500 ${i < lit ? "text-ink" : "text-ink/20"}`}>{t} </span>
            ) : (
              <span
                key={i}
                aria-hidden
                className={`inline-block align-middle w-[1.7em] h-[0.72em] mx-[0.12em] -translate-y-[0.06em] bg-cover bg-center border border-ink transition-all duration-700 ${i < lit ? "opacity-100 scale-100" : "opacity-20 scale-95"}`}
                style={{ backgroundImage: `url('${img(t.photo, 500)}')` }}
              />
            )
          )}
        </p>
      </div>
      <StatsBar />
    </section>
  );
};

export default StudioStatement;
