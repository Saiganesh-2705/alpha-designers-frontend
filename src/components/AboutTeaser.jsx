import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { img, PHOTOS } from "../config/images";
import { SITE } from "../config/site";

const AboutTeaser = () => (
  <section className="container-px py-24 grid md:grid-cols-2 gap-14 items-center">
    <Reveal>
      <div className="relative">
        <img
          src={img(PHOTOS.interiorA, 800)}
          alt="Finished modern interior by Alpha Designers"
          className="w-full h-[420px] object-cover"
        />
        <div className="absolute -bottom-6 -right-6 bg-amber text-ink p-6 hidden sm:block max-w-[200px]">
          <p className="font-display text-3xl font-extrabold">{SITE.stats.projects}+</p>
          <p className="text-xs font-semibold mt-1">Interior &amp; roofing projects delivered.</p>
        </div>
      </div>
    </Reveal>

    <Reveal delay={150}>
      <span className="eyebrow">// Why Alpha Designers</span>
      <h2 className="section-title mt-4">
        Everything under one roof - literally.
      </h2>
      <p className="text-stone mt-5 leading-relaxed max-w-lg">
        Most homes need both: good-looking interiors and a roof that does not
        leak. Alpha Designers designs, fabricates and installs both, so there is one
        team, one schedule and one warranty to deal with.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        <div className="border-t-2 border-amber pt-4">
          <p className="font-display text-lg">Our mission</p>
          <p className="text-stone text-sm mt-2">
            Practical, durable interiors and roofs, delivered on time and priced honestly.
          </p>
        </div>
        <div className="border-t-2 border-ink pt-4">
          <p className="font-display text-lg">Our vision</p>
          <p className="text-stone text-sm mt-2">
            To be the first name families and businesses call for interiors and roofing.
          </p>
        </div>
      </div>

      <Link to="/about" className="btn-dark mt-8">
        More about us <span aria-hidden>&rarr;</span>
      </Link>
    </Reveal>
  </section>
);

export default AboutTeaser;
