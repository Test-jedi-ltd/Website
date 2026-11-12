#!/usr/bin/env node
/**
 * Set the `role` custom claim on a Firebase Auth user.
 *
 * Usage:
 *   cd new/tools && npm install
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json \
 *     npm run set-admin -- admin@example.com admin
 *
 * Requires a Firebase service account with permission to manage Auth users.
 * The target user must sign out and back in (or force a token refresh) before
 * the new claim is visible to the web app.
 */
import { readFileSync } from "node:fs"
import { initializeApp, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

const email = process.argv[2] || process.env.ADMIN_EMAIL
const role = process.argv[3] || process.env.ADMIN_ROLE || "admin"
const projectId =
  process.env.FIREBASE_PROJECT_ID ||
  process.env.GCLOUD_PROJECT ||
  "test-jedi-01"

if (!email) {
  console.error("Usage: node set-admin-claim.mjs <email> [role]")
  process.exit(1)
}

const credentialPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
let credential

if (credentialPath) {
  try {
    credential = cert(JSON.parse(readFileSync(credentialPath, "utf8")))
  } catch (error) {
    console.error(`Failed to read service account at ${credentialPath}:`, error.message)
    process.exit(1)
  }
}

const app = initializeApp(credential ? { credential, projectId } : { projectId })
const auth = getAuth(app)

try {
  const user = await auth.getUserByEmail(email)
  await auth.setCustomUserClaims(user.uid, {
    ...(user.customClaims || {}),
    role,
  })
  console.log(`Set role="${role}" for ${email} (uid: ${user.uid}).`)
  console.log("The user must sign out and back in for the claim to take effect.")
} catch (error) {
  console.error("Failed to set custom claim:", error.message)
  process.exit(1)
}
