import  { useState } from 'react'
import { Check } from 'lucide-react'
import frame1 from "../assets/ServiceIcon/frame1.svg"
import frame2 from "../assets/ServiceIcon/frame2.svg"
import frame3 from "../assets/ServiceIcon/frame3.svg"
import frame4 from "../assets/ServiceIcon/frame4.svg"
import frame5 from "../assets/ServiceIcon/frame5.svg"
import frame6 from "../assets/ServiceIcon/frame6.svg"
import frame7 from "../assets/ServiceIcon/frame7.svg"
import storiesVector from "../assets/homepage-icons/stories-vector.png"


const services = [
  {
    title: "Product Engineering",
    subTitle: 
    [
        {"Application Development": "Tailored application development services to address unique business needs, delivering scalable, high-performance applications with a focus on innovation, security, and user experience."},
        {"Website Development": "Crafting high-performance, responsive, and SEO-optimized websites that serve as robust digital storefronts. Focused on modern tech stacks, seamless navigation, and secure architectures to drive business engagement."},
        {"Hybrid Mobile Development": "Building cross-platform mobile applications that combine the best of native and web technologies, ensuring consistent performance across devices while optimizing development time and cost."},
        {"Desktop App Development": "Creating robust and secure desktop applications for Windows, macOS, and Linux, crafted to deliver seamless offline performance, data processing, and specialized functionality for diverse business requirements."}
    ],
    description: "Product Engineering enables the transformation of concepts into market-ready applications, ensuring efficiency, adaptability, and cutting-edge technology integration.",
    image: frame1,
  },
  {
    title: "Artificial Intelligence (AI)",
    subTitle: 
    [
        {"Agentic AI": "Designing and deploying autonomous AI agents capable of reasoning, planning, and executing multi-step workflows. These self-correcting systems integrate seamlessly with enterprise tools to handle complex tasks with minimal human intervention."},
        {"Video Analytics": "Leveraging computer vision models to transform raw video data into actionable intelligence. Applications include real-time object detection, crowd management, behavioral analysis, and automated security monitoring."}
    ],
    description: "Artificial Intelligence empowers enterprises to automate complex workflows, unlock predictive capabilities, and deliver hyper-personalized user experiences through intelligent systems.",
    image: frame2,
  },
  {
    title: "Internet of Things (IoT)",
    subTitle: 
    [
        {"Smart Device Integration": "Connecting and managing diverse sensor networks and edge devices, ensuring secure data ingestion, low-latency communication, and centralized hardware fleet management. "},
        {"Edge Computing & Analytics": "Connecting and managing diverse sensor networks and edge devices, ensuring secure data ingestion, low-latency communication, and centralized hardware fleet management."}
    ],
    description: "Internet of Things bridges the gap between the physical and digital worlds, creating interconnected ecosystems that optimize operations and capture real-time environmental data.",
    image: frame3,
  },
  {
    title: "CloudOps",
    subTitle: 
    [
        {"Cloud Infrastructure Management": "Designing and maintaining scalable cloud architectures with automated provisioning, proactive monitoring, and rigorous resource optimization to maximize ROI."},
        {"Disaster Recovery & Business Continuity": "Implementing robust backup strategies and failover mechanisms to guarantee minimal downtime and bulletproof data resiliency against unexpected system disruptions."}
    ],
    description: "CloudOps ensures continuous operational excellence, cost optimization, and high availability across public, private, and hybrid cloud environments.",
    image: frame4,
  },
  {
    title: "Data Insights",
    subTitle: 
    [
        {"Data Engineering & Pipelines": "Building secure, scalable data lakes and ETL/ELT pipelines that consolidate disparate data sources into a single, clean source of truth."},
        {"Predictive Analytics & Reporting": "Utilizing statistical models and intuitive BI dashboards to forecast market trends, track key performance indicators, and uncover hidden operational efficiencies."}
    ],
    description: "Data Insights turns raw organizational data into a strategic asset, enabling data-driven decision-making through advanced analytics and business intelligence.",
    image: frame5,
  },
  {
    title: "Quality Assurance ",
    subTitle: 
    [
        {"Automated & Manual Testing": "Deploying robust test automation frameworks alongside meticulous exploratory manual testing to identify vulnerabilities, eliminate bugs, and accelerate release cycles."},
        {"Performance & Security Testing": "Subjecting applications to stringent load, stress, and penetration testing to ensure they can handle peak traffic and resist evolving cybersecurity threats."}
    ],
    description: "Quality Assurance guarantees software reliability, security, and performance through rigorous testing methodologies across the entire development lifecycle.",
    image: frame6,
  },
  {
    title: "24x7 Storage Support",
    subTitle: 
    [
        {"Proactive Infrastructure Monitoring": "Continuous, real-time oversight of storage arrays, SAN/NAS networks, and cloud storage repositories to identify and resolve performance bottlenecks before they impact business."},
        {"Incident Response & Zero-Downtime Patching": "Immediate intervention by dedicated storage specialists for hardware failures or capacity constraints, paired with seamless, non-disruptive system upgrades."}
    ],
    description: "24x7 Storage Support delivers round-the-clock maintenance and monitoring for enterprise data centers, ensuring absolute data integrity and zero operational downtime.",
    image: frame7,
  }
]

