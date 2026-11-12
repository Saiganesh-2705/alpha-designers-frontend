import Reveal from "./Reveal";

const features = [
  {
    title: "Free site visit & 3D design",
    body: "We measure your space, suggest layouts and show a 3D view before you commit to anything.",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4v-4z",
  },
  {
    title: "Quality materials",
    body: "Branded boards, hardware and sheets - we show you the make and thickness in the quote.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Transparent pricing",
    body: "Itemised quotes with no hidden line items. You see exactly what you are paying for.",
    icon: "M9 7h6m-6 4h6m-7 8h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    title: "In-house skilled crew",
    body: "Carpenters, fabricators, electricians and roofers who work for us - not a rotating cast of subcontractors.",
    icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-1a4 4 0 100-8 4 4 0 000 8z",
  },
  {
    title: "On-time handover",
    body: "A dated schedule with WhatsApp photo updates so you always know where your work stands.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Written warranty",
    body: "Workmanship warranty on interiors and roofing, plus free service visits after handover.",
    icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z",
  },
];

const Features = () => (
  <section className="bg-white py-24 border-y border-line">
    <div className="container-px">
      <Reveal className="max-w-xl">
        <span className="eyebrow">// Why choose Alpha Designers</span>
        <h2 className="section-title mt-4">One team for your interiors and your roof.</h2>
      </Reveal>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 100} className="group flex gap-4">
            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-sand border border-line flex items-center justify-center group-hover:bg-amber group-hover:border-amber transition-colors duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.7">
                <path d={f.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-lg">{f.title}</h3>
              <p className="text-stone text-sm mt-1.5 leading-relaxed max-w-xs">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
