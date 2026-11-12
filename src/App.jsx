import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Preloader from "./components/Preloader";
import RouteCurtain from "./components/RouteCurtain";
import Seo from "./components/Seo";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import MobileActionBar from "./components/MobileActionBar";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <>
    <Seo />
    <ScrollProgress />
    <Preloader />
    <RouteCurtain />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/faqs" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Home />} />
    </Routes>
    <FloatingWhatsApp />
    <BackToTop />
    <MobileActionBar />
    </>
  );
}

export default App;
