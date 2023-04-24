// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyArTCh4XNLmmdLwtYAveZBFvpHjUCVGPho",

  authDomain: "lawn-service-app-e5d4f.firebaseapp.com",

  projectId: "lawn-service-app-e5d4f",

  storageBucket: "lawn-service-app-e5d4f.appspot.com",

  messagingSenderId: "225026363152",

  appId: "1:225026363152:web:c095ff54621d458a9b9f95"

};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
