import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import elevateFooterLogo from "../assets/footer/elevatelogo.svg";
import facebookLogo from "../assets/footer/FacebookLogo.svg";
import youtubeLogo from "../assets/footer/YoutubeLogo.svg";
import linkedinLogo from "../assets/footer/LinkedinLogo.svg";
import instagramLogo from "../assets/footer/InstagramLogo.svg";
import xLogo from "../assets/footer/xlogo.svg";
import worldMapBackground from "../assets/footer/worldmapfooter.svg";
import elevateFooterServiceLogo from "../assets/footer/elevateservicelogo.svg";
import paperplanefooter from "../assets/footer/PaperPlaneTilt.svg";
import { activePartners } from "../data/activePartners";
import { digitalServicePaths } from "../data/digitalServices";
import "./footerSection.css";

type FooterLinkItem = {
  label: string;
  href?: string;
};

const services: FooterLinkItem[] = [
  { label: "Overview", href: "/Services/ai-ml" },
  { label: "AI/ML Solution", href: "/Services/ai-ml" },
  { label: "Agentic AI", href: "/Services/generative-ai" },
  { label: "Video Analytics", href: "/Services/audio-video-analytics" },
  { label: "Cloud Deployment", href: "/Services/cloud-on-premise-deployment" },
];

const otherServices: FooterLinkItem[] = [
  { label: "UI/UX Design Content", href: digitalServicePaths["UI/UX Design Content"] },
  {
    label: "Web Design & Development",
    href: digitalServicePaths["Web Design & Development"],
  },
  {
    label: "Mobile App Development",
    href: digitalServicePaths["Mobile App Development"],
  },
  {
    label: "Custom Software Development",
    href: digitalServicePaths["Custom Software Development"],
  },
  {
    label: "Ecommerce Development",
    href: digitalServicePaths["Ecommerce Development"],
  },
  {
    label: "Digital Marketing Services",
    href: digitalServicePaths["Digital Marketing Services"],
  },
  { label: "ERP Solutions", href: digitalServicePaths["ERP Solutions"] },
];

const aboutCompany: FooterLinkItem[] = [
  { label: "Overview", href: "/about" },
  { label: "Blog", href: "/resources/blogs" },
  { label: "Career", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  {
    label: "YouTube",
    icon: youtubeLogo,
    href: "https://www.youtube.com/@ElevateTrust.Ai0",
  },
  {
    label: "Facebook",
    icon: facebookLogo,
    href: "https://www.facebook.com/people/Elevate-Trust-AI/61589302541342/",
  },
  {
    label: "LinkedIn",
    icon: linkedinLogo,
    href: "https://www.linkedin.com/company/elevatetrustai",
  },
  {
    label: "Instagram",
    icon: instagramLogo,
    href: "https://www.instagram.com/elevatetrustai/",
  },
  {
    label: "X",
    icon: xLogo,
    href: "https://x.com/ElevateTrustai",
  },
];

function FooterList({ items }: { items: FooterLinkItem[] }) {
  return (
    <ul className="footer__list">
      {items.map((item) => (
        <li key={item.label}>
          {item.href ? (
            <Link
              to={item.href}
              className="footer__link"
              onClick={() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }}
            >
              <img
                src={elevateFooterServiceLogo}
                alt=""
                aria-hidden="true"
                className="footer__link-icon"
              />
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="footer__link footer__link--muted">
              <img
                src={elevateFooterServiceLogo}
                alt=""
                aria-hidden="true"
                className="footer__link-icon"
              />
              <span>{item.label}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="footer__column">
      <h3 className="footer__heading">{title}</h3>
      {children}
    </div>
  );
}

export default function FooterSection() {
  return (
    <footer className="footer">
      <img
        src={worldMapBackground}
        alt=""
        aria-hidden="true"
        className="footer__map"
      />

      <div className="site-container footer__inner">
        <div className="footer__grid footer__grid--links">
          <div className="footer__brand">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }}
            >
              <img
                src={elevateFooterLogo}
                alt="Elevate Trust logo"
                className="footer__brand-logo"
              />
            </Link>
            <p className="footer__brand-text">
              We partner with innovators to develop state-of-the-art AI solutions
              designed to drive strategic business outcomes. Our expertise covers a
              wide range of industries, tackling complex challenges with AI
              algorithms specifically tailored for both structured and unstructured
              data.
            </p>
          </div>

          <FooterColumn title="Services">
            <FooterList items={services} />
          </FooterColumn>

          <FooterColumn title="Other Services">
            <FooterList items={otherServices} />
          </FooterColumn>

          <FooterColumn title="About Company">
            <FooterList items={aboutCompany} />
          </FooterColumn>
        </div>

        <hr className="footer__divider" />

        <div className="footer__grid footer__grid--meta">
          <div className="footer__column footer__column--wide">
            <h3 className="footer__heading">Newsletter</h3>
            <div className="footer__newsletter">
              <form className="footer__newsletter-form">
                <input
                  type="email"
                  placeholder="Email"
                  className="footer__newsletter-input"
                />
                <button
                  type="submit"
                  className="footer__newsletter-submit"
                  aria-label="Submit newsletter email"
                >
                  <img src={paperplanefooter} alt="" aria-hidden className="h-3.5 w-3.5" />
                </button>
              </form>
              <p className="footer__newsletter-note">Subscribe to our newsletter</p>
            </div>
          </div>

          <FooterColumn title="Contact">
            <div className="footer__contact-list">
              <p>
                <a href="tel:+919243322064" className="footer__contact-link">
                  +91-9243322064
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@elevatetrust.ai"
                  className="footer__contact-link"
                >
                  info@elevatetrust.ai
                </a>
              </p>
              <p>
                <Link
                  to="/contact"
                  className="footer__contact-link"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                  }}
                >
                  Pimple Saudagar, Pune Maharashtra
                </Link>
              </p>
            </div>
          </FooterColumn>

          <FooterColumn title="Partners">
            <div className="footer__partners">
              {activePartners.map((partner) => (
                <div
                  key={partner.name}
                  className={
                    "tall" in partner && partner.tall
                      ? "footer__partner-slot footer__partner-slot--tall"
                      : "footer__partner-slot"
                  }
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="footer__partner-logo"
                  />
                </div>
              ))}
            </div>
          </FooterColumn>
        </div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <div className="footer__socials">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="footer__social-link"
              >
                <img src={social.icon} alt="" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="footer__legal">
            <a href="#">Terms and condition</a>
            <span className="mx-1.5 opacity-50">|</span>
            <a href="#">Privacy Policy</a>
            <p className="footer__copyright">
              © {new Date().getFullYear()} Elevate Trust. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
