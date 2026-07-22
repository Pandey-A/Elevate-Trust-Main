// components/Navbar.tsx
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import elevateLogo from '../assets/nav/elevate-logo.svg';
import linkedinIcon from '../assets/nav/linkedin.png';
import twitterIcon from '../assets/nav/twitter.png';
import instagramIcon from '../assets/nav/instagram.png';
import smartArrow from '../assets/homepage-icons/smart-arrow.png';
import { SITE_INDUSTRIES } from '../data/industries';
import { digitalServicePaths } from '../data/digitalServices';
import './navbar.css';

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/elevatetrustai',
    icon: linkedinIcon,
  },
  {
    label: 'Twitter',
    href: 'https://x.com/ElevateTrustai',
    icon: twitterIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/elevatetrustai/',
    icon: instagramIcon,
  },
] as const;

const SERVICES_PATH = '/Services';
const SERVICE_AI_ML_PATH = '/Services/ai-ml';
const SERVICE_GENERATIVE_AI_PATH = '/Services/generative-ai';
const SERVICE_AUDIO_VIDEO_PATH = '/Services/audio-video-analytics';
const SERVICE_CLOUD_ON_PREMISE_PATH = '/Services/cloud-on-premise-deployment';
const TECHNOLOGIES_PATH = '/technologies';
const INDUSTRIES_PATH = '/industries';

const RESOURCES_PATH = '/resources';
const CASE_STUDIES_PATH = '/case-studies';

const serviceItemPaths: Record<string, string> = {
  'AI/ML Solution': SERVICE_AI_ML_PATH,
  'Generative AI': SERVICE_GENERATIVE_AI_PATH,
  'Audio/Video Analytics': SERVICE_AUDIO_VIDEO_PATH,
  'Cloud/On-Premise Deployment': SERVICE_CLOUD_ON_PREMISE_PATH,
  ...digitalServicePaths,
};

const resourceItemPaths: Record<string, string> = {
  'Case Studies': CASE_STUDIES_PATH,
  Demo: `${RESOURCES_PATH}/demo`,
  Blogs: `${RESOURCES_PATH}/blogs`,
};

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
    itemHref: SERVICES_PATH,
    leftColumn: [
      'AI/ML Solution',
      'Generative AI',
      'Audio/Video Analytics',
      'Cloud/On-Premise Deployment',
      'UI/UX Design Content',
      'Web Design & Development',
    ],
    rightColumn: [
      'Mobile App Development',
      'Custom Software Development',
      'Ecommerce Development',
      'Digital Marketing Services',
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
    leftColumn: [...SITE_INDUSTRIES.slice(0, 4)],
    rightColumn: [...SITE_INDUSTRIES.slice(4)],
  },
};

const navLinks: NavLink[] = [
  {
    label: 'Our Services',
    megaMenu: 'services',
  },
  {
    label: 'Industries',
    megaMenu: 'industries',
  },
  {
    label: 'Technology Trends',
    megaMenu: 'technology-trends',
  },
  {
    label: 'Resources',
    href: RESOURCES_PATH,
    dropdown: ['Case Studies', 'Demo', 'Blogs'],
  },
  { label: 'Careers', href: '/careers' },
];

function getResourceItemPath(item: string) {
  return resourceItemPaths[item] ?? `${RESOURCES_PATH}/${toSlug(item)}`;
}

