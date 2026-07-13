// components/Navbar.tsx
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import elevateLogo from '../assets/nav/elevate-logo.svg';
import linkedinIcon from '../assets/nav/Linkedin-logo.svg';
import instagramIcon from '../assets/nav/Instagram-logo.svg';
import telegramIcon from '../assets/nav/Telegram-logo.svg';
import letsConnectIcon from '../assets/nav/lets-connect.svg';
import './navbar.css';

const SERVICE_DETAILS_PATH = '/ServiceDetails';
const TECHNOLOGIES_PATH = '/technologies';
const INDUSTRIES_PATH = '/industries';

type MegaMenuId = 'services' | 'technology-trends' | 'industries';

type MegaMenuNavLink = {
  label: string;
  megaMenu: MegaMenuId;
};

type DropdownNavLink = {
  label: string;
  href: string;
  dropdown: string[];
};

type SimpleNavLink = {
  label: string;
  href: string;
};

type NavLink = MegaMenuNavLink | DropdownNavLink | SimpleNavLink;

type MegaMenuConfig = {
  title: string;
  itemHref: string;
  leftColumn: string[];
  rightColumn: string[];
};

function isMegaMenuLink(link: NavLink): link is MegaMenuNavLink {
  return 'megaMenu' in link;
}

function isDropdownLink(link: NavLink): link is DropdownNavLink {
  return 'dropdown' in link;
}

function toSlug(label: string) {
  return label.toLowerCase().replace(/\s+/g, '-');
}

const megaMenus: Record<MegaMenuId, MegaMenuConfig> = {
  services: {
    title: 'Our Services',
    itemHref: SERVICE_DETAILS_PATH,
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
  },
  'technology-trends': {
    title: 'Technology trends',
    itemHref: TECHNOLOGIES_PATH,
    leftColumn: [
      'AI Native SDLC',
      'AI',
      'Data',
      'Cloud',
      'Cybersecurity',
    ],
    rightColumn: [
      'IT Bizops',
      'Devops',
      'On premise',
      'Digital workspace',
    ],
  },
  industries: {
    title: 'Industries',
    itemHref: INDUSTRIES_PATH,
    leftColumn: [
      'Healthcare and Life Sciences',
      'Financial Services & FinTech',
      'E-commerce & Retail',
      'Education & E-Learning',
    ],
    rightColumn: [
      'Logistics & Supply Chain',
      'Manufacturing & Industry 4.0',
      'Social Media & Entertainment',
      'Public Sector & Government',
    ],
  },
};

