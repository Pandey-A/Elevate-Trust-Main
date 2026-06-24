import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import landscape1 from "../assets/homepage-icons/landscape-1.svg";
import landscape2 from "../assets/homepage-icons/landscape-2.png";
import landscape3 from "../assets/homepage-icons/landscape-3.svg";
import landscape4 from "../assets/homepage-icons/landscape-4.svg";
import partnerGlobe from "../assets/homepage-icons/partner-globe.png";
import storiesVector from "../assets/homepage-icons/stories-vector.png";

import "./LatestWorks.css";

interface WorkItem {
  num: string;
  title: string;
  currentSituation: string;
  techs: string[];
  solution: string;
  results: string;
  image: string;
}

const works: WorkItem[] = [
  {
    num: "/ 001",
    title: "Recommendation/Matching",
    currentSituation: "HR teams often review large numbers of resumes, making the hiring process time-consuming and prone to human errors. An efficient and unbiased recruitment system helps streamline candidate selection and improve hiring accuracy.",
    techs: ["Figma", "AI ML", "Generative AI", "Python", "Grok", "Open AI"],
    solution: "The AI matching engine recommends candidates based on matching scores, processes multiple talent pools efficiently, and improves accuracy through customizable and feedback-driven learning.",
    results: "The AI-powered recruitment system reduces manual hiring efforts, understands skills across multiple industries, minimizes biased hiring, and scales efficiently to support business growth and increased revenue.",
    image: landscape2,
  },
  {
    num: "/ 002",
    title: "Customer Support AI Agent",
    currentSituation: "Customer service departments face high ticket volumes and long response times, resulting in user frustration and elevated operational overhead during peak customer traffic hours.",
    techs: ["Node.js", "Python", "LLMs", "LangChain", "React", "WebSocket"],
    solution: "We deployed an autonomous support agent ecosystem that resolves general customer queries, routes tickets intelligently, and escalates complex queries to human agents.",
    results: "Resulted in a 70% automated resolution rate, decreased wait times to under 10 seconds, and improved customer satisfaction scores by 35%.",
    image: landscape3,
  },
  {
    num: "/ 003",
    title: "Real Time Video Analytics",
    currentSituation: "Manual monitoring of video footage is resource-intensive and prone to fatigue, which often leads to delayed incident detection and high response latency.",
    techs: ["PyTorch", "OpenCV", "C++", "AWS", "Docker", "Kubernetes"],
    solution: "Implemented an edge-based computer vision architecture that processes video feeds in real-time, detecting anomalies and generating instant notifications.",
    results: "Enabled proactive event response with 99.2% accuracy, reducing manual oversight workloads by 80% and security response latency.",
    image: landscape1,
  },
  {
    num: "/ 004",
    title: "Contract Management",
    currentSituation: "Legal and procurement operations struggle with manual review of thousands of complex documents, which poses high compliance risks and misses renewal cycles.",
    techs: ["Python", "OCR", "BERT", "FastAPI", "PostgreSQL", "AWS Textract"],
    solution: "An automated document parsing engine that extracts metadata, highlights compliance risks, identifies key clauses, and schedules critical notifications.",
    results: "Cut contract review timelines by 75%, mitigated all missing renewal events, and achieved a 98% metadata extraction rate.",
    image: landscape4,
  },
  {
    num: "/ 005",
    title: "Ed Tech",
    currentSituation: "Standard digital classrooms suffer from lack of personalized guidance, leading to low student engagement, poor completion rates, and varied learning outcomes.",
    techs: ["React", "Next.js", "FastAPI", "Python", "PyTorch", "OpenAI API"],
    solution: "Built a customized adaptive recommendation pipeline that evaluates learner activity in real-time, matching curriculum pace and custom assessments.",
    results: "Increased student course completion rates by 45%, elevated assessment performance by 20%, and raised daily platform retention.",
    image: landscape3,
  },
];

export default function LatestWorks() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="latest-works" aria-label="Latest Works">
      {/* ── Background Decors ── */}
      <img
        src={partnerGlobe}
        alt=""
        aria-hidden
        className="latest-works__decor-globe"
      />
      <img
        src={storiesVector}
        alt=""
        aria-hidden
        className="latest-works__decor-vector"
      />

      <div className="latest-works__container">
        {/* ── Heading Area ── */}
        <div className="latest-works__header">
          <p className="latest-works__subtitle">
            OUR CREATIVE <span className="latest-works__subtitle-highlight">JOURNEY</span>
          </p>
          <h2 className="latest-works__title">Latest Works</h2>
          
          <div className="latest-works__btn-wrapper">
            <a href="#" className="latest-works__btn">
              <span>View all case studies</span>
              <span className="latest-works__btn-icon">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </a>
          </div>
        </div>

        {/* ── Accordion List ── */}
        <div className="latest-works__accordion">
          {works.map((work, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={`work-${index}`}
                className={`latest-works__item ${isOpen ? "latest-works__item--open" : ""}`}
              >
                {/* ── Trigger Header ── */}
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="latest-works__trigger"
                  aria-expanded={isOpen}
                >
                  <span className="latest-works__trigger-num">{work.num}</span>
                  <span className="latest-works__trigger-line" />
                  <span className="latest-works__trigger-title">{work.title}</span>
                  <span className="latest-works__trigger-chevron">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {/* ── Collapsible Body ── */}
                <div className="latest-works__body-wrapper">
                  <div className="latest-works__body">
                    <div className="latest-works__grid">
                      {/* Top Row: Current Situation (Left) & Tech Section (Right) */}
                      <div className="latest-works__col-left-top">
                        <div className="latest-works__card latest-works__card--white">
                          <h4 className="latest-works__card-label text-[#272935]">
                            Current Situation
                          </h4>
                          <p className="latest-works__card-desc text-[#272935]/85">
                            {work.currentSituation}
                          </p>
                        </div>
                      </div>

                      <div className="latest-works__col-right-top">
                        <div className="latest-works__tech-section">
                          <h4 className="latest-works__tech-heading">
                            Technology/Tools Used
                          </h4>
                          <div className="latest-works__tech-tags">
                            {work.techs.map((tech, tIdx) => (
                              <span key={tIdx} className="latest-works__tech-pill">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: Illustration (Left) & Solutions + Results (Right) */}
                      <div className="latest-works__col-left-bottom">
                        <div className="latest-works__illustration-container">
                          <img
                            src={work.image}
                            alt=""
                            aria-hidden
                            className="latest-works__illustration"
                            draggable={false}
                          />
                        </div>
                      </div>

                      <div className="latest-works__col-solution">
                        <div className="latest-works__card latest-works__card--blue-glass">
                          <h4 className="latest-works__card-label text-white">
                            Solution for Situation
                          </h4>
                          <p className="latest-works__card-desc text-white/80">
                            {work.solution}
                          </p>
                        </div>
                      </div>

                      <div className="latest-works__col-results">
                        <div className="latest-works__card latest-works__card--blue-glass">
                          <h4 className="latest-works__card-label text-white">
                            Results
                          </h4>
                          <p className="latest-works__card-desc text-white/80">
                            {work.results}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
