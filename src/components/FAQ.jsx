import { useState } from "react";
import Reveal from "./Reveal";
import { SITE, waLink } from "../config/site";

const faqs = [
  {
    q: "How long does an interior or roofing project take?",
    a: "A modular kitchen usually takes 3-4 weeks, a 2BHK full-home interior 6-8 weeks, and a typical sheet roof or shed 3-10 days depending on size. You get a dated schedule with the quote.",
  },
  {
    q: "Do you give a free site visit and quote?",
    a: "Yes. We visit, measure, discuss your needs and send an itemised quote - free and with no obligation. Call or WhatsApp us to book a slot.",
  },
  {
    q: "Which materials do you use?",
    a: "For interiors: BWR / marine plywood, HDHMR, branded laminates, acrylic and soft-close hardware. For roofing: colour-coated and galvalume sheets, GI / MS trusses, UV-protected polycarbonate and PUF panels. The make and thickness are written in your quote.",
  },
  {
    q: "Can you fix a leaking roof without replacing it?",
    a: "Often yes. After inspection we recommend between sealing, waterproof coating and re-sheeting, and quote only what is needed.",
  },
  {
    q: "What warranty do you give?",
    a: "We provide a written workmanship warranty on interior and roofing work, and manufacturer warranties apply to branded sheets, boards and hardware. Details are in your quote.",
  },
  {
    q: "How do payments work?",
    a: "A small advance confirms the order, followed by stage-wise payments tied to progress (material, installation, handover). We give receipts for every payment.",
  },
  {
    q: "Which areas do you serve?",
    a: "We serve " + SITE.serviceAreas.join(", ") + " and nearby areas. For larger projects we travel further - just ask.",
  },
];

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-ink/10 py-6">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left gap-4"
      aria-expanded={isOpen}
    >
      <span className="font-display text-lg">{item.q}</span>
      <span
        className={`flex-shrink-0 w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center transition-all duration-300 hover:border-forest hover:text-forest ${
          isOpen ? "rotate-45 border-forest text-forest" : ""
        }`}
        aria-hidden
      >
        +
      </span>
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
      }`}
      style={{ display: "grid" }}
    >
      <div className="overflow-hidden">
        <p className="text-stone text-sm leading-relaxed max-w-xl">{item.a}</p>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faqs" className="container-px py-24 max-w-3xl mx-auto">
      <Reveal>
        <div className="flex justify-center">
          <p className="eyebrow">FAQ's</p>
        </div>
        <h2 className="section-title mt-3 text-center">Questions customers ask us most.</h2>
      </Reveal>

      <div className="mt-12">
        {faqs.map((item, i) => (
          <Reveal key={item.q} delay={i * 60}>
            <FAQItem
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 text-center">
        <p className="text-stone text-sm">Still have a question?</p>
        <a href={waLink("Hi Alpha Designers, I have a question about your services.")} target="_blank" rel="noreferrer" className="btn-dark mt-3">Ask us on WhatsApp</a>
      </Reveal>
    </section>
  );
};

export default FAQ;
