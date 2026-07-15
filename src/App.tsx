// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import ServiceDetails from './pages/ServiceDetails';
import AboutUs from './pages/AboutUs';
import FooterSection from './components/footerSection';
import Contact from './pages/Contact';
import TechnologyTrends from './pages/TechnologyTrends';
import Industries from './pages/Industries';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Careers from './pages/Careers';
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/ServiceDetails" element={<ServiceDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/technologies" element={<TechnologyTrends />} />
        <Route path="/technologies/ai" element={<TechnologyTrends />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/:slug" element={<Industries />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/rfp-query-compliance" element={<CaseStudyDetail />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
}