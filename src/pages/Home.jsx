import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StudioStatement from "../components/StudioStatement";
import Disciplines from "../components/Disciplines";
import TrustStrip from "../components/TrustStrip";
import BuildStory from "../components/BuildStory";
import RoomStudio from "../components/RoomStudio";
import Services from "../components/Services";
import ImageMarquee from "../components/ImageMarquee";
import MaterialsBand from "../components/MaterialsBand";
import BuildPlanner from "../components/BuildPlanner";
import WhyChooseUs from "../components/WhyChooseUs";
import ProjectGallery from "../components/ProjectGallery";
import BigImageBanner from "../components/BigImageBanner";
import Testimonials from "../components/Testimonials";
import ProjectChat from "../components/ProjectChat";
import FAQ from "../components/FAQ";
import MapSection from "../components/MapSection";
import Footer from "../components/Footer";

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <StudioStatement />
    <Disciplines />
    <TrustStrip />
    <BuildStory />
    <RoomStudio />
    <Services limit={4} />
    <ImageMarquee />
    <MaterialsBand />
    <BuildPlanner />
    <WhyChooseUs />
    <ProjectGallery />
    <BigImageBanner />
    <Testimonials />
    <ProjectChat />
    <FAQ />
    <MapSection />
    <Footer />
  </>
);

export default Home;
