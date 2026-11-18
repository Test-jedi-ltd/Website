const sendResendEmail = require("../lib/sendResendEmail");

const allowedTracks = new Set([
  "Manual QA Tester",
  "Automation Tester",
  "API & Backend Tester",
  "Performance Tester",
  "Help me choose (Not sure yet)",
]);
const allowedExperienceLevels = new Set([
  "Complete beginner",
  "Some testing experience",
  "Working QA professional",
]);
const allowedOrigins = new Set([
  "https://test-jedi.com",
  "https://www.test-jedi.com",
  "https://test-jedi-nine.vercel.app",
]);

const isAllowedOrigin = (origin) => (
  allowedOrigins.has(origin)
  || (
    process.env.NODE_ENV !== "production"
    && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
  )
);

const readText = (value, maxLength) => (
  typeof value === "string" && value.trim().length <= maxLength
    ? value.trim()
    : null
);

const parseBody = (body) => {
  if (typeof body !== "string") return body;
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};

module.exports = async function cohortApplication(req, res) {
  const origin = req.headers?.origin;
  if (origin) {
    if (!isAllowedOrigin(origin)) {
      return res.status(403).json({ error: "This website is not allowed to submit the cohort application." });
    }

    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = parseBody(req.body);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Please submit a valid cohort application." });
  }

  const name = readText(body.fullName, 120);
  const email = readText(body.email, 254);
  const phone = readText(body.phone, 40);
  const experience = readText(body.experience, 80);
  const hasLaptop = readText(body.hasLaptop, 3);
  const tracks = body.tracks;

  if (!name || !email || !phone || !experience || !hasLaptop) {
    return res.status(400).json({ error: "Please complete all required fields." });
  }
  if (/[\r\n]/.test(name)) {
    return res.status(400).json({ error: "Please enter a valid full name." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const phoneDigits = phone.replace(/\D/g, "").length;
  if (
    !/^\+?[0-9\s().-]+$/.test(phone) ||
    phoneDigits < 7 ||
    phoneDigits > 15
  ) {
    return res.status(400).json({ error: "Please enter a valid phone number." });
  }
  if (
    !Array.isArray(tracks) ||
    tracks.length === 0 ||
    tracks.length > allowedTracks.size ||
    tracks.some((track) => !allowedTracks.has(track)) ||
    new Set(tracks).size !== tracks.length
  ) {
    return res.status(400).json({ error: "Please select at least one valid track of interest." });
  }
  if (!allowedExperienceLevels.has(experience)) {
    return res.status(400).json({ error: "Please select a valid experience level." });
  }
  if (hasLaptop !== "Yes" && hasLaptop !== "No") {
    return res.status(400).json({ error: "Please answer the laptop and internet access question." });
  }

  const to = process.env.CONTACT_EMAIL || "operations@test-jedi.com";
  const subject = `New cohort application from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone / WhatsApp: ${phone}`,
    `Tracks of interest: ${tracks.join(", ")}`,
    `Experience level: ${experience}`,
    `Laptop and internet access: ${hasLaptop}`,
  ].join("\n");
  const delivery = await sendResendEmail({
    to,
    replyTo: email,
    subject,
    text,
    formLabel: "Cohort application",
  });

  if (!delivery.ok) {
    if (delivery.reason === "not-configured") {
      return res.status(503).json({
        error: "The cohort application form is temporarily unavailable. Please try again later.",
      });
    }
    if (delivery.reason === "api-key-rejected") {
      return res.status(503).json({
        error: "The email service is temporarily unavailable. Please contact us directly.",
      });
    }
    if (delivery.reason === "sender-rejected") {
      return res.status(502).json({
        error: delivery.providerMessage
          ? `The application could not be delivered: ${delivery.providerMessage}`
          : "The email service rejected the sender or recipient. Please contact us directly.",
      });
    }
    return res.status(502).json({ error: "We couldn't send your application right now. Please try again." });
  }

  return res.status(200).json({ message: "Application sent." });
};
