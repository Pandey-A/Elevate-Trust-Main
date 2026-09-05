import { sendMailViaGraph } from "../config/mail.js";
import {
  createContactLead,
  updateContactLeadEmailStatus,
} from "../module/contactModules.js";
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

    const lead = await createContactLead({ email, source });

    const submittedAt = new Date().toISOString();
    const safeEmail = escapeHtml(email);
    const safeMailto = encodeURIComponent(email);

    try {
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

      await updateContactLeadEmailStatus(lead.id, "sent");
    } catch (mailError) {
      console.error("Contact lead email delivery failed (lead retained):", {
        leadId: lead.id,
        name: mailError?.name,
        status: mailError?.status,
        graphCode: mailError?.graphCode,
      });

      await updateContactLeadEmailStatus(
        lead.id,
        "failed",
        String(mailError?.message || mailError || "Email delivery failed"),
      );
    }

    return res.status(200).json({
      success: true,
      message: "Thanks we received your email and will reach out soon.",
    });
  } catch (error) {
    console.error("Contact lead persist error:", {
      name: error?.name,
      code: error?.code,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to save your request right now. Please try again.",
    });
  }
}
