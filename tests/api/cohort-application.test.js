const assert = require("node:assert/strict");
const { afterEach, test } = require("node:test");
const cohortApplication = require("../../api/cohort-application");
const contact = require("../../api/contact");

const originalFetch = global.fetch;
const originalConsoleError = console.error;
const environmentKeys = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_EMAIL"];
const originalEnvironment = Object.fromEntries(
  environmentKeys.map((key) => [key, process.env[key]])
);

const validApplication = {
  fullName: "Jane Applicant",
  email: "jane@example.com",
  phone: "+234 80 1234 5678",
  tracks: ["Manual QA Tester", "Automation Tester"],
  experience: "Complete beginner",
  hasLaptop: "Yes",
};

const createResponse = () => ({
  statusCode: 200,
  headers: {},
  body: null,
  ended: false,
  status(code) {
    this.statusCode = code;
    return this;
  },
  setHeader(name, value) {
    this.headers[name] = value;
  },
  json(body) {
    this.body = body;
    return this;
  },
  end() {
    this.ended = true;
    return this;
  },
});

const createRequest = (body) => ({
  method: "POST",
  headers: { origin: "https://test-jedi.com" },
  body,
});

const configureEmail = () => {
  process.env.RESEND_API_KEY = "test-api-key";
  process.env.CONTACT_FROM_EMAIL = "verified-sender@test-jedi.com";
  process.env.CONTACT_EMAIL = "operations@test-jedi.com";
};

afterEach(() => {
  global.fetch = originalFetch;
  console.error = originalConsoleError;
  environmentKeys.forEach((key) => {
    if (originalEnvironment[key] === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = originalEnvironment[key];
    }
  });
});

test("sends a validated application to the company inbox with reply-to set to the applicant", async () => {
  configureEmail();
  let emailRequest;
  global.fetch = async (url, options) => {
    emailRequest = { url, options };
    return { ok: true, status: 200 };
  };
  const response = createResponse();

  await cohortApplication(createRequest(validApplication), response);

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { message: "Application sent." });
  assert.equal(emailRequest.url, "https://api.resend.com/emails");
  assert.equal(emailRequest.options.headers.Authorization, "Bearer test-api-key");
  assert.deepEqual(JSON.parse(emailRequest.options.body), {
    from: "verified-sender@test-jedi.com",
    to: ["operations@test-jedi.com"],
    reply_to: "jane@example.com",
    subject: "New cohort application from Jane Applicant",
    text: [
      "Name: Jane Applicant",
      "Email: jane@example.com",
      "Phone / WhatsApp: +234 80 1234 5678",
      "Tracks of interest: Manual QA Tester, Automation Tester",
      "Experience level: Complete beginner",
      "Laptop and internet access: Yes",
    ].join("\n"),
  });
})

test("rejects incomplete applications without contacting the email provider", async () => {
  configureEmail();
  global.fetch = async () => {
    throw new Error("Email provider should not be called");
  };
  const response = createResponse();

  await cohortApplication(
    createRequest({ ...validApplication, tracks: [] }),
    response
  );

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error, "Please select at least one valid track of interest.");
})

test("returns a delivery error when the email provider rejects the sender", async () => {
  configureEmail();
  console.error = () => {};
  global.fetch = async () => ({
    ok: false,
    status: 403,
    json: async () => ({ message: "Sender is not verified" }),
  });
  const response = createResponse();

  await cohortApplication(createRequest(validApplication), response);

  assert.equal(response.statusCode, 502);
  assert.match(response.body.error, /Sender is not verified/);
})

test("keeps contact form delivery working through the shared Resend sender", async () => {
  configureEmail();
  let emailPayload;
  global.fetch = async (url, options) => {
    emailPayload = JSON.parse(options.body);
    return { ok: true, status: 200 };
  };
  const response = createResponse();

  await contact(
    createRequest({
      "full-name": "Jane Applicant",
      "work-email": "jane@example.com",
      company: "Example Co",
      service: "",
      "target-date": "",
      "testing-scope": "A web application",
    }),
    response
  );

  assert.equal(response.statusCode, 200);
  assert.deepEqual(emailPayload.to, ["operations@test-jedi.com"]);
  assert.equal(emailPayload.reply_to, "jane@example.com");
})
