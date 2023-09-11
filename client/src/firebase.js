// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBg392pLoF9aTcHRwa7BepW7ur_3xLLR4c",
    authDomain: "blog-site-94159.firebaseapp.com",
    projectId: "blog-site-94159",
    storageBucket: "blog-site-94159.appspot.com",
    messagingSenderId: "919200020383",
    appId: "1:919200020383:web:64aa0719c4794fe882efaa",
    measurementId: "G-X9KTF56R92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = app.firestore();
export const db = getFirestore(app);
export const auth = getAuth();