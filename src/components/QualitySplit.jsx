import Reveal from "./Reveal";
import { img, PHOTOS } from "../config/images";

const panels = [
  {
    image: img(PHOTOS.interiorC, 700),
    bg: "bg-amber",
    text: "text-ink",
    heading: "Interiors made to measure",
    body: "Kitchens, wardrobes and ceilings built in our own workshop, so every inch fits your home and your budget.",
  },
  {
    image: img(PHOTOS.crew, 700),
    bg: "bg-ink",
    text: "text-white",
    heading: "Roofs built to weather every season",
    body: "Sheet roofs, trusses and waterproofing installed by a trained crew, finished clean and backed by a written warranty.",
  },
];

const QualitySplit = () => {
  return (
    <section className="grid md:grid-cols-2">
      {panels.map((p, i) => (
        <Reveal key={p.heading} delay={i * 150} as="div" className="grid grid-cols-1 sm:grid-cols-2">
          <div className="overflow-hidden">
            <img
              src={p.image}
              alt=""
              className="w-full h-full object-cover min-h-[260px] sm:min-h-[320px] hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>
          <div className={`${p.bg} ${p.text} p-8 md:p-10 flex flex-col justify-center`}>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl leading-tight">{p.heading}</h3>
            <p className="mt-4 text-sm opacity-80 max-w-xs">{p.body}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
};

export default QualitySplit;
