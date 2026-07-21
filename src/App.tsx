// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import ServiceDetails from './pages/ServiceDetails';
import GenerativeAI from './pages/GenerativeAI';
import AudioVideoAnalytics from './pages/AudioVideoAnalytics';
import AboutUs from './pages/AboutUs';
import FooterSection from './components/footerSection';
import Contact from './pages/Contact';
import TechnologyTrends from './pages/TechnologyTrends';
import CloudComputing from './pages/CloudComputing';
import Cybersecurity from './pages/Cybersecurity';
import AiNativeSdlc from './pages/AiNativeSdlc';
import DataTrends from './pages/DataTrends';
import ItBizops from './pages/ItBizops';
import Devops from './pages/Devops';
import OnPremise from './pages/OnPremise';
import DigitalWorkspace from './pages/DigitalWorkspace';
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
        <Route path="/Services/ai-ml" element={<ServiceDetails />} />
        <Route path="/Services/generative-ai" element={<GenerativeAI />} />
        <Route path="/Services/audio-video-analytics" element={<AudioVideoAnalytics />} />
        <Route path="/ServiceDetails" element={<ServiceDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/technologies" element={<TechnologyTrends />} />
        <Route path="/technologies/ai" element={<TechnologyTrends />} />
        <Route path="/technologies/ai-native-sdlc" element={<AiNativeSdlc />} />
        <Route path="/technologies/data" element={<DataTrends />} />
        <Route path="/technologies/cloud" element={<CloudComputing />} />
        <Route path="/technologies/cybersecurity" element={<Cybersecurity />} />
        <Route path="/technologies/it-bizops" element={<ItBizops />} />
        <Route path="/technologies/devops" element={<Devops />} />
        <Route path="/technologies/on-premise" element={<OnPremise />} />
        <Route path="/technologies/digital-workspace" element={<DigitalWorkspace />} />
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