const navLinks: NavLink[] = [
  {
    label: 'Our Services',
    megaMenu: 'services',
  },
  {
    label: 'Technology Trends',
    megaMenu: 'technology-trends',
  },
  {
    label: 'Industries',
    megaMenu: 'industries',
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

  const isMegaMenuActive = (menuId: MegaMenuId) => {
    if (menuId === 'services') return location.pathname === SERVICE_DETAILS_PATH;
    if (menuId === 'technology-trends') {
      return location.pathname === TECHNOLOGIES_PATH || location.pathname.startsWith(`${TECHNOLOGIES_PATH}/`);
    }
    if (menuId === 'industries') {
      return location.pathname === INDUSTRIES_PATH || location.pathname.startsWith(`${INDUSTRIES_PATH}/`);
    }
    return false;
  };

  const getItemPath = (menu: MegaMenuConfig, item: string) => {
    if (menu.itemHref === SERVICE_DETAILS_PATH) return SERVICE_DETAILS_PATH;
    if (menu.itemHref === INDUSTRIES_PATH) return INDUSTRIES_PATH;
    if (menu.itemHref === TECHNOLOGIES_PATH) return `${TECHNOLOGIES_PATH}/ai`;
    return `${menu.itemHref}/${toSlug(item)}`;
  };

  const renderMegaMenu = (menuId: MegaMenuId, onNavigate?: () => void) => {
    const menu = megaMenus[menuId];

    return (
      <div className="px-1 pt-1">
        <p className="mb-4 text-base font-bold text-[#272935]">{menu.title}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1">
          <ul className="space-y-3">
            {menu.leftColumn.map((item) => (
              <li key={item}>
                <Link
                  to={getItemPath(menu, item)}
                  className="text-sm text-[#4B5563] hover:text-[#272935] transition-colors leading-snug"
                  onClick={onNavigate}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {menu.rightColumn.map((item) => (
              <li key={item}>
                <Link
                  to={getItemPath(menu, item)}
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
  };

  return (
    <nav className="navbar relative z-50 w-full bg-white border-b border-gray-200">
      <div className="site-container navbar__shell">
        <div className="navbar__inner grid h-14 grid-cols-[auto_1fr_auto] items-center gap-3 sm:h-16 lg:gap-4">
          <Link to="/" className="navbar__logo flex-shrink-0" onClick={closeMobileMenu}>
            <img
              src={elevateLogo}
              alt="Elevate Trust"
              className="h-7 w-auto sm:h-8 lg:h-9"
            />
          </Link>

          <div className="navbar__nav hidden min-w-0 lg:flex items-center justify-center">
            <div className="flex items-center gap-0 xl:gap-0.5">
              {navLinks.map((link) => (
                isMegaMenuLink(link) ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span
                      className={`navbar__link flex cursor-default items-center gap-0.5 whitespace-nowrap rounded-md px-1.5 py-1 text-[13px] font-medium transition-colors xl:px-2 xl:text-sm min-[1280px]:text-[15px] min-[1536px]:text-[16px] min-[1920px]:text-[18px]
                        ${isMegaMenuActive(link.megaMenu) || activeDropdown === link.label
                          ? 'text-[#272935]'
                          : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      {link.label}
                      <ChevronDown className="h-3 w-3 shrink-0 xl:h-3.5 xl:w-3.5" />
                    </span>

                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 pt-2 z-50">
                        <div className="min-w-[520px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 px-8 py-7">
                          {renderMegaMenu(link.megaMenu)}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => isDropdownLink(link) && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className={`navbar__link flex items-center gap-0.5 whitespace-nowrap rounded-md px-1.5 py-1 text-[13px] font-medium transition-colors xl:px-2 xl:text-sm min-[1280px]:text-[15px] min-[1536px]:text-[16px] min-[1920px]:text-[18px]
                      ${location.pathname === link.href
                        ? 'text-[#272935]'
                        : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {link.label}
                    {isDropdownLink(link) && <ChevronDown className="h-3 w-3 shrink-0 xl:h-3.5 xl:w-3.5" />}
                  </Link>

                  {isDropdownLink(link) && activeDropdown === link.label && (
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

          <div className="navbar__right hidden items-center justify-end gap-2.5 lg:flex xl:gap-3.5">
            <Link
              to="/about"
              className="navbar__about whitespace-nowrap text-[13px] font-medium text-gray-600 transition-colors hover:text-gray-900 xl:text-sm min-[1280px]:text-[15px] min-[1536px]:text-[16px] min-[1920px]:text-[18px]"
            >
              About Us
            </Link>

            <div className="navbar__social hidden items-center gap-1 xl:flex">
              <a
                href="#"
                aria-label="Telegram"
                className="text-gray-800 hover:text-gray-600 transition-colors"
              >
                <img src={telegramIcon} alt="Telegram" className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-800 hover:text-gray-600 transition-colors"
              >
                <img src={linkedinIcon} alt="LinkedIn" className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-800 hover:text-gray-600 transition-colors"
              >
                <img src={instagramIcon} alt="Instagram" className="h-4 w-4" />
              </a>
            </div>

            <button className="navbar__cta flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#2365AA] px-3.5 text-xs font-medium text-white transition-colors hover:bg-[#152a45] xl:h-10 xl:gap-2 xl:px-4 xl:text-sm min-[1280px]:text-[15px] min-[1536px]:text-[16px] min-[1920px]:text-[18px]">
              <Link to='/contact'><span className="whitespace-nowrap">Let's Connect</span></Link>
              <img src={letsConnectIcon} alt="Arrow Right" className="h-6 w-6 xl:h-7 xl:w-7" />
            </button>
          </div>

          <button
            type="button"
            className="navbar__mobile-toggle inline-flex items-center justify-center justify-self-end rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 lg:hidden"
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
                  {isMegaMenuLink(link) ? (
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
                          {renderMegaMenu(link.megaMenu, closeMobileMenu)}
                        </div>
                      )}
                    </>
                  ) : isDropdownLink(link) ? (
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
                      to={link.href}
                      className={`block py-3 text-base font-medium ${
                        location.pathname === link.href ? 'text-[#272935]' : 'text-gray-800'
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
