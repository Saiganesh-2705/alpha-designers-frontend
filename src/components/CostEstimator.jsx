import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { useQuote } from "../context/QuoteContext";
import { SITE, waLink } from "../config/site";
import { WaIcon } from "./FloatingWhatsApp";

const MODES = {
  interior: {
    label: "Interiors",
    areaLabel: "Home carpet area",
    min: 300, max: 3500, step: 50, def: 1200,
    types: [
      { key: "Full home", mult: 1, note: "Kitchen, wardrobes, ceilings, panelling" },
      { key: "Kitchen + wardrobes", mult: 0.55, note: "Core joinery only" },
      { key: "Ceiling + lighting", mult: 0.3, note: "False ceiling and cove lights" },
    ],
    finishes: [
      { key: "Basic", note: "Commercial ply, laminate finish", color: "#d9d5c9" },
      { key: "Standard", note: "BWR ply, premium laminate, soft-close", color: "#e9c75f" },
      { key: "Premium", note: "Acrylic / veneer, designer lighting", color: "#E6B832" },
    ],
  },
  roofing: {
    label: "Roofing",
    areaLabel: "Roof area",
    min: 200, max: 10000, step: 100, def: 1500,
    types: [
      { key: "Metal sheet", mult: 1, note: "Colour-coated / galvalume sheets with truss" },
      { key: "Polycarbonate", mult: 1.35, note: "Parking, pergolas, skylights" },
      { key: "PUF panel", mult: 1.9, note: "Insulated sandwich panels" },
      { key: "Waterproofing", mult: 0.45, note: "Terrace coating & leak repair" },
    ],
    finishes: [
      { key: "Basic", note: "0.40 mm sheet, standard colour", color: "#d9d5c9" },
      { key: "Standard", note: "0.50 mm sheet, longer warranty", color: "#e9c75f" },
      { key: "Premium", note: "0.60 mm+, insulated / premium coating", color: "#E6B832" },
    ],
  },
};

const useTween = (target, ms = 600) => {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const begin = from.current;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / ms);
      const val = begin + (target - begin) * (1 - Math.pow(1 - p, 3));
      from.current = val;
      setV(val);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
};

