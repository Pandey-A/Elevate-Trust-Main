import {
  AlertTriangle,
  BadgeCheck,
  BookOpen,
  Bot,
  Brain,
  Building2,
  Camera,
  ClipboardCheck,
  Eye,
  Factory,
  FileSearch,
  FileText,
  Fingerprint,
  GraduationCap,
  HardHat,
  Image as ImageIcon,
  Landmark,
  Lock,
  MapPinned,
  Megaphone,
  Mic,
  MonitorSmartphone,
  Package,
  Route,
  ScanFace,
  Search,
  Share2,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
  Video,
  Warehouse,
  Workflow,
} from "lucide-react";
import type { IndustryPageContent } from "../components/industry/IndustryPageTemplate";
import fintechChallengesImage from "../assets/industries/DigitalFinance.jpg";
import ecommerceChallengesImage from "../assets/industries/EcommerceRetail.svg";
import educationChallengesImage from "../assets/industries/Education.svg";
import logisticsChallengesImage from "../assets/industries/Logistics.svg";
import manufacturingChallengesImage from "../assets/industries/Manufacturing.svg";
import socialMediaChallengesImage from "../assets/industries/Security.svg";
import publicSectorChallengesImage from "../assets/industries/PublicSectorGovernment.svg";

import imgAiKyc from "../assets/industries/finance~AI-KYC-Verification.svg";
import imgAiTutor from "../assets/industries/edu~AI-Tutor.svg";
import imgAml from "../assets/industries/finance~AIML-Intelligence.svg";
import imgAudioVerification from "../assets/industries/Social~Audio-Verification.svg";
import imgBrandProtection from "../assets/industries/Social~Brand-Protection.svg";
import imgComputerVision from "../assets/industries/Industry~Computer-Vision.svg";
import imgCustomerSupportEcommerce from "../assets/industries/Ecommerce~Customer-Support-Automation.svg";
import imgCitizenAiGovt from "../assets/industries/govt~Citizen-AI.svg";
import imgDeepfake from "../assets/industries/Social~Deepfake-Detection.svg";
import imgDeepfakeFinance from "../assets/industries/finance~Deepfake-Detection.svg";
import imgDeliveryTracking from "../assets/industries/Logistic~Delivery-Tracking.svg";
import imgDigitalTwin from "../assets/industries/Industry~Digital-Twin-Support.svg";
import imgDocumentIntelligence from "../assets/industries/govt~Document-Intelligence.svg";
import imgFaceRecognition from "../assets/industries/govt~Face-Recogonition.svg";
import imgFleetIntelligence from "../assets/industries/Logistic~Fleet-Intelligence.svg";
import imgFraudRisk from "../assets/industries/finance~Fraud-Risk-Scoring.svg";
import imgImageForensics from "../assets/industries/Social~Image-Forencis.svg";
import imgInventory from "../assets/industries/Logistic~Inventory-analytics.svg";
import imgInventoryIntelligence from "../assets/industries/Ecommerce~Inventory-intelligence.svg";
import imgIotAnalytics from "../assets/industries/Industry~IOT-Ananlytics.svg";
import imgLearningAnalytics from "../assets/industries/edu~Learning-Analytics.svg";
import imgOcrAutomation from "../assets/industries/Logistic~OCR-automation.svg";
import imgOcrDocFinance from "../assets/industries/finance~OCR-Document-Processing.svg";
import imgOcrInvoice from "../assets/industries/Ecommerce~OCR-invoice.svg";
import imgOcrNotesEdu from "../assets/industries/edu~OCR-Notes.svg";
import imgPredictiveMaintenance from "../assets/industries/Industry~Predictive-Maintainance.svg";
import imgQualityInspection from "../assets/industries/Industry~Quality-Inspection.svg";
import imgQuiz from "../assets/industries/edu~Quiz-Generator.svg";
import imgRecommendation from "../assets/industries/Ecommerce~Recommendation-Engine.svg";
import imgRoutePlanning from "../assets/industries/Logistic~Route-Planning.svg";
import imgSentimentEcommerce from "../assets/industries/Ecommerce~Sentiment-Analysis.svg";
import imgShopping from "../assets/industries/Ecommerce~AI-Assistant.svg";
import imgSmartSurveillance from "../assets/industries/govt~Smart-Survillence.svg";
import imgSpeechToTextEdu from "../assets/industries/edu~Speech-To-Text.svg";
import imgTextAnalysis from "../assets/industries/Social~Text-Analysis.svg";
import imgTranslationEdu from "../assets/industries/edu~Translation.svg";
import imgVehicleTracking from "../assets/industries/govt~Vehicle-Tracking.svg";
import imgVideoAnalytics from "../assets/industries/Industry~Video-Analytics.svg";
import imgVideoIntelligence from "../assets/industries/Social~Video-Intelligence.svg";
import imgVirtualFencing from "../assets/industries/govt~Virtual-Fencing.svg";
import imgVoiceAuth from "../assets/industries/finance~Voice-Authentication.svg";
import imgWarehouse from "../assets/industries/Logistic~Warehouse-Vision.svg";

const whyDefault = [
  {
    title: "10+ Years AI Experience",
    text: "Deep delivery experience across applied AI, automation, and enterprise transformation.",
    icon: Sparkles,
  },
  {
    title: "Research-driven AI Team",
    text: "A team that blends research thinking with practical industry implementation.",
    icon: Brain,
  },
  {
    title: "PhD & MTech AI Engineers",
    text: "Specialists who design models, pipelines, and systems built for real production environments.",
    icon: Users,
  },
  {
    title: "End-to-End AI Delivery",
    text: "From discovery and architecture to deployment, monitoring, and continuous improvement.",
    icon: Workflow,
  },
  {
    title: "Trusted Globally",
    text: "Trusted by organizations that need secure, scalable, and production-ready AI solutions.",
    icon: ShieldCheck,
  },
  {
    title: "Patent-backed AI Innovation",
    text: "Innovation grounded in research, patents, and proven applied AI delivery.",
    icon: Lock,
  },
];

