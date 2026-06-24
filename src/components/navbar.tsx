// components/Navbar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import elevateLogo from '../assets/nav/elevate-logo.svg';
import linkedinIcon from '../assets/nav/Linkedin-logo.svg';
import instagramIcon from '../assets/nav/Instagram-logo.svg';
import telegramIcon from '../assets/nav/Telegram-logo.svg';
import letsConnectIcon from '../assets/nav/lets-connect.svg';
const navLinks = [
  {
    label: 'Our Solutions',
    href: '/solutions',
    dropdown: ['Digital Transformation', 'Cloud Services', 'Data Analytics']
  },
  {
    label: 'Technologies',
    href: '/technologies',
    dropdown: ['AI/ML', 'Blockchain', 'IoT']
  },
  {
    label: 'Industries',
    href: '/industries',
    dropdown: ['Finance', 'Healthcare', 'Retail']
  },
  {
    label: 'Resources',
    href: '/resources',
    dropdown: ['Blog', 'Whitepapers', 'Webinars']
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Careers', href: '/careers' },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single row flex container - everything in one line */}
        <div className="flex items-center justify-between h-16">

          {/* LEFT: Logo + Nav Links */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={elevateLogo}
                alt="Elevate Trust"
                className="h-[5.5vh] w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.55">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className={`px-2 py-[0.3vh] text-[1.85vh] font-medium rounded-md transition-colors flex items-center gap-1
                      ${location.pathname === link.href
                        ? 'text-[#272935]'
                        : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown className="w-3.5 h-3.5" />}
                  </Link>

                  {/* Dropdown */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item}
                          to={`${link.href}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: About Us + Social Icons + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              to="/about"
              className="text-[1.85vh] font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              About Us
            </Link>

            {/* Social Icons - Correct ones */}
            <div className="flex items-center gap-1">
              <a
                href="#"
                aria-label="Telegram"
                className="text-gray-800 hover:text-gray-600 transition-colors"
              >
                <img src={telegramIcon} alt="Telegram" className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-800 hover:text-gray-600 transition-colors"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-800 hover:text-gray-600 transition-colors"
              >
                <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
              </a>
            </div>

            {/* CTA Button - Fixed sizing */}
            <button className=" flex gap-2 px-3 py-2 bg-[#2365AA] text-white text-[1.85vh] font-medium rounded-full hover:bg-[#152a45] transition-colors justify-center w-[164px] h-[40px] items-center">
              <span>Let's Connect</span>

              <img src={letsConnectIcon} alt="Arrow Right" className="w-[28px] h-[28px]" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}