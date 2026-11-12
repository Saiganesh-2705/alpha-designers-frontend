import { useEffect, useState } from "react";
import { testimonialsAPI } from "../services/api";
import Reveal from "./Reveal";
import { SITE } from "../config/site";

const fallback = [];

const Testimonials = () => {
  const [items, setItems] = useState(fallback);
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    testimonialsAPI
      .getAll()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length) setItems(data);
      })
      .catch(() => {});
  }, []);

  // Auto-advance every 6s, pausing is unnecessary since a click resets the timer.
  useEffect(() => {
    if (items.length <= 1) return undefined;
    const id = setInterval(() => {
      goTo((active + 1) % items.length);
    }, 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, items.length]);

  const goTo = (i) => {
    if (i === active) return;
    setFade(false);
    setTimeout(() => {
      setActive(i);
      setFade(true);
    }, 200);
  };

  const t = items[active];

  // No reviews added yet: invite visitors to read our Google reviews instead of showing made-up ones.
  if (!t) {
    return SITE.googleReviews ? (
      <section className="container-px py-16">
        <a href={SITE.googleReviews} target="_blank" rel="noreferrer" className="btn-dark">Read our Google reviews <span aria-hidden>&rarr;</span></a>
      </section>
    ) : null;
  }

  return (
    <section className="container-px py-24 overflow-hidden">
      <Reveal>
        <p className="eyebrow">Client stories</p>
        <h2 className="section-title mt-3 max-w-xl">What our customers say.</h2>
      </Reveal>

      <Reveal delay={150} className="mt-12 grid md:grid-cols-[auto_1fr] gap-8 items-start">
        <img
          src={t.avatar || `https://ui-avatars.com/api/?background=F5B400&color=111&bold=true&name=${encodeURIComponent(t.name)}`}
          alt={t.name}
          className={`w-16 h-16 rounded-full object-cover transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}
        />
        <div className={`transition-all duration-200 ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <p className="font-display text-xl md:text-2xl leading-snug max-w-2xl">
            &ldquo;{t.quote}&rdquo;
          </p>
          <p className="mt-4 text-sm text-stone">
            {t.name} &middot; {t.role}
          </p>

          <div className="mt-6 flex gap-2">
            {items.map((item, i) => (
              <button
                key={item._id}
                onClick={() => goTo(i)}
                aria-label={`Show testimonial from ${item.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-amber" : "w-4 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Testimonials;
