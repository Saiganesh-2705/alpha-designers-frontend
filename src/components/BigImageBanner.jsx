import Reveal from "./Reveal";
import { img, PHOTOS } from "../config/images";

/**
 * Full-bleed image section with a bold, oversized statement — a visual
 * "breather" between content-heavy sections on the home page.
 */
const BigImageBanner = ({
  image = img(PHOTOS.houseRoof2, 1600),
  lines = ["Beautiful inside,", "protected", "from above"],
}) => (
  <section
    className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-fixed bg-cover bg-center overflow-hidden"
    style={{ backgroundImage: `url('${image}')` }}
  >
    <div className="absolute inset-0 bg-ink/55" aria-hidden />
    <Reveal className="relative text-center px-6">
      <h2 className="font-display font-extrabold text-white leading-[0.95] text-4xl sm:text-6xl md:text-7xl">
        {lines.map((line) => (
          <span key={line} className="block">{line}</span>
        ))}
      </h2>
    </Reveal>
  </section>
);

export default BigImageBanner;
