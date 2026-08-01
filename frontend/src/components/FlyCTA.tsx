import { Link } from "react-router-dom";
import worldMapFooter from "../assets/footer/worldmapfooter.svg";
import fly1 from "../assets/homepage-icons/fly-1.png";
import fly2 from "../assets/homepage-icons/fly-2.png";
import fly3 from "../assets/homepage-icons/fly-3.png";
import fly4 from "../assets/homepage-icons/fly-4.png";
import blueArrow from "../assets/homepage-icons/blue-arrow.png";

import "./FlyCTA.css";

export default function FlyCTA() {
  return (
    <section className="fly-cta" aria-label="Fly Beyond Limits">
      { }
      <img
        src={worldMapFooter}
        alt=""
        aria-hidden
        className="fly-cta__bg-globe"
      />

      <img
        src={fly2}
        alt=""
        aria-hidden
        className="fly-cta__bg-wave"
      />

      <div className="fly-cta__container">
        <img
          src={fly1}
          alt=""
          aria-hidden
          className="fly-cta__ill-left-people"
          draggable={false}
        />
        <div className="fly-cta__content">
          <h2 className="fly-cta__title">
            Fly Beyond
            <br />
            Limits with AI.
          </h2>

          <div className="fly-cta__btn-wrapper">
            <Link to="/contact" className="fly-cta__btn">
              <span>Let's Get Started</span>
              <img
                src={blueArrow}
                alt=""
                aria-hidden
                className="fly-cta__btn-icon"
              />
            </Link>
          </div>

          <p className="fly-cta__desc">
            Get in touch with us today for a personalized quote on our AI/ML
            development services. Our team is here to provide tailored solutions
            that drive success and accelerate your business growth.
          </p>
        </div>

        <div className="fly-cta__illustration-wrapper">
          <img
            src={fly4}
            alt=""
            aria-hidden
            className="fly-cta__ill-slabs"
            draggable={false}
          />
          <img
            src={fly3}
            alt=""
            aria-hidden
            className="fly-cta__ill-people"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
