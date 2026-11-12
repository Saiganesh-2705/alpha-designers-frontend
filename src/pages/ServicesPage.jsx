import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ProcessSteps from "../components/ProcessSteps";
import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";
import WordBand from "../components/WordBand";
import ImageMarquee from "../components/ImageMarquee";
import CostEstimator from "../components/CostEstimator";
import SplitText from "../components/SplitText";
import { useQuote } from "../context/QuoteContext";
import { services, icons, serviceGroups } from "../components/servicesData";
import { img, PHOTOS } from "../config/images";
import { SITE, waLink } from "../config/site";

const ServicesPage = () => {
  const { openQuote } = useQuote();
  const [group, setGroup] = useState("All");
  const list = group === "All" ? services : services.filter((s) => s.group === group);
  return (
  <>
    <Navbar />

    <PageHero
      eyebrow="// Explore our services"
      title="Our Services"
      crumb="Our Services"
      images={[img(PHOTOS.kitchen, 1600), img(PHOTOS.livingWide, 1600), img(PHOTOS.houseRoof, 1600), img(PHOTOS.structure, 1600)]}
      labels={["Kitchens", "Interiors", "Roofing", "Trusses"]}
      subtitle="One accountable team for interiors and roofing, so you never chase a dozen subcontractors."
      stat={{ end: SITE.stats.projects, suffix: "+", label: "Projects delivered", body: "Interior and roofing work finished on schedule." }}
    />

    <section className="container-px py-24">
      <Reveal>
        <span className="eyebrow">// Explore our services</span>
        <SplitText as="h1" text="Interiors inside. Roofing above." className="section-title mt-4 max-w-2xl" />
        <p className="text-stone mt-4 max-w-lg">
          From first sketch to final handover, our in-house teams cover every
          stage - so you deal with one accountable partner, not a dozen
          subcontractors.
        </p>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Service group">
          {serviceGroups.map((g) => (
            <button key={g} role="tab" aria-selected={group === g} onClick={() => setGroup(g)} className={`px-5 py-2 text-sm font-semibold border transition-colors ${group === g ? "bg-ink text-white border-ink" : "border-ink/20 hover:border-ink"}`}>
              {g}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 120} variant={["left", "up", "right"][i % 3]}>
          <Tilt className="h-full border border-line rounded-xl overflow-hidden bg-white/60 flex flex-col hover:shadow-xl">
            <div className="p-6 flex-1">
              <h3 className="font-display text-xl">{s.title}</h3>
              <p className="text-stone text-sm mt-3">{s.summary}</p>
              <ul className="mt-4 space-y-1.5">
                {s.points.map((pt) => (
                  <li key={pt} className="text-sm text-ink/80 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber mt-1.5 flex-shrink-0" /> {pt}
                  </li>
                ))}
              </ul>
              <a href={waLink(`Hi Alpha Designers, I'd like a quote for ${s.title}.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-ink mt-5 hover:text-forest transition-colors">
                Ask about this on WhatsApp <span aria-hidden className="inline-block">&rarr;</span>
              </a>
            </div>
            <div className="relative h-40 overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 w-9 h-9 rounded bg-amber flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8">
                  <path d={icons[s.icon]} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Tilt>
          </Reveal>
        ))}
      </div>
    </section>

    <WordBand words={["MEASURE", "DESIGN", "INSTALL", "HANDOVER"]} />

    <ProcessSteps />

    <ImageMarquee />

    <CostEstimator />

    <section className="bg-ink text-white py-16">
      <Reveal className="container-px flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl md:text-3xl max-w-lg">
            Not sure which service fits your project?
          </h2>
          <p className="text-white/60 text-sm mt-2 max-w-md">
            Tell us about your space and goals - we'll recommend the right scope and a realistic budget range.
          </p>
        </div>
        <button onClick={openQuote} className="btn-primary animate-soft-pulse">
          Get a free quote <span aria-hidden>&rarr;</span>
        </button>
      </Reveal>
    </section>

    <Footer />
  </>
  );
};

export default ServicesPage;
