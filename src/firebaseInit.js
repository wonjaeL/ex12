// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBH72J6Lq3c2Wz6LrPI6J5avmZ70f3kb5M",
    authDomain: "wonjae-5dad1.firebaseapp.com",
    projectId: "wonjae-5dad1",
    storageBucket: "wonjae-5dad1.appspot.com",
    messagingSenderId: "75057242179",
    appId: "1:75057242179:web:891a8b7503f71de749f4f6"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
