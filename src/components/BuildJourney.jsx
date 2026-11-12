import { useEffect, useRef } from "react";
import useInView from "../hooks/useInView";
import SafeImg from "./SafeImg";
import { img as imgUrl, PHOTOS } from "../config/images";


const steps = [
  { title: "Site visit & measurement", body: "We visit, measure, check the structure or existing roof and listen to what you need.", src: PHOTOS.crew },
  { title: "Design & quote", body: "2D layout, 3D view or roof plan with an itemised quote. Change anything before you pay.", src: PHOTOS.interiorA },
  { title: "Material & fabrication", body: "Boards cut and joinery made in our workshop; trusses and sheets prepared for fast fitting.", src: PHOTOS.structure },
  { title: "Installation", body: "Our crew installs on a fixed schedule and sends photo updates on WhatsApp.", src: PHOTOS.houseRoof },
  { title: "Handover & warranty", body: "Final walkthrough, clean-up and your written workmanship warranty.", src: PHOTOS.living },
];

const Step = ({ step, index }) => {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const flip = index % 2 === 1;
  return (
    <div ref={ref} className="relative grid md:grid-cols-2 gap-6 md:gap-16 items-center pl-10 md:pl-0">
      <span
        className={`absolute left-0 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full border-2 z-10 transition-all duration-500 ${
          inView ? "bg-amber border-amber scale-125" : "bg-sand border-ink/30"
        }`}
        aria-hidden
      />
      <div className={`wipe ${inView ? "in" : ""} ${flip ? "md:order-2" : ""}`}>
        <SafeImg src={imgUrl(step.src)} alt="" loading="lazy" className="w-full h-56 md:h-72 object-cover" />
      </div>
      <div className={`transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-x-0" : `opacity-0 ${flip ? "md:-translate-x-8" : "md:translate-x-8"} translate-y-4 md:translate-y-0`} ${flip ? "md:order-1 md:text-right" : ""}`}>
        <p className="text-xs font-bold text-stone">Stage {index + 1} of {steps.length}</p>
        <h3 className="font-display font-extrabold text-2xl md:text-3xl mt-2">{step.title}</h3>
        <p className={`text-stone mt-3 max-w-sm leading-relaxed ${flip ? "md:ml-auto" : ""}`}>{step.body}</p>
      </div>
    </div>
  );
};

/**
 * Visit-to-handover timeline. The amber line fills as you scroll, and each
 * stage's photo wipes in when it reaches the viewport.
 */
const BuildJourney = () => {
  const wrapRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el || !fillRef.current) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      fillRef.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-white border-y border-line py-24">
      <div className="container-px">
        <h2 className="section-title max-w-2xl">From first visit to final handover.</h2>
        <p className="text-stone mt-4 max-w-md">Five clear stages, each with a photo update, so you always know where your project stands.</p>

        <div ref={wrapRef} className="relative mt-16">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-ink/10 -translate-x-1/2" aria-hidden />
          <div ref={fillRef} className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[3px] bg-amber -translate-x-1/2 origin-top" style={{ transform: "scaleY(0)" }} aria-hidden />
          <div className="space-y-16 md:space-y-24">
            {steps.map((s, i) => <Step key={s.title} step={s} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildJourney;
