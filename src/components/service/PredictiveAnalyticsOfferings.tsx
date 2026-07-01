import { Link } from "react-router-dom";
import frame1 from "../../assets/service/core/frame1.svg";
import frame2 from "../../assets/service/core/frame2.svg";
import frame3 from "../../assets/service/core/frame3.svg";
import frame4 from "../../assets/service/core/frame4.svg";

const offerings = [
  {
    title: "Smart City analytics",
    subtitle: "(Video surveillance, KYC Processes)",
    description:
      "We create custom AI solutions for Predictive Analytics, such as predicting customer churn, building recommendation systems, maintaining equipment,",
    icon: frame1,
  },
  {
    title: "Forecasting",
    subtitle: "(Sales, inventory, patient survival, Dynamic pricing)",
    description:
      "We create custom AI solutions for Predictive Analytics, such as predicting customer churn, building recommendation systems,",
    icon: frame2,
  },
  {
    title: "Predictive Maintenance for Manufacturing",
    subtitle: "",
    description:
      "We create custom AI solutions for Predictive Analytics, such as predicting customer churn, building recommendation systems, maintaining",
    icon: frame3,
  },
  {
    title: "Churn prediction and Recommendation systems",
    subtitle: "",
    description:
      "We create custom AI solutions for Predictive Analytics, such as predicting customer churn, building recommendation systems, maintaining equipment, forecasting in manufacturing,",
    icon: frame4,
  },
];

export default function PredictiveAnalyticsOfferings() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-site px-5 pb-10 pt-3 sm:px-8 md:px-10 lg:px-20 lg:py-8">
        <nav
          className="mb-10 text-center text-[10px] text-[#9CA3AF] sm:mb-12 sm:text-xs lg:mb-6 lg:text-left"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-[#6B7280]">
            Home
          </Link>
          <span className="mx-1.5">»</span>
          <span>Our Services</span>
          <span className="mx-1.5">»</span>
          <span className="text-[#6B7280]">Custom AI/ML Solutions</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-[minmax(260px,340px)_1fr] lg:gap-16">
          {/* Left column — centered on phone/tablet, left on lg+ */}
          <div className="text-center lg:pt-2 lg:text-left">
            <h2 className="text-[1.75rem] font-bold leading-[1.2] text-[#1F2432] sm:text-[2rem] md:text-[2.25rem] lg:text-[56px] lg:leading-[62px]">
              Core Offerings
              <br />
              Predictive Analytics
            </h2>
            <p className="mx-auto mt-5 max-w-[34rem] text-xs leading-6 text-[#9CA3AF] sm:mt-6 sm:text-sm sm:leading-7 lg:mx-0 lg:mt-8 lg:max-w-none">
              We create custom AI solutions for Predictive Analytics, such as
              predicting customer churn, building recommendation systems,
              maintaining equipment, forecasting in manufacturing, and analyzing
              smart city data and surveillance.
            </p>
          </div>

          {/* Cards — centered on phone/tablet, left on lg+ */}
          <div className="grid min-w-0 grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-6 md:gap-y-12 lg:gap-x-10 lg:gap-y-16">
            {offerings.map((item) => (
              <article
                key={item.title}
                className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left"
              >
                <img
                  src={item.icon}
                  alt=""
                  className="mb-4 h-[110px] w-[150px] max-w-full object-contain sm:h-[130px] sm:w-[175px] md:h-[140px] md:w-[190px] lg:h-[171px] lg:w-[228px] lg:object-left"
                  aria-hidden
                />
                <div className="mb-4 w-[95%] border-t border-[#D1D5DB] sm:mb-5 lg:mr-auto" />
                <h3 className="w-[90%] text-base font-bold leading-snug text-[#1F2432] sm:text-lg lg:text-[20px] lg:leading-[28px]">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="mt-1 text-[13px] w-[90%] font-medium leading-snug text-[#1F2432] sm:text-[15px] lg:text-[16px] lg:leading-[22px]">
                    {item.subtitle}
                  </p>
                )}
                <p className="mt-3 w-full text-xs leading-5 text-[#9CA3AF] sm:mt-4 sm:text-sm sm:leading-6 lg:w-[90%]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
