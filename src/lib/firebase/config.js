import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "slice-url.firebaseapp.com",
  projectId: "slice-url",
  storageBucket: "slice-url.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
