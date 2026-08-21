/**
 * Shared validation / sanitization for public form endpoints.
 * Keeps SQL/XSS-style payloads out of mail + DB without logging raw user content.
 */

const EMAIL_PATTERN =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

const PHONE_PATTERN = /^[+\d][\d\s().-]{6,24}$/;

const INJECTION_PATTERN =
  /(<\s*script|javascript\s*:|on\w+\s*=|data\s*:\s*text\/html|union\s+select|insert\s+into|drop\s+table|delete\s+from|update\s+\w+\s+set|or\s+1\s*=\s*1|--\s*$|\/\*|\*\/|;?\s*(exec|execute|xp_|sp_)\b)/i;

export const FORM_LIMITS = {
  email: 254,
  fullName: 120,
  phone: 30,
  jobTitle: 120,
  education: 120,
  expertise: 200,
  message: 2000,
};

export function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function sanitizePlainText(value, maxLength) {
  const cleaned = String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!maxLength || cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength);
}

export function containsInjection(value) {
  const text = String(value || "");
  if (!text) return false;
  if (INJECTION_PATTERN.test(text)) return true;
  if (/[<>]/.test(text) && /[/=()]/.test(text)) return true;
  return false;
}

export function validateEmail(raw) {
  const email = sanitizePlainText(raw, FORM_LIMITS.email).toLowerCase();
  if (!email) return { ok: false, message: "Email is required." };
  if (email.length > FORM_LIMITS.email) {
    return { ok: false, message: "Please provide a valid email address." };
  }
  if (!EMAIL_PATTERN.test(email) || containsInjection(email)) {
    return { ok: false, message: "Please provide a valid email address." };
  }
  return { ok: true, value: email };
}

export function validatePhone(raw) {
  const phone = sanitizePlainText(raw, FORM_LIMITS.phone);
  if (!phone) return { ok: false, message: "Phone number is required." };
  if (!PHONE_PATTERN.test(phone) || containsInjection(phone)) {
    return { ok: false, message: "Please provide a valid phone number." };
  }
  return { ok: true, value: phone };
}

export function validatePlainField(raw, { required = false, maxLength, label }) {
  const value = sanitizePlainText(raw, maxLength);
  if (required && !value) {
    return { ok: false, message: `${label} is required.` };
  }
  if (value && containsInjection(value)) {
    return {
      ok: false,
      message: "Please remove invalid characters from your submission.",
    };
  }
  return { ok: true, value };
}

export function clientIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "")
    .split(",")[0]
    .trim();
  return forwarded || req.ip || req.socket?.remoteAddress || "unknown";
}
