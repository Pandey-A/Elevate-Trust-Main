import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import dataAgentIcon from "../assets/OurServices/GenAI-Data.png";
import softwareAgentIcon from "../assets/OurServices/GenAI-Software.png";
import optimizeAgentIcon from "../assets/OurServices/GenAI-Optimize.png";
import customerServiceIcon from "../assets/OurServices/GenAI-customService.png";
import healthcareAgentIcon from "../assets/OurServices/GenAI-healthcare.png";
import hrAgentIcon from "../assets/OurServices/GenAI-HR.png";
import knowledgeAgentIcon from "../assets/OurServices/GenAI-knowledge.png";
import financeAgentIcon from "../assets/OurServices/GenAI-Finance.png";
import roadmapImage from "../assets/OurServices/roadmap-light.png";
import llmAgentsImage from "../assets/OurServices/llm-agents-light.png";
import techStackImage from "../assets/OurServices/techstack-light.png";
import elevateIcon from "../assets/service/AI-process/elevateIcon.svg";
import checkIcon from "../assets/technology-trends/check-icon.svg";
import virtualAgentImage from "../assets/OurServices/virtual-assistant.png";

const coreOfferings = [
  {
    title: "Data analytics agent",
    description:
      "Automate exploratory analysis, reporting, and insight generation so product and data teams move from raw datasets to decisions faster.",
    icon: dataAgentIcon,
  },
  {
    title: "Software development co-pilot",
    description:
      "Accelerate engineering with AI-assisted coding, review, and documentation workflows tailored to your stack and delivery standards.",
    icon: softwareAgentIcon,
  },
  {
    title: "Maintenance optimization agent",
    description:
      "Predict issues, prioritize work orders, and optimize maintenance cycles with agents that learn from operational and sensor data.",
    icon: optimizeAgentIcon,
  },
  {
    title: "Customer service virtual agent",
    description:
      "Deploy agentic support experiences that retrieve knowledge, draft responses, and reduce ticket handling time across channels.",
    icon: customerServiceIcon,
  },
  {
    title: "Healthcare co-pilots",
    description:
      "Assist clinicians and auditors with documentation, summarization, and workflow support while keeping humans in the loop.",
    icon: healthcareAgentIcon,
  },
  {
    title: "HR & Training AI Agents",
    description:
      "Speed onboarding, role-based training, and policy Q&A with conversational agents grounded in your internal knowledge base.",
    icon: hrAgentIcon,
  },
  {
    title: "Knowledge Management AI Agents",
    description:
      "Turn documents, FAQs, and tribal knowledge into searchable, trustworthy answers with retrieval-augmented agent frameworks.",
    icon: knowledgeAgentIcon,
  },
  {
    title: "Financial services AI agents",
    description:
      "Support analysts and operations teams with compliant assistants for research, reporting, and customer-facing workflows.",
    icon: financeAgentIcon,
  },
];

const valueAdded = [
  "Delivered automated data analytics solution using LLM for a data backup & storage company — reducing long product analytics cycles significantly.",
  "Delivered customer support virtual agent solutions by developing a custom agentic framework — enabling faster adoption of agents across new domains.",
  "Delivered on-premise finetuned LLM-based knowledge retrieval bot for a game company — reducing repeated tickets from 40% to 10%.",
  "Delivered sales training voice bot using LLM for an Ed-tech product company — helping sales teams practice complex scenarios and ramp faster.",
];

const consultingPoints = [
  "Use case recognition and feasibility evaluation",
  "Technology assessment and model selection",
  "Solution architecture and AI deployment design",
  "Tailored Gen AI strategy aligned to business goals",
];

