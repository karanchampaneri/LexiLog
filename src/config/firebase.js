import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// Initialize Auth with AsyncStorage persistence for React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
