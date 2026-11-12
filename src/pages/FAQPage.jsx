import Navbar from "../components/Navbar";
import FAQ from "../components/FAQ";
import { img, PHOTOS } from "../config/images";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const FAQPage = () => (
  <>
    <Navbar />
    <PageHero
      eyebrow="// Got questions?"
      title="FAQ's"
      crumb="FAQ's"
      images={[img(PHOTOS.livingWide, 1600), img(PHOTOS.houseRoof, 1600)]}
      subtitle="Straight answers on pricing, timelines, materials and warranty for interiors and roofing."
      secondary={{ to: "/contact", label: "Ask us directly" }}
    />
    <FAQ />
    <Footer />
  </>
);

export default FAQPage;
