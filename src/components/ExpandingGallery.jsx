import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SafeImg from "./SafeImg";
import { img as imgUrl, PHOTOS } from "../config/images";


const panels = [
  { title: "Modular kitchens", text: "Soft-close, moisture-proof kitchens planned around how you cook.", src: PHOTOS.kitchen },
  { title: "Living & bedrooms", text: "False ceilings, panelling, TV units and wardrobes that tie a room together.", src: PHOTOS.living },
  { title: "Metal roofing", text: "Colour-coated and galvalume sheet roofs for homes, godowns and factories.", src: PHOTOS.houseRoof },
  { title: "Trusses & sheds", text: "Fabricated, welded and painted on site with proper anchoring.", src: PHOTOS.structure },
  { title: "Waterproofing", text: "Terrace and roof leak repair with a written guarantee.", src: PHOTOS.crew },
];

/**
 * Accordion-style image strip: hovering (or tapping / focusing) a panel
 * widens it and reveals its caption. Stacks vertically on mobile.
 */
const ExpandingGallery = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="container-px py-24">
      <Reveal className="flex items-end justify-between flex-wrap gap-4">
        <h2 className="section-title max-w-xl">Our work, up close.</h2>
        <Link to="/projects" className="btn-secondary">See our projects <span aria-hidden>&rarr;</span></Link>
      </Reveal>

      <div className="mt-12 flex flex-col md:flex-row gap-3 md:h-[520px]">
        {panels.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`xpanel ${on ? "active" : ""} relative overflow-hidden text-left bg-ink h-24 md:h-auto ${on ? "h-72 md:flex-[5]" : "md:flex-[1]"} flex-none md:flex-initial`}
              style={{ flexGrow: on ? 5 : 1, flexBasis: 0, transition: "height 0.5s ease, flex-grow 0.7s cubic-bezier(0.2,0.8,0.2,1)" }}
            >
              <SafeImg src={imgUrl(p.src)} alt="" loading="lazy" className={`absolute inset-0 w-full h-full object-cover ${on ? "" : "grayscale-[60%]"}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display font-bold text-white text-lg md:text-xl md:whitespace-nowrap">{p.title}</p>
                <p className={`text-white/75 text-sm mt-1 max-w-xs transition-all duration-500 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 md:hidden"} ${on ? "" : "hidden md:block md:pointer-events-none"}`}>
                  {p.text}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ExpandingGallery;