export default function Service() {
    const [activeTab, setActiveTab] = useState(0);

    const activeService = services[activeTab];

  return (
    <div className="relative flex flex-col justify-center items-start py-12 px-4 sm:px-6 md:px-8 lg:p-20 gap-4 w-full bg-[#F3F8FC] overflow-hidden">
      {/* Background Vector Graphic */}
      <img
        src={storiesVector}
        alt=""
        className="absolute right-0 bottom-0 pointer-events-none select-none z-0 w-[240px] sm:w-[320px] lg:w-[420px] h-auto opacity-45 object-contain object-right-bottom"
      />

      <h1 className="uppercase z-10">
        <span className=" text-black text-[16px] font-bold">Our</span>
        <span className="text-[#2365AA] text-[16px] font-bold">Services</span>
      </h1>
      <p className="text-[18px] text-black font-bold z-10">AI Solutions for Automation, Growth, and Innovation</p>
      
      <div className="flex flex-col lg:flex-row justify-start items-stretch w-full gap-6 lg:gap-8 z-10 mt-4">
        {/* Left Tabs Container */}
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible w-full lg:w-[300px] shrink-0 gap-3 pb-4 lg:pb-0 scrollbar-none snap-x -mx-4 px-4 lg:mx-0 lg:px-0"> 
          {services.map((service, index) => (
            <div
              key={service.title}
              onClick={() => setActiveTab(index)}
              className={`cursor-pointer snap-start flex-shrink-0 min-w-[240px] sm:min-w-[280px] lg:w-full flex flex-row items-center justify-start gap-4 rounded-[1.1rem] border p-4 transition-all duration-300
                ${
                  activeTab === index
                    ? "bg-[#2365AA] text-white border-black shadow-md"
                    : "bg-white text-black border-[#E5E7EB] hover:border-[#2365AA]/30"
                }
              `}
            >
              <img
                src={service.image}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
                alt={service.title}
              />

              <h3 className="text-[15px] sm:text-[16px] font-bold text-left flex-1 leading-snug">
                {service.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Right Content Card Container */}
        <div className="w-full lg:flex-1">
          {activeService && (
            <div className="relative flex flex-col w-full bg-white border border-[#E5E7EB] rounded-[1.1rem] p-6 sm:p-8 md:p-10 text-start min-h-[480px] lg:min-h-[560px] justify-between shadow-sm">
              <div className="flex flex-col gap-6 lg:max-w-[70%] z-10">
                <div>
                  <h2 className="text-[22px] sm:text-[24px] text-black font-bold mb-4 leading-tight">
                    {activeService.title}
                  </h2>
                  <p className="text-gray-600 text-[15px] sm:text-[16px] leading-relaxed mb-6">
                    {activeService.description}
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {activeService.subTitle.map((item, index) => {
                    const title = Object.keys(item)[0];
                    const description = Object.values(item)[0];

                    return (
                      <div key={index} className="flex flex-col">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 border-[#2365AA] text-[#2365AA] mt-[3px]">
                            <Check className="w-3 h-3 stroke-[3px]" />
                          </span>
                          <div className="flex flex-col">
                            <h3 className="text-black text-[15px] sm:text-[16px] font-bold mb-1 leading-snug">
                              {title}
                            </h3>
                            <p className="text-gray-500 text-[13px] sm:text-[14px] leading-relaxed">
                              {description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Service vector icon */}
              <img
                src={activeService.image}
                alt={activeService.title}
                className="block lg:absolute lg:bottom-8 lg:right-8 w-24 h-24 sm:w-32 sm:h-32 mx-auto lg:mx-0 mt-8 lg:mt-0 object-contain z-10"
              />
            </div>
          )}  
        </div>
      </div>
    </div>
  )
}