import Reveal from "./Reveal";

const mats = ["BWR / Marine Plywood", "HDHMR Boards", "Branded Laminates", "Acrylic Finish", "Soft-close Hardware", "Galvalume Sheets", "Colour-coated Roofing", "GI / MS Trusses", "UV Polycarbonate", "PUF Panels", "Waterproof Coating", "False Ceiling Boards"];

/** Scrolling band of materials we work with. */
const MaterialsBand = () => (
  <section className="py-14 bg-white border-y border-line overflow-hidden">
    <Reveal className="container-px text-center mb-8">
      <p className="eyebrow">Quality materials</p>
      <h2 className="section-title mt-3 !text-2xl md:!text-4xl">Built with materials that last.</h2>
    </Reveal>
    <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused]">
      {[...mats, ...mats].map((m, i) => (
        <span key={i} className="mx-2 md:mx-3 px-5 py-2.5 rounded-full border border-ink/15 bg-sand text-sm font-semibold whitespace-nowrap hover:bg-amber hover:border-amber transition-colors">
          {m}
        </span>
      ))}
    </div>
  </section>
);
export default MaterialsBand;
