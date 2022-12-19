// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_CElPXyXS4oh4aOAVvdLqRBvhSqsTXZg",
  authDomain: "food-estimator.firebaseapp.com",
  projectId: "food-estimator",
  storageBucket: "food-estimator.appspot.com",
  messagingSenderId: "371069760262",
  appId: "1:371069760262:web:0c51ccd7a6d154fb12a487",
  measurementId: "G-36JB02PM9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseStorage = getStorage(app)