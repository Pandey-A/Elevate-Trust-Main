import { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import machineLearningIcon from "../assets/OurServices/machine-learning.png";
import cloudComputIcon from "../assets/OurServices/cloud-comput.png";
import agileImage from "../assets/OurServices/agile-light.svg";
import trainingIllustration from "../assets/OurServices/GenAI-Data.png";
import versionIllustration from "../assets/OurServices/GenAI-Software.svg";
import buildIllustration from "../assets/OurServices/GenAI-Optimize.svg";
import stagingIllustration from "../assets/OurServices/Audio-deployment.png";
import cloudIllustration from "../assets/OurServices/GenAI-customService.svg";
import onPremIllustration from "../assets/OurServices/Audio-simple.png";
import monitoringIllustration from "../assets/OurServices/Audio-Insights.png";
import checkIcon from "../assets/technology-trends/check-icon.svg";
import awsLogo from "../assets/OurServices/aws-logo.png";
import azureLogo from "../assets/OurServices/azur.png";
import gCloudLogo from "../assets/OurServices/g-cloud.png";
import mlflowLogo from "../assets/OurServices/mlflow.png";
import azureMlLogo from "../assets/OurServices/azureml.png";
import kuberLogo from "../assets/OurServices/kuber.png";
import airflowLogo from "../assets/OurServices/airflow.png";
import openAiLogo from "../assets/OurServices/open-ai.png";
import langsmithLogo from "../assets/OurServices/langsmith.png";
import galelioLogo from "../assets/OurServices/galelio.png";
import promptflowLogo from "../assets/OurServices/promotflow.png";

const mlOpsPoints = [
  "Efficient model development with experiment tracking and reproducible training",
  "Continuous integration and seamless deployment pipelines across environments",
  "Docker containerization for portable, consistent model packaging",
  "Kubernetes orchestration for elastic scaling in cloud and on-premise clusters",
  "Optimization, cost-effectiveness, scalability, and superior security by design",
];

const pipelineStages = [
  {
    title: "Model Training & Tracking",
    illustration: trainingIllustration,
    description:
      "Run experiments, capture metrics, and keep every training run comparable. Teams promote only models that prove quality before they move downstream.",
    tools: ["MLflow", "PyTorch", "TensorFlow"],
  },
  {
    title: "Version Control",
    illustration: versionIllustration,
    description:
      "Version code, data, and model artifacts together so rollbacks stay safe. Collaboration stays auditable across engineering and ML teams.",
    tools: ["GitHub", "DVC", "Bitbucket"],
  },
  {
    title: "Build",
    illustration: buildIllustration,
    description:
      "Package models as portable services with containers and APIs. Builds stay consistent from local machines to cluster-ready images.",
    tools: ["Docker", "FastAPI", "Kubernetes"],
  },
  {
    title: "Deploy to Staging",
    illustration: stagingIllustration,
    description:
      "Automate promotion into staging with IaC and CI checks. Validate latency, security, and integration before any production cutover.",
    tools: ["Jenkins", "GitHub", "Terraform"],
  },
  {
    title: "Cloud Deployment",
    illustration: cloudIllustration,
    description:
      "Land workloads on AWS, Azure, or Google Cloud with elastic scale. Cost, availability, and regional controls stay built into the release path.",
    tools: ["AWS", "Azure", "Google Cloud"],
  },
  {
    title: "On-Premise Deployment",
    illustration: onPremIllustration,
    description:
      "Ship hardened, containerized packages into your datacenter. Meet residency and compliance needs without changing the delivery model.",
    tools: ["Docker", "Obfuscating"],
  },
  {
    title: "Monitoring",
    illustration: monitoringIllustration,
    description:
      "Watch drift, latency, and reliability after go-live. Feedback loops keep models trustworthy as traffic and data patterns change.",
    tools: ["Prometheus + Grafana", "Evidently AI"],
  },
];

const cloudStack = [
  {
    name: "OpenAI",
    logo: openAiLogo,
    blurb:
      "Foundation models and APIs for generative workloads in production.",
    points: [
      "Used for copilots, summarization, and retrieval-augmented assistants",
      "Integrated with guardrails, evaluation, and human-in-the-loop review",
      "Deployed behind secure APIs with usage monitoring and cost controls",
    ],
  },
  {
    name: "Google Cloud",
    logo: gCloudLogo,
    blurb:
      "Scalable cloud infrastructure and managed AI services worldwide.",
    points: [
      "Supports multi-region model serving and data residency requirements",
      "Pairs well with Vertex AI and containerized inference workloads",
      "Used for high-availability pipelines with managed networking and IAM",
    ],
  },
  {
    name: "Amazon Web Services",
    logo: awsLogo,
    blurb:
      "Elastic compute, storage, and ML services for enterprise delivery.",
    points: [
      "Hosts training jobs, model registries, and production inference fleets",
      "Enables auto-scaling endpoints with observability and cost tracking",
      "Fits hybrid patterns that connect on-premise systems to cloud services",
    ],
  },
  {
    name: "Azure",
    logo: azureLogo,
    blurb:
      "Enterprise-ready cloud with strong identity and hybrid support.",
    points: [
      "Ideal for regulated environments needing Azure AD and policy controls",
      "Supports hybrid connectivity for on-premise model packages",
      "Used for secure landing zones and governed ML deployments",
    ],
  },
  {
    name: "Kubernetes",
    logo: kuberLogo,
    blurb:
      "Orchestration layer that scales model services across clusters.",
    points: [
      "Standard runtime for containerized model APIs and workers",
      "Enables blue/green and canary releases across cloud or on-prem",
      "Keeps staging and production environments operationally consistent",
    ],
  },
  {
    name: "Azure Machine Learning",
    logo: azureMlLogo,
    blurb:
      "End-to-end ML workspace for training, registry, and deployment.",
    points: [
      "Central place for experiments, datasets, and registered models",
      "Supports managed endpoints and CI/CD promotion into staging",
      "Helps teams standardize MLOps practices across Azure estates",
    ],
  },
];

const aiOpsStack = [
  {
    name: "MLflow",
    logo: mlflowLogo,
    blurb:
      "Experiment tracking and model registry for reproducible MLOps.",
    points: [
      "Captures parameters, metrics, and artifacts for every training run",
      "Makes model promotion auditable from lab to staging",
      "Pairs with CI pipelines so only approved versions ship",
    ],
  },
  {
    name: "Galileo",
    logo: galelioLogo,
    blurb:
      "Evaluation and observability for LLM quality in production.",
    points: [
      "Surfaces hallucination, latency, and quality regressions early",
      "Supports continuous evaluation loops for GenAI applications",
      "Helps teams trust LLM outputs before broad user rollout",
    ],
  },
  {
    name: "LangSmith",
    logo: langsmithLogo,
    blurb:
      "Tracing and debugging for agentic and RAG pipelines.",
    points: [
      "Gives visibility into prompts, tools, and retrieval steps",
      "Speeds debugging when agent workflows fail in staging",
      "Supports iteration on chain quality without guesswork",
    ],
  },
  {
    name: "Apache Airflow",
    logo: airflowLogo,
    blurb:
      "Workflow orchestration for scheduled training and data jobs.",
    points: [
      "Coordinates ETL, feature prep, and retraining schedules",
      "Keeps long-running ML jobs resilient with retries and alerts",
      "Connects data pipelines to deployment and monitoring stages",
    ],
  },
  {
    name: "Prompt Flow",
    logo: promptflowLogo,
    blurb:
      "Prompt engineering and evaluation flows for GenAI apps.",
    points: [
      "Structures prompt variants and evaluation datasets clearly",
      "Helps compare response quality before production release",
      "Fits Azure-centric GenAI delivery with repeatable flows",
    ],
  },
];

const stackTabs = [
  {
    id: "cloud" as const,
    label: "Cloud",
    icon: cloudComputIcon,
    summary:
      "Platforms we use to host, scale, and secure AI/ML systems across regions.",
    items: cloudStack,
  },
  {
    id: "aiops" as const,
    label: "AI Ops",
    icon: machineLearningIcon,
    summary:
      "Tooling that tracks experiments, orchestrates pipelines, and keeps models reliable.",
    items: aiOpsStack,
  },
];

const STAGE_AUTO_MS = 3000;
const TOOL_AUTO_MS = 2500;

export default function CloudOnPremiseDeployment() {
  const [activeStage, setActiveStage] = useState(0);
  const [panelReady, setPanelReady] = useState(true);
  const [stagePaused, setStagePaused] = useState(false);
  const [stackTab, setStackTab] = useState<"cloud" | "aiops">("cloud");
  const [activeTool, setActiveTool] = useState(0);
  const [stackReady, setStackReady] = useState(true);
  const [toolPaused, setToolPaused] = useState(false);
  const tablistRef = useRef<HTMLDivElement>(null);

  const stage = pipelineStages[activeStage];
  const stageCount = pipelineStages.length;
  const segmentPercent = 100 / (stageCount - 1);
  const completedPercent = (activeStage / (stageCount - 1)) * 100;
  // const staticProgress = ((activeStage + 1) / stageCount) * 100;
  const segmentAnimKey = `${activeStage}-${stagePaused ? "paused" : "running"}`;
  const activeStack = stackTabs.find((tab) => tab.id === stackTab) ?? stackTabs[0];
  const selectedTool = activeStack.items[activeTool] ?? activeStack.items[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (tablistRef.current) {
      const activeBtn = tablistRef.current.querySelector('[aria-selected="true"]') as HTMLElement;
      if (activeBtn) {
        const container = tablistRef.current;
        const scrollLeft = activeBtn.offsetLeft - (container.offsetWidth / 2) + (activeBtn.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeStage]);

  const selectStage = (index: number) => {
    if (index === activeStage) return;
    setPanelReady(false);
    window.setTimeout(() => {
      setActiveStage(index);
      setPanelReady(true);
    }, 160);
  };

  const advanceStage = useCallback(() => {
    setPanelReady(false);
    window.setTimeout(() => {
      setActiveStage((current) =>
        current >= pipelineStages.length - 1 ? 0 : current + 1,
      );
      setPanelReady(true);
    }, 160);
  }, []);

  useEffect(() => {
    if (stagePaused) return;

    const id = window.setInterval(advanceStage, STAGE_AUTO_MS);
    return () => window.clearInterval(id);
  }, [activeStage, stagePaused, advanceStage]);

  useEffect(() => {
    if (toolPaused) return;
    const items = activeStack.items;
    const id = window.setInterval(() => {
      setActiveTool((current) => (current >= items.length - 1 ? 0 : current + 1));
    }, TOOL_AUTO_MS);
    return () => window.clearInterval(id);
  }, [activeTool, stackTab, toolPaused, activeStack.items]);

  const selectStackTab = (id: "cloud" | "aiops") => {
    if (id === stackTab) return;
    setStackReady(false);
    window.setTimeout(() => {
      setStackTab(id);
      setActiveTool(0);
      setStackReady(true);
    }, 160);
  };

  return (
    <div className="bg-white font-['Lay_Grotesk_Trial',sans-serif] text-[#272935]">
      {/* Hero */}
      <section className="service-page-hero" aria-label="Cloud and On-Premise Deployment">
        <img
          src={worldMapBackground}
          alt=""
          aria-hidden
          className="service-page-hero__map"
        />
        <div className="service-page-hero__content max-w-[min(900px,92%)]">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#8eb4df] 2xl:text-base">
            Our Services
          </p>
          <h1 className="m-0 text-[clamp(26px,3.6vw,46px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(24px,2.8vw,34px)] 2xl:text-[clamp(30px,3.8vw,46px)]">
            Comprehensive AI/ML Deployment Solutions for Cloud and On-Premise
          </h1>
          <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
            We offer a wide range of solutions for scaling and deploying AI/ML
            technologies in both cloud and on-premise settings, customized to fit
            diverse business needs. Our deployment services ensure optimization,
            cost-effectiveness, scalability, and superior security.
          </p>
          <Link
            to="/contact"
            className="mt-[clamp(16px,2vw,28px)] inline-flex items-center gap-1.5 rounded-full bg-[#2365aa] py-3 pl-[26px] pr-3.5 text-base font-normal uppercase leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490] lg:py-2.5 lg:pl-[22px] lg:pr-2.5 lg:text-sm 2xl:py-3 2xl:pl-[26px] 2xl:pr-3.5 2xl:text-base"
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
        <div className="page-breadcrumb-wrap">
          <nav className="page-breadcrumb" aria-label="Breadcrumb">
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
            <span>Cloud/On-Premise Deployment</span>
          </nav>
        </div>

        <div className="mx-auto w-full max-w-[1692px] px-5 pb-[clamp(48px,6vw,80px)] pt-0 sm:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="overflow-hidden rounded-[20px] sm:rounded-[24px]">
              <img
                src={agileImage}
                alt="Agile cloud and on-premise deployment collaboration"
                className="block h-auto w-full object-contain"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#2365aa] 2xl:text-base">
                Core Offerings
              </p>
              <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
                AI/ML Ops
              </h2>
              <p className="mt-5 max-w-[46rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#848b9b] sm:mt-6 2xl:text-[18px] 2xl:leading-8">
                We specialize in implementing AI/ML operations practices that
                deliver scalable and automated solutions, emphasizing efficient
                model development, continuous integration, and seamless deployment
                pipelines. Our use of Docker for containerization and Kubernetes
                for orchestration ensures that machine learning models are easily
                deployable and can scale effectively across different environments.
              </p>
              <ul className="mt-6 flex list-none flex-col gap-3.5 p-0 sm:mt-8">
                {mlOpsPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[clamp(14px,1.2vw,18px)] font-medium leading-[1.5] text-[#5a5a5a] 2xl:text-[20px]"
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
          </div>
        </div>
      </section>

      {/* Interactive blue pipeline stepper */}
      <section
        className="w-full bg-[#EFF7FC]"
        aria-label="AI/ML deployment pipeline"
      >
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,80px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(28px,3.5vw,48px)] max-w-[52rem] text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#2365aa] 2xl:text-base">
              End-to-end lifecycle
            </p>
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              AI/ML Deployment Pipeline
            </h2>
            <p className="mx-auto mt-4 max-w-[46rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#848b9b] 2xl:text-[18px] 2xl:leading-8">
              A continuous operating model that takes models from experiment to
              production, covering training, versioning, packaging, staging,
              cloud or on-premise release, and ongoing monitoring.
            </p>
          </header>

          {/* Clickable stage rail */}
          <div className="mx-auto mb-8 max-w-[1100px] sm:mb-10">
            <div className="relative px-1 pt-2">
              <div className="absolute z-0 left-[6%] right-[6%] top-[30px] h-[3px] overflow-hidden rounded-full bg-[#d7e6f3] sm:top-[34px]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#2365aa]"
                  style={{ width: `${completedPercent}%` }}
                />
                {activeStage < stageCount - 1 && (
                  <div
                    key={segmentAnimKey}
                    className={`pipeline-stage-advance-forced absolute inset-y-0 origin-left rounded-full bg-[#2365aa] ${stagePaused ? "pipeline-stage-advance--paused" : ""
                      }`}
                    style={{
                      left: `${completedPercent}%`,
                      width: `${segmentPercent}%`,
                      ["--stage-duration" as string]: `${STAGE_AUTO_MS}ms`,
                    }}
                  />
                )}
              </div>

              <div
                ref={tablistRef}
                className="relative z-20 flex justify-between gap-1 overflow-x-auto pb-4 pt-2 px-2 scroll-smooth scrollbar-none"
                role="tablist"
                aria-label="Pipeline stages"
              >
                {pipelineStages.map((item, index) => {
                  const isActive = index === activeStage;
                  const isDone = index < activeStage;
                  const step = String(index + 1).padStart(2, "0");

                  return (
                    <button
                      key={item.title}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="pipeline-stage-panel"
                      onClick={() => selectStage(index)}
                      className="group flex min-w-[64px] flex-1 cursor-pointer flex-col items-center border-0 bg-transparent p-0 outline-none"
                    >
                      <span
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 sm:h-12 sm:w-12 sm:text-sm ${isActive
                            ? "scale-[1.05] bg-[#113d77] text-white shadow-[0_8px_18px_-12px_rgba(17,61,119,0.7)]"
                            : isDone
                              ? "bg-[#2365aa] text-white"
                              : "bg-white text-[#2365aa] ring-2 ring-[#c5d8eb] group-hover:ring-[#2365aa]"
                          }`}
                      >
                        {isActive && (
                          <span
                            className="pipeline-step-pulse-forced pointer-events-none absolute inset-0 rounded-full"
                            aria-hidden
                          />
                        )}
                        {step}
                      </span>
                      <span
                        className={`mt-2 max-w-[7.5rem] text-center text-[10px] font-semibold leading-snug transition-colors sm:text-[11px] lg:text-xs ${isActive ? "text-[#113d77]" : "text-[#848b9b] group-hover:text-[#2365aa]"
                          }`}
                      >
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active stage panel — fixed height so switching never shifts layout */}
          <div
            id="pipeline-stage-panel"
            role="tabpanel"
            onMouseEnter={() => setStagePaused(true)}
            onMouseLeave={() => setStagePaused(false)}
            className="mx-auto max-w-[1100px] overflow-hidden rounded-[24px] border border-[#d7e6f3] bg-white shadow-[0_20px_60px_-34px_rgba(17,61,119,0.45)]"
          >
            <div className="grid grid-cols-1 items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:grid-rows-[1fr]">
              {/* Illustration — fixed height so it never shrinks */}
              <div className="flex min-h-[260px] items-center justify-center p-4 sm:p-6 lg:min-h-[420px] lg:p-8">
                <img
                  key={stage.title}
                  src={stage.illustration}
                  alt=""
                  aria-hidden
                  className="h-auto w-full max-w-[420px] rounded-[18px] object-contain"
                />
              </div>

              {/* Text content — fades on switch, never resizes the card */}
              <div className="relative border-t border-[#e8eef3] lg:border-l lg:border-t-0">
                <div
                  key={`stage-detail-${activeStage}`}
                  className={`flex h-full flex-col justify-center p-5 sm:p-7 lg:p-9 transition-opacity duration-300 ${panelReady ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#2365aa]">
                    Stage {String(activeStage + 1).padStart(2, "0")} of{" "}
                    {String(pipelineStages.length).padStart(2, "0")}
                  </p>
                  <h3 className="m-0 text-[clamp(22px,2.4vw,34px)] font-bold leading-snug text-[#1F2432]">
                    {stage.title}
                  </h3>
                  <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px] 2xl:leading-8">
                    {stage.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {stage.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-[#EFF7FC] px-3.5 py-1.5 text-xs font-semibold text-[#2365aa] sm:text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack, interactive blue explorer */}
      <section className="w-full bg-white" aria-label="Technology stack">
        <div className="mx-auto w-full max-w-[1692px] px-5 py-[clamp(40px,5vw,80px)] sm:px-8 lg:px-10 xl:px-12">
          <header className="mx-auto mb-[clamp(24px,3vw,40px)] max-w-[48rem] text-center">
            <h2 className="m-0 text-[clamp(26px,3.5vw,48px)] font-bold leading-[1.15] text-[#1F2432]">
              Technology Stack
            </h2>
            <p className="mt-4 text-[clamp(13px,1.2vw,16px)] leading-7 text-[#9CA3AF] 2xl:text-[18px] 2xl:leading-8">
              Explore the platforms and AI Ops tools behind our cloud and
              on-premise deployments.
            </p>
          </header>

          {/* Segmented control */}
          <div className="mx-auto mb-8 flex w-full max-w-[420px] rounded-full border border-[#d7e6f3] bg-[#EFF7FC] p-1.5">
            {stackTabs.map((tab) => {
              const isActive = tab.id === stackTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => selectStackTab(tab.id)}
                  className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${isActive
                      ? "bg-[#113d77] text-white shadow-[0_10px_24px_-12px_rgba(17,61,119,0.65)]"
                      : "bg-transparent text-[#2365aa] hover:bg-white/70"
                    }`}
                >
                  <img
                    src={tab.icon}
                    alt=""
                    aria-hidden
                    className={`h-5 w-5 object-contain ${isActive ? "brightness-0 invert" : ""}`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Outer wrapper: fixed height so nothing ever shifts */}
          <div
            onMouseEnter={() => setToolPaused(true)}
            onMouseLeave={() => setToolPaused(false)}
            className={`mx-auto max-w-[1100px] overflow-hidden rounded-[24px] border border-[#d7e6f3] bg-[#EFF7FC] shadow-[0_20px_60px_-34px_rgba(17,61,119,0.4)] transition-opacity duration-300 ease-out ${stackReady ? "opacity-100" : "opacity-0"
              }`}
          >
            {/* Fixed-height inner grid — tall enough for 2 rows of tool cards + detail */}
            <div className="grid min-h-[480px] grid-cols-1 lg:min-h-[360px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              {/* Tool grid — fixed height, never shrinks */}
              <div className="border-b border-[#d7e6f3] p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-7">
                <p className="mb-4 text-sm leading-6 text-[#687181]">{activeStack.summary}</p>
                {/* Always reserve space for 2 rows of 3 cards */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {/* Render all 6 slots; hide extras so height stays constant */}
                  {Array.from({ length: 6 }).map((_, index) => {
                    const item = activeStack.items[index];
                    const isActive = index === activeTool;
                    if (!item) {
                      return (
                        <div
                          key={`empty-${index}`}
                          className="min-h-[96px] rounded-[18px] bg-transparent"
                          aria-hidden
                        />
                      );
                    }
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => { setActiveTool(index); setToolPaused(false); }}
                        className={`flex min-h-[96px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[18px] border px-3 py-4 transition-all duration-300 ${isActive
                            ? "border-[#2365aa] bg-white shadow-[0_14px_30px_-18px_rgba(17,61,119,0.55)] scale-[1.03]"
                            : "border-transparent bg-white/80 hover:border-[#c5d8eb] hover:bg-white hover:shadow-[0_10px_24px_-18px_rgba(17,61,119,0.35)]"
                          }`}
                      >
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="h-9 w-auto max-w-full object-contain sm:h-10"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detail panel — expands to fit content, content fades on switch */}
              <div className="flex flex-col justify-center bg-white">
                <div
                  key={`${stackTab}-${activeTool}`}
                  className="flex flex-col justify-center p-6 transition-opacity duration-300 sm:p-8 lg:p-10"
                  style={{ opacity: stackReady ? 1 : 0 }}
                >
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#2365aa]">
                    {activeStack.label} toolkit
                  </p>
                  <h3 className="m-0 text-[clamp(22px,2.2vw,32px)] font-bold leading-snug text-[#1F2432]">
                    {selectedTool.name}
                  </h3>
                  <p className="mt-3 max-w-[32rem] text-[clamp(13px,1.2vw,16px)] leading-7 text-[#687181] 2xl:text-[18px] 2xl:leading-8">
                    {selectedTool.blurb}
                  </p>
                  <ul className="mt-5 flex list-none flex-col gap-3 p-0">
                    {selectedTool.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-[clamp(13px,1.15vw,15px)] leading-6 text-[#5a5a5a] 2xl:text-[17px] 2xl:leading-7"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
