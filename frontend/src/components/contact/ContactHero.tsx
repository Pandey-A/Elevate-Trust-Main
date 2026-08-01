import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import letsConnectIcon from "../../assets/nav/lets-connect.svg";
import worldMapBackground from "../../assets/homepage-icons/Group(3).png";

const contactItems = [
  { icon: Mail, label: "info@elevatetrust.ai", href: "mailto:info@elevatetrust.ai" },
  { icon: Phone, label: "+91-9243322064", href: "tel:+919243322064" },
  {
    icon: MapPin,
    label: "Pimple Saudagar, Pune Maharashtra",
    href: "/contact",
  },
];

export default function ContactHero() {
  return (
    <section className="service-page-hero" aria-label="Contact ElevateTrust.Ai">
      <img
        src={worldMapBackground}
        alt=""
        aria-hidden
        className="service-page-hero__map"
      />

      <div className="service-page-hero__content max-w-[min(880px,92%)]">
        <h1 className="m-0 text-[clamp(28px,3.8vw,48px)] font-bold leading-[1.29] tracking-tight text-white lg:text-[clamp(26px,3vw,34px)] 2xl:text-[clamp(32px,4vw,48px)]">
          Contact ElevateTrust.Ai
        </h1>

        <ul className="mt-[clamp(16px,2vw,28px)] flex w-full list-none flex-col items-center gap-3 p-0 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3 lg:gap-x-12">
          {contactItems.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              {href.startsWith("/") ? (
                <Link
                  to={href}
                  className="inline-flex items-center gap-1.5 font-['Ubuntu',sans-serif] text-[clamp(13px,1.2vw,15px)] font-normal leading-relaxed text-[#a1b1cb] transition hover:text-white"
                >
                  <Icon className="h-4 w-4 shrink-0 stroke-[1.75]" aria-hidden />
                  <span>{label}</span>
                </Link>
              ) : (
                <a
                  href={href}
                  className="inline-flex items-center gap-1.5 font-['Ubuntu',sans-serif] text-[clamp(13px,1.2vw,15px)] font-normal leading-relaxed text-[#a1b1cb] transition hover:text-white"
                >
                  <Icon className="h-4 w-4 shrink-0 stroke-[1.75]" aria-hidden />
                  <span>{label}</span>
                </a>
              )}
            </li>
          ))}
        </ul>

        <Link
          to="/about"
          className="mt-[clamp(16px,2vw,28px)] inline-flex shrink-0 items-center gap-2 rounded-full bg-[#2365aa] py-3 pl-[26px] pr-3.5 text-base font-normal uppercase leading-[1.2] text-white no-underline transition-colors hover:bg-[#1a5490] lg:py-2.5 lg:pl-[22px] lg:pr-2.5 lg:text-sm 2xl:py-3 2xl:pl-[26px] 2xl:pr-3.5 2xl:text-base"
        >
          Company Profile
          <span className="inline-flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white">
            <img src={letsConnectIcon} alt="" aria-hidden className="h-4 w-4 sm:h-auto sm:w-auto" />
          </span>
        </Link>
      </div>
    </section>
  );
}
