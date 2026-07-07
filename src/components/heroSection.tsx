import type { CSSProperties } from "react";
import "./heroSection.css";
import elevateMainLogo from "../assets/homepage-icons/elevatestarting-logo.svg";
import heroBg from "../assets/homepage-icons/Hero-bg.png";
import futureIcon from "../assets/homepage-icons/future.png";
import editModeIcon from "../assets/homepage-icons/editmode.png";
import userLoveIcon from "../assets/homepage-icons/user-love-01.svg";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{ "--hero-bg-image": `url(${heroBg})` } as CSSProperties}
    >

      <div className="hero-top-logo">
        <img src={elevateMainLogo} alt="Elevate Trust" />
      </div>

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-badge">
            <img src={userLoveIcon} alt="" aria-hidden />
            Scaling Startups and Businesses
          </div>

          <h1 className="hero-h1">
            AI Native Product Engineering Firm
          </h1>

          <p className="hero-sub">
            Build scalable, fine-tuned local LLM solutions with a trusted AI/ML implementation partner.
          </p>

          <div className="hero-stars-row">
            <span className="hero-stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F5B301">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </span>
            <span className="hero-review-count">20+ Customers review</span>
          </div>

          <button id="hero-cta" className="hero-cta-btn">
            <span>Consult our strategy team</span>
            <span className="hero-cta-btn__circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2365AA" strokeWidth="3">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </button>
        </div>

        <div className="hero-right">
          <div className="hero-cards-container">
            <div className="hero-card hero-card--we">We</div>

            <div className="hero-card hero-card--future">
              <img src={futureIcon} alt="" className="hero-card__future-icon" />
              <span>Future</span>
            </div>

            <div className="hero-card hero-card--arrow">
              <div className="hero-card__arrow-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>

            <div className="hero-card hero-card--create">
              <div className="hero-card__create-illust">
                <img src={editModeIcon} alt="" />
              </div>
              <span>Create</span>
            </div>
          </div>

          <div className="hero-empower">
            <h2>
              Empowering<br />
              Businesses<br />
              with AI/ML Solutions
            </h2>
            <p>That Build Trust and Drive Transformation</p>
          </div>
        </div>
      </div>

      <div className="hero-bottom-label">
        <span className="hero-bottom-label__our">OUR </span>
        <span className="hero-bottom-label__cust">CUSTOMERS</span>
      </div>
    </section>
  );
}
