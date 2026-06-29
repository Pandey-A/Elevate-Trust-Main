// components/Navbar.tsx
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import elevateLogo from '../assets/nav/elevate-logo.svg';
import linkedinIcon from '../assets/nav/Linkedin-logo.svg';
import instagramIcon from '../assets/nav/Instagram-logo.svg';
import telegramIcon from '../assets/nav/Telegram-logo.svg';
import letsConnectIcon from '../assets/nav/lets-connect.svg';

const SERVICE_DETAILS_PATH = '/ServiceDetails';

const ourServicesMenu = {
  title: 'Our Services',
  leftColumn: [
    'AI/ML Solution',
    'Generative AI',
    'Audio/Video Analytics',
    'Cloud/On-Premise Deployment',
    'IOT based business process automation',
  ],
  rightColumn: [
    'Web Design & Development',
    'Mobile App Development',
    'Custom Software Development',
    'ERP Solutions',
  ],
};

const navLinks = [
  {
    label: 'Our Solutions',
    megaMenu: true,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileExpanded((current) => (current === label ? null : label));
  };

  const isServiceDetailsActive = location.pathname === SERVICE_DETAILS_PATH;

  const renderServicesMenu = (onNavigate?: () => void) => (
    <div className="px-1 pt-1">
      <p className="mb-4 text-base font-bold text-[#272935]">{ourServicesMenu.title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1">
        <ul className="space-y-3">
          {ourServicesMenu.leftColumn.map((item) => (
            <li key={item}>
              <Link
                to={SERVICE_DETAILS_PATH}
                className="text-sm text-[#4B5563] hover:text-[#272935] transition-colors leading-snug"
                onClick={onNavigate}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-3">
          {ourServicesMenu.rightColumn.map((item) => (
            <li key={item}>
              <Link
                to={SERVICE_DETAILS_PATH}
                className="text-sm text-[#4B5563] hover:text-[#272935] transition-colors leading-snug"
                onClick={onNavigate}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <nav className="relative z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-6 min-w-0">
            <Link to="/" className="flex-shrink-0" onClick={closeMobileMenu}>
              <img
                src={elevateLogo}
                alt="Elevate Trust"
                className="h-8 sm:h-9 lg:h-[5.5vh] w-auto"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-0.55">
              {navLinks.map((link) => (
                'megaMenu' in link && link.megaMenu ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span
                      className={`px-2 py-[0.3vh] text-[1.85vh] font-medium rounded-md transition-colors flex items-center gap-1 cursor-default
                        ${isServiceDetailsActive || activeDropdown === link.label
                          ? 'text-[#272935]'
                          : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>

                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 pt-2 z-50">
                        <div className="min-w-[520px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 px-8 py-7">
                          {renderServicesMenu()}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => 'dropdown' in link && link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={'href' in link ? link.href : '/'}
                    className={`px-2 py-[0.3vh] text-[1.85vh] font-medium rounded-md transition-colors flex items-center gap-1
                      ${'href' in link && location.pathname === link.href
                        ? 'text-[#272935]'
                        : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {link.label}
                    {'dropdown' in link && link.dropdown && <ChevronDown className="w-3.5 h-3.5" />}
                  </Link>

                  {'dropdown' in link && link.dropdown && activeDropdown === link.label && (
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
                )
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <Link
              to="/about"
              className="text-[1.85vh] font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              About Us
            </Link>

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

            <button className="flex gap-2 px-3 py-2 bg-[#2365AA] text-white text-[1.85vh] font-medium rounded-full hover:bg-[#152a45] transition-colors justify-center w-[164px] h-[40px] items-center">
              <span>Let's Connect</span>
              <img src={letsConnectIcon} alt="Arrow Right" className="w-[28px] h-[28px]" />
            </button>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-14 sm:top-16 z-40">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={closeMobileMenu}
          />
          <div className="relative bg-white border-t border-gray-200 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-gray-100 last:border-b-0">
                  {'megaMenu' in link && link.megaMenu ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-3 text-base font-medium text-gray-800"
                        onClick={() => toggleMobileDropdown(link.label)}
                        aria-expanded={mobileExpanded === link.label}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileExpanded === link.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {mobileExpanded === link.label && (
                        <div className="pb-4 pl-1">
                          {renderServicesMenu(closeMobileMenu)}
                        </div>
                      )}
                    </>
                  ) : 'dropdown' in link && link.dropdown ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-3 text-base font-medium text-gray-800"
                        onClick={() => toggleMobileDropdown(link.label)}
                        aria-expanded={mobileExpanded === link.label}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileExpanded === link.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {mobileExpanded === link.label && (
                        <div className="pb-3 pl-3 space-y-1">
                          <Link
                            to={link.href}
                            className="block py-2 text-sm font-medium text-[#2365AA]"
                            onClick={closeMobileMenu}
                          >
                            View all {link.label}
                          </Link>
                          {link.dropdown.map((item) => (
                            <Link
                              key={item}
                              to={`${link.href}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                              onClick={closeMobileMenu}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={'href' in link ? link.href : '/'}
                      className={`block py-3 text-base font-medium ${
                        'href' in link && location.pathname === link.href ? 'text-[#272935]' : 'text-gray-800'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              <Link
                to="/about"
                className="block py-3 text-base font-medium text-gray-800 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>

              <div className="flex items-center gap-4 py-4">
                <a href="#" aria-label="Telegram" className="text-gray-800 hover:text-gray-600">
                  <img src={telegramIcon} alt="Telegram" className="w-6 h-6" />
                </a>
                <a href="#" aria-label="LinkedIn" className="text-gray-800 hover:text-gray-600">
                  <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-800 hover:text-gray-600">
                  <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
                </a>
              </div>

              <button
                type="button"
                className="flex w-full gap-2 px-4 py-3 bg-[#2365AA] text-white text-base font-medium rounded-full hover:bg-[#152a45] transition-colors justify-center items-center"
              >
                <span>Let's Connect</span>
                <img src={letsConnectIcon} alt="" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
