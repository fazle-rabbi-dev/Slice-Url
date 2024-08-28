import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "./config.js";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    console.log("Google Sign-In Success:", user);
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    
    console.log("GitHub Sign-In Success:", user);
    return user;
  } catch (error) {
    console.error("GitHub Sign-In Error:", error);
    return null;
  }
};