export const industryPagesBySlug: Record<string, IndustryPageContent> = {
  "financial-services-&-fintech": {
    slug: "financial-services-&-fintech",
    label: "Financial Services & FinTech",
    eyebrow: "Financial Services & FinTech",
    heroTitle: "Secure Every Digital Transaction with AI-Powered Financial Intelligence",
    heroSubtitle:
      "Prevent fraud, accelerate customer onboarding, automate compliance, and build trust across banking, insurance, lending, and payment platforms using AI-native financial solutions.",
    challengesTitle: "Navigating Risk, Trust, and Compliance in Digital Finance",
    challengesBody:
      "Financial institutions must balance customer experience with security and regulatory compliance while combating increasingly sophisticated fraud techniques. ElevateTrust helps banks, insurers, lenders, and payment platforms detect threats early, verify identities with confidence, and automate compliance workflows without slowing growth.",
    challengesImage: fintechChallengesImage,
    challenges: [
      { title: "Identity Fraud", text: "Stop synthetic identities and impersonation attempts before accounts are opened or funds are moved.", icon: Fingerprint },
      { title: "KYC Verification", text: "Speed up onboarding while keeping document checks accurate, auditable, and policy-aligned.", icon: BadgeCheck },
      { title: "Regulatory Compliance", text: "Reduce manual review burden across KYC, AML, and audit-ready reporting processes.", icon: Landmark },
      { title: "Voice Fraud", text: "Detect spoofed calls and unauthorized voice interactions across contact centers and IVR channels.", icon: Mic },
      { title: "Deepfake Attacks", text: "Identify manipulated media used in social engineering, account takeover, and identity misuse.", icon: Video },
      { title: "Risk Management", text: "Score transactions and customer behavior in near real time to reduce losses and false positives.", icon: ShieldAlert },
    ],
    helpsIntro:
      "We combine multimodal forensics, document intelligence, and agentic automation to protect financial journeys from onboarding through ongoing monitoring.",
    helps: [
      { title: "AI-powered KYC Verification", text: "Validate IDs, forms, and customer documents with OCR, NLP, and confidence scoring.", icon: FileSearch },
      { title: "Multi-modal Fraud Detection", text: "Correlate image, video, voice, and transaction signals for stronger fraud defense.", icon: Eye },
      { title: "Voice Authentication", text: "Secure customer interactions with voice biometrics and anti-spoofing checks.", icon: Mic },
      { title: "Document Intelligence", text: "Extract structured data from KYC packs, claims, and financial forms at scale.", icon: FileText },
      { title: "Transaction Risk Analysis", text: "Flag high-risk activity with explainable AI scoring for investigators and analysts.", icon: AlertTriangle },
      { title: "Compliance Automation", text: "Streamline reviews, evidence capture, and policy workflows for regulated operations.", icon: ClipboardCheck },
    ],
    solutionsTitle: "AI Solutions for Financial Services",
    solutionsSubtitle:
      "Purpose-built AI capabilities that strengthen trust, reduce fraud losses, and accelerate digital financial operations.",
    solutions: [
      { title: "AI KYC Verification", text: "Automate identity and document checks with accurate extraction and validation.", icon: imgAiKyc },
      { title: "Deepfake Detection", text: "Detect manipulated faces, videos, and synthetic media used in fraud attempts.", icon: imgDeepfakeFinance },
      { title: "Voice Authentication", text: "Verify callers and reduce voice-based social engineering risks.", icon: imgVoiceAuth },
      { title: "OCR Document Processing", text: "Digitize KYC packs, applications, and claims into structured records.", icon: imgOcrDocFinance },
      { title: "AML Intelligence", text: "Support monitoring teams with AI-assisted pattern detection and case prioritization.", icon: imgAml },
      { title: "Fraud Risk Scoring", text: "Score risk across onboarding, payments, and account activity with actionable alerts.", icon: imgFraudRisk },
    ],
    useCasesIntro:
      "Practical financial scenarios where AI reduces risk, shortens cycle times, and improves customer confidence.",
    useCases: [
      { title: "Digital Customer Onboarding", text: "Open accounts faster with automated identity and document verification.", icon: Users },
      { title: "Loan Processing Automation", text: "Extract application data and accelerate underwriting support workflows.", icon: FileText },
      { title: "Insurance Claim Verification", text: "Validate claim documents and detect inconsistent or manipulated evidence.", icon: ClipboardCheck },
      { title: "Payment Fraud Detection", text: "Identify suspicious payments and reduce false declines with smarter scoring.", icon: ShieldAlert },
      { title: "Customer Identity Verification", text: "Confirm customer identity across digital and assisted channels.", icon: Fingerprint },
      { title: "AI Contact Center", text: "Support agents with authentication, summarization, and guided fraud handling.", icon: Bot },
    ],
    technologiesIntro:
      "Security-first AI capabilities designed for banking, insurance, lending, and payment ecosystems.",
    technologies: [
      { name: "Computer Vision", icon: ImageIcon },
      { name: "OCR", icon: FileText },
      { name: "LLMs", icon: Brain },
      { name: "Video Analytics", icon: Video },
      { name: "Speech Intelligence", icon: Mic },
      { name: "Agentic AI", icon: Bot },
    ],
    outcomesIntro:
      "Outcomes financial leaders prioritize: lower fraud losses, faster onboarding, stronger compliance, and greater customer trust.",
    outcomes: [
      { title: "Reduce Fraud Losses", text: "Detect deepfakes, identity misuse, and high-risk activity earlier in the journey." },
      { title: "Faster Account Opening", text: "Automate KYC and document checks without sacrificing control." },
      { title: "Improved Compliance", text: "Create cleaner audit trails and more consistent policy execution." },
      { title: "Better Customer Trust", text: "Protect customers while keeping digital experiences fast and reliable." },
    ],
    whyTitle: "Why ElevateTrust",
    whyBody:
      "Financial institutions trust ElevateTrust to deliver secure, scalable AI solutions that protect customers while streamlining operations through intelligent automation, deepfake detection, multimodal forensics, and AI-driven fraud prevention.",
    whyCards: whyDefault,
    whyPoints: [
      "Multimodal fraud and deepfake detection for high-risk digital channels",
      "Human-in-the-loop workflows for investigators, compliance, and operations teams",
      "Flexible deployment across cloud, hybrid, and regulated environments",
    ],
  },

  "e-commerce-&-retail": {
    slug: "e-commerce-&-retail",
    label: "E-commerce & Retail",
    eyebrow: "E-commerce & Retail",
    heroTitle: "Deliver Smarter Shopping Experiences with AI",
    heroSubtitle:
      "Personalize customer journeys, automate operations, improve customer support, and optimize retail performance through intelligent AI solutions.",
    challengesTitle: "Meeting Rising Expectations Across Digital Retail",
    challengesBody:
      "Retail businesses face rapidly changing customer expectations, rising operational costs, inventory complexity, and the need for personalized shopping experiences. ElevateTrust helps brands turn AI into better discovery, support, forecasting, and retention outcomes.",
    challengesImage: ecommerceChallengesImage,
    challenges: [
      { title: "Customer Support", text: "Handle volume spikes while keeping responses accurate, brand-aligned, and fast.", icon: Bot },
      { title: "Product Discovery", text: "Help shoppers find the right products faster across catalogs and channels.", icon: Search },
      { title: "Inventory", text: "Reduce stockouts and overstocks with better demand and inventory visibility.", icon: Package },
      { title: "Sales Forecasting", text: "Anticipate demand shifts across seasons, campaigns, and product categories.", icon: Brain },
      { title: "Customer Retention", text: "Keep customers engaged with relevant offers, support, and post-purchase experiences.", icon: ShoppingBag },
      { title: "Returns Management", text: "Simplify returns handling and reduce friction in reverse logistics workflows.", icon: ClipboardCheck },
    ],
    helpsIntro:
      "We help retailers combine conversational AI, recommendations, analytics, and document automation into a more intelligent shopping and operations stack.",
    helps: [
      { title: "AI Customer Support", text: "Deploy virtual agents that resolve FAQs, order queries, and common service requests.", icon: Bot },
      { title: "Product Recommendations", text: "Surface relevant products using behavior, catalog signals, and contextual AI.", icon: Sparkles },
      { title: "Demand Forecasting", text: "Improve planning with AI models that learn from sales and operational patterns.", icon: Brain },
      { title: "AI Search", text: "Upgrade product search with natural language understanding and smarter ranking.", icon: Search },
      { title: "Order Intelligence", text: "Extract and organize order, invoice, and shipping details for faster operations.", icon: FileText },
      { title: "Customer Analytics", text: "Understand sentiment, behavior, and retention signals across customer touchpoints.", icon: Users },
    ],
    solutionsTitle: "AI Solutions for E-commerce & Retail",
    solutionsSubtitle:
      "Retail-ready AI modules that improve conversion, support efficiency, and operational decision-making.",
    solutions: [
      { title: "AI Shopping Assistant", text: "Guide shoppers with conversational product discovery and purchase support.", icon: imgShopping },
      { title: "Recommendation Engine", text: "Personalize product suggestions across browse, cart, and post-purchase journeys.", icon: imgRecommendation },
      { title: "Sentiment Analysis", text: "Understand customer feedback from reviews, chats, and support conversations.", icon: imgSentimentEcommerce },
      { title: "Inventory Intelligence", text: "Improve stock planning with AI-assisted demand and inventory insights.", icon: imgInventoryIntelligence },
      { title: "OCR Invoice Processing", text: "Automate extraction from invoices, packing slips, and returns documents.", icon: imgOcrInvoice },
      { title: "Customer Support Automation", text: "Reduce ticket volume with agents grounded in your catalog and policies.", icon: imgCustomerSupportEcommerce },
    ],
    useCasesIntro:
      "Retail use cases that connect personalization, support automation, and smarter inventory decisions.",
    useCases: [
      { title: "Personalized Product Recommendations", text: "Increase relevance and basket size with adaptive product suggestions.", icon: Sparkles },
      { title: "AI Customer Service", text: "Resolve order and product questions around the clock with virtual agents.", icon: Bot },
      { title: "Automated Returns", text: "Speed up returns intake and documentation with intelligent processing.", icon: ClipboardCheck },
      { title: "Customer Behavior Analytics", text: "Identify patterns that drive conversion, churn, and campaign performance.", icon: Users },
      { title: "Inventory Prediction", text: "Anticipate stock needs and reduce costly inventory imbalances.", icon: Package },
      { title: "Sales Forecasting", text: "Plan assortment and promotions with clearer demand visibility.", icon: Brain },
    ],
    technologiesIntro:
      "AI capabilities that power discovery, support, forecasting, and retail operations.",
    technologies: [
      { name: "LLMs", icon: Brain },
      { name: "Recommendation AI", icon: Sparkles },
      { name: "NLP", icon: Search },
      { name: "OCR", icon: FileText },
      { name: "Computer Vision", icon: ImageIcon },
      { name: "Agentic AI", icon: Bot },
    ],
    outcomesIntro:
      "Business results retailers care about: stronger sales, happier customers, lower support cost, and better retention.",
    outcomes: [
      { title: "Higher Sales", text: "Improve conversion through better discovery, recommendations, and assisted shopping." },
      { title: "Better Customer Satisfaction", text: "Respond faster and more accurately across digital service channels." },
      { title: "Lower Support Costs", text: "Automate repetitive queries while keeping complex cases with human agents." },
      { title: "Increased Customer Retention", text: "Create more relevant and reliable post-purchase experiences." },
    ],
    whyTitle: "Why ElevateTrust",
    whyBody:
      "Retail and e-commerce brands partner with ElevateTrust to deliver personalized shopping journeys, automate support, and improve operational intelligence with production-ready AI.",
    whyCards: whyDefault,
    whyPoints: [
      "Customer-facing assistants grounded in your catalog, policies, and brand voice",
      "Analytics and forecasting that support merchandising and operations teams",
      "Practical automation for invoices, returns, and high-volume support workflows",
    ],
  },

  "education-&-e-learning": {
    slug: "education-&-e-learning",
    label: "Education & E-Learning",
    eyebrow: "Education & E-Learning",
    heroTitle: "Create Personalized Learning Experiences with AI",
    heroSubtitle:
      "Empower educators and learners through intelligent content delivery, automated assessments, multilingual learning, and AI-powered education platforms.",
    challengesTitle: "Modernizing Learning Without Losing the Human Touch",
    challengesBody:
      "Education providers need more personalization, faster content creation, stronger engagement, and better accessibility. ElevateTrust helps institutions and edtech platforms use AI to support teachers, learners, and administrators at scale.",
    challengesImage: educationChallengesImage,
    challenges: [
      { title: "Personalized Learning", text: "Adapt content and pacing to different learner levels and goals.", icon: GraduationCap },
      { title: "Assessment", text: "Create and evaluate quizzes or assignments more efficiently and consistently.", icon: ClipboardCheck },
      { title: "Content Creation", text: "Generate learning materials faster without compromising instructional quality.", icon: BookOpen },
      { title: "Student Engagement", text: "Keep learners motivated with interactive and timely support experiences.", icon: Users },
      { title: "Accessibility", text: "Expand access through speech, translation, and more inclusive learning formats.", icon: Mic },
      { title: "Administration", text: "Reduce repetitive academic and operational admin work across teams.", icon: Workflow },
    ],
    helpsIntro:
      "We help education teams deploy AI tutors, content tools, and learning analytics that support instructors rather than replace them.",
    helps: [
      { title: "AI Tutors", text: "Provide guided practice and on-demand help grounded in approved course content.", icon: Bot },
      { title: "Learning Recommendation", text: "Suggest next lessons, resources, and practice based on learner progress.", icon: Sparkles },
      { title: "Quiz Generation", text: "Create assessments aligned to learning objectives and course materials.", icon: ClipboardCheck },
      { title: "Translation", text: "Make learning content accessible across languages and learner communities.", icon: BookOpen },
      { title: "Voice Recognition", text: "Support speech-based learning, practice, and note capture workflows.", icon: Mic },
      { title: "Content Automation", text: "Accelerate creation of summaries, study guides, and instructional drafts.", icon: FileText },
    ],
    solutionsTitle: "AI Solutions for Education & E-Learning",
    solutionsSubtitle:
      "Learning-focused AI capabilities that improve personalization, assessment, accessibility, and teaching productivity.",
    solutions: [
      { title: "AI Tutor", text: "Offer guided learning support with human oversight and curriculum-grounded answers.", icon: imgAiTutor },
      { title: "Quiz Generator", text: "Generate practice questions and assessments from approved learning content.", icon: imgQuiz },
      { title: "Learning Analytics", text: "Track engagement and progress to help educators intervene earlier.", icon: imgLearningAnalytics },
      { title: "OCR Notes", text: "Digitize handwritten or scanned notes into searchable learning assets.", icon: imgOcrNotesEdu },
      { title: "Speech-to-Text", text: "Capture lectures and discussions for accessible transcripts and study aids.", icon: imgSpeechToTextEdu },
      { title: "Translation AI", text: "Support multilingual learners with faster content localization.", icon: imgTranslationEdu },
    ],
    useCasesIntro:
      "Education scenarios where AI improves teaching support, learner experience, and institutional efficiency.",
    useCases: [
      { title: "Personalized Learning", text: "Adapt pathways based on learner performance and preferred pace.", icon: GraduationCap },
      { title: "AI Teacher Assistant", text: "Help educators prepare materials, summaries, and classroom support content.", icon: Bot },
      { title: "Assignment Evaluation", text: "Assist with consistent first-pass review and feedback workflows.", icon: ClipboardCheck },
      { title: "Course Recommendation", text: "Guide learners toward relevant modules and next-best learning actions.", icon: Sparkles },
      { title: "Learning Analytics", text: "Give academic teams clearer visibility into engagement and outcomes.", icon: Brain },
      { title: "Virtual Classrooms", text: "Enhance digital classes with transcription, search, and support assistants.", icon: MonitorSmartphone },
    ],
    technologiesIntro:
      "AI capabilities that support teaching, content creation, assessment, and accessible learning.",
    technologies: [
      { name: "LLMs", icon: Brain },
      { name: "Speech Recognition", icon: Mic },
      { name: "OCR", icon: FileText },
      { name: "NLP", icon: BookOpen },
      { name: "Learning Analytics", icon: GraduationCap },
      { name: "Agentic AI", icon: Bot },
    ],
    outcomesIntro:
      "Outcomes education leaders seek: better learning results, higher engagement, less admin load, and improved accessibility.",
    outcomes: [
      { title: "Better Learning Outcomes", text: "Give learners timely support and more relevant practice pathways." },
      { title: "Increased Student Engagement", text: "Keep learners interacting with content, tutors, and feedback loops." },
      { title: "Reduced Administrative Work", text: "Automate repetitive content and assessment support tasks." },
      { title: "Improved Accessibility", text: "Expand reach through speech, translation, and digitized learning materials." },
    ],
    whyTitle: "Why ElevateTrust",
    whyBody:
      "Education and e-learning organizations trust ElevateTrust to deliver AI that supports educators, personalizes learning, and scales content and assessment workflows responsibly.",
    whyCards: whyDefault,
    whyPoints: [
      "Curriculum-grounded assistants with human oversight for academic trust",
      "Tools that reduce teacher workload while protecting instructional quality",
      "Flexible AI for LMS platforms, edtech products, and institutional systems",
    ],
  },

  "logistics-&-supply-chain": {
    slug: "logistics-&-supply-chain",
    label: "Logistics & Supply Chain",
    eyebrow: "Logistics & Supply Chain",
    heroTitle: "Optimize Every Movement with AI-Driven Logistics",
    heroSubtitle:
      "Increase operational efficiency, improve visibility, automate fleet management, and deliver smarter supply chain decisions through AI.",
    challengesTitle: "Improving Visibility and Efficiency Across the Supply Chain",
    challengesBody:
      "Logistics teams need better tracking, smarter routing, warehouse intelligence, and predictive operations. ElevateTrust helps supply chain organizations use AI to reduce delays, improve asset visibility, and automate document-heavy workflows.",
    challengesImage: logisticsChallengesImage,
    challenges: [
      { title: "Fleet Tracking", text: "Maintain clearer visibility across vehicles, routes, and delivery status.", icon: Truck },
      { title: "Warehouse Operations", text: "Reduce bottlenecks in picking, packing, and inventory movement.", icon: Warehouse },
      { title: "Demand Forecasting", text: "Anticipate volume changes and plan capacity with greater confidence.", icon: Brain },
      { title: "Delivery Optimization", text: "Improve ETAs and route efficiency across complex delivery networks.", icon: Route },
      { title: "Inventory", text: "Balance stock levels and reduce costly mismatches across locations.", icon: Package },
      { title: "Asset Monitoring", text: "Track critical assets and detect issues earlier across the network.", icon: MapPinned },
    ],
    helpsIntro:
      "We combine vision, forecasting, OCR, and operational AI to help logistics teams move goods with more control and less manual effort.",
    helps: [
      { title: "Route Optimization", text: "Improve planning with AI-assisted routing and delivery prioritization.", icon: Route },
      { title: "Warehouse Intelligence", text: "Use computer vision and analytics to improve warehouse visibility.", icon: Warehouse },
      { title: "Vehicle Analytics", text: "Monitor fleet activity and surface operational insights for managers.", icon: Truck },
      { title: "OCR Logistics Documents", text: "Digitize BOLs, invoices, PODs, and shipping paperwork automatically.", icon: FileText },
      { title: "Predictive Maintenance", text: "Identify equipment and vehicle issues before they disrupt operations.", icon: AlertTriangle },
      { title: "AI Monitoring", text: "Watch facilities and workflows with intelligent video and event detection.", icon: Camera },
    ],
    solutionsTitle: "AI Solutions for Logistics & Supply Chain",
    solutionsSubtitle:
      "Operational AI modules designed for fleet, warehouse, inventory, and document-intensive logistics workflows.",
    solutions: [
      { title: "Fleet Intelligence", text: "Gain actionable insights across vehicles, trips, and utilization patterns.", icon: imgFleetIntelligence },
      { title: "Route Planning", text: "Support smarter dispatch and delivery planning decisions.", icon: imgRoutePlanning },
      { title: "Warehouse Vision", text: "Apply computer vision to improve monitoring and operational awareness.", icon: imgWarehouse },
      { title: "Inventory Analytics", text: "Improve stock visibility and planning with AI-assisted analytics.", icon: imgInventory },
      { title: "Delivery Tracking", text: "Strengthen delivery status visibility and exception handling.", icon: imgDeliveryTracking },
      { title: "OCR Automation", text: "Extract structured data from logistics documents at scale.", icon: imgOcrAutomation },
    ],
    useCasesIntro:
      "Logistics scenarios where AI improves movement, visibility, safety, and warehouse performance.",
    useCases: [
      { title: "Smart Warehousing", text: "Improve throughput and visibility with AI-supported warehouse operations.", icon: Warehouse },
      { title: "Fleet Monitoring", text: "Track fleet activity and surface delays or anomalies earlier.", icon: Truck },
      { title: "Delivery Optimization", text: "Reduce delays with smarter routing and exception management.", icon: Route },
      { title: "Inventory Management", text: "Improve stock planning across warehouses and fulfillment nodes.", icon: Package },
      { title: "Driver Safety", text: "Support safer operations with monitoring and event intelligence.", icon: HardHat },
      { title: "Asset Tracking", text: "Keep critical assets visible across facilities and routes.", icon: MapPinned },
    ],
    technologiesIntro:
      "AI capabilities that strengthen logistics visibility, planning, automation, and monitoring.",
    technologies: [
      { name: "Computer Vision", icon: ImageIcon },
      { name: "OCR", icon: FileText },
      { name: "Predictive Analytics", icon: Brain },
      { name: "Video Analytics", icon: Video },
      { name: "IoT", icon: MonitorSmartphone },
      { name: "Agentic AI", icon: Bot },
    ],
    outcomesIntro:
      "Outcomes logistics leaders measure: lower cost, faster delivery, stronger visibility, and better fleet efficiency.",
    outcomes: [
      { title: "Lower Logistics Costs", text: "Reduce waste from inefficient routing, paperwork, and inventory imbalance." },
      { title: "Faster Deliveries", text: "Improve planning and exception handling across the delivery network." },
      { title: "Better Visibility", text: "See inventory, assets, and fleet activity with clearer operational insight." },
      { title: "Improved Fleet Efficiency", text: "Make better use of vehicles, routes, and maintenance windows." },
    ],
    whyTitle: "Why ElevateTrust",
    whyBody:
      "Logistics and supply chain organizations partner with ElevateTrust to improve visibility, automate document workflows, and make smarter operational decisions with AI.",
    whyCards: whyDefault,
    whyPoints: [
      "AI for fleet, warehouse, inventory, and document-heavy logistics processes",
      "Practical computer vision and OCR for real operational environments",
      "Secure, scalable systems designed for multi-site logistics networks",
    ],
  },

  "manufacturing-&-industry-4.0": {
    slug: "manufacturing-&-industry-4.0",
    label: "Manufacturing & Industry 4.0",
    eyebrow: "Manufacturing & Industry 4.0",
    heroTitle: "Build Intelligent Factories with AI",
    heroSubtitle:
      "Transform manufacturing operations using predictive analytics, computer vision, automation, and industrial AI.",
    challengesTitle: "Bringing Intelligence to Modern Manufacturing Floors",
    challengesBody:
      "Manufacturers must improve quality, reduce downtime, protect workers, and gain production visibility. ElevateTrust helps industrial teams apply computer vision, predictive maintenance, and operational AI to build smarter factories.",
    challengesImage: manufacturingChallengesImage,
    challenges: [
      { title: "Quality Inspection", text: "Catch defects earlier and reduce reliance on slow manual inspection cycles.", icon: Eye },
      { title: "Equipment Downtime", text: "Predict failures and reduce unplanned stoppages across production lines.", icon: AlertTriangle },
      { title: "Worker Safety", text: "Monitor high-risk zones and improve compliance with safety protocols.", icon: HardHat },
      { title: "Production Visibility", text: "Understand line performance, bottlenecks, and throughput in near real time.", icon: Factory },
      { title: "Vendor Fraud", text: "Verify materials and detect inconsistencies in inbound supply workflows.", icon: ShieldAlert },
      { title: "Predictive Maintenance", text: "Move from reactive repairs to planned, data-driven maintenance actions.", icon: Workflow },
    ],
    helpsIntro:
      "We help manufacturers combine vision AI, IoT analytics, and industrial automation into systems that improve quality, safety, and uptime.",
    helps: [
      { title: "AI Vision Inspection", text: "Detect defects and anomalies with computer vision on production lines.", icon: Camera },
      { title: "Predictive Maintenance", text: "Use sensor and operational data to anticipate equipment issues.", icon: Brain },
      { title: "Factory Monitoring", text: "Track production activity and surface operational insights for plant teams.", icon: Factory },
      { title: "Safety Analytics", text: "Support safer workplaces with video analytics and event detection.", icon: HardHat },
      { title: "Vendor Material Verification", text: "Validate materials and reduce risk in inbound supply checks.", icon: ClipboardCheck },
      { title: "IoT Intelligence", text: "Turn machine and sensor streams into actionable industrial insights.", icon: MonitorSmartphone },
    ],
    solutionsTitle: "AI Solutions for Manufacturing",
    solutionsSubtitle:
      "Industrial AI capabilities that strengthen quality, safety, maintenance, and production intelligence.",
    solutions: [
      { title: "Computer Vision", text: "Automate visual inspection and monitoring across manufacturing environments.", icon: imgComputerVision },
      { title: "Predictive Maintenance", text: "Reduce downtime with early signals from equipment and process data.", icon: imgPredictiveMaintenance },
      { title: "IoT Analytics", text: "Analyze machine telemetry for performance and reliability insights.", icon: imgIotAnalytics },
      { title: "Video Analytics", text: "Monitor safety, movement, and operational events on the factory floor.", icon: imgVideoAnalytics },
      { title: "Quality Inspection", text: "Improve consistency and reduce escapes with AI-assisted inspection.", icon: imgQualityInspection },
      { title: "Digital Twin Support", text: "Support smarter planning with digital representations of industrial processes.", icon: imgDigitalTwin },
    ],
    useCasesIntro:
      "Manufacturing scenarios where AI improves inspection, safety, production insight, and material integrity.",
    useCases: [
      { title: "Automated Quality Inspection", text: "Detect defects faster and with greater consistency across lines.", icon: Eye },
      { title: "Worker Safety Monitoring", text: "Identify safety risks and support better shop-floor compliance.", icon: HardHat },
      { title: "Production Analytics", text: "Understand throughput, bottlenecks, and line performance clearly.", icon: Factory },
      { title: "Material Fraud Detection", text: "Verify inbound materials and reduce vendor-related quality risk.", icon: ShieldAlert },
      { title: "Equipment Monitoring", text: "Track machine health and reduce unplanned downtime.", icon: AlertTriangle },
      { title: "Smart Manufacturing", text: "Connect vision, IoT, and analytics into a more intelligent plant operation.", icon: Workflow },
    ],
    technologiesIntro:
      "Industrial AI capabilities for inspection, maintenance, safety, and connected factory operations.",
    technologies: [
      { name: "Computer Vision", icon: ImageIcon },
      { name: "Predictive Analytics", icon: Brain },
      { name: "IoT Analytics", icon: MonitorSmartphone },
      { name: "Video Analytics", icon: Video },
      { name: "Quality Inspection", icon: Eye },
      { name: "Digital Twin", icon: Factory },
    ],
    outcomesIntro:
      "Outcomes manufacturing leaders track: less downtime, better quality, safer floors, and higher productivity.",
    outcomes: [
      { title: "Reduced Downtime", text: "Anticipate failures and keep production lines running more reliably." },
      { title: "Better Product Quality", text: "Catch defects earlier and improve consistency across batches." },
      { title: "Improved Safety", text: "Strengthen shop-floor monitoring and safety response readiness." },
      { title: "Increased Productivity", text: "Give teams clearer visibility and fewer operational interruptions." },
    ],
    whyTitle: "Why ElevateTrust",
    whyBody:
      "Manufacturers partner with ElevateTrust to deploy industrial AI that improves quality inspection, predictive maintenance, safety analytics, and production visibility.",
    whyCards: whyDefault,
    whyPoints: [
      "Computer vision and IoT intelligence designed for real factory environments",
      "Safety and quality workflows that support plant operators and supervisors",
      "Scalable AI delivery from pilot lines to multi-plant operations",
    ],
  },

  "social-media-&-entertainment": {
    slug: "social-media-&-entertainment",
    label: "Social Media & Entertainment",
    eyebrow: "Social Media & Entertainment",
    heroTitle: "Protect Digital Content with AI",
    heroSubtitle:
      "Safeguard digital platforms from deepfakes, misinformation, copyright abuse, and harmful content using advanced AI moderation.",
    challengesTitle: "Defending Trust Across Digital Content Platforms",
    challengesBody:
      "Social platforms and entertainment companies face deepfakes, harmful content, copyright abuse, and rising moderation costs. ElevateTrust helps media organizations protect communities, creators, and brand safety with advanced AI moderation and forensics.",
    challengesImage: socialMediaChallengesImage,
    challenges: [
      { title: "Fake Videos", text: "Detect manipulated media before it spreads across feeds and communities.", icon: Video },
      { title: "Content Moderation", text: "Review high volumes of UGC without sacrificing speed or consistency.", icon: Eye },
      { title: "Deepfakes", text: "Identify synthetic faces and media used for fraud, abuse, or misinformation.", icon: ScanFace },
      { title: "Copyright", text: "Spot unauthorized reuse of protected content across platforms and channels.", icon: FileSearch },
      { title: "User Trust", text: "Keep audiences confident that platforms are safer and more reliable.", icon: ShieldCheck },
      { title: "Brand Safety", text: "Reduce the risk of harmful adjacency and reputation damage.", icon: Megaphone },
    ],
    helpsIntro:
      "We help platforms combine deepfake detection, video intelligence, audio verification, and AI moderation into safer content operations.",
    helps: [
      { title: "AI Moderation", text: "Automate first-pass review for harmful, misleading, or policy-violating content.", icon: Bot },
      { title: "Video Analytics", text: "Analyze video streams and uploads for risky or unauthorized activity.", icon: Video },
      { title: "Deepfake Detection", text: "Flag synthetic media with multimodal forensic signals.", icon: ScanFace },
      { title: "Audio Verification", text: "Detect spoofed or manipulated audio used in deceptive content.", icon: Mic },
      { title: "Image Analysis", text: "Review images for brand safety, abuse patterns, and policy issues.", icon: ImageIcon },
      { title: "AI Search", text: "Help teams retrieve relevant content and moderation evidence faster.", icon: Search },
    ],
    solutionsTitle: "AI Solutions for Social Media & Entertainment",
    solutionsSubtitle:
      "Trust and safety AI capabilities designed for platforms, studios, and digital content ecosystems.",
    solutions: [
      { title: "Deepfake Detection", text: "Identify manipulated faces and synthetic media before they cause harm.", icon: imgDeepfake },
      { title: "Video Intelligence", text: "Analyze video content for moderation, verification, and brand safety.", icon: imgVideoIntelligence },
      { title: "Image Forensics", text: "Inspect images for manipulation, misuse, and policy risk signals.", icon: imgImageForensics },
      { title: "Audio Verification", text: "Validate audio authenticity and support anti-spoofing workflows.", icon: imgAudioVerification },
      { title: "Text Analysis", text: "Detect harmful language, misinformation patterns, and policy violations.", icon: imgTextAnalysis },
      { title: "Brand Protection", text: "Monitor content risk that can damage creators, platforms, and advertisers.", icon: imgBrandProtection },
    ],
    useCasesIntro:
      "Media and platform scenarios where AI strengthens trust, safety, and content integrity.",
    useCases: [
      { title: "Video Verification", text: "Validate uploaded or viral video content before broader distribution.", icon: Video },
      { title: "Live Stream Monitoring", text: "Support safer live experiences with faster risk detection.", icon: Camera },
      { title: "Copyright Detection", text: "Identify unauthorized reuse of protected media assets.", icon: FileSearch },
      { title: "Fake News Detection", text: "Surface suspicious claims and manipulated media for review teams.", icon: AlertTriangle },
      { title: "UGC Moderation", text: "Scale moderation for user-generated posts, clips, and comments.", icon: Share2 },
      { title: "Brand Monitoring", text: "Protect advertisers and platforms from unsafe content adjacency.", icon: Megaphone },
    ],
    technologiesIntro:
      "Trust and safety AI capabilities for moderation, forensics, and content protection.",
    technologies: [
      { name: "Deepfake Detection", icon: ScanFace },
      { name: "Video Analytics", icon: Video },
      { name: "Image Forensics", icon: ImageIcon },
      { name: "Speech Intelligence", icon: Mic },
      { name: "NLP", icon: Search },
      { name: "Agentic AI", icon: Bot },
    ],
    outcomesIntro:
      "Outcomes platforms and media brands prioritize: safer communities, stronger trust, lower moderation cost, and better brand protection.",
    outcomes: [
      { title: "Safer Communities", text: "Reduce harmful and deceptive content across digital experiences." },
      { title: "Increased Trust", text: "Give users more confidence in authenticity and platform integrity." },
      { title: "Reduced Moderation Costs", text: "Automate first-pass review while keeping humans in control." },
      { title: "Better Brand Protection", text: "Lower the risk of unsafe adjacency and reputation damage." },
    ],
    whyTitle: "Why ElevateTrust",
    whyBody:
      "Social media and entertainment platforms trust ElevateTrust for deepfake detection, multimodal forensics, and AI moderation that protect users, creators, and brand safety.",
    whyCards: whyDefault,
    whyPoints: [
      "Advanced deepfake and multimodal content forensics",
      "Moderation workflows designed for high-volume digital platforms",
      "Human-in-the-loop controls for trust, safety, and policy teams",
    ],
  },

  "public-sector-&-government": {
    slug: "public-sector-&-government",
    label: "Public Sector & Government",
    eyebrow: "Public Sector & Government",
    heroTitle: "Power Safer Cities with AI",
    heroSubtitle:
      "Improve public safety, strengthen digital governance, and enhance citizen services through AI-powered automation and intelligent surveillance.",
    challengesTitle: "Strengthening Public Safety and Digital Governance",
    challengesBody:
      "Public sector organizations need better situational awareness, faster emergency response, stronger digital identity, and more efficient citizen services. ElevateTrust helps government teams apply AI responsibly across safety, surveillance, and service delivery.",
    challengesImage: publicSectorChallengesImage,
    challenges: [
      { title: "Crime Detection", text: "Identify suspicious activity earlier across monitored public environments.", icon: ShieldAlert },
      { title: "Public Safety", text: "Improve awareness and response readiness across cities and critical sites.", icon: ShieldCheck },
      { title: "Digital Identity", text: "Verify people and documents more accurately across government workflows.", icon: Fingerprint },
      { title: "Citizen Services", text: "Reduce friction in service requests, inquiries, and administrative processes.", icon: Building2 },
      { title: "Surveillance", text: "Make large camera networks more actionable with intelligent video analytics.", icon: Camera },
      { title: "Emergency Response", text: "Support faster coordination when incidents and alerts require action.", icon: AlertTriangle },
    ],
    helpsIntro:
      "We help public sector teams combine smart CCTV, identity intelligence, document automation, and citizen assistants into safer and more efficient operations.",
    helps: [
      { title: "Face Search", text: "Support investigations and missing-person workflows with AI-assisted search.", icon: ScanFace },
      { title: "Crime Detection", text: "Surface high-priority events from video and operational signal streams.", icon: ShieldAlert },
      { title: "Smart CCTV", text: "Turn camera networks into actionable monitoring systems for command centers.", icon: Camera },
      { title: "AI Monitoring", text: "Track zones, vehicles, and incidents with intelligent event detection.", icon: Eye },
      { title: "Digital Identity", text: "Strengthen identity checks across citizen and government service workflows.", icon: Fingerprint },
      { title: "Government Automation", text: "Automate document-heavy processes and citizen support interactions.", icon: Workflow },
    ],
    solutionsTitle: "AI Solutions for Public Sector & Government",
    solutionsSubtitle:
      "Public-sector AI capabilities for safer cities, smarter surveillance, and more efficient citizen services.",
    solutions: [
      { title: "Smart Surveillance", text: "Monitor public spaces with intelligent video analytics and alerting.", icon: imgSmartSurveillance },
      { title: "Face Recognition Support", text: "Assist investigations and search workflows with responsible AI tooling.", icon: imgFaceRecognition },
      { title: "Virtual Fencing", text: "Detect perimeter breaches and restricted-zone activity more reliably.", icon: imgVirtualFencing },
      { title: "Vehicle Tracking", text: "Support traffic and security teams with vehicle-oriented analytics.", icon: imgVehicleTracking },
      { title: "Document Intelligence", text: "Extract and organize information from government forms and records.", icon: imgDocumentIntelligence },
      { title: "Citizen AI Assistant", text: "Help citizens get answers and complete service journeys more easily.", icon: imgCitizenAiGovt },
    ],
    useCasesIntro:
      "Government scenarios where AI improves safety, response speed, and citizen experience.",
    useCases: [
      { title: "Smart City Monitoring", text: "Improve situational awareness across urban camera and sensor networks.", icon: Building2 },
      { title: "Border Security", text: "Support monitoring and verification workflows in high-security environments.", icon: ShieldCheck },
      { title: "Missing Person Search", text: "Accelerate search support with AI-assisted visual intelligence.", icon: ScanFace },
      { title: "Traffic Management", text: "Analyze vehicle movement and congestion patterns more effectively.", icon: Route },
      { title: "Emergency Monitoring", text: "Surface critical events faster for command and response teams.", icon: AlertTriangle },
      { title: "Digital Citizen Services", text: "Automate inquiries and document-driven citizen service journeys.", icon: Bot },
    ],
    technologiesIntro:
      "AI capabilities for public safety, surveillance intelligence, identity, and digital government services.",
    technologies: [
      { name: "Smart Surveillance", icon: Camera },
      { name: "Computer Vision", icon: ImageIcon },
      { name: "OCR", icon: FileText },
      { name: "LLMs", icon: Brain },
      { name: "Video Analytics", icon: Video },
      { name: "Agentic AI", icon: Bot },
    ],
    outcomesIntro:
      "Outcomes public sector leaders prioritize: faster response, stronger safety, better efficiency, and higher citizen trust.",
    outcomes: [
      { title: "Faster Emergency Response", text: "Detect and escalate critical events with less delay." },
      { title: "Improved Public Safety", text: "Strengthen monitoring and awareness across cities and facilities." },
      { title: "Better Operational Efficiency", text: "Automate document and service workflows across agencies." },
      { title: "Stronger Citizen Trust", text: "Deliver safer, more responsive, and more transparent digital services." },
    ],
    whyTitle: "Why ElevateTrust",
    whyBody:
      "Public sector organizations trust ElevateTrust to deliver responsible AI for smarter surveillance, digital identity support, and more efficient citizen services.",
    whyCards: whyDefault,
    whyPoints: [
      "Intelligent video and monitoring systems for safer public environments",
      "Automation that reduces administrative burden across citizen services",
      "Responsible AI design with oversight for government and safety teams",
    ],
  },
};
