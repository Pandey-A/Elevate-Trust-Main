import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import architectureImg from "../assets/case-studies/cs-rfp.png";
import clientBgImg from "../assets/case-studies/rfp/rfp-client-bg.png";
import challengeImg from "../assets/case-studies/rfp/rfp-challenge.png";
import solutionImg from "../assets/case-studies/rfp/rfp-solution.png";
import outcomeImg from "../assets/case-studies/rfp/rfp-outcome.png";
import "./CaseStudyDetail.css";

const techStack = [
  "Figma",
  "AI ML",
  "Generative AI",
  "Python",
  "Grok",
  "Open AI",
];

const detailCards = [
  {
    title: "Client Background",
    text: "The client is a large-scale procurement and tendering entity managing complex RFP and Standard Bidding Document (SBD) cycles. They focus on facilitating high-stakes vendor interactions and ensuring regulatory compliance across voluminous, multi-departmental technical documentation",
    image: clientBgImg,
    variant: "light" as const,
  },
  {
    title: "Business Challenge",
    text: "Manual RFP analysis is labour-intensive and prone to conflicting departmental interpretations, leaving vendors to struggle with ambiguous clauses in massive documents. This lack of automated conformance checks creates compliance risks and leads to repetitive, redundant pre-bid queries that stall the procurement timeline.",
    image: challengeImg,
    variant: "blue" as const,
  },
  {
    title: "Solution Overview",
    text: "The solution is an AI-driven system that automates document analysis by cross-referencing RFPs, SBDs, and historical query-response records. It leverages institutional knowledge to provide consistent, high-quality responses and performs automated compliance checks to identify missing or ambiguous clauses before documents are released.",
    image: solutionImg,
    variant: "blue" as const,
  },
  {
    title: "Business Outcome",
    text: "By replacing manual cross-referencing with AI-powered intelligence, the system eliminates significant delays and reduces interpretive ambiguity. This transformation ensures higher response quality, strengthens institutional memory, and mitigates compliance risks through proactive, automated document validation.",
    image: outcomeImg,
    variant: "light" as const,
  },
];

export default function CaseStudyDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="csd-page">
      <section className="csd-hero">
        <img
          src={worldMapBackground}
          alt=""
          className="csd-hero__bg"
          aria-hidden="true"
        />
        <div className="csd-hero__content">
          <p className="csd-hero__eyebrow">Case Study</p>
          <h1 className="csd-hero__title">
            RFP Query &amp; Compliance Check Automation
          </h1>
          <p className="csd-hero__subtitle">
            How ElevateTrust.AI helped a large procurement organization automate
            RFP analysis, reduce ambiguous clauses, and deliver consistent,
            high-quality pre-bid responses with AI-powered document intelligence.
          </p>
          <Link to="/contact" className="csd-hero__btn">
            <span>Contact Us</span>
            <span className="csd-hero__btn-circle">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      <div className="page-breadcrumb-wrap">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link
            to="/"
            className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
          >
            Home
          </Link>
          <span className="text-[#848b9b]">»</span>
          <span>Resources</span>
          <span className="text-[#848b9b]">»</span>
          <Link
            to="/case-studies"
            className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
          >
            Case Studies
          </Link>
          <span className="text-[#848b9b]">»</span>
          <span>RFP Query &amp; Compliance Check</span>
        </nav>
      </div>

      <section className="csd-main">
        <div className="csd-main__decor" aria-hidden="true">
          <img
            src={partnerGlobe}
            alt=""
            className="csd-main__decor-globe"
          />
        </div>

        <div className="csd-main__inner">
          <div className="csd-intro">
            <div className="csd-intro__left">
              <h2 className="csd-intro__title">
                RFP Query and Compliance Check automation in the Government &amp;
                procurement industry
              </h2>

              <div className="csd-tech">
                <h3 className="csd-tech__heading">Technology/Tools Used</h3>
                <ul className="csd-tech__list">
                  {techStack.map((tool) => (
                    <li key={tool} className="csd-tech__tag">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="csd-intro__diagram csd-intro__diagram--rfp">
              <img
                src={architectureImg}
                alt="RFP Query and Compliance Check system architecture diagram"
              />
            </div>
          </div>

          <div className="csd-cards">
            {detailCards.map((card) => (
              <article
                key={card.title}
                className={`csd-card csd-card--${card.variant}`}
              >
                <div className="csd-card__content">
                  <h3 className="csd-card__title">{card.title}</h3>
                  <p className="csd-card__text">{card.text}</p>
                </div>
                <img
                  src={card.image}
                  alt=""
                  className="csd-card__illust"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
