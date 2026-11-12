// Photo catalogue (Unsplash). Swap any of these for Alpha Designers's own project photos:
// upload them in the Admin dashboard (they are stored in MongoDB) and paste the URL here,
// or replace the IDs below. <SafeImg> falls back to FALLBACK_ID if a photo ever fails to load.
export const img = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
export const FALLBACK_ID = "photo-1600607687939-ce8a6c25118c";

export const PHOTOS = {
  living: "photo-1600607687939-ce8a6c25118c",
  livingWide: "photo-1600585154340-be6161a56a0c",
  interiorA: "photo-1616486338812-3dadae4b4ace",
  interiorB: "photo-1600210492486-724fe5c67fb0",
  interiorC: "photo-1600566752355-35792bedcfea",
  kitchen: "photo-1556909114-f6e7ad7d3136",
  before: "photo-1600607687644-c7f34b5063ac",
  houseRoof: "photo-1568605114967-8130f3a36994",
  houseRoof2: "photo-1600596542815-ffad4c1539a9",
  houseRoof3: "photo-1600047509807-ba8f99d2cdde",
  houseRoof4: "photo-1613490493576-7fde63acd811",
  structure: "photo-1503387762-592deb58ef4e",
  crew: "photo-1504307651254-35680f356dfd",
  site: "photo-1541976590-713941681591",
  office: "photo-1497366216548-37526070297c",
};
