import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/home';
import ServiceDetails from './pages/ServiceDetails';
import AgenticAI from './pages/AgenticAI';
import AudioVideoAnalytics from './pages/AudioVideoAnalytics';
import CloudOnPremiseDeployment from './pages/CloudOnPremiseDeployment';
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
import HealthcareLifeSciences from './pages/HealthcareLifeSciences';
import IndustryDetail from './pages/IndustryDetail';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import GenAiSdlcCaseStudy from './pages/GenAiSdlcCaseStudy';
import TalentMatchingCaseStudy from './pages/TalentMatchingCaseStudy';
import IllicitBehaviourCaseStudy from './pages/IllicitBehaviourCaseStudy';
import SupportShipmentCaseStudy from './pages/SupportShipmentCaseStudy';
import SupportBpoCaseStudy from './pages/SupportBpoCaseStudy';
import PredictiveMaintenanceCaseStudy from './pages/PredictiveMaintenanceCaseStudy';
import VendorFraudCaseStudy from './pages/VendorFraudCaseStudy';
import SolarRooftopCaseStudy from './pages/SolarRooftopCaseStudy';
import Careers from './pages/Careers';
import JobApplication from './pages/JobApplication';
import Demo from './pages/Demo';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import UiUxDesign from './pages/UiUxDesign';
import WebDesignDevelopment from './pages/WebDesignDevelopment';
import MobileAppDevelopment from './pages/MobileAppDevelopment';
import CustomSoftwareDevelopment from './pages/CustomSoftwareDevelopment';
import EcommerceDevelopment from './pages/EcommerceDevelopment';
import DigitalMarketing from './pages/DigitalMarketing';
import ErpSolutions from './pages/ErpSolutions';
import AdminAuth from './pages/admin/AdminAuth';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';
import { ToastProvider } from './components/ui/ToastProvider';

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/Services/ai-ml" element={<ServiceDetails />} />
        <Route path="/Services/agentic-ai" element={<AgenticAI />} />
        <Route path="/Services/audio-video-analytics" element={<AudioVideoAnalytics />} />
        <Route path="/Services/cloud-on-premise-deployment" element={<CloudOnPremiseDeployment />} />
        <Route path="/Services/ui-ux-design" element={<UiUxDesign />} />
        <Route path="/Services/web-design-development" element={<WebDesignDevelopment />} />
        <Route path="/Services/mobile-app-development" element={<MobileAppDevelopment />} />
        <Route path="/Services/custom-software-development" element={<CustomSoftwareDevelopment />} />
        <Route path="/Services/ecommerce-development" element={<EcommerceDevelopment />} />
        <Route path="/Services/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/Services/erp-solutions" element={<ErpSolutions />} />
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
        <Route path="/industries/healthcare-and-life-sciences" element={<HealthcareLifeSciences />} />
        <Route path="/industries/:slug" element={<IndustryDetail />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/rfp-query-compliance" element={<CaseStudyDetail />} />
        <Route path="/case-studies/talent-matching" element={<TalentMatchingCaseStudy />} />
        <Route path="/case-studies/illicit-behaviour-detection" element={<IllicitBehaviourCaseStudy />} />
        <Route path="/case-studies/support-automation-shipment" element={<SupportShipmentCaseStudy />} />
        <Route path="/case-studies/support-automation-bpo" element={<SupportBpoCaseStudy />} />
        <Route path="/case-studies/predictive-maintenance" element={<PredictiveMaintenanceCaseStudy />} />
        <Route path="/case-studies/vendor-fraud-detection" element={<VendorFraudCaseStudy />} />
        <Route path="/case-studies/solar-rooftop-detection" element={<SolarRooftopCaseStudy />} />
        <Route path="/case-studies/genai-enabled-sdlc" element={<GenAiSdlcCaseStudy />} />
        <Route path="/resources/demo" element={<Demo />} />
        <Route path="/resources/blogs" element={<Blog />} />
        <Route path="/resources/blogs/:slug" element={<BlogPost />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/apply/:jobId" element={<JobApplication />} />
        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute ? <FooterSection /> : null}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppShell />
      </ToastProvider>
    </BrowserRouter>
  );
}
