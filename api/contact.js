const allowedServices = new Set([
  "Full-cycle testing",
  "Test automation",
  "Performance testing",
  "Security testing",
  "Functional testing",
]);

const readText = (value, maxLength) => (
  typeof value === "string" && value.trim().length <= maxLength
    ? value.trim()
    : null
);

const isValidDate = (value) => {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

module.exports = async function contact(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = typeof req.body === "string"
    ? (() => {
        try {
          return JSON.parse(req.body);
        } catch {
          return null;
        }
      })()
    : req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Please submit a valid contact form." });
  }

  const name = readText(body["full-name"], 120);
  const email = readText(body["work-email"], 254);
  const company = readText(body.company, 160);
  const service = readText(body.service, 80);
  const targetDate = readText(body["target-date"], 10);
  const testingScope = readText(body["testing-scope"], 5000);

  if (!name || !email || !company || !testingScope) {
    return res.status(400).json({ error: "Please complete all required fields." });
  }
  if (/[\r\n]/.test(name) || /[\r\n]/.test(company)) {
    return res.status(400).json({ error: "Please enter a valid name and company." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (body.service && (!service || !allowedServices.has(service))) {
    return res.status(400).json({ error: "Please select a valid service." });
  }
  if ((body["target-date"] && !targetDate) || !isValidDate(targetDate)) {
    return res.status(400).json({ error: "Please select a valid target date." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL || "operations@test-jedi.com";
  if (!apiKey || !from) {
    console.error("Contact email is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.");
    return res.status(503).json({ error: "The contact form is temporarily unavailable. Please try again later." });
  }

  const subject = `New inquiry from ${name} (${company})`.replace(/[\r\n]/g, " ");
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Service needed: ${service || "Not specified"}`,
    `Target date: ${targetDate || "Not specified"}`,
    "",
    "What needs testing:",
    testingScope,
  ].join("\n");

  let emailResponse;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });
  } catch (error) {
    console.error("Contact email provider request failed.", error);
    return res.status(502).json({ error: "We couldn't send your message right now. Please try again." });
  }

  if (!emailResponse.ok) {
    console.error(`Contact email provider returned HTTP ${emailResponse.status}.`);
    return res.status(502).json({ error: "We couldn't send your message right now. Please try again." });
  }

  return res.status(200).json({ message: "Message sent." });
};
