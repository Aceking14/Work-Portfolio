// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqx1jFngY9f8pLDeFE7BQgngP_-5XwvfM",
  authDomain: "social-media-app-94b4d.firebaseapp.com",
  projectId: "social-media-app-94b4d",
  storageBucket: "social-media-app-94b4d.appspot.com",
  messagingSenderId: "117240353065",
  appId: "1:117240353065:web:de1c5a1c88922275b22738"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
