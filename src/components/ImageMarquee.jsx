import SafeImg from "./SafeImg";
import { img, PHOTOS } from "../config/images";

const row1 = [
  [PHOTOS.livingWide, "Living room"],
  [PHOTOS.houseRoof, "Roof finish"],
  [PHOTOS.interiorA, "Bedroom wardrobe"],
  [PHOTOS.structure, "Truss work"],
  [PHOTOS.interiorB, "Interior finish"],
];
const row2 = [
  [PHOTOS.kitchen, "Modular kitchen"],
  [PHOTOS.houseRoof3, "Sheet roofing"],
  [PHOTOS.interiorC, "False ceiling"],
  [PHOTOS.crew, "Roofing crew"],
  [PHOTOS.houseRoof4, "Modern elevation"],
];

const Row = ({ items, reverse, speed }) => (
  <div className="marquee-pause overflow-hidden">
    <div className={`flex w-max gap-4 ${reverse ? "marquee-rev" : ""}`} style={{ animation: `marquee ${speed}s linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}>
      {[...items, ...items].map(([id, label], i) => (
        <figure key={i} className="group relative w-64 sm:w-80 h-44 sm:h-56 flex-shrink-0 overflow-hidden bg-ink">
          <SafeImg src={img(id, 700)} alt={label} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <figcaption className="absolute left-0 bottom-0 bg-amber text-ink text-xs font-semibold px-3 py-1.5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300">
            {label}
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
);

/** Two rows of site photos drifting in opposite directions. Pauses on hover. */
const ImageMarquee = () => (
  <section className="py-16 space-y-4 overflow-hidden" aria-label="Photos from our work">
    <Row items={row1} speed={50} />
    <Row items={row2} speed={60} reverse />
  </section>
);

export default ImageMarquee;
