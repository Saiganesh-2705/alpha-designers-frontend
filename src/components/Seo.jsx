import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../config/site";

const TITLES = {
  "/": `${SITE.name} | Interior Design & Roofing Works in ${SITE.shortLocation.split(",")[0]}`,
  "/about": `About ${SITE.name} | Builders & Interior Designers in Mannargudi`,
  "/services": `Services | Modular Kitchen, False Ceiling, Roofing Sheets - ${SITE.name}`,
  "/projects": `Projects | Construction & Interior Work - ${SITE.name}`,
  "/faqs": `FAQs | ${SITE.name}`,
  "/contact": `Contact ${SITE.name} | Free Site Visit & Quote`,
};

const setMeta = (sel, attr, val) => {
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement("meta");
    const [k, v] = sel.replace(/^meta\[|\]$/g, "").split("=");
    el.setAttribute(k, v.replace(/"/g, ""));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, val);
};

/** Per-page <title>/description + LocalBusiness structured data (helps Google show address, phone and hours). */
const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const title = TITLES[pathname] || TITLES["/"];
    document.title = title;
    setMeta('meta[name="description"]', "content", SITE.description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", SITE.description);
  }, [pathname]);

  useEffect(() => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const pad = (h) => `${String(h).padStart(2, "0")}:00`;
    const data = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: SITE.name,
      description: SITE.description,
      url: SITE.url,
      telephone: SITE.phones[0],
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address[0],
        addressLocality: "Mannargudi",
        postalCode: SITE.postalCode,
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      areaServed: SITE.serviceAreas,
      openingHoursSpecification: Object.entries(SITE.openHours).map(([d, [from, to]]) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayNames[d],
        opens: pad(from),
        closes: to >= 24 ? "23:59" : pad(to),
      })),
      sameAs: Object.values(SITE.social).filter(Boolean),
    };
    let tag = document.getElementById("ld-business");
    if (!tag) {
      tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.id = "ld-business";
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(data);
  }, []);

  return null;
};

export default Seo;
