import Navbar from "../components/Navbar";
import ProjectsGrid from "../components/ProjectsGrid";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import WordBand from "../components/WordBand";
import { img, PHOTOS } from "../config/images";
import { SITE } from "../config/site";
import ImageMarquee from "../components/ImageMarquee";

const ProjectsPage = () => (
  <>
    <Navbar />

    <PageHero
      eyebrow="// Our projects"
      title="Projects"
      crumb="Projects"
      images={[img(PHOTOS.livingWide, 1600), img(PHOTOS.kitchen, 1600), img(PHOTOS.houseRoof, 1600), img(PHOTOS.structure, 1600)]}
      labels={["Interiors", "Kitchens", "Roofing", "Sheds"]}
      subtitle="Browse our interior and roofing projects, each with its own gallery and details."
      stat={{ end: SITE.stats.projects, suffix: "+", label: "Projects delivered", body: "Interiors and roofing finished on schedule." }}
      secondary={{ to: "/services", label: "Our services" }}
    />

    <section className="container-px py-20">
      <Reveal>
        <span className="eyebrow">// Explore our work</span>
        <SplitText as="h1" text="Our recent interior and roofing work." className="section-title mt-4" />
        <p className="text-stone mt-4 max-w-lg">
          Browse by type - interiors, roofing, ongoing or completed - or open a
          project for the full gallery and details.
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-12">
        <ProjectsGrid />
      </Reveal>
    </section>
    <WordBand words={["INTERIORS", "ROOFING", "ONGOING", "COMPLETED"]} dark />
    <ImageMarquee />
    <Footer />
  </>
);

export default ProjectsPage;
