function requiredEnv(name) {
  const value = String(process.env[name] || "").trim();
  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }
  return value;
}

export function assertMailConfigured() {
  const missing = [];
  if (!String(process.env.AZURE_TENANT_ID || "").trim()) {
    missing.push("AZURE_TENANT_ID");
  }
  if (!String(process.env.AZURE_CLIENT_ID || "").trim()) {
    missing.push("AZURE_CLIENT_ID");
  }
  if (!String(process.env.AZURE_CLIENT_SECRET || "").trim()) {
    missing.push("AZURE_CLIENT_SECRET");
  }
  if (
    !String(process.env.CONTACT_FROM_EMAIL || process.env.GRAPH_SENDER_EMAIL || "").trim()
  ) {
    missing.push("CONTACT_FROM_EMAIL");
  }
  if (
    !String(process.env.CONTACT_TO_EMAIL || process.env.CONTACT_FROM_EMAIL || "").trim()
  ) {
    missing.push("CONTACT_TO_EMAIL");
  }
  if (missing.length > 0) {
    throw new Error(`Missing env: ${missing.join(", ")}`);
  }
}

export function getContactMailConfig() {
  assertMailConfigured();

  const from = (
    process.env.CONTACT_FROM_EMAIL ||
    process.env.GRAPH_SENDER_EMAIL ||
    ""
  ).trim();
  const to = (process.env.CONTACT_TO_EMAIL || from).trim();

  return { from, to };
}

let cachedToken = null;
let tokenExpiresAt = 0;

async function getGraphAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const tenantId = requiredEnv("AZURE_TENANT_ID");
  const clientId = requiredEnv("AZURE_CLIENT_ID");
  const clientSecret = requiredEnv("AZURE_CLIENT_SECRET");

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      payload.error_description ||
        payload.error ||
        `Graph token request failed (${response.status})`,
    );
  }

  cachedToken = payload.access_token;
  tokenExpiresAt = now + Number(payload.expires_in || 3600) * 1000;
  return cachedToken;
}

/**
 * Send mail via Microsoft Graph API (application permission Mail.Send).
 * Sends from CONTACT_FROM_EMAIL mailbox to CONTACT_TO_EMAIL.
 */
export async function sendMailViaGraph({
  subject,
  text,
  html,
  replyTo,
}) {
  const { from, to } = getContactMailConfig();
  const token = await getGraphAccessToken();

  const message = {
    message: {
      subject,
      body: {
        contentType: html ? "HTML" : "Text",
        content: html || text || "",
      },
      toRecipients: [{ emailAddress: { address: to } }],
      ...(replyTo
        ? { replyTo: [{ emailAddress: { address: replyTo } }] }
        : {}),
    },
    saveToSentItems: true,
  };

  const sendUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(from)}/sendMail`;
  const response = await fetch(sendUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (response.ok) {
    return;
  }

  const payload = await response.json().catch(() => ({}));
  const graphMessage =
    payload.error?.message || `Graph sendMail failed (${response.status})`;
  const error = new Error(graphMessage);
  error.status = response.status;
  error.graphCode = payload.error?.code;
  throw error;
}

export function logMailStatus() {
  try {
    assertMailConfigured();
    const { from, to } = getContactMailConfig();
    console.log(`Contact email ready (Microsoft Graph): from ${from} → to ${to}`);
  } catch (error) {
    console.warn(
      "Contact email NOT ready: set AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL in backend/.env",
    );
    if (error?.message) {
      console.warn(error.message);
    }
  }
}
