import useCountUp from "../hooks/useCountUp";
import useInView from "../hooks/useInView";
import { SITE } from "../config/site";

const stats = [
  { end: SITE.stats.years, suffix: "+", label: "Years experience", body: "Hands-on craftsmanship in interiors and roofing, from small homes to large sheds." },
  { end: SITE.stats.projects, suffix: "+", label: "Projects completed", body: "Kitchens, wardrobes, ceilings, roofs and sheds delivered on schedule." },
  { end: SITE.stats.clients, suffix: "+", label: "Happy clients", body: "Homeowners, shop owners and factories who came back for more work." },
  { end: SITE.stats.warranty, suffix: " yr", label: "Workmanship warranty", body: "Written warranty on our work, with free service visits." },
];

const StatCard = ({ stat, delay }) => {
  const [ref, inView] = useInView();
  const count = useCountUp(stat.end, { start: inView, duration: 1500 });

  return (
    <div
      ref={ref}
      className={`border-t border-ink/10 pt-6 transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-xs font-bold tracking-wide text-stone uppercase">{stat.label}</p>
      <p className="font-display font-extrabold text-4xl md:text-5xl text-ink mt-3">
        {count}
        <span className="text-forest">{stat.suffix}</span>
      </p>
      <p className="text-stone text-sm mt-2 max-w-[220px]">{stat.body}</p>
    </div>
  );
};

const StatsBar = () => (
  <section className="container-px py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
    {stats.map((s, i) => (
      <StatCard key={s.label} stat={s} delay={i * 120} />
    ))}
  </section>
);

export default StatsBar;
