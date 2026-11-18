const sendResendEmail = async ({ to, replyTo, subject, text, formLabel }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error(`${formLabel} email is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.`);
    return { ok: false, reason: "not-configured" };
  }

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
        reply_to: replyTo,
        subject,
        text,
      }),
    });
  } catch (error) {
    console.error(`${formLabel} email provider request failed.`, error);
    return { ok: false, reason: "provider-unavailable" };
  }

  if (!emailResponse.ok) {
    let providerMessage = "";
    try {
      const providerError = await emailResponse.json();
      if (typeof providerError?.message === "string") {
        providerMessage = providerError.message.trim().slice(0, 300);
      }
    } catch (error) {
      console.error(`Could not read ${formLabel.toLowerCase()} email provider error response.`, error);
    }

    console.error(
      `${formLabel} email provider returned HTTP ${emailResponse.status}.`,
      providerMessage || "No provider error message was returned."
    );
    if (emailResponse.status === 401) {
      return { ok: false, reason: "api-key-rejected" };
    }
    if (emailResponse.status === 403) {
      return { ok: false, reason: "sender-rejected", providerMessage };
    }
    return { ok: false, reason: "provider-rejected" };
  }

  return { ok: true };
};

module.exports = sendResendEmail;
