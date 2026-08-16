import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHCFgso6Hfz8hUyoPTQtAKldKmmAujn5o",
  authDomain: "shopcoecom.firebaseapp.com",
  projectId: "shopcoecom",
  storageBucket: "shopcoecom.firebasestorage.app",
  messagingSenderId: "228508442683",
  appId: "1:228508442683:web:40ff77eb4787233f4f3c1e",
  measurementId: "G-3DWB2TKC72",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
