import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  Armchair,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import worldMapBackground from "../assets/homepage-icons/Group(3).png";
import careersIllustration from "../assets/homepage-icons/carrers.png";
import youtubeLogo from "../assets/footer/YoutubeLogo.svg";
import facebookLogo from "../assets/footer/FacebookLogo.svg";
import linkedinLogo from "../assets/footer/LinkedinLogo.svg";
import instagramLogo from "../assets/footer/InstagramLogo.svg";
import xLogo from "../assets/footer/xlogo.svg";
import { usePublicJobs } from "../hooks/useAdminData";
import { getErrorMessage } from "../lib/api";
import { groupJobsByCategory } from "../lib/adminStorage";
import { submitCareerEnquiry } from "../lib/careersApi";
import {
  FORM_LIMITS,
  isAllowedCvFile,
  isValidEmail,
  isValidPhone,
  looksUnsafe,
  sanitizePlainText,
} from "../lib/formValidation";
import "./Careers.css";

const socialLinks = [
  { src: youtubeLogo, alt: "YouTube", href: "https://www.youtube.com/@ElevateTrust.Ai0" },
  { src: facebookLogo, alt: "Facebook", href: "https://www.facebook.com/people/Elevate-Trust-AI/61589302541342/" },
  { src: linkedinLogo, alt: "LinkedIn", href: "https://www.linkedin.com/company/elevatetrustai" },
  { src: instagramLogo, alt: "Instagram", href: "https://www.instagram.com/elevatetrustai/" },
  { src: xLogo, alt: "X", href: "https://x.com/ElevateTrustai" },
];

