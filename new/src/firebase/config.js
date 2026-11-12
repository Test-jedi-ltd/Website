// Firebase web configuration for the Test-Jedi project.
// Only the config object is exported here; the app is initialized once in admin.js.
// Values come from REACT_APP_FIREBASE_* env vars, with fallbacks so local dev
// works without a .env file. See new/.env.example.

export const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyCj15wavNWakNKceLYgwU6Cf-ep-4aiW9Q",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    "test-jedi-01.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "test-jedi-01",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "test-jedi-01.firebasestorage.app",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "63488606697",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:63488606697:web:12323a7f3f477715324b78",
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-0CCRN2XR9E",
};
