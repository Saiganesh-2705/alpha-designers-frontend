import Reveal from "./Reveal";
import { SITE, mapsEmbedSrc, mapsSearch, isOpenNow, waLink, telLink } from "../config/site";

const MapSection = () => {
  const open = isOpenNow();
  return (
    <section className="container-px py-20">
      <Reveal className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-stretch">
        <div className="flex flex-col justify-center">
          <span className="eyebrow">// Find us</span>
          <h2 className="section-title mt-4">Visit our studio &amp; showroom.</h2>
          <span className={`inline-flex items-center gap-2 text-xs font-semibold rounded-full px-3 py-1.5 mt-5 w-fit ${open ? "bg-emerald-100 text-emerald-800" : "bg-amber/25 text-ink"}`}>
            <span className={`w-2 h-2 rounded-full ${open ? "bg-emerald-500" : "bg-amber"}`} />
            {open ? "Open now" : "Message us and we'll reply shortly"}
          </span>
          <address className="not-italic text-stone mt-5 leading-relaxed">
            {SITE.address.map((l) => (<span key={l} className="block">{l}</span>))}
          </address>
          <ul className="text-sm text-stone mt-4 space-y-1">
            {SITE.hours.map((h) => (<li key={h.days}><span className="font-semibold text-ink">{h.days}:</span> {h.time}</li>))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={mapsSearch()} target="_blank" rel="noreferrer" className="btn-dark">Get directions</a>
            <a href={telLink()} className="btn-secondary">Call now</a>
            <a href={waLink("Hi Alpha Designers, I'd like to visit your showroom. What time can I come?")} target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp</a>
          </div>
        </div>
        <div className="min-h-[320px] lg:min-h-[420px] border border-line bg-white overflow-hidden">
          <iframe
            title={`${SITE.name} location on Google Maps`}
            src={mapsEmbedSrc()}
            className="w-full h-full min-h-[320px] lg:min-h-[420px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <p className="text-xs font-bold tracking-wide text-stone uppercase">Areas we serve</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SITE.serviceAreas.map((a) => (
            <span key={a} className="px-4 py-2 text-sm border border-line bg-white">{a}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default MapSection;