const money = (n) => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} Lakh`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};

/** Little illustration that changes with the inputs. */
const Stage = ({ mode, ratio, color }) => {
  const w = 40 + ratio * 55;
  if (mode === "roofing") {
    const sheets = Math.max(3, Math.round(w / 9));
    return (
      <svg viewBox="0 0 200 120" className="w-full max-w-[420px] transition-all duration-500" aria-hidden>
        <rect x={100 - w * 0.9} y="88" width={w * 1.8} height="6" fill="#2a2a2a" />
        <g style={{ transition: "all .5s" }}>
          <polygon points={`${100 - w * 0.95},88 100,${88 - 28 - ratio * 22} ${100 + w * 0.95},88`} fill={color} stroke="#111" strokeOpacity=".25" />
          {Array.from({ length: sheets }).map((_, i) => {
            const x = 100 - w * 0.95 + ((i + 1) * (w * 1.9)) / (sheets + 1);
            return <line key={i} x1={x} y1={88} x2={100 + (x - 100) * 0.05} y2={88 - 28 - ratio * 22} stroke="#111" strokeOpacity=".22" strokeWidth="1" />;
          })}
        </g>
        <rect x={100 - w * 0.8} y="94" width={w * 1.6} height="18" fill="#1d1d1d" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[420px] transition-all duration-500" aria-hidden>
      <rect x="20" y="14" width="160" height="92" fill="#202020" stroke="#333" />
      <rect x="20" y="14" width="160" height="12" fill={color} />
      {[40, 80, 120, 160].map((x) => (<circle key={x} cx={x} cy="20" r="2" fill="#fff" opacity=".85" />))}
      <rect x="28" y="34" width={30 + ratio * 40} height="60" fill={color} opacity=".85" />
      <rect x="130" y="52" width="40" height="22" fill="#2f2f2f" />
      <rect x="116" y="82" width="64" height="14" fill="#3a3a3a" />
      <rect x="20" y="96" width="160" height="10" fill="#161616" />
    </svg>
  );
};

/** Interactive ballpark estimate for interiors or roofing. */
const CostEstimator = () => {
  const { openQuote } = useQuote();
  const [mode, setMode] = useState("interior");
  const cfg = MODES[mode];
  const [area, setArea] = useState(cfg.def);
  const [type, setType] = useState(cfg.types[0].key);
  const [finish, setFinish] = useState("Standard");

  const switchMode = (m) => {
    setMode(m);
    setArea(MODES[m].def);
    setType(MODES[m].types[0].key);
  };

  const t = cfg.types.find((x) => x.key === type) || cfg.types[0];
  const rate = Math.round(SITE.rates[mode][finish] * t.mult);
  const total = area * rate;
  const shown = useTween(total);
  const fin = cfg.finishes.find((f) => f.key === finish);
  const ratio = (area - cfg.min) / (cfg.max - cfg.min);
  const msg = `Hi Alpha Designers, I used the estimator: ${cfg.label} - ${t.key}, ${area} sq ft, ${finish} finish (about ${money(total)}). Please share an exact quote.`;

  return (
    <section className="container-px py-24">
      <Reveal className="max-w-xl">
        <h2 className="section-title">What could your project cost?</h2>
        <p className="text-stone mt-4">Move the sliders for a ballpark figure. We confirm the exact amount after a free site visit.</p>
      </Reveal>

      <Reveal delay={150} className="mt-12 grid lg:grid-cols-2 bg-ink text-white overflow-hidden">
        <div className="p-8 md:p-12 space-y-8">
          <div role="tablist" aria-label="Service type" className="inline-flex border border-white/20 p-1 gap-1">
            {Object.entries(MODES).map(([k, m]) => (
              <button key={k} role="tab" aria-selected={mode === k} onClick={() => switchMode(k)} className={`px-5 py-2 text-sm font-semibold transition-colors ${mode === k ? "bg-amber text-ink" : "text-white/70 hover:text-white"}`}>
                {m.label}
              </button>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-baseline">
              <label htmlFor="area" className="font-semibold">{cfg.areaLabel}</label>
              <span className="font-display text-2xl text-forest">{area.toLocaleString("en-IN")} sq ft</span>
            </div>
            <input id="area" type="range" min={cfg.min} max={cfg.max} step={cfg.step} value={area} onChange={(e) => setArea(+e.target.value)} className="range-amber w-full mt-4" />
          </div>

          <div>
            <p className="font-semibold">{mode === "interior" ? "Scope" : "Roof type"}</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              {cfg.types.map((x) => (
                <button key={x.key} onClick={() => setType(x.key)} aria-pressed={type === x.key} className={`text-left p-4 border transition-colors ${type === x.key ? "border-amber bg-white/5" : "border-white/15 hover:border-white/50"}`}>
                  <span className="block font-semibold">{x.key}</span>
                  <span className="block text-xs text-white/55 mt-1 leading-snug">{x.note}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold">Material level</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              {cfg.finishes.map((f) => (
                <button key={f.key} onClick={() => setFinish(f.key)} aria-pressed={finish === f.key} className={`text-left p-4 border transition-colors ${finish === f.key ? "border-amber bg-white/5" : "border-white/15 hover:border-white/50"}`}>
                  <span className="block font-semibold">{f.key}</span>
                  <span className="block text-xs text-white/55 mt-1 leading-snug">{f.note}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative bg-[#161616] p-8 md:p-12 flex flex-col justify-between min-h-[480px] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden />

          <div className="relative flex-1 flex items-center justify-center pb-2">
            <Stage mode={mode} ratio={ratio} color={fin.color} />
          </div>

          <div className="relative mt-6">
            <p className="text-white/60 text-sm">Estimated cost</p>
            <p className="font-display font-extrabold text-5xl md:text-6xl mt-1">{money(shown)}</p>
            <p className="text-white/50 text-xs mt-2">
              {area.toLocaleString("en-IN")} sq ft at about ₹{rate.toLocaleString("en-IN")}/sq ft. Indicative only - final price depends on design and site.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={openQuote} className="btn-primary btn-shine">Get an exact quote <span aria-hidden>&rarr;</span></button>
              <a href={waLink(msg)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-md text-sm font-semibold hover:brightness-110 transition">
                <WaIcon size={18} /> Send on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default CostEstimator;
