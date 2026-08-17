import { sendMailViaGraph } from "../config/mail.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SOURCES = new Set(["footer", "contact", "newsletter", "other"]);

/**
 * POST /api/contact
 * Body: { email: string, source?: "footer" | "contact" | "newsletter" }
 * Sends a lead notification to CONTACT_TO_EMAIL with Reply-To = visitor email.
 */
export async function submitContactLead(req, res) {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const sourceRaw = String(req.body.source || "other").trim().toLowerCase();
    const source = ALLOWED_SOURCES.has(sourceRaw) ? sourceRaw : "other";

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const sourceLabel =
      source === "footer"
        ? "Footer newsletter"
        : source === "contact"
          ? "Contact Us"
          : source === "newsletter"
            ? "Newsletter"
            : "Website";

    const submittedAt = new Date().toISOString();

    await sendMailViaGraph({
      replyTo: email,
      subject: `New website lead (${sourceLabel}): ${email}`,
      text: [
        "A visitor submitted their email on the Elevate Trust website.",
        "",
        `Visitor email: ${email}`,
        `Source: ${sourceLabel}`,
        `Submitted at: ${submittedAt}`,
        "",
        "Reply to this email to contact the visitor.",
      ].join("\n"),
      html: `
        <p>A visitor submitted their email on the Elevate Trust website.</p>
        <p><strong>Visitor email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Source:</strong> ${sourceLabel}</p>
        <p><strong>Submitted at:</strong> ${submittedAt}</p>
        <p>Reply to this email to contact the visitor.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Thanks — we received your email and will reach out soon.",
    });
  } catch (error) {
    console.error("Contact lead email error:", error);

    const message = error?.message?.includes("Missing env")
      ? "Email is not configured yet. Add Azure Graph credentials in backend/.env, then restart the backend."
      : error?.graphCode === "ErrorAccessDenied" ||
          error?.status === 403 ||
          String(error?.message || "").includes("Access is denied")
        ? "Microsoft Graph Mail.Send permission is missing or not admin-consented. Grant Mail.Send (application) on the app registration and ensure CONTACT_FROM_EMAIL is a licensed mailbox."
        : String(error?.message || "").includes("MailboxNotEnabledForRESTAPI") ||
            String(error?.message || "").includes("ResourceNotFound")
          ? "Sender mailbox not found or not enabled. Check CONTACT_FROM_EMAIL matches a valid Microsoft 365 mailbox."
          : "Unable to send your request right now. Please try again.";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}
