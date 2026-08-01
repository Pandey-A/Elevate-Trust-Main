import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import architectureImg from "../assets/case-studies/cs-predictive-3.png";
import clientBgImg from "../assets/case-studies/rfp/rfp-client-bg.png";
import challengeImg from "../assets/case-studies/rfp/rfp-challenge.png";
import solutionImg from "../assets/case-studies/rfp/rfp-solution.png";
import outcomeImg from "../assets/case-studies/rfp/rfp-outcome.png";
import "./CaseStudyDetail.css";

const techStack = [
  "CNN",
  "Video Analytics",
  "Samsara API",
  "Computer Vision",
  "Python",
  "AI ML",
];

const detailCards = [
  {
    title: "Client Background",
    text: "The client is a prominent transportation and logistics provider operating a high-volume taxi and fleet service across the US. They specialize in processing large-scale, real-time unstructured data, including image and video feeds, to maintain operational integrity and safety across their entire vehicle network.",
    image: clientBgImg,
    variant: "light" as const,
  },
  {
    title: "Business Challenge",
    text: "A major challenge for the company was high flagging incidents, where drivers would accept direct cash payments without engaging the taxi meter, leading to significant revenue leakage. Identifying these illicit behaviours manually from hours of video recordings was time-consuming, inefficient, and prone to human bias, creating an urgent need for an automated, scalable detection solution.",
    image: challengeImg,
    variant: "blue" as const,
  },
  {
    title: "Solution Overview",
    text: "The solution involves a real-time illicit behaviour detection system powered by CNN models and integrated via the Samsara API to analyse video feeds for meter-bypass events. It features a comprehensive dashboard where management can track high-flagging incidents by driver, trip location, and frequency. This human-in-the-loop framework allows for streamlined auditing, while an AI matching engine continuously refines its detection accuracy based on feedback from verified cases.",
    image: solutionImg,
    variant: "blue" as const,
  },
  {
    title: "Business Outcome",
    text: "Implementation of the AI video analytics system reduced manual auditing efforts by 90%, enabling the extraction of critical cases from massive image and video datasets with high speed. The models are robust enough to handle complex scenarios such as varying light and low image quality. Furthermore, the client successfully commercialised the solution by offering this high-flagging detection technology to other taxi services.",
    image: outcomeImg,
    variant: "light" as const,
  },
];

export default function IllicitBehaviourCaseStudy() {
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
            Illicit Behaviour Detection using Video Analytics
          </h1>
          <p className="csd-hero__subtitle">
            How ElevateTrust.AI helped a US transportation provider detect
            meter-bypass events, cut manual auditing by 90%, and commercialise
            high-flagging detection for other taxi fleets.
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
          <span>Illicit Behaviour Detection</span>
        </nav>
      </div>

      <section className="csd-main">
        <div className="csd-main__decor" aria-hidden="true">
          <img src={partnerGlobe} alt="" className="csd-main__decor-globe" />
        </div>

        <div className="csd-main__inner">
          <div className="csd-intro">
            <div className="csd-intro__left">
              <h2 className="csd-intro__title">
                Illicit behaviour detection using Video analytics in the
                transport industry
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

            <div className="csd-intro__diagram">
              <img
                src={architectureImg}
                alt="Video analytics upload UI, in-cabin high-flagging detection, and vehicle damage detection outputs"
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
