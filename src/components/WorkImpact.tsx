import { ArrowUpRight } from "lucide-react";

import works1 from "../assets/homepage-icons/works-1.svg";
import works2 from "../assets/homepage-icons/works-2.svg";
import works3 from "../assets/homepage-icons/works-3.svg";

import "./WorkImpact.css";

interface ImpactCard {
  text: React.ReactNode;
  image: string;
}

const impactCards: ImpactCard[] = [
  {
    text: (
      <>
        Master &amp; PHD Eng in AI &amp; IOT at{" "}
        <span className="work-impact__highlight">
          Pune engineering center
        </span>
      </>
    ),
    image: works1,
  },
  {
    text: (
      <>
        Serving customer in{" "}
        <span className="work-impact__highlight">NZ, Canada, Dubai</span> and{" "}
        <span className="work-impact__highlight">UK</span>.
      </>
    ),
    image: works2,
  },
  {
    text: (
      <>
        Hold patent and research papers in{" "}
        <span className="work-impact__highlight">Generative AI</span> and{" "}
        <span className="work-impact__highlight">Video analytics</span>.
      </>
    ),
    image: works3,
  },
];

export default function WorkImpact() {
  return (
    <section
      className="work-impact px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-12 2xl:px-16"
      aria-label="Work that proves our impact"
    >
      <div className="mx-auto max-w-site w-full">
        <div className="work-impact__inner">
          {/* ── Left: heading + CTA ── */}
          <div className="work-impact__left">
            <h2 className="work-impact__heading">
              Work that
              <br />
              proves
              <br />
              our impact
            </h2>

            <a href="#" className="work-impact__btn">
              <span>READ MORE</span>
              <span className="work-impact__btn-icon">
                <ArrowUpRight strokeWidth={2.5} />
              </span>
            </a>
          </div>

          {/* ── Right: 3 cards ── */}
          <div className="work-impact__cards">
            {impactCards.map((card, index) => (
              <article key={`impact-${index}`} className="work-impact__card">
                <p className="work-impact__card-text">{card.text}</p>
                <div className="work-impact__card-bottom">
                  <img
                    src={card.image}
                    alt=""
                    aria-hidden
                    className="work-impact__card-illustration"
                    draggable={false}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Decorative bar ── */}
        <span className="work-impact__bar" aria-hidden />
      </div>
    </section>
  );
}
