import { useEffect, useState } from "react";
import { useQuote } from "../context/QuoteContext";
import { useLang } from "../context/LangContext";
import { SITE, waLink } from "../config/site";
import { img, PHOTOS } from "../config/images";
import { services } from "./servicesData";

const words = ["Homes", "Interiors", "Roofing", "Villas"];

const FIN = {
  Roof: [["Galvalume silver", "#B7BEC3", "#97A0A6"], ["Forest green", "#2F6B54", "#245543"], ["Slate blue", "#3F5A74", "#31475C"], ["Brick red", "#A4483C", "#86382F"], ["Charcoal", "#3B4044", "#2D3134"]],
  Walls: [["Plaster white", "#F1F0EA"], ["Sand", "#D9C7A3"], ["Sage", "#B9C7B2"], ["Slate", "#8E9AA3"]],
  Joinery: [["Teak", "#A8743F"], ["Walnut", "#5B3A27"], ["Grey oak", "#8F8A80"], ["White gloss", "#F4F4F2"]],
};
const OL = { stroke: "#15181B", strokeWidth: 1.25, strokeLinejoin: "round" };
const GLASS = "#BFD0D6";

/** Front elevation whose roof, walls and joinery recolour live as the visitor picks finishes. */
const ElevationStudio = () => {
  const [pick, setPick] = useState({ Roof: 1, Walls: 1, Joinery: 0 });
  const r = FIN.Roof[pick.Roof], w = FIN.Walls[pick.Walls], d = FIN.Joinery[pick.Joinery];
  const fill = (c) => ({ fill: c, transition: "fill .45s ease" });
  const msg = `Hi Alpha Designers, I like this look: ${r[0].toLowerCase()} roof sheets, ${w[0].toLowerCase()} walls and ${d[0].toLowerCase()} doors and joinery. Can we discuss it?`;

  return (
    <div className="bg-paper text-ink border border-white/20 p-4 md:p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <svg viewBox="0 0 640 430" className="block w-full h-auto" role="img" aria-label="Front elevation of a house. Roof, wall and door colours change with the choices below.">
        <defs>
          <pattern id="corr" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="5" height="10" fill="#fff" opacity=".22" /><rect x="5" width="5" height="10" fill="#000" opacity=".13" /></pattern>
          <pattern id="poly" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="2" height="8" fill="#fff" opacity=".55" /></pattern>
        </defs>
        <rect x="0" y="360" width="640" height="70" fill="#DADED7" />
        <rect x="112" y="192" width="416" height="168" style={{ ...OL, ...fill(w[1]) }} />
        <rect x="112.6" y="340" width="414.8" height="19.4" fill="#000" opacity=".15" />
        <polygon points="80,198 320,84 560,198" style={{ ...OL, ...fill(r[1]) }} />
        <polygon points="80,198 320,84 560,198" fill="url(#corr)" />
        <rect x="80" y="198" width="480" height="10" style={{ ...OL, ...fill(r[2]) }} />
        <circle cx="320" cy="152" r="10" fill={GLASS} style={OL} />
        {[152, 408].map((x) => (
          <g key={x}>
            <rect x={x} y="228" width="80" height="72" fill={GLASS} style={OL} />
            <path d={`M${x + 40} 228v72M${x} 264h80`} fill="none" style={OL} />
            <rect x={x - 4} y="300" width="88" height="7" style={{ ...OL, ...fill(w[1]) }} />
          </g>
        ))}
        <rect x="285" y="254" width="70" height="106" style={{ ...OL, ...fill(d[1]) }} />
        <path d="M303 254v106M321 254v106M339 254v106" stroke="#000" strokeOpacity=".22" fill="none" />
        <circle cx="347" cy="312" r="2.6" fill="#C8A24A" />
        <rect x="262" y="236" width="116" height="9" fill="#BFE0EC" fillOpacity=".8" style={OL} />
        <rect x="262" y="236" width="116" height="9" fill="url(#poly)" />
        <path d="M270 245l14 14M370 245l-14 14" fill="none" style={OL} />
        <rect x="272" y="352" width="96" height="8" style={{ ...OL, ...fill(w[1]) }} />
        <g style={OL}>
          <rect x="0" y="326" width="92" height="34" style={fill(w[1])} /><rect x="548" y="326" width="92" height="34" style={fill(w[1])} />
          <rect x="86" y="310" width="16" height="50" style={fill(w[1])} /><rect x="538" y="310" width="16" height="50" style={fill(w[1])} />
        </g>
        <line x1="0" y1="360" x2="640" y2="360" style={OL} />
        <path d="M112 394H528M112 385v18M528 385v18" fill="none" style={OL} />
        <rect x="296" y="383" width="48" height="22" fill="#E6B832" />
        <text x="320" y="399" textAnchor="middle" fontSize="13" fontWeight="600" fill="#15181B" fontFamily="'Instrument Sans', Arial, sans-serif">42 ft</text>
      </svg>

      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-[12px] text-stone border-t border-line mt-2 pt-2.5">
        <span>Front elevation, scale 1:100</span>
        <span>{r[0]} roof, {w[0].toLowerCase()} walls, {d[0].toLowerCase()} joinery</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {Object.keys(FIN).map((g) => (
          <div key={g}>
            <p className="text-[13px] font-semibold mb-2.5">{g === "Roof" ? "Roof sheet" : g}</p>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label={`${g} colour`}>
              {FIN[g].map((f, i) => (
                <button key={f[0]} type="button" aria-label={f[0]} aria-pressed={pick[g] === i} onClick={() => setPick((p) => ({ ...p, [g]: i }))} className="sw-btn" style={{ background: f[1] }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line mt-5 pt-4">
        <span className="text-xs text-stone">Pick finishes and we will quote the same combination.</span>
        <a href={waLink(msg)} target="_blank" rel="noreferrer" className="btn-secondary !py-2 !px-4 !text-[13px]">Ask about this look</a>
      </div>
    </div>
  );
};

const Hero = () => {
  const { openQuote } = useQuote();
  const { t } = useLang();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-ink text-white overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-40 animate-kenburns" style={{ backgroundImage: `url('${img(PHOTOS.livingWide, 1800)}')` }} aria-hidden />
      <div className="absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(21,24,27,0.96) 0%, rgba(21,24,27,0.82) 45%, rgba(21,24,27,0.55) 100%)" }} aria-hidden />
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />

      <div className="relative container-px w-full pt-32 pb-20 md:pt-40 md:pb-24 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
        <div>
          <p className="eyebrow animate-fade-up">{t("Design & build studio, Mannargudi")}</p>
          <h1 className="font-display font-extrabold leading-[0.98] text-[clamp(2.4rem,6vw,4.6rem)] mt-6 animate-widen">
            <span className="block">{t("Design it.")}</span>
            <span className="block text-amber">{t("Build it.")}</span>
            <span className="block">{t("Love it.")}</span>
          </h1>
          <p className="text-white/75 max-w-lg mt-7 text-base md:text-lg leading-relaxed animate-fade-up delay-200">
            {t("From the first sketch to the final handover, one team designs, builds and finishes your space - with fixed quotes and on-time delivery.")}
          </p>

          <div className="flex items-center gap-3 mt-6 text-sm animate-fade-up delay-300" style={{ perspective: 400 }}>
            <span className="text-white/55">{t("We specialise in")}</span>
            <span key={i} className="animate-word font-display font-extrabold text-xl text-amber">{t(words[i])}</span>
          </div>

          <div className="flex flex-wrap gap-3 mt-9 animate-fade-up delay-400">
            <button onClick={openQuote} className="btn-primary !py-4 !px-7 text-[15px]">{t("Get free quote")} <span aria-hidden>&rarr;</span></button>
            <a href="#room-studio" className="inline-flex items-center gap-2 border border-white/40 px-7 py-4 text-[15px] font-bold hover:bg-white hover:text-ink transition-colors">{t("Try the Room Studio")}</a>
          </div>

          <ul className="mt-10 grid grid-cols-3 border border-white/20 max-w-lg animate-fade-up delay-500">
            {[t("Free site visit"), t("Fixed quote"), `${SITE.stats.warranty}-yr warranty`].map((x, n) => (
              <li key={x} className={`px-3 py-3.5 text-[12px] sm:text-[13px] font-semibold flex items-center gap-2 ${n ? "border-l border-white/20" : ""}`}>
                <span className="w-2.5 h-2.5 bg-amber flex-none" aria-hidden />{x}
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-[640px] w-full mx-auto lg:ml-auto animate-fade-up delay-300">
          <ElevationStudio />
        </div>
      </div>

      {/* Services ticker */}
      <div className="relative bg-amber text-ink border-t-2 border-ink overflow-hidden py-3.5" aria-hidden>
        <div className="flex w-max whitespace-nowrap animate-marquee-slow">
          {[...services, ...services, ...services].map((s, n) => (
            <span key={n} className="mx-6 font-display font-bold text-sm md:text-base">
              {s.title} <span className="mx-4">&#9670;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