function isResourcesPathActive(pathname: string) {
  return (
    pathname === RESOURCES_PATH ||
    pathname.startsWith(`${RESOURCES_PATH}/`) ||
    pathname === CASE_STUDIES_PATH ||
    pathname.startsWith(`${CASE_STUDIES_PATH}/`)
  );
}

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
    if (menuId === 'services') {
      return (
        location.pathname === SERVICES_PATH ||
        location.pathname.startsWith(`${SERVICES_PATH}/`) ||
        location.pathname === '/ServiceDetails'
      );
    }
    if (menuId === 'technology-trends') {
      return location.pathname === TECHNOLOGIES_PATH || location.pathname.startsWith(`${TECHNOLOGIES_PATH}/`);
    }
    if (menuId === 'industries') {
      return location.pathname === INDUSTRIES_PATH || location.pathname.startsWith(`${INDUSTRIES_PATH}/`);
    }
    return false;
  };

  const getItemPath = (menu: MegaMenuConfig, item: string) => {
    if (menu.itemHref === SERVICES_PATH) {
      return serviceItemPaths[item] ?? SERVICE_AI_ML_PATH;
    }
    if (menu.itemHref === INDUSTRIES_PATH) {
      return `${INDUSTRIES_PATH}/${toSlug(item)}`;
    }
    if (menu.itemHref === TECHNOLOGIES_PATH) return `${TECHNOLOGIES_PATH}/${toSlug(item)}`;
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
            <div className="flex items-center gap-1 min-[1440px]:gap-1.5 min-[1680px]:gap-2.5">
              {navLinks.map((link) => (
                isMegaMenuLink(link) ? (
                  <div
                    key={link.label}
                    className="relative shrink-0"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      className={`navbar__link flex cursor-pointer items-center gap-0.5 whitespace-nowrap rounded-md px-1 py-1 text-[12px] font-medium transition-colors sm:px-1.5
                        ${isMegaMenuActive(link.megaMenu) || activeDropdown === link.label
                          ? 'text-[#272935]'
                          : 'text-gray-600 hover:text-gray-900'
                        }`}
                      aria-expanded={activeDropdown === link.label}
                      onClick={() =>
                        setActiveDropdown((current) =>
                          current === link.label ? null : link.label
                        )
                      }
                    >
                      {link.label}
                      <ChevronDown className="h-3 w-3 shrink-0" />
                    </button>

                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-1/2 z-50 pt-2 -translate-x-1/2 min-[1440px]:left-0 min-[1440px]:translate-x-0">
                        <div
                          className={`bg-white rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 px-6 py-6 opacity-100 max-h-[70vh] overflow-auto ${
                            link.megaMenu === 'services'
                              ? 'w-[min(899px,90vw)] min-[2012px]:h-[378px] min-[2012px]:w-[899px]'
                              : 'w-[min(831px,90vw)] min-[2012px]:h-[395px] min-[2012px]:w-[831px]'
                          }`}
                        >
                          {renderMegaMenu(link.megaMenu)}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                <div
                  key={link.label}
                  className="relative shrink-0"
                  onMouseEnter={() => isDropdownLink(link) && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {isDropdownLink(link) ? (
                    <button
                      type="button"
                      className={`navbar__link flex cursor-pointer items-center gap-0.5 whitespace-nowrap rounded-md px-1 py-1 text-[12px] font-medium transition-colors sm:px-1.5
                        ${activeDropdown === link.label ||
                          (link.label === 'Resources' && isResourcesPathActive(location.pathname))
                          ? 'text-[#272935]'
                          : 'text-gray-600 hover:text-gray-900'
                        }`}
                      aria-expanded={activeDropdown === link.label}
                      onClick={() =>
                        setActiveDropdown((current) =>
                          current === link.label ? null : link.label
                        )
                      }
                    >
                      {link.label}
                      <ChevronDown className="h-3 w-3 shrink-0" />
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={`navbar__link flex items-center gap-0.5 whitespace-nowrap rounded-md px-1 py-1 text-[12px] font-medium transition-colors sm:px-1.5
                        ${location.pathname === link.href
                          ? 'text-[#272935]'
                          : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {isDropdownLink(link) && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 z-50 pt-2">
                      <div className="w-56 rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item}
                            to={
                              link.label === 'Resources'
                                ? getResourceItemPath(item)
                                : `${link.href}/${toSlug(item)}`
                            }
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                )
              ))}
            </div>
          </div>

          <div className="navbar__right hidden items-center justify-end gap-2.5 lg:flex">
            <Link
              to="/about"
              className="navbar__about whitespace-nowrap text-[12px] font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              About Us
            </Link>

            <div className="navbar__social hidden items-center gap-2.5 min-[1440px]:flex">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-800 transition-opacity hover:opacity-70"
                >
                  <img src={social.icon} alt={social.label} className="h-4 w-4 object-contain" />
                </a>
              ))}
            </div>

            <Link
              to="/contact"
              className="navbar__cta flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-[#2365AA] px-3 text-xs font-medium text-white transition-colors hover:bg-[#152a45]"
            >
              <span className="whitespace-nowrap">Let's Connect</span>
              <img src={smartArrow} alt="" aria-hidden className="h-5 w-5 object-contain" />
            </Link>
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
                              to={
                                link.label === 'Resources'
                                  ? getResourceItemPath(item)
                                  : `${link.href}/${toSlug(item)}`
                              }
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
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-gray-800 transition-opacity hover:opacity-70"
                  >
                    <img src={social.icon} alt={social.label} className="h-6 w-6 object-contain" />
                  </a>
                ))}
              </div>

              <Link
                to="/contact"
                className="flex w-full gap-2.5 px-4 py-3 bg-[#2365AA] text-white text-base font-medium rounded-full hover:bg-[#152a45] transition-colors justify-center items-center"
                onClick={closeMobileMenu}
              >
                <span>Let's Connect</span>
                <img src={smartArrow} alt="" aria-hidden className="h-6 w-6 object-contain" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