export default function Careers() {
  const { jobs } = usePublicJobs();
  const [fileName, setFileName] = useState("No File Selected");
  const [filter, setFilter] = useState("All");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jobGroups = useMemo(() => {
    const grouped = groupJobsByCategory(jobs);
    if (filter === "All") return grouped;
    return grouped
      .map((group) => ({
        ...group,
        jobs: group.jobs.filter(
          (job) =>
            job.location === filter ||
            job.type === filter ||
            job.tag === filter ||
            job.category === filter,
        ),
      }))
      .filter((group) => group.jobs.length > 0);
  }, [jobs, filter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : "No File Selected");
  };

  const handleEnquirySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fullName = sanitizePlainText(
      String(formData.get("fullName") || ""),
      FORM_LIMITS.fullName,
    );
    const email = sanitizePlainText(
      String(formData.get("email") || ""),
      FORM_LIMITS.email,
    );
    const phone = sanitizePlainText(
      String(formData.get("phone") || ""),
      FORM_LIMITS.phone,
    );
    const jobTitle = sanitizePlainText(
      String(formData.get("jobTitle") || ""),
      FORM_LIMITS.jobTitle,
    );
    const education = sanitizePlainText(
      String(formData.get("education") || ""),
      FORM_LIMITS.education,
    );
    const expertise = sanitizePlainText(
      String(formData.get("expertise") || ""),
      FORM_LIMITS.expertise,
    );
    const message = sanitizePlainText(
      String(formData.get("message") || ""),
      FORM_LIMITS.message,
    );
    const cv = fileInputRef.current?.files?.[0];

    if (!fullName || !email || !phone) {
      setFormError("Full name, email, and phone are required.");
      return;
    }
    if (
      looksUnsafe(fullName) ||
      looksUnsafe(jobTitle) ||
      looksUnsafe(education) ||
      looksUnsafe(expertise) ||
      looksUnsafe(message)
    ) {
      setFormError("Please remove invalid characters from your submission.");
      return;
    }
    if (!isValidEmail(email)) {
      setFormError("Please provide a valid email address.");
      return;
    }
    if (!isValidPhone(phone)) {
      setFormError("Please provide a valid phone number.");
      return;
    }
    if (!cv) {
      setFormError("Please upload your CV (PDF, DOC, or DOCX).");
      return;
    }
    if (!isAllowedCvFile(cv)) {
      setFormError("CV must be PDF/DOC/DOCX and under 5MB.");
      return;
    }

    try {
      setSubmitting(true);
      const result = await submitCareerEnquiry({
        fullName,
        email,
        phone,
        jobTitle,
        education,
        expertise,
        message,
        cv,
      });
      setFormSuccess(
        result.message ||
          "Your application was sent successfully. Our team will contact you soon.",
      );
      form.reset();
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFileName("No File Selected");
    } catch (err) {
      setFormError(getErrorMessage(err, "Unable to submit your application."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="careers-page">
      <section className="careers-hero">
        <img
          src={worldMapBackground}
          alt=""
          className="careers-hero__bg"
          aria-hidden="true"
        />
        <div className="careers-hero__content">
          <div className="careers-hero__text">
            <h1 className="careers-hero__title">
              Start doing work that matters
            </h1>
            <p className="careers-hero__subtitle">
              Our philosophy is simple hire a team of diverse, passionate people
              and foster a culture that empowers you to do your best work.
            </p>
          </div>
          <img
            src={careersIllustration}
            alt=""
            className="careers-hero__illustration"
            aria-hidden="true"
          />
        </div>
      </section>

      <nav className="page-breadcrumb page-breadcrumb--standalone" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="page-breadcrumb__sep" aria-hidden="true">
          »
        </span>
        <span>Who we are</span>
        <span className="page-breadcrumb__sep" aria-hidden="true">
          »
        </span>
        <span>Careers</span>
      </nav>

      <section className="careers-enquiry">
        <div className="careers-enquiry__panel">
          <div className="careers-enquiry__info">
            <h2 className="careers-enquiry__info-title">
              Let’s build your digital future
            </h2>
            <p className="careers-enquiry__info-text">
              Our philosophy is simple hire a team of diverse, passionate people
              and foster a culture that empowers you to do your best work.
            </p>

            <ul className="careers-enquiry__contacts">
              <li className="careers-enquiry__contacts-row">
                <div>
                  <span className="careers-enquiry__icon" aria-hidden="true">
                    <Phone size={20} strokeWidth={2} />
                  </span>
                  <a href="tel:+919243322064">+91-9243322064</a>
                </div>
                <div>
                  <span className="careers-enquiry__icon" aria-hidden="true">
                    <Mail size={20} strokeWidth={2} />
                  </span>
                  <a href="mailto:info@elevatetrust.ai">info@elevatetrust.ai</a>
                </div>
              </li>
              <li>
                <span className="careers-enquiry__icon" aria-hidden="true">
                  <MapPin size={20} strokeWidth={2} />
                </span>
                <span>Pimple Saudagar, Pune Maharashtra</span>
              </li>
            </ul>

            <div className="careers-enquiry__socials">
              {socialLinks.map((item) => (
                <a key={item.alt} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.alt}>
                  <img src={item.src} alt="" />
                </a>
              ))}
            </div>
          </div>

          <div className="careers-enquiry__form-card">
            <h2 className="careers-enquiry__form-title">Send a message</h2>
            <p className="careers-enquiry__form-subtitle">Career Enquiry</p>

            <form
              className="careers-form"
              onSubmit={handleEnquirySubmit}
            >
              <label className="careers-form__field careers-form__field--full">
                <span>Full Name</span>
                <input
                  type="text"
                  name="fullName"
                  required
                  maxLength={FORM_LIMITS.fullName}
                  autoComplete="name"
                />
              </label>

              <label className="careers-form__field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={FORM_LIMITS.email}
                  autoComplete="email"
                />
              </label>

              <label className="careers-form__field">
                <span>Phone Number</span>
                <input
                  type="tel"
                  name="phone"
                  required
                  maxLength={FORM_LIMITS.phone}
                  autoComplete="tel"
                />
              </label>

              <label className="careers-form__field">
                <span>Job Title</span>
                <input
                  type="text"
                  name="jobTitle"
                  maxLength={FORM_LIMITS.jobTitle}
                />
              </label>

              <label className="careers-form__field">
                <span>Education</span>
                <input
                  type="text"
                  name="education"
                  maxLength={FORM_LIMITS.education}
                />
              </label>

              <label className="careers-form__field">
                <span>Expertise</span>
                <input
                  type="text"
                  name="expertise"
                  maxLength={FORM_LIMITS.expertise}
                />
              </label>

              <div className="careers-form__field careers-form__upload">
                <span>Upload CV</span>
                <div className="careers-form__upload-row">
                  <span className="careers-form__upload-name">{fileName}</span>
                  <button
                    type="button"
                    className="careers-form__browse"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="careers-form__file-input"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <label className="careers-form__field careers-form__field--full careers-form__field--textarea">
                <span>Message</span>
                <textarea name="message" rows={3} maxLength={FORM_LIMITS.message} />
              </label>

              {formError ? (
                <p className="careers-form__field careers-form__field--full m-0 rounded-[12px] bg-[#EEF3FB] px-3 py-2 text-sm text-[#2365aa]">
                  {formError}
                </p>
              ) : null}
              {formSuccess ? (
                <p className="careers-form__field careers-form__field--full m-0 rounded-[12px] bg-[#e8f6ee] px-3 py-2 text-sm text-[#1d5c3a]">
                  {formSuccess}
                </p>
              ) : null}

              <div className="careers-form__actions">
                <button
                  type="submit"
                  className="careers-form__submit"
                  disabled={submitting}
                >
                  <span>{submitting ? "Sending..." : "Send"}</span>
                  <span className="careers-form__submit-circle">
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="careers-jobs">
        <div className="careers-jobs__header">
          <h2 className="careers-jobs__title">Start doing work that matters</h2>
          <p className="careers-jobs__subtitle">
            Explore open roles across design, engineering, and AI, join a team
            building production-ready solutions for real business outcomes.
          </p>

          {jobs.length > 0 ? (
            <div className="careers-jobs__filter">
              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                aria-label="Filter jobs"
              >
                <option value="All">All</option>
                <option value="Remotely">Remotely</option>
                <option value="Full-time">Full-time</option>
                <option value="Design">Design</option>
                <option value="Software">Software</option>
                <option value="Software Development">Software Development</option>
              </select>
              <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          ) : null}
        </div>

        <div className={`careers-jobs__list${jobs.length === 0 ? " careers-jobs__list--empty" : ""}`}>
          {jobGroups.length > 0 ? (
            jobGroups.map((group, groupIndex) => (
              <div key={group.category}>
                {groupIndex > 0 && <hr className="careers-jobs__divider" />}
                <div className="careers-jobs__group">
                  <div className="careers-jobs__group-info">
                    <h3>{group.category}</h3>
                    <p>{group.subtitle}</p>
                  </div>
                  <div className="careers-jobs__cards">
                    {group.jobs.map((job) => (
                      <article key={job.id} className="careers-job-card">
                        <div className="careers-job-card__top">
                          <h4>{job.title}</h4>
                          <span className="careers-job-card__tag">{job.tag}</span>
                        </div>
                        <p className="careers-job-card__desc">{job.description}</p>
                        <div className="careers-job-card__meta">
                          <span>
                            <Clock size={22} strokeWidth={1.75} aria-hidden />
                            {job.type}
                          </span>
                          <span>
                            <Armchair size={22} strokeWidth={1.75} aria-hidden />
                            {job.location}
                          </span>
                        </div>
                        <div className="mt-5">
                          <Link
                            to={`/careers/apply/${job.id}`}
                            className="inline-flex items-center gap-1.5 py-2.5 pl-5 pr-2.5 bg-[#2365aa] rounded-full text-white font-normal text-sm leading-[1.2] uppercase no-underline hover:bg-[#1a5490] transition-colors"
                          >
                            Apply Now
                            <span className="inline-flex items-center justify-center w-[32px] h-[32px] rounded-full bg-white text-[#2365aa]">
                              <ArrowUpRight size={15} strokeWidth={2.5} />
                            </span>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : jobs.length === 0 ? (
            <p className="careers-jobs__empty">
              No open positions right now. Please check back soon, or send us a
              career enquiry above.
            </p>
          ) : (
            <p className="careers-jobs__subtitle">
              No open positions match this filter.
            </p>
          )}
        </div>
      </section>

      <FlyCTA />
    </div>
  );
}
