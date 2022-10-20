// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5dWzbPbbUXmOR1HC0QD9pW3bzOIin8yw",
    authDomain: "doctors-portal-a1c7f.firebaseapp.com",
    projectId: "doctors-portal-a1c7f",
    storageBucket: "doctors-portal-a1c7f.appspot.com",
    messagingSenderId: "958604102726",
    appId: "1:958604102726:web:04c8261fda954b50fd8e47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;