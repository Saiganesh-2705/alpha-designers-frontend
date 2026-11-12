import { Link } from "react-router-dom";
import { services, icons } from "./servicesData";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

const Services = ({ limit }) => {
  const featured = ["modular-kitchen", "false-ceiling", "metal-roofing", "waterproofing-repair"];
  const list = limit ? featured.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean).slice(0, limit) : services;

  return (
    <section id="services" className="bg-ink text-white py-24 md:py-32">
      <div className="container-px">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">// What we do</span>
            <SplitText text="Interiors inside. Roofing above." className="section-title mt-4 text-white" />
          </div>
          {limit && (
            <Link to="/services" className="btn-primary">
              All services <span aria-hidden>&rarr;</span>
            </Link>
          )}
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 border border-white/15">
          {list.map((s, i) => (
            <Reveal key={s.slug} delay={i * 100} variant="zoom">
              <article className={`group relative h-[22rem] overflow-hidden border-white/15 ${i ? "sm:border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 1 ? "border-t sm:border-t-0" : ""}`}>
                <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
                <div className="absolute top-0 left-0 w-12 h-12 bg-amber flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15181B" strokeWidth="1.8">
                    <path d={icons[s.icon]} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <h3 className="font-display font-bold text-xl leading-snug">{s.title}</h3>
                  <p className="text-white/65 text-sm mt-2 leading-relaxed line-clamp-3 md:max-h-0 md:opacity-0 md:group-hover:max-h-24 md:group-hover:opacity-100 transition-all duration-500">{s.summary}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
