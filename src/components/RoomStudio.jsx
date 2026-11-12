import { useState } from "react";
import Reveal from "./Reveal";
import { useLang } from "../context/LangContext";
import { useQuote } from "../context/QuoteContext";
import { waLink } from "../config/site";
import { WaIcon } from "./FloatingWhatsApp";

const WALLS = [["Warm white", "#F3EDE2"], ["Sage", "#A9BBA3"], ["Sky", "#AFC7D8"], ["Terracotta", "#D9A58B"], ["Charcoal", "#3A4650"]];
const SOFAS = [["Teal", "#2F6F6B"], ["Mustard", "#D9A441"], ["Grey", "#8A9199"], ["Rose", "#C77D7D"]];
const FLOORS = ["Wood", "Marble", "Tile"];
const STYLES = ["Modern", "Classic", "Minimal"];
const FLOOR_BASE = { Wood: "#C69C72", Marble: "#ECE8E1", Tile: "#D5CEC2" };

// floor lines converge to a vanishing point for a simple perspective feel
const vx = (x0) => x0 + (320 - x0) * 0.4286;

const Room = ({ wall, sofa, floor, ceiling, evening, style }) => {
  const dark = wall === "#3A4650";
  const ink = dark ? "#fff" : "#15181B";
  const vLines = floor === "Wood" ? [-60, 20, 100, 180, 260, 340, 420, 500, 580, 660] : floor === "Tile" ? [-100, 40, 180, 320, 460, 600, 740] : [-20, 160, 320, 480, 660];
  const hLines = floor === "Wood" ? [276, 300, 330, 366] : floor === "Tile" ? [270, 292, 322, 362] : [282, 328];
  return (
    <svg viewBox="0 0 640 400" className="w-full h-auto rounded-3xl svg-smooth" role="img" aria-label="Room preview">
      <defs>
        <clipPath id="fl"><polygon points="40,380 140,260 500,260 600,380" /></clipPath>
        <radialGradient id="lampGlow"><stop offset="0" stopColor="#FFD98A" stopOpacity="0.9" /><stop offset="1" stopColor="#FFD98A" stopOpacity="0" /></radialGradient>
      </defs>

      {/* walls */}
      <rect width="640" height="400" fill="#15181B" />
      <polygon points="40,0 600,0 500,50 140,50" fill={wall} /><polygon points="40,0 600,0 500,50 140,50" fill="#fff" fillOpacity="0.14" />
      <rect x="140" y="50" width="360" height="210" fill={wall} />
      <polygon points="40,0 140,50 140,260 40,380" fill={wall} /><polygon points="40,0 140,50 140,260 40,380" fill="#000" fillOpacity="0.1" />
      <polygon points="600,0 500,50 500,260 600,380" fill={wall} /><polygon points="600,0 500,50 500,260 600,380" fill="#000" fillOpacity="0.16" />

      {/* false ceiling with cove light */}
      {ceiling === "False ceiling" && (
        <g>
          <polygon points="90,14 550,14 484,40 156,40" fill={dark ? "#566673" : "#fff"} fillOpacity="0.9" />
          <polygon points="90,14 550,14 484,40 156,40" fill="none" stroke="#FFC86B" strokeWidth={evening ? 4 : 1.5} strokeOpacity={evening ? 0.95 : 0.55} />
          {[230, 320, 410].map((x) => <circle key={x} cx={x} cy="27" r="3.5" fill="#FFE6A8" />)}
        </g>
      )}

      {/* floor */}
      <polygon points="40,380 140,260 500,260 600,380" fill={FLOOR_BASE[floor]} />
      <g clipPath="url(#fl)" stroke="#000" strokeOpacity={floor === "Marble" ? 0.1 : 0.18} strokeWidth="1.2">
        {vLines.map((x0) => <line key={x0} x1={x0} y1="380" x2={vx(x0)} y2="260" />)}
        {hLines.map((y) => <line key={y} x1="0" y1={y} x2="640" y2={y} />)}
        {floor === "Marble" && <path d="M180 372 C 260 320, 330 350, 420 290 M300 380 C 340 340, 420 360, 470 322" fill="none" strokeOpacity="0.22" />}
      </g>
      <polygon points="40,380 140,260 500,260 600,380" fill="#fff" fillOpacity={floor === "Marble" ? 0.18 : 0} />

      {/* window */}
      <g>
        <rect x="186" y="80" width="112" height="112" rx="4" fill={evening ? "#1B2A49" : "#BFE3F5"} />
        {evening && [[205,98],[260,108],[232,150],[278,168]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.6" fill="#fff" />)}
        {!evening && <circle cx="270" cy="110" r="14" fill="#FFF3B0" fillOpacity="0.9" />}
        <path d="M242 80 V192 M186 136 H298" stroke={ink} strokeOpacity="0.55" strokeWidth="3" />
        <rect x="186" y="80" width="112" height="112" rx="4" fill="none" stroke={ink} strokeOpacity="0.6" strokeWidth="4" />
        {style === "Classic" && <><path d="M176 74 q10 60 6 124 h-22 q-4 -64 16 -124z" fill="#B5564A" fillOpacity="0.9" /><path d="M308 74 q-10 60 -6 124 h22 q4 -64 -16 -124z" fill="#B5564A" fillOpacity="0.9" /></>}
      </g>
      {!evening && <polygon points="186,192 298,192 330,300 170,300" fill="#fff" fillOpacity="0.14" />}

      {/* wall decor by style */}
      {style === "Modern" && (
        <g><rect x="350" y="92" width="96" height="64" rx="3" fill="#fff" fillOpacity="0.85" /><circle cx="385" cy="122" r="18" fill="#E6B832" /><path d="M404 148 q16 -40 38 -8 v16 h-38z" fill="#1F4A3D" /></g>
      )}
      {style === "Classic" && (
        <g><rect x="348" y="88" width="100" height="72" fill="#8A6A3B" /><rect x="356" y="96" width="84" height="56" fill="#E9DCC0" /><path d="M356 140 l24 -26 l20 18 l16 -12 l24 22 v10 h-84z" fill="#6E8B6A" /></g>
      )}

      {/* rug */}
      <ellipse cx="320" cy="322" rx="150" ry="36" fill={sofa} fillOpacity="0.35" />

      {/* sofa */}
      <g>
        <rect x="204" y="190" width="232" height="54" rx={style === "Classic" ? 6 : 16} fill={sofa} />
        <rect x="190" y="216" width="40" height="58" rx={style === "Classic" ? 6 : 14} fill={sofa} />
        <rect x="410" y="216" width="40" height="58" rx={style === "Classic" ? 6 : 14} fill={sofa} />
        <rect x="216" y="224" width="208" height="46" rx={style === "Classic" ? 5 : 12} fill={sofa} /><rect x="216" y="224" width="208" height="46" rx="12" fill="#fff" fillOpacity="0.12" />
        {style !== "Minimal" && <><rect x="232" y="200" width="36" height="34" rx="8" fill="#fff" fillOpacity="0.8" transform="rotate(-6 250 217)" /><rect x="372" y="200" width="36" height="34" rx="8" fill="#F2C14E" transform="rotate(7 390 217)" /></>}
        <rect x="210" y="270" width="8" height="12" fill="#3a2a1d" /><rect x="422" y="270" width="8" height="12" fill="#3a2a1d" />
      </g>

      {/* coffee table */}
      {style === "Classic" ? (
        <g><rect x="262" y="312" width="116" height="30" rx="4" fill="#7A5A35" /><rect x="268" y="342" width="6" height="14" fill="#5A4125" /><rect x="366" y="342" width="6" height="14" fill="#5A4125" /></g>
      ) : (
        <g><ellipse cx="320" cy="330" rx="56" ry="14" fill="#fff" fillOpacity="0.92" /><ellipse cx="320" cy="336" rx="52" ry="10" fill="#000" fillOpacity="0.12" /></g>
      )}
      <rect x="306" y={style === "Classic" ? 298 : 312} width="6" height="14" fill="#E6B832" /><ellipse cx="309" cy={style === "Classic" ? 294 : 308} rx="9" ry="8" fill="#3E7B5A" />

      {/* plant */}
      {style !== "Minimal" && (
        <g><path d="M150 246 q-18 -40 4 -70 q10 30 -4 70 M154 246 q20 -34 6 -60 q-14 24 -6 60 M148 246 q-30 -18 -26 -50 q20 20 26 50" fill="#3E7B5A" /><path d="M136 246 h30 l-5 34 h-20z" fill="#B06A44" /></g>
      )}

      {/* floor lamp */}
      <g>
        <rect x="481" y="150" width="4" height="124" fill="#2b2b2b" /><ellipse cx="483" cy="276" rx="18" ry="5" fill="#2b2b2b" />
        <polygon points="462,150 504,150 496,118 470,118" fill={evening ? "#FFE3A0" : "#F2E7CF"} />
        {evening && <circle cx="483" cy="140" r="86" fill="url(#lampGlow)" />}
      </g>

      {/* pendant lights with false ceiling */}
      {ceiling === "False ceiling" && style !== "Minimal" && [270, 370].map((x) => (
        <g key={x}><line x1={x} y1="40" x2={x} y2="84" stroke="#222" strokeWidth="1.5" /><path d={`M${x - 14} 98 q14 -26 28 0z`} fill="#1F4A3D" /><circle cx={x} cy="100" r="4" fill={evening ? "#FFE6A8" : "#fff"} /></g>
      ))}

      {/* evening tint */}
      <rect width="640" height="400" fill="#15181B" fillOpacity={evening ? 0.4 : 0} style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
};

const Chip = ({ active, onClick, children }) => (
  <button onClick={onClick} className={`px-3.5 py-2 rounded-full text-xs font-bold border transition-all ${active ? "bg-amber text-ink border-amber scale-105" : "border-white/20 text-white/75 hover:border-white/60"}`}>{children}</button>
);
const Dot = ({ color, active, onClick, label }) => (
  <button onClick={onClick} aria-label={label} title={label} className={`w-9 h-9 rounded-full border-2 transition-all ${active ? "border-white scale-110 shadow-lg" : "border-transparent hover:scale-105"}`} style={{ background: color }} />
);

const RoomStudio = () => {
  const { t } = useLang();
  const { openQuote } = useQuote();
  const [wall, setWall] = useState(0);
  const [sofa, setSofa] = useState(0);
  const [floor, setFloor] = useState("Wood");
  const [ceiling, setCeiling] = useState("False ceiling");
  const [evening, setEvening] = useState(false);
  const [style, setStyle] = useState("Modern");

  const msg = `Hi Alpha Designers, I designed my living room in your Room Studio: ${style} style, ${WALLS[wall][0]} walls, ${floor} flooring, ${SOFAS[sofa][0]} sofa, ${ceiling.toLowerCase()}. Can you give me a quote?`;
  const Row = ({ label, children }) => (
    <div><p className="text-[11px] uppercase tracking-widest text-white/45 font-bold mb-2">{t(label)}</p><div className="flex flex-wrap gap-2">{children}</div></div>
  );

  return (
    <section id="room-studio" className="relative bg-charcoal text-white py-20 md:py-28 overflow-hidden scroll-mt-4">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative container-px">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t("Room Studio")}</p>
          <h2 className="section-title mt-3">{t("Design your room in 10 seconds.")}</h2>
        </Reveal>
        <div className="mt-10 grid lg:grid-cols-[1.25fr_0.75fr] gap-6 lg:gap-10 items-start">
          <Reveal variant="zoom" className="rounded-3xl p-2 md:p-3 glass"><Room wall={WALLS[wall][1]} sofa={SOFAS[sofa][1]} floor={floor} ceiling={ceiling} evening={evening} style={style} /></Reveal>
          <Reveal delay={120} className="glass rounded-3xl p-5 md:p-7 space-y-5">
            <Row label="Walls">{WALLS.map(([n, c], i) => <Dot key={n} color={c} label={n} active={wall === i} onClick={() => setWall(i)} />)}</Row>
            <Row label="Sofa">{SOFAS.map(([n, c], i) => <Dot key={n} color={c} label={n} active={sofa === i} onClick={() => setSofa(i)} />)}</Row>
            <Row label="Floor">{FLOORS.map((f) => <Chip key={f} active={floor === f} onClick={() => setFloor(f)}>{t(f)}</Chip>)}</Row>
            <Row label="Ceiling">{["Plain", "False ceiling"].map((c) => <Chip key={c} active={ceiling === c} onClick={() => setCeiling(c)}>{t(c)}</Chip>)}</Row>
            <Row label="Style">{STYLES.map((s) => <Chip key={s} active={style === s} onClick={() => setStyle(s)}>{t(s)}</Chip>)}</Row>
            <Row label="Light"><Chip active={!evening} onClick={() => setEvening(false)}>{t("Day")}</Chip><Chip active={evening} onClick={() => setEvening(true)}>{t("Evening")}</Chip></Row>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 pt-2">
              <a href={waLink(msg)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-3.5 text-sm font-bold hover:brightness-110 transition"><WaIcon size={18} /> {t("Send my design on WhatsApp")}</a>
              <button onClick={openQuote} className="btn-primary justify-center">{t("Get free quote")}</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default RoomStudio;
