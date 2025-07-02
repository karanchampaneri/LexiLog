import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2sThjQ88xbf1guWvhBk-HXOepOEzZaZk",
  authDomain: "lexilog-54866.firebaseapp.com",
  projectId: "lexilog-54866",
  storageBucket: "lexilog-54866.appspot.com",
  messagingSenderId: "669981316530",
  appId: "1:669981316530:ios:8348188e6359121db740ab",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app; // Export the app instance if needed elsewhere
