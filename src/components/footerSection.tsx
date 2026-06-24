import elevateFooterLogo from "../assets/footer/elevatelogo.svg";
import facebookLogo from "../assets/footer/FacebookLogo.svg";
import youtubeLogo from "../assets/footer/YoutubeLogo.svg";
import linkedinLogo from "../assets/footer/LinkedinLogo.svg";
import instagramLogo from "../assets/footer/InstagramLogo.svg";
import tiktokLogo from "../assets/footer/TiktokLogo.svg";
import xLogo from "../assets/footer/xlogo.svg";
import worldMapBackground from "../assets/footer/worldmapfooter.svg"
import elevateFooterServiceLogo from "../assets/footer/elevateservicelogo.svg";
import maskGroup from "../assets/homepage-icons/Mask-group.svg";
import paperplanefooter from "../assets/footer/PaperPlaneTilt.svg";

const services = [
  "Overview",
  "AI/ML Solution",
  "Generative AI",
  "Video Analytics",
  "Cloud Deployment",
];

const otherServices = [
  "UI/UX Design Content",
  "Web Design & Development",
  "Mobile App Development",
  "Custom Software Development",
  "Ecommerce Development",
  "Digital Marketing Services",
  "ERP Solutions",
];

const aboutCompany = ["Overview", "Blog", "Career", "Contact Us"];

const socialLinks = [
  { label: "YouTube", icon: youtubeLogo, href: "#" },
  { label: "Facebook", icon: facebookLogo, href: "#" },
  { label: "LinkedIn", icon: linkedinLogo, href: "#" },
  { label: "Instagram", icon: instagramLogo, href: "#" },
  { label: "TikTok", icon: tiktokLogo, href: "#" },
  { label: "X", icon: xLogo, href: "#" },
];

function FooterList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 space-y-[1px]">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <a href="#" className="inline-flex items-center gap-2 text-[10px] text-white hover:text-white">
            <img src={elevateFooterServiceLogo} alt="" aria-hidden="true" className="h-2 w-2 shrink-0" />
            <span>{item}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-[#113D77] px-4 pb-6 pt-14 text-white sm:px-6 lg:px-14">
      <img
        src={worldMapBackground}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 left-1/2 w-[1280px] max-w-none -translate-x-1/2 opacity-90"
      />

      <div className="relative mx-auto max-w-9xl  mb-5">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col ">
            <img src={elevateFooterLogo} alt="Elevate Trust logo" className="h-auto w-50" />
            <p className="mt-6 max-w-xs w-[270px] text-[10px] leading-[16px] aline-center justify-center text-white/40 mt-10">
              We partner with innovators to develop state-of-the-art AI solutions designed to drive strategic business outcomes. Our expertise covers a wide range of industries, tackling complex challenges with AI algorithms specifically tailored for both structured and unstructured data.
            </p>
          </div>

          <div>
            <h3 className="text-[20px] font-semibold uppercase tracking-normal">Services</h3>
            <FooterList items={services} />
          </div>


          <div>
            <h3 className="text-[20px] font-semibold uppercase tracking-normal">Other Services</h3>
            <FooterList items={otherServices} />
          </div>

          <div>
            <h3 className="text-[22px] font-semibold uppercase tracking-normal">About Company</h3>
            <FooterList items={aboutCompany} />
          </div>
        </div>

        <div className="mb-8 mt-7"><br /><br />
          <hr className="my-8 mt-[15px] mb-18  opacity-10" />
        </div>

        <div className="grid grid-cols-1 gap-1 mt-10 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <h3 className="text-[20px] font-semibold uppercase">Contact</h3>
            <div className="mt-10 space-y-1.5 ml-7 text-white/85">
              <p className="text-[15px]">+91-9243322064</p>
              <p className="text-[15px]">info@elevatetrust.ai</p>
              <p className="text-[15px]">Pimple Saudagar, Pune Maharashtra</p>
            </div>
          </div>

          <div>
            <h3 className="text-[20px] font-semibold uppercase">Partners</h3>
            <img src={maskGroup} alt="Partner logos" className="mt-10 h-auto w-full max-w-[230px]" />
          </div>

          <div>
            <h3 className="text-[20px] font-semibold uppercase">Newsletter</h3>
            <form className="mt-10 max-w-[350px] ">
              <div className="flex items-center rounded-full h-11 border border-white/40 bg-white/10 p-1.5 backdrop-blur-sm">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/65 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full h-8 w-8 bg-white p-2 text-[#113D77] transition hover:bg-[#dce9f8]"
                  aria-label="Submit newsletter email"
                >
                  <img src={paperplanefooter} alt="Arrow Right" className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-1 text-[9px] tracking-tight text-white/25">Subscribe to our newsletterd</p>
            </form>
          </div>
        </div>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 pt-2 md:flex-row md:items-center">
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="rounded-md p-1 transition hover:bg-white/10"
              >
                <img src={social.icon} alt="" aria-hidden="true" className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="text-[9.5px] text-white/85 md:text-right">
            <a href="#" className="hover:text-white ">
              Terms and condition
            </a>
            <span className="mx-1.5 opacity-50">|</span>
            <a href="#" className="hover:text-white ">
              Privacy Policy
            </a>
            <p className="mt-1 text-[9.5px] text-white/85">© 2026 Elevate Trust. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
