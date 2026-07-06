import { Mail, MapPin, Phone } from "lucide-react";
import letsConnectIcon from "../../assets/nav/lets-connect.svg";
import worldMapBackground from "../../assets/homepage-icons/wordmap.svg";

const contactItems = [
  { icon: Mail, label: "info@elevatetrust.ai", href: "mailto:info@elevatetrust.ai" },
  { icon: Phone, label: "+91-9243322064", href: "tel:+919243322064" },
  {
    icon: MapPin,
    label: "Pimple Saudagar, Pune Maharashtra",
    href: "#",
  },
];

export default function ContactHero() {
  return (
    <section className="relative h-[20rem] w-full overflow-hidden bg-[#113D77] sm:h-[22rem] md:h-[23rem] lg:h-[25rem]">
      {/* Map — same layer as ServiceHero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-[1] flex items-end justify-center overflow-hidden"
      >
        <img
          src={worldMapBackground}
          alt=""
          className="mt-12 block w-[94%] max-w-none sm:mt-16 sm:w-[88%] md:mt-20 md:w-[80%] lg:mt-18 lg:w-[70%]"
        />
      </div>

      <div className="relative z-[2] mx-auto flex h-full w-full max-w-[1440px] items-center justify-center p-4 lg:p-8">
        <div className="flex w-full max-w-[20rem] flex-col items-center gap-12 text-center sm:max-w-[34rem] sm:gap-14 md:max-w-[40rem] lg:max-w-[44rem] lg:gap-16">
          <h1 className="text-[1.25rem] font-bold leading-[1.35] text-white sm:text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] lg:leading-[1.45]">
            Contact ElevateTrust.Ai
          </h1>

          <ul className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3 lg:gap-x-12">
            {contactItems.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex items-center gap-1.5 font-ubuntu text-[12px] font-normal leading-relaxed text-white/50 transition hover:text-white/70 sm:text-[13px] md:text-[14px] lg:text-[13px]"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 stroke-[1.75] sm:h-4 sm:w-4" aria-hidden />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#2365AA] px-3 py-1.5 pl-4 pr-2 text-[10px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#1d5694] sm:py-2 sm:text-xs"
          >
            Company Profile
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white sm:h-7 sm:w-7">
              <img src={letsConnectIcon} alt="" aria-hidden className="h-4 w-4 sm:h-auto sm:w-auto" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}