import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Check, Plus, Trash2, Upload } from "lucide-react";
import FlyCTA from "../components/FlyCTA";
import { useAdminJobs } from "../hooks/useAdminData";
import { parseResumeFile } from "../lib/resumeParser";
import linkedinLogo from "../assets/footer/LinkedinLogo.svg";

const steps = ["My Information", "My Experience", "Review"] as const;
type Step = (typeof steps)[number];

type ExperienceEntry = {
  id: string;
  workTitle: string;
  duration: string;
  description: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  countryCode: string;
  phone: string;
  email: string;
  homePhone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  resumeFile: File | null;
  coverLetterFile: File | null;
  experiences: ExperienceEntry[];
};

const emptyExperience = (): ExperienceEntry => ({
  id: crypto.randomUUID(),
  workTitle: "",
  duration: "",
  description: "",
});

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  countryCode: "",
  phone: "",
  email: "",
  homePhone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  resumeFile: null,
  coverLetterFile: null,
  experiences: [],
};

export default function JobApplication() {
  const { jobId } = useParams<{ jobId: string }>();
  const jobs = useAdminJobs();
  const job = jobs.find((j) => j.id === jobId);
  const [currentStep, setCurrentStep] = useState<Step>("My Information");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [autofillStatus, setAutofillStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [autofillMessage, setAutofillMessage] = useState("");
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentStepIndex = steps.indexOf(currentStep);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, resumeFile: file }));
    setAutofillStatus("idle");
    setAutofillMessage("");
  };

  const handleCoverLetterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, coverLetterFile: file }));
  };

  const handleAutofill = async () => {
    if (!formData.resumeFile) return;

    setAutofillStatus("loading");
    setAutofillMessage("Extracting details from your resume…");

    try {
      const parsed = await parseResumeFile(formData.resumeFile);
      setFormData((prev) => ({
        ...prev,
        firstName: parsed.firstName || prev.firstName,
        lastName: parsed.lastName || prev.lastName,
        email: parsed.email || prev.email,
        phone: parsed.phone || prev.phone,
        address1: parsed.address1 || prev.address1,
        city: parsed.city || prev.city,
        state: parsed.state || prev.state,
        zipCode: parsed.zipCode || prev.zipCode,
        experiences:
          parsed.experiences && parsed.experiences.length > 0
            ? parsed.experiences.map((exp) => ({
                id: crypto.randomUUID(),
                workTitle: exp.workTitle,
                duration: exp.duration,
                description: exp.description,
              }))
            : prev.experiences,
      }));
      setAutofillStatus("done");
      setAutofillMessage(
        "Fields filled from your resume where we could find matching details. Please review and edit as needed.",
      );
    } catch {
      setAutofillStatus("error");
      setAutofillMessage(
        "We couldn’t extract text from this file. You can still fill the form manually.",
      );
    }
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, emptyExperience()],
    }));
  };

  const updateExperience = (
    id: string,
    field: keyof Omit<ExperienceEntry, "id">,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const canProceedStep1 =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.countryCode.trim() &&
    formData.phone.trim() &&
    formData.email.trim() &&
    formData.address1.trim() &&
    formData.city.trim() &&
    formData.state.trim() &&
    formData.zipCode.trim();

  const goNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
      window.scrollTo(0, 0);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="font-['Lay_Grotesk_Trial',sans-serif] bg-white text-[#272935] min-h-screen">
        <div className="w-full max-w-[1692px] mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h1 className="text-[clamp(28px,3.5vw,42px)] font-bold mb-4">Application Submitted!</h1>
          <p className="text-[#848b9b] text-[clamp(16px,1.4vw,20px)] max-w-lg mx-auto mb-8">
            Thank you for applying{job ? ` for ${job.title}` : ""}. We will review your application and get back to you soon.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-1.5 py-3 pl-[26px] pr-3.5 bg-[#2365aa] rounded-full text-white font-normal text-base leading-[1.2] uppercase no-underline hover:bg-[#1a5490] transition-colors"
          >
            Back to Careers
            <span className="inline-flex items-center justify-center w-[37px] h-[37px] rounded-full bg-white text-[#2365aa]">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
        <FlyCTA />
      </div>
    );
  }

  return (
    <div className="font-['Lay_Grotesk_Trial',sans-serif] bg-white text-[#272935] min-h-screen">
      <div className="w-full max-w-[1692px] mx-auto px-6 pt-[clamp(28px,3vw,48px)]">
        <nav
          className="flex flex-wrap items-center gap-2.5 pb-6 text-[clamp(14px,1.2vw,18px)] lg:text-[clamp(13px,1vw,15px)] 2xl:text-[clamp(14px,1.2vw,18px)] font-normal leading-[1.2] text-[#272935]"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="text-inherit no-underline hover:text-[#2365aa] transition-colors">Home</Link>
          <span className="text-[#848b9b]">»</span>
          <Link to="/careers" className="text-inherit no-underline hover:text-[#2365aa] transition-colors">Careers</Link>
          <span className="text-[#848b9b]">»</span>
          <span className="text-[#272935]">Apply</span>
        </nav>

        {job && (
          <div className="mb-8">
            <p className="text-[#848b9b] text-[clamp(14px,1.2vw,16px)] mb-1">You are applying for:</p>
            <h1 className="text-[#2365aa] font-bold text-[clamp(20px,2.2vw,28px)] leading-tight">
              {job.title} ({job.id})
            </h1>
          </div>
        )}

        <div className="mb-10 lg:mb-14">
          <div className="flex items-center justify-between max-w-[700px] mx-auto relative">
            <div className="absolute top-4 left-0 right-0 h-[3px] bg-[#d9d9d9] z-0" />
            <div
              className="absolute top-4 left-0 h-[3px] bg-[#2365aa] z-[1] transition-all duration-300"
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step, idx) => (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors ${
                    idx <= currentStepIndex
                      ? "bg-[#2365aa] border-[#2365aa] text-white"
                      : "bg-white border-[#d9d9d9] text-[#848b9b]"
                  }`}
                >
                  {idx < currentStepIndex ? <Check size={16} /> : idx + 1}
                </div>
                <span
                  className={`mt-2 text-xs sm:text-sm font-medium text-center whitespace-nowrap ${
                    idx <= currentStepIndex ? "text-[#2365aa]" : "text-[#848b9b]"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[900px] mx-auto px-6 pb-16">
        {currentStep === "My Information" && (
          <div>
            {/* Resume / LinkedIn, first page */}
            <h2 className="text-[#2365aa] font-bold text-[clamp(22px,2.4vw,32px)] mb-3">Resume/CV</h2>
            <p className="text-[#5a5a5a] text-[clamp(14px,1.2vw,16px)] mb-6 leading-relaxed">
              Upload your Resume/CV using DOC, DOCX, PDF, or TXT (1MB max), apply with LinkedIn, or fill the form manually below.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
              <button
                type="button"
                className="inline-flex items-center gap-2.5 py-2.5 px-5 bg-[#2365aa] rounded-full text-white font-medium text-sm hover:bg-[#1a5490] transition-colors"
                onClick={() => window.open("https://www.linkedin.com", "_blank")}
              >
                <img src={linkedinLogo} alt="" className="w-5 h-5 brightness-0 invert" />
                Apply With LinkedIn
              </button>
              <span className="text-[#848b9b] text-sm font-medium">or</span>
              <button
                type="button"
                onClick={() => resumeInputRef.current?.click()}
                className="inline-flex items-center gap-2 py-2.5 px-5 border-2 border-[#2365aa] rounded-full text-[#2365aa] font-medium text-sm hover:bg-[#2365aa] hover:text-white transition-colors"
              >
                <Upload size={16} strokeWidth={2.5} />
                Upload Resume
              </button>
              <input
                ref={resumeInputRef}
                type="file"
                accept=".doc.docx.pdf.txt"
                className="hidden"
                onChange={handleResumeChange}
              />
            </div>

            {formData.resumeFile && (
              <div className="mb-6 space-y-3">
                <div className="p-3 bg-[#f4f7f9] rounded-lg flex flex-wrap items-center gap-3">
                  <Check size={18} className="text-green-600 shrink-0" />
                  <span className="text-sm text-[#272935] font-medium truncate flex-1 min-w-0">
                    {formData.resumeFile.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleAutofill}
                    disabled={autofillStatus === "loading"}
                    className="inline-flex items-center gap-2 py-2 px-4 bg-[#f07c62] rounded-full text-white font-medium text-sm hover:bg-[#e06a50] transition-colors disabled:opacity-60"
                  >
                    {autofillStatus === "loading" ? "Extracting…" : "Auto-fill from Resume"}
                  </button>
                </div>
                {autofillMessage && (
                  <p
                    className={`text-sm ${
                      autofillStatus === "error" ? "text-red-600" : "text-[#2365aa]"
                    }`}
                  >
                    {autofillMessage}
                  </p>
                )}
              </div>
            )}

            <h3 className="font-bold text-[clamp(16px,1.6vw,20px)] text-[#272935] mb-2 mt-2">Cover Letter (optional)</h3>
            <p className="text-[#5a5a5a] text-sm mb-4">
              Upload a cover letter using DOC, DOCX, PDF, or TXT (1MB max).
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                type="button"
                onClick={() => coverLetterInputRef.current?.click()}
                className="inline-flex items-center gap-2 py-2.5 px-5 bg-[#2365aa] rounded-full text-white font-medium text-sm hover:bg-[#1a5490] transition-colors"
              >
                Select File
              </button>
              <input
                ref={coverLetterInputRef}
                type="file"
                accept=".doc.docx.pdf.txt"
                className="hidden"
                onChange={handleCoverLetterChange}
              />
              {formData.coverLetterFile && (
                <span className="text-sm text-[#272935] font-medium truncate">
                  {formData.coverLetterFile.name}
                </span>
              )}
            </div>

            <hr className="border-[#d9d9d9] my-8" />

            <h2 className="text-[#2365aa] font-bold text-[clamp(22px,2.4vw,32px)] mb-8">My Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <FieldInput
                label="Legal First Name"
                required
                value={formData.firstName}
                onChange={(v) => updateField("firstName", v)}
              />
              <FieldInput
                label="Legal Last Name"
                required
                value={formData.lastName}
                onChange={(v) => updateField("lastName", v)}
              />
              <FieldSelect
                label="Country/Region Code"
                required
                value={formData.countryCode}
                onChange={(v) => updateField("countryCode", v)}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "+91", label: "India (+91)" },
                  { value: "+1", label: "United States (+1)" },
                  { value: "+44", label: "United Kingdom (+44)" },
                  { value: "+61", label: "Australia (+61)" },
                  { value: "+49", label: "Germany (+49)" },
                  { value: "+33", label: "France (+33)" },
                  { value: "+81", label: "Japan (+81)" },
                  { value: "+86", label: "China (+86)" },
                  { value: "+971", label: "UAE (+971)" },
                  { value: "+65", label: "Singapore (+65)" },
                ]}
              />
              <FieldInput
                label="Phone Number"
                required
                type="tel"
                value={formData.phone}
                onChange={(v) => updateField("phone", v)}
              />
              <FieldInput
                label="Personal Email"
                required
                type="email"
                value={formData.email}
                onChange={(v) => updateField("email", v)}
              />
              <FieldInput
                label="Home Phone"
                type="tel"
                value={formData.homePhone}
                onChange={(v) => updateField("homePhone", v)}
              />
              <div className="md:col-span-2">
                <FieldInput
                  label="Address Line 1"
                  required
                  value={formData.address1}
                  onChange={(v) => updateField("address1", v)}
                />
              </div>
              <div className="md:col-span-2">
                <FieldInput
                  label="Address Line 2"
                  value={formData.address2}
                  onChange={(v) => updateField("address2", v)}
                />
              </div>
              <FieldInput
                label="City"
                required
                value={formData.city}
                onChange={(v) => updateField("city", v)}
              />
              <FieldInput
                label="State"
                required
                value={formData.state}
                onChange={(v) => updateField("state", v)}
                placeholder="Please type here"
              />
              <FieldInput
                label="Zip/Postal Code"
                required
                value={formData.zipCode}
                onChange={(v) => updateField("zipCode", v)}
              />
            </div>

            <div className="flex justify-end mt-10">
              <button
                type="button"
                disabled={!canProceedStep1}
                onClick={goNext}
                className="inline-flex items-center gap-1.5 py-3 pl-[26px] pr-3.5 bg-[#2365aa] rounded-full text-white font-normal text-base leading-[1.2] uppercase no-underline hover:bg-[#1a5490] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <span className="inline-flex items-center justify-center w-[37px] h-[37px] rounded-full bg-white text-[#2365aa]">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </div>
        )}

        {currentStep === "My Experience" && (
          <div>
            <h2 className="text-[#2365aa] font-bold text-[clamp(22px,2.4vw,32px)] mb-3">My Experience</h2>
            <p className="text-[#5a5a5a] text-[clamp(14px,1.2vw,16px)] mb-8 leading-relaxed">
              Add your work experience if you’d like. This step is optional. You can skip it and continue to review.
            </p>

            {formData.experiences.length === 0 ? (
              <div className="rounded-[16px] border border-dashed border-[#d9d9d9] bg-[#f4f7f9] p-8 text-center mb-8">
                <p className="text-[#848b9b] text-sm mb-4">No experience added yet.</p>
                <button
                  type="button"
                  onClick={addExperience}
                  className="inline-flex items-center gap-2 py-2.5 px-5 bg-[#2365aa] rounded-full text-white font-medium text-sm hover:bg-[#1a5490] transition-colors"
                >
                  <Plus size={16} strokeWidth={2.5} />
                  Add Experience
                </button>
              </div>
            ) : (
              <div className="space-y-6 mb-6">
                {formData.experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="rounded-[16px] border border-[#d9d9d9] bg-white p-5 sm:p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-[#272935] text-base">
                        Experience {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="inline-flex items-center gap-1.5 text-sm text-[#848b9b] hover:text-red-600 transition-colors"
                        aria-label="Remove experience"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                      <FieldInput
                        label="Work Title"
                        value={exp.workTitle}
                        onChange={(v) => updateExperience(exp.id, "workTitle", v)}
                        placeholder="e.g. Product Designer"
                      />
                      <FieldInput
                        label="Duration"
                        value={exp.duration}
                        onChange={(v) => updateExperience(exp.id, "duration", v)}
                        placeholder="e.g. Jan 2022 - Present"
                      />
                      <div className="md:col-span-2">
                        <label className="text-[#272935] text-sm font-medium mb-2 block">
                          What you did there
                        </label>
                        <textarea
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(exp.id, "description", e.target.value)
                          }
                          rows={4}
                          placeholder="Describe your role, responsibilities, and achievements…"
                          className="w-full px-4 py-3 border border-[#d9d9d9] rounded-[10px] bg-white text-[#272935] text-sm font-normal outline-none focus:border-[#2365aa] transition-colors resize-y min-h-[110px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addExperience}
                  className="inline-flex items-center gap-2 py-2.5 px-5 border-2 border-[#2365aa] rounded-full text-[#2365aa] font-medium text-sm hover:bg-[#f4f7f9] transition-colors"
                >
                  <Plus size={16} strokeWidth={2.5} />
                  Add Another Experience
                </button>
              </div>
            )}

            <div className="flex justify-between mt-10">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 py-3 pl-[26px] pr-3.5 border-2 border-[#2365aa] rounded-full text-[#2365aa] font-normal text-base leading-[1.2] uppercase hover:bg-[#f4f7f9] transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-1.5 py-3 pl-[26px] pr-3.5 bg-[#2365aa] rounded-full text-white font-normal text-base leading-[1.2] uppercase no-underline hover:bg-[#1a5490] transition-colors"
              >
                Next
                <span className="inline-flex items-center justify-center w-[37px] h-[37px] rounded-full bg-white text-[#2365aa]">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </div>
        )}

        {currentStep === "Review" && (
          <div>
            <h2 className="text-[#2365aa] font-bold text-[clamp(22px,2.4vw,32px)] mb-8">Review Your Application</h2>

            <div className="bg-[#f4f7f9] rounded-[20px] p-[clamp(20px,2.5vw,32px)] mb-6">
              <h3 className="font-semibold text-lg text-[#272935] mb-4 border-b border-[#d9d9d9] pb-3">Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <ReviewRow label="Resume/CV" value={formData.resumeFile?.name || "Not uploaded"} />
                <ReviewRow label="Cover Letter" value={formData.coverLetterFile?.name || "Not uploaded"} />
              </div>
            </div>

            <div className="bg-[#f4f7f9] rounded-[20px] p-[clamp(20px,2.5vw,32px)] mb-6">
              <h3 className="font-semibold text-lg text-[#272935] mb-4 border-b border-[#d9d9d9] pb-3">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <ReviewRow label="First Name" value={formData.firstName} />
                <ReviewRow label="Last Name" value={formData.lastName} />
                <ReviewRow label="Country/Region" value={formData.countryCode} />
                <ReviewRow label="Phone" value={formData.phone} />
                <ReviewRow label="Email" value={formData.email} />
                <ReviewRow label="Home Phone" value={formData.homePhone || "-"} />
                <ReviewRow label="Address Line 1" value={formData.address1} />
                <ReviewRow label="Address Line 2" value={formData.address2 || "-"} />
                <ReviewRow label="City" value={formData.city} />
                <ReviewRow label="State" value={formData.state} />
                <ReviewRow label="Zip/Postal Code" value={formData.zipCode} />
              </div>
            </div>

            <div className="bg-[#f4f7f9] rounded-[20px] p-[clamp(20px,2.5vw,32px)] mb-8">
              <h3 className="font-semibold text-lg text-[#272935] mb-4 border-b border-[#d9d9d9] pb-3">Experience</h3>
              {formData.experiences.length === 0 ? (
                <p className="text-sm text-[#848b9b]">No experience added.</p>
              ) : (
                <div className="space-y-5">
                  {formData.experiences.map((exp, index) => (
                    <div key={exp.id} className="border-b border-[#d9d9d9] last:border-0 pb-4 last:pb-0">
                      <p className="text-xs text-[#848b9b] mb-2">Experience {index + 1}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                        <ReviewRow label="Work Title" value={exp.workTitle || "-"} />
                        <ReviewRow label="Duration" value={exp.duration || "-"} />
                        <div className="sm:col-span-2">
                          <ReviewRow label="What you did" value={exp.description || "-"} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between mt-10">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 py-3 pl-[26px] pr-3.5 border-2 border-[#2365aa] rounded-full text-[#2365aa] font-normal text-base leading-[1.2] uppercase hover:bg-[#f4f7f9] transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-1.5 py-3 pl-[26px] pr-3.5 bg-[#2365aa] rounded-full text-white font-normal text-base leading-[1.2] uppercase no-underline hover:bg-[#1a5490] transition-colors"
              >
                Submit Application
                <span className="inline-flex items-center justify-center w-[37px] h-[37px] rounded-full bg-white text-[#2365aa]">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <FlyCTA />
    </div>
  );
}

function FieldInput({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#272935] text-sm font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[46px] px-4 border border-[#d9d9d9] rounded-[10px] bg-white text-[#272935] text-sm font-normal outline-none focus:border-[#2365aa] transition-colors"
      />
    </div>
  );
}

function FieldSelect({
  label,
  required,
  value,
  onChange,
  options,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#272935] text-sm font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[46px] px-4 border border-[#d9d9d9] rounded-[10px] bg-white text-[#272935] text-sm font-normal outline-none focus:border-[#2365aa] transition-colors appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[#848b9b] text-xs font-medium">{label}</span>
      <span className="text-[#272935] text-sm font-medium whitespace-pre-wrap">{value}</span>
    </div>
  );
}
