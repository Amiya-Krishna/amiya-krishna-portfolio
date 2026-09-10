// api/contact.js
//
// Vercel Serverless Function (Node.js runtime, zero third-party
// dependencies — uses the platform's built-in `fetch`).
//
// Handles submissions from the "Send a Message" card on the portfolio's
// Contact section. Validates + sanitizes the payload server-side, then
// delivers it by email via the Resend HTTP API (https://resend.com).
//
// Required environment variable (set in Vercel → Project → Settings →
// Environment Variables — never commit these):
//   RESEND_API_KEY     Secret API key for your Resend account.
//
// Optional environment variables:
//   CONTACT_TO_EMAIL    Inbox that should receive messages.
//                        Defaults to amiyakrishna04@gmail.com.
//   CONTACT_FROM_EMAIL  The "from" address Resend sends as. Must be on a
//                        domain you've verified with Resend, e.g.
//                        "Portfolio <contact@yourdomain.com>".
//                        Defaults to Resend's shared test sender, which
//                        only works for quick testing.

const DEFAULT_TO_EMAIL = "amiyakrishna04@gmail.com";
const DEFAULT_FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>";

// Very small in-memory rate limiter. Serverless instances are ephemeral
// and this resets on cold start, so it is a best-effort extra layer on
// top of the honeypot field and validation below — not a substitute for
// a real WAF/rate-limiting service if abuse becomes a problem.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // max submissions per IP per window
const submissionLog = new Map(); // ip -> [timestamps]

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function getClientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strips control characters and collapses excess whitespace. Does not
// try to strip HTML tags with a regex (unreliable) — instead the value
// is only ever placed into the outgoing email through escapeHtml().
function cleanText(str) {
  return String(str ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim();
}

const NAME_REGEX = /^[\p{L}\p{M} .'-]{2,80}$/u;
// Accepts Indian numbers (optional +91 / 91 / 0 prefix + 10 digits
// starting 6-9) and general international E.164-style numbers.
const PHONE_INDIA_REGEX = /^(?:\+91|91|0)?[6-9]\d{9}$/;
const PHONE_INTL_REGEX = /^\+[1-9]\d{7,14}$/;

function validate(body) {
  const errors = {};

  const fullName = cleanText(body.fullName).replace(/\s+/g, " ");
  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (!NAME_REGEX.test(fullName)) {
    errors.fullName = "Enter a valid name (2-80 letters).";
  }

  const phoneRaw = cleanText(body.phone);
  const phoneDigitsOnly = phoneRaw.replace(/[\s\-()]/g, "");
  if (!phoneRaw) {
    errors.phone = "Phone number is required.";
  } else if (
    !PHONE_INDIA_REGEX.test(phoneDigitsOnly) &&
    !PHONE_INTL_REGEX.test(phoneDigitsOnly)
  ) {
    errors.phone = "Enter a valid Indian or international phone number.";
  }

  const message = cleanText(body.message);
  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message should be at least 10 characters.";
  } else if (message.length > 2000) {
    errors.message = "Message should be under 2000 characters.";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0,
    data: { fullName, phone: phoneRaw, message },
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ success: false, error: "Invalid request body." });
    }
  }
  if (!body || typeof body !== "object") {
    return res.status(400).json({ success: false, error: "Invalid request body." });
  }

  // Honeypot — real visitors never see or fill this field. If it has a
  // value, silently report success without sending anything.
  if (cleanText(body.company)) {
    return res.status(200).json({ success: true });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: "Too many messages sent recently. Please try again later.",
    });
  }

  const { valid, errors, data } = validate(body);
  if (!valid) {
    return res.status(400).json({ success: false, error: "Please fix the highlighted fields.", fieldErrors: errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("contact.js: RESEND_API_KEY is not configured.");
    return res.status(500).json({
      success: false,
      error: "Message delivery is not configured yet. Please try the email or WhatsApp links instead.",
    });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const timestamp = new Date().toISOString();

  const html = `
    <div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#111">
      <h2 style="margin:0 0 16px">New portfolio message</h2>
      <p><strong>Full Name:</strong> ${escapeHtml(data.fullName)}</p>
      <p><strong>Phone Number:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:20px 0" />
      <p style="color:#666;font-size:12px">Submitted ${escapeHtml(timestamp)}</p>
    </div>
  `.trim();

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New portfolio message from ${data.fullName}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text().catch(() => "");
      console.error("contact.js: Resend API error", resendRes.status, errText);
      return res.status(502).json({
        success: false,
        error: "Could not send your message right now. Please try again in a moment.",
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("contact.js: unexpected error", err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again in a moment.",
    });
  }
};
