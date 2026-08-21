/** Client-side form guards for contact + career enquiry (mirrors backend rules). */

export const FORM_LIMITS = {
  email: 254,
  fullName: 120,
  phone: 30,
  jobTitle: 120,
  education: 120,
  expertise: 200,
  message: 2000,
  cvMaxBytes: 5 * 1024 * 1024,
} as const;

const EMAIL_PATTERN =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

const PHONE_PATTERN = /^[+\d][\d\s().-]{6,24}$/;

const INJECTION_PATTERN =
  /(<\s*script|javascript\s*:|on\w+\s*=|data\s*:\s*text\/html|union\s+select|insert\s+into|drop\s+table|delete\s+from|update\s+\w+\s+set|or\s+1\s*=\s*1|--\s*$|\/\*|\*\/|;?\s*(exec|execute|xp_|sp_)\b)/i;

export function sanitizePlainText(value: string, maxLength: number) {
  const cleaned = String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned;
}

export function looksUnsafe(value: string) {
  const text = String(value || "");
  if (!text) return false;
  if (INJECTION_PATTERN.test(text)) return true;
  if (/[<>]/.test(text) && /[/=()]/.test(text)) return true;
  return false;
}

export function isValidEmail(value: string) {
  const email = sanitizePlainText(value, FORM_LIMITS.email).toLowerCase();
  return Boolean(email) && EMAIL_PATTERN.test(email) && !looksUnsafe(email);
}

export function isValidPhone(value: string) {
  const phone = sanitizePlainText(value, FORM_LIMITS.phone);
  return Boolean(phone) && PHONE_PATTERN.test(phone) && !looksUnsafe(phone);
}

export function isAllowedCvFile(file: File) {
  const name = file.name.toLowerCase();
  const okExt =
    name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx");
  const okType =
    !file.type ||
    [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.type);
  return okExt && okType && file.size > 0 && file.size <= FORM_LIMITS.cvMaxBytes;
}
