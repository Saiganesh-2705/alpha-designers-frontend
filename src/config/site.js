// ONE place for brand + contact details. Edit here and the navbar, footer,
// contact page, WhatsApp buttons, quote popup, map and SEO data all update.
//
// >>> Replace every value marked CHANGE-ME with Alpha Designers's real details. <<<
export const SITE = {
  name: "Alpha Designers",
  fullName: "Alpha Designers & Builders",
  tagline: "Designers & Builders",
  description:
    "Alpha Designers & Builders in Mannargudi - home construction, modular interiors, false ceilings, wardrobes, kitchens and roofing works with fixed quotes and on-time handover.",
  url: import.meta.env.VITE_SITE_URL || "https://alpha-designers.vercel.app", // CHANGE-ME once you have your domain

  // Phone numbers shown on the site (first one is used for the call button)
  phones: ["+91 00000 00000"], // CHANGE-ME: Alpha's real number
  // WhatsApp number: country code + number, digits only (no + or spaces)
  whatsapp: "910000000000", // CHANGE-ME: country code + number, digits only
  email: "hello@alphadesigners.in", // CHANGE-ME

  shortLocation: "Mannargudi, Tamil Nadu",
  address: ["CHANGE-ME: Street / Door No", "Mannargudi", "Tiruvarur District, Tamil Nadu 614001"],
  postalCode: "614001",
  // Google Maps: open your business on Google Maps > Share > "Embed a map" > copy the src URL.
  // Until then the map is built from the address text above.
  mapEmbed: "",
  mapLink: "", // optional: your Google Maps "Share" link; falls back to a search on the address
  googleReviews: "", // optional: your Google review page link

  // Headline numbers shown on the home page. CHANGE-ME to your real figures.
  stats: { years: 10, projects: 300, clients: 250, warranty: 5 },

  serviceAreas: ["Mannargudi", "Needamangalam", "Thiruvarur", "Thanjavur", "Kumbakonam", "Pattukkottai", "Tiruchirappalli"], // adjust to the areas you really serve

  social: {
    instagram: "", // e.g. https://instagram.com/alphadesigners
    facebook: "",
    youtube: "",
  },

  hours: [{ days: "Monday - Sunday", time: "Open 24 hours" }],
  // Used by the "open now" badge. 0 = Sunday ... 6 = Saturday, hours in 24h IST.
  openHours: { 0: [0, 24], 1: [0, 24], 2: [0, 24], 3: [0, 24], 4: [0, 24], 5: [0, 24], 6: [0, 24] },

  // Indicative rates (Rs per sq ft) used by the cost estimator. Edit to your real rates.
  // Indicative construction rates (Rs per sq ft) used by the Build Planner. CHANGE-ME to your real rates.
  buildRates: { Standard: 1800, Premium: 2300, Luxury: 3000 },
  interiorRates: { Standard: 850, Premium: 1150, Luxury: 1600 }, // Rs per sq ft of built area
  roofProofRate: 90, // Rs per sq ft of one floor
  compoundWall: 150000, // flat Rs
  rates: {
    interior: { Basic: 1100, Standard: 1500, Premium: 2200 },
    roofing: { Basic: 180, Standard: 320, Premium: 520 },
  },
};

export const waLink = (text = "Hi Alpha Designers, I would like a quote for my project.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const telLink = (p = SITE.phones[0]) => `tel:${p.replace(/[^\d+]/g, "")}`;

export const mapsSearch = () =>
  SITE.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.name} ${SITE.address.join(", ")}`)}`;

export const mapsEmbedSrc = () =>
  SITE.mapEmbed || `https://www.google.com/maps?q=${encodeURIComponent(SITE.address.join(", "))}&output=embed`;

// Is the office open right now (India time)?
export const isOpenNow = () => {
  const ist = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const h = ist.getHours() + ist.getMinutes() / 60;
  const [from, to] = SITE.openHours[ist.getDay()] || [0, 0];
  return h >= from && h < to;
};
