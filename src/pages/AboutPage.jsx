import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import PageHero from "../components/PageHero";
import ProcessSteps from "../components/ProcessSteps";
import Reveal from "../components/Reveal";
import Parallax from "../components/Parallax";
import Tilt from "../components/Tilt";
import SafeImg from "../components/SafeImg";
import SplitText from "../components/SplitText";
import WordBand from "../components/WordBand";
import ImageMarquee from "../components/ImageMarquee";
import useInView from "../hooks/useInView";
import useCountUp from "../hooks/useCountUp";
import { img, PHOTOS } from "../config/images";
import { SITE } from "../config/site";

const stats = [
  { value: `${SITE.stats.years}+`, label: "Years of experience" },
  { value: `${SITE.stats.projects}+`, label: "Projects delivered" },
  { value: `${SITE.stats.clients}+`, label: "Happy clients" },
  { value: `${SITE.serviceAreas.length}+`, label: "Areas served" },
];

const values = [
  { title: "Honest pricing", body: "Itemised quotes. What we quote is what you pay.", src: PHOTOS.interiorA },
  { title: "Quality materials", body: "Branded boards, hardware and sheets, named in your quote.", src: PHOTOS.kitchen },
  { title: "Built to last", body: "Proper anchoring, welding and finishing, with a written warranty.", src: PHOTOS.crew },
  { title: "On-time handover", body: "WhatsApp progress photos keep the schedule visible.", src: PHOTOS.houseRoof2 },
];

const Stat = ({ value, label }) => {
  const [ref, inView] = useInView();
  const num = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");
  const n = useCountUp(num, { start: inView, duration: 1600 });
  return (
    <div ref={ref}>
      <p className="font-display text-2xl md:text-3xl text-ink">{n}{suffix}</p>
      <p className="text-stone text-xs mt-1">{label}</p>
    </div>
  );
};

const AboutPage = () => (
  <>
    <Navbar />

    <PageHero
      eyebrow="// About company"
      title="About Us"
      crumb="About Us"
      images={[img(PHOTOS.interiorA, 1600), img(PHOTOS.houseRoof, 1600), img(PHOTOS.crew, 1600)]}
      labels={["Our interiors", "Our roofing", "Our crew"]}
      subtitle="Interior designers, carpenters and roofing crews working as one accountable team, from first visit to final handover."
      stat={{ end: SITE.stats.years, suffix: "+", label: "Years of experience", body: "Hands-on expertise behind every interior and roof we deliver." }}
      secondary={{ to: "/projects", label: "See our work" }}
    />

    <section className="container-px py-24 grid md:grid-cols-2 gap-14 items-center">
      <Reveal>
        <span className="eyebrow">// About company</span>
        <SplitText text="Interiors and roofing, done right." className="section-title mt-4" />
        <p className="mt-5 text-stone leading-relaxed max-w-lg">
          Alpha Designers is a team of interior designers, carpenters, fabricators and roofing
          specialists. We plan every project around your space, your budget and
          the local weather - and we still visit every site ourselves before a
          design is signed off.
        </p>
        <p className="mt-4 text-stone leading-relaxed max-w-lg">
          From a single wardrobe to a full factory roof, one accountable team stays
          on your project from first visit to final handover - so nothing falls
          between contractors.
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={150} variant="right" className="grid grid-cols-2 gap-4">
        <Parallax src={img(PHOTOS.livingWide, 700)} alt="Finished interior" className="h-64 w-full col-span-2" speed={0.08} />
        <Parallax src={img(PHOTOS.structure, 500)} alt="Roofing work" className="h-44 w-full" speed={0.16} />
        <Parallax src={img(PHOTOS.kitchen, 500)} alt="Modern home" className="h-44 w-full mt-8" speed={-0.12} />
      </Reveal>
    </section>

    <section className="bg-charcoal text-white py-20">
      <div className="container-px grid md:grid-cols-2 gap-10">
        <Reveal className="border-t border-white/15 pt-6">
          <h3 className="font-display text-xl">Our mission</h3>
          <p className="text-white/60 text-sm mt-3 leading-relaxed">
            To deliver durable, good-looking interiors and roofs that are priced
            honestly, finished on time and backed by a written warranty.
          </p>
        </Reveal>
        <Reveal delay={150} className="border-t border-white/15 pt-6">
          <h3 className="font-display text-xl">Our vision</h3>
          <p className="text-white/60 text-sm mt-3 leading-relaxed">
            To be the first name families, shop owners and factories call for
            interior and roofing work.
          </p>
        </Reveal>
      </div>
    </section>

    <WordBand words={["QUALITY", "TRUST", "CRAFT", "WARRANTY"]} dark reverse />

    <section className="container-px py-24">
      <Reveal className="max-w-xl">
        <SplitText text="What we stand for on every job." className="section-title" />
      </Reveal>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 110} variant="zoom">
            <Tilt className="h-80 overflow-hidden bg-ink">
              <SafeImg src={img(v.src, 600)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <div className="w-10 h-1 bg-amber mb-4 group-hover:w-20 transition-all duration-500" />
                <h3 className="font-display text-xl text-white">{v.title}</h3>
                <p className="text-white/70 text-sm mt-2 leading-relaxed">{v.body}</p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>

    <ProcessSteps />

    <ImageMarquee />

    <Testimonials />

    <section className="bg-ink text-white py-16">
      <Reveal className="container-px flex flex-wrap items-center justify-between gap-6">
        <h2 className="font-display text-2xl md:text-3xl max-w-lg">
          Want to see our work for yourself?
        </h2>
        <Link to="/projects" className="btn-primary">
          Browse our projects <span aria-hidden>&rarr;</span>
        </Link>
      </Reveal>
    </section>

    <Footer />
  </>
);

export default AboutPage;
