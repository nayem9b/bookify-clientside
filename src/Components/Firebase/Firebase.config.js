// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Support runtime env injection via window._env_ (created at container start)
const getRuntimeEnv = (key) => {
  try {
    if (typeof window !== "undefined" && window._env_ && window._env_[key]) {
      return window._env_[key];
    }
  } catch (e) {
    // ignore
  }
  // Fallback to build-time inlined value (process.env was inlined at build time by CRA)
  return process.env[key];
};

const firebaseConfig = {
  apiKey: getRuntimeEnv("REACT_APP_API_KEY"),
  authDomain: getRuntimeEnv("REACT_APP_AUTH_DOMAIN"),
  projectId: getRuntimeEnv("REACT_APP_PROJECT_ID"),
  storageBucket: getRuntimeEnv("REACT_APP_STORAGE_BUCKET"),
  messagingSenderId: getRuntimeEnv("REACT_APP_MESSAGING_SENDER_ID"),
  appId: getRuntimeEnv("REACT_APP_APP_ID"),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
