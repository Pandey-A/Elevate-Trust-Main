import { useState, type FormEvent } from "react";
import paperPlaneIcon from "../../assets/footer/PaperPlaneTilt.svg";
import { useToast } from "../ui/ToastProvider";
import { getErrorMessage, submitContactLead } from "../../lib/contactApi";

export default function ContactKeepInTouch() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      showToast("Please enter your email.", "error");
      return;
    }
    if (!agreed) {
      showToast("Please agree to the terms and conditions.", "error");
      return;
    }

    try {
      setSubmitting(true);
      const message = await submitContactLead({
        email: email.trim(),
        source: "contact",
      });
      showToast(message, "success");
      setEmail("");
      setAgreed(false);
    } catch (err) {
      showToast(getErrorMessage(err, "Unable to send your email right now."), "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contact-form" className="mt-12 w-full sm:mt-14">
      <h2 className="text-left text-xl font-bold text-[#1F2432] sm:text-2xl">
        Keep in touch
      </h2>

      <form className="mt-3 w-full" onSubmit={onSubmit} noValidate>
        <div className="flex h-[52px] w-full items-center rounded-[0.6rem] border-[0.05rem] border-black bg-white pl-5 pr-2 sm:h-[58px] sm:pl-6">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="YOUR EMAIL"
            autoComplete="email"
            disabled={submitting}
            className="w-full bg-transparent text-xs uppercase tracking-wide text-[#1F2432] placeholder:text-[#9CA3AF] focus:outline-none disabled:opacity-60 sm:text-sm"
          />
          <button
            type="submit"
            disabled={submitting}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2365AA] transition hover:bg-[#1d5694] disabled:cursor-not-allowed disabled:opacity-70 sm:h-9 sm:w-9"
            aria-label="Submit email"
          >
            <img
              src={paperPlaneIcon}
              alt=""
              aria-hidden
              className="h-4 w-4 brightness-0 invert"
            />
          </button>
        </div>

        <label className="mt-4 flex cursor-pointer items-center justify-start gap-2.5 text-left">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            disabled={submitting}
            className="h-4 w-4 shrink-0 rounded-[2px] border-[#272935] accent-[#272935]"
          />
          <span className="text-xs text-[#6B7280] sm:text-sm">
            I agree the terms and condition
          </span>
        </label>
      </form>
    </div>
  );
}
