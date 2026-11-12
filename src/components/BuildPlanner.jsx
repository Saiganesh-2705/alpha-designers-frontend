import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { useLang } from "../context/LangContext";
import { useQuote } from "../context/QuoteContext";
import { SITE, waLink } from "../config/site";
import { WaIcon } from "./FloatingWhatsApp";

const FINISH = ["Standard", "Premium", "Luxury"];
const SPLIT = [
  ["Foundation & plinth", 0.15, "#8C7B65"],
  ["Structure & slabs", 0.33, "#E6B832"],
  ["Roofing & waterproofing", 0.1, "#F2C14E"],
  ["Electrical & plumbing", 0.14, "#3E7B5A"],
  ["Finishing & paint", 0.28, "#BCD0C6"],
];

const inr = (n) => {
  if (n >= 1e7) return `\u20B9${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `\u20B9${(n / 1e5).toFixed(1)} Lakh`;
  return `\u20B9${Math.round(n).toLocaleString("en-IN")}`;
};

const BuildPlanner = () => {
  const { t } = useLang();
  const { openQuote } = useQuote();
  const [area, setArea] = useState(1200);
  const [floors, setFloors] = useState(1);
  const [finish, setFinish] = useState("Standard");
  const [interiors, setInteriors] = useState(false);
  const [compound, setCompound] = useState(false);
  const [proof, setProof] = useState(true);

  const r = useMemo(() => {
    const total = area * floors;
    const base = total * SITE.buildRates[finish];
    const inter = interiors ? total * SITE.interiorRates[finish] : 0;
    const comp = compound ? SITE.compoundWall : 0;
    const roof = proof ? area * SITE.roofProofRate : 0;
    const sum = base + inter + comp + roof;
    const months = Math.round(4 + total / 650 + (interiors ? 1.5 : 0));
    return { total, base, extras: inter + comp + roof, sum, months };
  }, [area, floors, finish, interiors, compound, proof]);

  const msg = `Hi Alpha Designers, I used your Build Planner: ${area} sq ft x ${floors} floor(s), ${finish} finish${interiors ? ", with interiors" : ""}${compound ? ", with compound wall" : ""}. Estimate about ${inr(r.sum)}. Please share an exact quote.`;
  const Seg = ({ list, val, set }) => (
    <div className="flex rounded-full bg-white/10 p-1 gap-1">
      {list.map((x) => (
        <button key={x} onClick={() => set(x)} className={`flex-1 px-3 py-2 rounded-full text-xs font-bold transition-all ${val === x ? "bg-amber text-ink shadow" : "text-white/70 hover:text-white"}`}>{typeof x === "number" ? `G+${x - 1}` : t(x)}</button>
      ))}
    </div>
  );
  const Toggle = ({ on, set, label }) => (
    <button onClick={() => set(!on)} aria-pressed={on} className="flex items-center justify-between w-full py-2.5 text-sm">
      <span className="text-white/85">{t(label)}</span>
      <span className={`w-11 h-6 rounded-full p-0.5 transition-colors ${on ? "bg-amber" : "bg-white/20"}`}><span className={`block w-5 h-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : ""}`} /></span>
    </button>
  );

  return (
    <section className="bg-ink text-white py-20 md:py-28 relative overflow-hidden">
      <div className="absolute -right-40 top-10 w-[480px] h-[480px] rounded-full bg-forest/50 blur-[120px]" />
      <div className="relative container-px">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t("Build Planner")}</p>
          <h2 className="section-title mt-3">{t("Know your budget before you call.")}</h2>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-2 gap-6 lg:gap-10">
          <Reveal className="glass rounded-3xl p-6 md:p-8 space-y-6">
            <div>
              <div className="flex items-end justify-between mb-3"><span className="text-sm text-white/70">{t("Built-up area per floor")}</span><span className="font-display font-extrabold text-3xl text-amber tabular-nums">{area.toLocaleString("en-IN")} <span className="text-sm text-white/50 font-body font-semibold">sq ft</span></span></div>
              <input type="range" className="alpha-range w-full" min="400" max="4000" step="50" value={area} onChange={(e) => setArea(+e.target.value)} aria-label="Area in square feet" />
              <div className="flex justify-between text-[11px] text-white/40 mt-1.5"><span>400</span><span>4,000</span></div>
            </div>
            <div><p className="text-sm text-white/70 mb-2">{t("Floors")}</p><Seg list={[1, 2, 3]} val={floors} set={setFloors} /></div>
            <div><p className="text-sm text-white/70 mb-2">{t("Finish")}</p><Seg list={FINISH} val={finish} set={setFinish} /></div>
            <div className="border-t border-white/10 pt-3">
              <p className="text-[11px] uppercase tracking-widest text-white/45 font-bold mb-1">{t("Add-ons")}</p>
              <Toggle on={interiors} set={setInteriors} label="Modular interiors" />
              <Toggle on={proof} set={setProof} label="Roof waterproofing" />
              <Toggle on={compound} set={setCompound} label="Compound wall & gate" />
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-3xl bg-sand text-ink p-6 md:p-8 flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs uppercase tracking-widest text-stone font-bold">{t("Estimated budget")}</p><p className="font-display font-extrabold text-4xl md:text-5xl mt-1 tabular-nums">{inr(r.sum)}</p></div>
              <div><p className="text-xs uppercase tracking-widest text-stone font-bold">{t("Approx. time")}</p><p className="font-display font-extrabold text-4xl md:text-5xl mt-1 tabular-nums">{r.months}<span className="text-lg text-stone font-body font-semibold"> {t("months")}</span></p></div>
            </div>

            <p className="text-xs uppercase tracking-widest text-stone font-bold mt-8 mb-3">{t("Where the money goes")}</p>
            <div className="flex h-5 rounded-full overflow-hidden bg-line">
              {SPLIT.map(([n, f, c]) => <div key={n} title={n} style={{ width: `${f * 100}%`, background: c, transition: "width 0.6s" }} />)}
            </div>
            <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {SPLIT.map(([n, f, c]) => (
                <li key={n} className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-stone"><i className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />{n}</span><b className="tabular-nums">{inr(r.base * f)}</b></li>
              ))}
              {r.extras > 0 && <li className="flex items-center justify-between gap-3 sm:col-span-2 border-t border-line pt-2"><span className="text-stone">Add-ons</span><b className="tabular-nums">{inr(r.extras)}</b></li>}
            </ul>

            <p className="text-[11px] text-stone mt-5">Indicative only - final price depends on site, design and material choices. {r.total.toLocaleString("en-IN")} sq ft total.</p>
            <div className="flex flex-wrap gap-3 mt-5 mt-auto pt-2">
              <button onClick={openQuote} className="btn-dark">{t("Get exact quote")} <span aria-hidden>&rarr;</span></button>
              <a href={waLink(msg)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-3 text-sm font-bold hover:brightness-110 transition"><WaIcon size={16} /> WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default BuildPlanner;