const successStories = [
  {
    id: "customer-support",
    label: "Customer Support AI Agent",
    about: [
      "Customer support company providing dialog-flow based bot solutions with human agents.",
      "Building large-scale customer agent platforms to accelerate day-to-day support activities.",
      "Needed a solution to cut response time and reduce ticket closing cycles.",
    ],
    situation: [
      "Agents used numerous tools and information sources to locate the right answers.",
      "High response time driven by slow information discovery.",
      "Heavy manual effort to assemble accurate responses under load.",
    ],
    solution: [
      "Built an agentic generative AI solution for support workflows.",
      "Reduced manual content searching and recommended proven past solutions.",
      "Customizable to organization-specific processes with Kubernetes-based scale.",
    ],
    results: [
      "90% reduction in first response time",
      "50% reduction in final response time",
      "24/7 assistant for L1 teams with ready-to-send draft responses",
    ],
  },
  {
    id: "product-assistant",
    label: "Product Assistant AI Agent",
    about: [
      "EdTech product company serving universities and enterprises.",
      "Focused on accelerating eLearning adoption across large user bases.",
      "Needed to reduce new-product hand-holding and onboarding friction.",
    ],
    situation: [
      "New users required significant guidance to use the product efficiently.",
      "Manual training was expensive and delivered inconsistent experiences.",
      "Large volumes of docs and FAQs made self-serve onboarding difficult.",
    ],
    solution: [
      "Built an agentic generative AI product assistant.",
      "Integrated the knowledge base to answer product questions in real time.",
      "Customized workflows with scalable Kubernetes deployment.",
    ],
    results: [
      "Real-time query resolution without raising tickets",
      "50% reduction in user onboarding time",
      "24/7 assistant that helps users get the best product outcomes",
    ],
  },
  {
    id: "sales-rep",
    label: "Sales Rep AI Agent",
    about: [
      "AI-based LMS company working with large-scale eLearning providers.",
      "Needed to FastTrack new sales rep onboarding and product fluency.",
    ],
    situation: [
      "New sales reps needed 1–2 months to understand products and services.",
      "Information discovery during customer calls was slow and manual.",
      "Heavy dependency on Product/Tech teams for accurate answers.",
    ],
    solution: [
      "Built an agentic generative AI sales assistant.",
      "Enabled instant retrieval of relevant data points during live calls.",
      "Reduced dependency on Product/Tech while scaling on Kubernetes.",
    ],
    results: [
      "80% reduction in sales rep ramp-up time",
      "98% reduction in information access time",
      "50% reduction in Tech/Product hours on sales calls",
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare AI Agent",
    about: [
      "Healthtech company serving hospitals and auditor authorities.",
      "Needed better audit report creation to cut documentation effort by ~80%.",
    ],
    situation: [
      "Existing Gen AI + RAG prototypes had accuracy limitations.",
      "Manual human reviews still added substantial effort.",
      "Hard to build trust around fully automated documentation.",
    ],
    solution: [
      "Built an agentic generative AI solution with human-in-the-loop controls.",
      "Reduced manual evaluation while enabling final human submission.",
      "Custom workflows with feedback-loop learning and Kubernetes scale.",
    ],
    results: [
      "Significant reduction in manual review effort",
      "Improved platform engagement and trust in automation",
      "Personalized auditor support via continuous feedback learning",
    ],
  },
] as const;

export default function GenerativeAI() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      {/* Hero */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden bg-[#113d77]"
        style={{ minHeight: "clamp(280px, 32vw, 492px)" }}
        aria-label="Generative AI"
      >
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[58%] w-[min(94%,1600px)] -translate-x-1/2 -translate-y-1/2 opacity-55"
        />
        <div className="relative z-10 flex max-w-[min(860px,92%)] flex-col items-center px-5 pb-[clamp(48px,6vw,80px)] pt-[clamp(72px,8vw,120px)] text-center">
          <h1 className="m-0 text-[clamp(28px,3.8vw,48px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
            Innovative Generative AI Solutions for Business Transformation
          </h1>
          <p className="mt-[clamp(16px,2vw,24px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            From TF-IDF and word2vec to transformers, early LLMs like BERT and T5,
            and today&apos;s GPT, Gemini, Ollama, and agentic flows — we have
            delivered value from fine-tuned on-premise NER models to a generic
            agentic framework for state-of-the-art implementations.
          </p>
          <Link
            to="/contact"
            className="mt-[clamp(24px,3vw,40px)] inline-flex items-center gap-1.5 rounded-full bg-[#2365aa] py-3 pl-[26px] pr-3.5 text-base font-normal uppercase leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490] lg:py-2.5 lg:pl-[22px] lg:pr-2.5 lg:text-sm 2xl:py-3 2xl:pl-[26px] 2xl:pr-3.5 2xl:text-base"
          >
            Contact Us
            <span className="inline-flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white text-[#2365aa]">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </section>

      {/* Breadcrumbs + Core Offerings */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1692px] px-5 pb-[clamp(48px,6vw,80px)] pt-3 sm:px-8 lg:px-10 xl:px-12">
          <nav
            className="mb-[clamp(28px,3vw,48px)] flex flex-wrap items-center gap-2.5 pt-[clamp(20px,2.5vw,36px)] text-[clamp(13px,1.2vw,18px)] font-normal leading-[1.2] text-[#272935]"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
            >
              Home
            </Link>
            <span className="text-[#848b9b]">»</span>
            <Link
              to="/Services/ai-ml"
              className="text-inherit no-underline transition-colors hover:text-[#2365aa]"
            >
              Our Services
            </Link>
            <span className="text-[#848b9b]">»</span>
            <span>Generative AI</span>
          </nav>

          <header className="mx-auto mb-[clamp(32px,4vw,56px)] max-w-[52rem] text-center">
            <h2 className="m-0 text-[clamp(28px,4vw,56px)] font-bold leading-[1.15] text-[#1F2432]">
              Generative AI
              <br />
              Core Offerings
            </h2>
            <p className="mx-auto mt-5 max-w-[42rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] sm:mt-6">
              Purpose-built agents and copilots that turn Gen AI into measurable
              business outcomes — across analytics, engineering, support,
              healthcare, HR, knowledge, and financial services.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-6 xl:gap-8">
            {coreOfferings.map((item) => (
              <article key={item.title} className="flex min-w-0 flex-col">
                <img
                  src={item.icon}
                  alt=""
                  className="mb-5 h-auto w-full rounded-[20px] object-cover sm:mb-6"
                  aria-hidden
                />
                <h3 className="text-[clamp(16px,1.3vw,20px)] font-bold leading-snug text-[#1F2432]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[clamp(12px,1.1vw,14px)] leading-6 text-[#9CA3AF] sm:mt-4">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting + Roadmap */}
      <section className="w-full bg-[#EFF7FC]">
        <div className="mx-auto grid w-full max-w-[1692px] grid-cols-1 items-center gap-[clamp(28px,4vw,56px)] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-10 xl:px-12">
          <div>
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Gen AI &amp; LLM Consulting and Solution Architectures
            </h2>
            <p className="mt-5 max-w-[40rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#848b9b] sm:mt-6">
              Expertise in Gen AI strategy and consulting — including use case
              recognition, feasibility evaluation, technology assessment, technical
              architecting, and AI deployment tailored to your goals and challenges.
            </p>
            <ul className="mt-6 flex list-none flex-col gap-3.5 p-0 sm:mt-8">
              {consultingPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[clamp(14px,1.2vw,18px)] font-medium leading-[1.5] text-[#5a5a5a]"
                >
                  <img
                    src={checkIcon}
                    alt=""
                    aria-hidden
                    className="mt-[0.4em] h-3 w-3 shrink-0"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-white p-4 shadow-[0_18px_50px_-24px_rgba(17,61,119,0.35)] sm:rounded-[24px] sm:p-6 lg:p-7">
            <img
              src={roadmapImage}
              alt="Generative AI roadmap from classical NLP to agentic systems"
              className="mx-auto block h-auto w-full max-w-[520px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* Value Added */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,72px)] sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-start gap-[clamp(28px,4vw,64px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                Value Added
              </h2>
              <p className="mt-4 max-w-[28rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF]">
                Proven Gen AI deliveries across analytics, support, knowledge
                retrieval, and sales enablement.
              </p>
              <div className="mt-8 hidden justify-center lg:mt-12 lg:flex">
                <img
                  src={virtualAgentImage}
                  alt=""
                  aria-hidden
                  className="h-auto w-full max-w-[220px] object-contain"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {valueAdded.map((item, index) => (
                <article
                  key={item}
                  className="relative flex min-h-[160px] flex-col overflow-hidden rounded-[20px] border border-[#e8eef3] bg-[#EFF7FC] p-5 sm:min-h-[180px] sm:p-6"
                >
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2365aa] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="m-0 text-[clamp(13px,1.15vw,15px)] leading-6 text-[#5a5a5a]">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agent Framework + Success Stories */}
      <section
        className="rounded-[20px] bg-[#f4f7f9] py-[clamp(40px,5vw,72px)] max-sm:rounded-none"
        aria-label="AI Agents success stories"
      >
        <div className="mx-auto w-full max-w-[1692px] px-5 sm:px-8 lg:px-10 xl:px-12">
          <div className="mb-[clamp(28px,3.5vw,48px)] grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
            <div>
              <h2 className="m-0 text-[clamp(24px,3.2vw,40px)] font-bold leading-[1.15] text-[#1F2432]">
                AI Agent Generalize Framework to Build &amp; Launch in Minutes
              </h2>
              <p className="mt-4 max-w-[36rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#848b9b]">
                A reusable agentic framework that connects LLMs, tools, knowledge
                bases, and human-in-the-loop controls — so you can adapt agents to
                new domains faster without rebuilding from scratch.
              </p>
            </div>
            <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-white p-4 shadow-[0_18px_50px_-24px_rgba(17,61,119,0.35)] sm:p-6">
              <img
                src={llmAgentsImage}
                alt="LLM Agents architecture connecting tools, knowledge base, and human in the loop"
                className="mx-auto block h-auto w-full max-w-[720px] object-contain"
              />
            </div>
          </div>

          <div className="mb-[clamp(24px,3vw,40px)] max-w-[760px]">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#2365aa]">
              Success Stories
            </p>
            <h3 className="m-0 text-[clamp(24px,3vw,40px)] font-bold leading-[1.15] text-[#272935]">
              AI agents delivering measurable business impact
            </h3>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">
            {successStories.map((story, storyIndex) => (
              <article
                key={story.id}
                className="overflow-hidden rounded-[24px] border border-[#e0e9f1] bg-white shadow-[0_16px_50px_-34px_rgba(17,61,119,0.45)]"
              >
                <div className="grid lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,2fr)]">
                  <header className="relative overflow-hidden bg-[#113d77] p-6 text-white sm:p-8 lg:min-h-full lg:p-9">
                    <span className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full border-[28px] border-white/[0.06]" />
                    <span className="relative mb-8 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-[#113d77]">
                      {String(storyIndex + 1).padStart(2, "0")}
                    </span>
                    <h4 className="relative m-0 max-w-[260px] text-[clamp(21px,2vw,30px)] font-bold leading-[1.2]">
                      {story.label}
                    </h4>
                    <p className="relative mt-4 text-sm leading-6 text-white/65">
                      From operational friction to a scalable, production-ready
                      agentic solution.
                    </p>
                  </header>

                  <div className="p-5 sm:p-7 lg:p-9">
                    <div className="grid gap-7 md:grid-cols-3 md:gap-6">
                      {(
                        [
                          ["Customer", story.about],
                          ["Challenge", story.situation],
                          ["Our Solution", story.solution],
                        ] as const
                      ).map(([title, items], sectionIndex) => (
                        <section
                          key={title}
                          className="relative md:border-l md:border-[#e4ebf1] md:pl-6 first:md:border-l-0 first:md:pl-0"
                        >
                          <div className="mb-4 flex items-center gap-3">
                            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eaf3fa] text-xs font-bold text-[#2365aa]">
                              {sectionIndex + 1}
                            </span>
                            <h5 className="m-0 text-sm font-bold uppercase tracking-[0.08em] text-[#272935]">
                              {title}
                            </h5>
                          </div>
                          <ul className="m-0 flex list-none flex-col gap-3 p-0">
                            {items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-[clamp(12px,1vw,14px)] leading-[1.55] text-[#687181]"
                              >
                                <img
                                  src={elevateIcon}
                                  alt=""
                                  aria-hidden
                                  className="mt-[7px] h-2 w-2 shrink-0 object-contain"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>

                    <div className="mt-7 border-t border-[#e4ebf1] pt-6">
                      <p className="mb-4 text-sm font-bold uppercase tracking-[0.08em] text-[#2365aa]">
                        Business outcomes
                      </p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {story.results.map((result) => (
                          <div
                            key={result}
                            className="flex min-h-[76px] items-center rounded-[14px] bg-[#EFF7FC] px-4 py-3 text-[clamp(12px,1vw,14px)] font-semibold leading-[1.45] text-[#27384f]"
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,80px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(24px,3vw,40px)] max-w-[48rem] text-center">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Generative AI Technology Stack
            </h2>
            <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF]">
              Cloud platforms, LLM ecosystems, and agent frameworks we use to design,
              deploy, and scale production-ready Gen AI solutions.
            </p>
          </header>

          <div className="overflow-hidden rounded-[20px] border border-[#e2ebf3] bg-white p-5 shadow-[0_20px_60px_-28px_rgba(17,61,119,0.35)] sm:rounded-[24px] sm:p-8 lg:p-10">
            <img
              src={techStackImage}
              alt="Generative AI technology stack across cloud providers and agent frameworks"
              className="mx-auto block h-auto w-full max-w-[980px] object-contain"
            />
          </div>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
