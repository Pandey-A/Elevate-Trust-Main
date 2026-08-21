import { sendMailViaGraph } from "../config/mail.js";
import {
  escapeHtml,
  validateEmail,
} from "../utils/formSecurity.js";

const ALLOWED_SOURCES = new Set(["footer", "contact", "newsletter", "other"]);

/**
 * POST /api/contact
 * Body: { email: string, source?: "footer" | "contact" | "newsletter" }
 */
export async function submitContactLead(req, res) {
  try {
    const emailResult = validateEmail(req.body?.email);
    if (!emailResult.ok) {
      return res.status(400).json({
        success: false,
        message: emailResult.message,
      });
    }

    const email = emailResult.value;
    const sourceRaw = String(req.body?.source || "other").trim().toLowerCase();
    const source = ALLOWED_SOURCES.has(sourceRaw) ? sourceRaw : "other";

    const sourceLabel =
      source === "footer"
        ? "Footer newsletter"
        : source === "contact"
          ? "Contact Us"
          : source === "newsletter"
            ? "Newsletter"
            : "Website";

    const submittedAt = new Date().toISOString();
    const safeEmail = escapeHtml(email);
    const safeMailto = encodeURIComponent(email);

    await sendMailViaGraph({
      replyTo: email,
      subject: `New website lead (${sourceLabel})`,
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
        <p><strong>Visitor email:</strong> <a href="mailto:${safeMailto}">${safeEmail}</a></p>
        <p><strong>Source:</strong> ${escapeHtml(sourceLabel)}</p>
        <p><strong>Submitted at:</strong> ${escapeHtml(submittedAt)}</p>
        <p>Reply to this email to contact the visitor.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Thanks we received your email and will reach out soon.",
    });
  } catch (error) {
    console.error("Contact lead email error:", {
      name: error?.name,
      status: error?.status,
      graphCode: error?.graphCode,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to send your request right now. Please try again.",
    });
  }
}
