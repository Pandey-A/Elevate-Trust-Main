import type { ReactNode } from "react";
import elevateFooterLogo from "../assets/footer/elevatelogo.svg";
import facebookLogo from "../assets/footer/FacebookLogo.svg";
import youtubeLogo from "../assets/footer/YoutubeLogo.svg";
import linkedinLogo from "../assets/footer/LinkedinLogo.svg";
import instagramLogo from "../assets/footer/InstagramLogo.svg";
import tiktokLogo from "../assets/footer/TiktokLogo.svg";
import xLogo from "../assets/footer/xlogo.svg";
import worldMapBackground from "../assets/footer/worldmapfooter.svg";
import elevateFooterServiceLogo from "../assets/footer/elevateservicelogo.svg";
import maskGroup from "../assets/homepage-icons/Mask-group.png";
import paperplanefooter from "../assets/footer/PaperPlaneTilt.svg";
import "./footerSection.css";

const services = [
  "Overview",
  "AI/ML Solution",
  "Generative AI",
  "Video Analytics",
  "Cloud Deployment",
];

const otherServices = [
  "UI/UX Design Content",
  "Web Design & Development",
  "Mobile App Development",
  "Custom Software Development",
  "Ecommerce Development",
  "Digital Marketing Services",
  "ERP Solutions",
];

const aboutCompany = ["Overview", "Blog", "Career", "Contact Us"];

const socialLinks = [
  { label: "YouTube", icon: youtubeLogo, href: "#" },
  { label: "Facebook", icon: facebookLogo, href: "#" },
  { label: "LinkedIn", icon: linkedinLogo, href: "#" },
  { label: "Instagram", icon: instagramLogo, href: "#" },
  { label: "TikTok", icon: tiktokLogo, href: "#" },
  { label: "X", icon: xLogo, href: "#" },
];

function FooterList({ items }: { items: string[] }) {
  return (
    <ul className="footer__list">
      {items.map((item) => (
        <li key={item}>
          <a href="#" className="footer__link">
            <img
              src={elevateFooterServiceLogo}
              alt=""
              aria-hidden="true"
              className="footer__link-icon"
            />
            <span>{item}</span>
          </a>
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
        <div className="footer__grid">
          <div className="footer__brand">
            <img
              src={elevateFooterLogo}
              alt="Elevate Trust logo"
              className="footer__brand-logo"
            />
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

        <div className="footer__grid">
          <FooterColumn title="Contact">
            <div className="footer__contact-list">
              <p>+91-9243322064</p>
              <p>info@elevatetrust.ai</p>
              <p>Pimple Saudagar, Pune Maharashtra</p>
            </div>
          </FooterColumn>

          <FooterColumn title="">
            <img
              src={maskGroup}
              alt="Partner logos"
              className="footer__partners"
            />
          </FooterColumn>

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
        </div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <div className="footer__socials">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
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
              © 2026 Elevate Trust. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
