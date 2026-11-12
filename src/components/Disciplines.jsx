import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { services } from "./servicesData";
import { img, PHOTOS } from "../config/images";

const panels = [
  {
    group: "Interiors",
    tag: "Inside",
    photo: PHOTOS.interiorB,
    line: "Practical, durable interiors, made in our own workshop and fitted to a dated schedule.",
  },
  {
    group: "Roofing",
    tag: "Above",
    photo: PHOTOS.houseRoof2,
    line: "Roofs and structures that do not leak, fabricated and fixed by our own crew.",
  },
];

/** Two disciplines as full-height photo panels. The hovered panel opens wider on desktop. */
const Disciplines = () => (
  <section className="bg-ink text-white">
    <div className="container-px pt-20 md:pt-28 pb-10 flex flex-wrap items-end justify-between gap-6">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Two trades, one team</p>
        <h2 className="section-title mt-4">Inside the walls and over your head.</h2>
      </Reveal>
      <Link to="/services" className="btn-primary">All services <span aria-hidden>&rarr;</span></Link>
    </div>

    <div className="flex flex-col lg:flex-row lg:h-[680px] border-t border-white/15">
      {panels.map((p, n) => {
        const list = services.filter((s) => s.group === p.group);
        return (
          <article key={p.group} className={`group relative overflow-hidden min-h-[520px] lg:min-h-0 lg:flex-1 lg:hover:flex-[1.45] transition-[flex] duration-700 ease-out ${n ? "border-t lg:border-t-0 lg:border-l border-white/15" : ""}`}>
            <div
              className="absolute inset-0 bg-cover bg-center grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[900ms]"
              style={{ backgroundImage: `url('${img(p.photo, 1400)}')` }}
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" aria-hidden />
            <div className="absolute top-0 left-0 bg-amber text-ink px-5 py-2 text-sm font-bold">{p.tag}</div>

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <h3 className="font-display font-extrabold text-5xl md:text-6xl leading-none">{p.group}</h3>
              <p className="text-white/75 mt-4 max-w-md leading-relaxed">{p.line}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 border-t border-white/20">
                {list.map((s) => (
                  <li key={s.slug} className="border-b border-white/15">
                    <Link to="/services" className="flex items-center justify-between gap-3 py-3 text-sm font-semibold hover:text-amber transition-colors">
                      {s.title}<span aria-hidden className="text-amber">&rarr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default Disciplines;
