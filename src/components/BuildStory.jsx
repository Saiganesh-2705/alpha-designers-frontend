import { useEffect, useRef, useState } from "react";
import { useLang } from "../context/LangContext";

const stages = [
  { k: "Plan", d: "Measure the plot, agree the design, fix the budget." },
  { k: "Foundation", d: "Excavation, footings and plinth - the strong base." },
  { k: "Structure", d: "Columns, beams, walls and slabs go up." },
  { k: "Roof", d: "Roof framing, sheets or slab, waterproofing." },
  { k: "Interior", d: "Flooring, false ceiling, kitchen, wardrobes, paint, lights." },
  { k: "Handover", d: "Final checks, keys in your hand, warranty in writing." },
];

/** Scroll-driven scene: the house is built stage by stage as the visitor scrolls. */
const BuildStory = () => {
  const { t } = useLang();
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setP(Math.max(0, Math.min(1, -r.top / total)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const s = Math.min(stages.length - 1, Math.floor(p * stages.length));
  const on = (n) => s >= n;
  const rise = (n) => ({ opacity: on(n) ? 1 : 0, transform: on(n) ? "none" : "translateY(26px)" });

  return (
    <section ref={ref} className="relative bg-ink text-white h-[520vh]">
      <div className="sticky top-0 h-screen overflow-hidden grid-bg">
        <div className="container-px h-full grid lg:grid-cols-2 gap-4 lg:gap-10 items-center pt-20 pb-6">
          <div className="order-2 lg:order-1">
            <p className="eyebrow">{t("How we build")}</p>
            <h2 className="section-title mt-3 !text-3xl md:!text-5xl max-w-xl">{t("Watch your project rise, stage by stage.")}</h2>

            <div className="mt-6 md:mt-8 flex items-start gap-4">
              <span className="font-display font-extrabold text-6xl md:text-8xl text-amber leading-none tabular-nums">0{s + 1}</span>
              <div key={s} className="animate-fade-up pt-1 md:pt-3">
                <h3 className="font-display font-extrabold text-2xl md:text-3xl">{t(stages[s].k)}</h3>
                <p className="text-white/65 mt-1.5 max-w-sm text-sm md:text-base">{t(stages[s].d)}</p>
              </div>
            </div>

            <div className="mt-6 md:mt-8 flex gap-1.5 max-w-md">
              {stages.map((x, i) => (
                <div key={x.k} className="flex-1">
                  <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
                    <div className="h-full bg-amber transition-all duration-500" style={{ width: s > i ? "100%" : s === i ? "55%" : "0%" }} />
                  </div>
                  <p className={`hidden md:block text-[10px] mt-1.5 uppercase tracking-wider ${s >= i ? "text-white" : "text-white/35"}`}>{t(x.k)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <svg viewBox="0 0 600 460" className="w-full max-h-[48vh] lg:max-h-[72vh] mx-auto" fill="none" aria-hidden>
              <defs><pattern id="pg" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" stroke="#fff" strokeOpacity="0.06" /></pattern></defs>
              <rect width="600" height="460" fill="url(#pg)" />

              {/* 0 PLAN: dashed outline + dimensions, fades back later */}
              <g className="stage-part" style={{ opacity: s === 0 ? 1 : 0.22 }} stroke="#E6B832" strokeWidth="1.6" strokeDasharray="6 6">
                <rect x="130" y="230" width="340" height="150" />
                <path d="M130 410 H470 M130 402 V418 M470 402 V418" strokeDasharray="0" />
                <path d="M300 150 L130 230 M300 150 L470 230" />
              </g>
              <text x="300" y="432" textAnchor="middle" fill="#E6B832" fontSize="13" className="stage-part" style={{ opacity: s === 0 ? 1 : 0 }}>40 ft x 22 ft</text>

              {/* ground */}
              <path d="M60 380 H540" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />

              {/* 1 FOUNDATION */}
              <g className="stage-part" style={rise(1)}>
                <rect x="120" y="380" width="360" height="22" fill="#8C7B65" />
                {[150, 300, 450].map((x) => <rect key={x} x={x - 14} y="402" width="28" height="22" fill="#6E5F4C" />)}
              </g>

              {/* 2 STRUCTURE */}
              <g className="stage-part" style={{ ...rise(2), transformOrigin: "300px 380px" }}>
                <rect x="140" y="230" width="320" height="150" fill="#EDEFEB" />
                {[140, 300, 452].map((x) => <rect key={x} x={x} y="226" width="10" height="154" fill="#C9BFAE" />)}
                <rect x="136" y="224" width="328" height="10" fill="#B8AD98" />
              </g>

              {/* 3 ROOF */}
              <g className="stage-part" style={{ opacity: on(3) ? 1 : 0, transform: on(3) ? "none" : "translateY(-60px)" }}>
                <path d="M112 232 L300 126 L488 232 Z" fill="#E6B832" />
                <path d="M112 232 L300 126 L300 232 Z" fill="#000" fillOpacity="0.14" />
                <rect x="380" y="150" width="26" height="56" fill="#1F2528" />
              </g>

              {/* 4 INTERIOR (windows glow, door, plants) */}
              <g className="stage-part" style={{ opacity: on(4) ? 1 : 0 }}>
                <rect x="168" y="268" width="76" height="60" rx="4" fill="#F2C14E" fillOpacity="0.85" />
                <rect x="356" y="268" width="76" height="60" rx="4" fill="#F2C14E" fillOpacity="0.85" />
                <path d="M206 268 V328 M168 298 H244 M394 268 V328 M356 298 H432" stroke="#15181B" strokeWidth="2.5" />
                <rect x="268" y="292" width="64" height="88" rx="4" fill="#1F4A3D" />
                <circle cx="321" cy="338" r="3.5" fill="#F2C14E" />
                <ellipse cx="104" cy="368" rx="14" ry="12" fill="#3E7B5A" /><rect x="98" y="372" width="12" height="10" fill="#8C5A3A" />
                <ellipse cx="496" cy="368" rx="14" ry="12" fill="#3E7B5A" /><rect x="490" y="372" width="12" height="10" fill="#8C5A3A" />
              </g>

              {/* 5 HANDOVER */}
              <g className="stage-part" style={{ opacity: on(5) ? 1 : 0, transform: on(5) ? "none" : "scale(0.85)", transformOrigin: "300px 120px" }}>
                <circle cx="520" cy="80" r="28" fill="#F2C14E" />
                <g transform="translate(300 78)">
                  <rect x="-78" y="-26" width="156" height="42" rx="21" fill="#E6B832" />
                  <path d="M-52 -5 l8 8 l14 -16" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="-18" y="1" fill="#fff" fontSize="14" fontWeight="800" fontFamily="Bricolage Grotesque">Handed over</text>
                </g>
                {[[110,100],[150,60],[470,40],[560,150],[70,170]].map(([x,y],i)=> <path key={i} d={`M${x} ${y-8} V${y+8} M${x-8} ${y} H${x+8}`} stroke="#F2C14E" strokeWidth="2.5" strokeLinecap="round" />)}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildStory;
