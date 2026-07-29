import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import worldMapBackground from "../../assets/homepage-icons/Group(3).png";

export default function ServiceHero() {
  return (
    <section className="service-page-hero" aria-label="AI/ML Solutions">
      <img
        src={worldMapBackground}
        alt=""
        aria-hidden
        className="service-page-hero__map"
      />
      <div className="service-page-hero__content">
        <h1 className="m-0 text-[clamp(28px,3.8vw,48px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
          Custom AI/ML Solutions for Strategic Business Outcomes
        </h1>
        <p className="mt-[clamp(12px,1.5vw,20px)] max-w-[783px] font-['Ubuntu',sans-serif] text-[clamp(14px,1.4vw,18px)] font-normal leading-6 text-[#a1b1cb] lg:text-[clamp(13px,1.1vw,15px)] 2xl:text-[clamp(14px,1.4vw,18px)]">
          We collaborate with clients to elevate AI solutions aimed at achieving
          strategic business goals. Our knowledge covers many industries,
          tackling difficult issues using AI methods designed for both
          structured and unstructured data. We are skilled in developing
          traditional Machine Learning and Deep Learning algorithms.
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
  );
}
