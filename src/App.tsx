// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import ServiceDetails from './pages/ServiceDetails';
import AboutUs from './pages/AboutUs';
import FooterSection from './components/footerSection';
import Contact from './pages/Contact';
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/ServiceDetails" element={<ServiceDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
}