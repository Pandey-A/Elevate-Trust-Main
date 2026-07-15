import blueArrow from "../assets/homepage-icons/blue-arrow.png";
import partners1 from "../assets/homepage-icons/partners-1.svg";
import partners2 from "../assets/homepage-icons/partners-2.svg";

import "./WhyPartner.css";

export default function WhyPartner() {
  return (
    <section
      className="why-partner px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24 xl:px-12 2xl:px-16"
      aria-label="Why Partner With Us"
    >
      <div className="mx-auto max-w-site w-full">
        {/* ── Heading ── */}
        <div className="text-center">
          <p className="section-eyebrow font-semibold uppercase tracking-[0.18em]">
            <span className="text-[#1a1a2e]">Why Choose </span>
            <span className="text-[#2365aa]">Us</span>
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#1a1a2e] sm:text-4xl lg:text-[44px] lg:leading-[1.15] xl:text-[50px] 2xl:text-[56px] min-[1920px]:text-[62px]">
            Why Partner With Us
          </h2>
        </div>

        {/* ── Cards ── */}
        <div className="why-partner__cards">
          {/* ── Our Vision (dark) ── */}
          <div className="why-partner__card why-partner__card--dark">
            <div className="why-partner__card-content">
              <h3 className="why-partner__card-title">Our Vision</h3>
              <p className="why-partner__card-text">
                Be the top AI/ML implementation &amp; consulting partner which
                operates in an ethically upright manner to grow an organization
                and win the business.
              </p>
              <a href="#" className="why-partner__btn">
                Read More
                <img
                  src={blueArrow}
                  alt=""
                  aria-hidden
                  className="why-partner__btn-icon"
                />
              </a>
            </div>
            <div className="why-partner__card-bottom">
              <img
                src={partners1}
                alt=""
                aria-hidden
                className="why-partner__card-illustration"
                draggable={false}
              />
            </div>
          </div>

          {/* ── Expertise (light) ── */}
          <div className="why-partner__card why-partner__card--light">
            <div className="why-partner__card-content">
              <h3 className="why-partner__card-title">Expertise</h3>
              <p className="why-partner__card-text">
                Delivering machine learning, Generative AI and agentic-based
                solutions. Our core team consists of experts who can fast-track
                machine learning, Deep Learning, Generative AI and
                agentic-based solutions.
              </p>
              <a href="#" className="why-partner__btn">
                Read More
                <img
                  src={blueArrow}
                  alt=""
                  aria-hidden
                  className="why-partner__btn-icon"
                />
              </a>
            </div>
            <div className="why-partner__card-bottom">
              <img
                src={partners2}
                alt=""
                aria-hidden
                className="why-partner__card-illustration"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* ── Bottom line ── */}
        <span className="why-partner__divider" aria-hidden />
      </div>
    </section>
  );
}
