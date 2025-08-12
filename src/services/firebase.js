// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByvKDYStfiuFzOeWYg2VIBX3FckEYE_qA",
  authDomain: "inkkeep-bd631.firebaseapp.com",
  projectId: "inkkeep-bd631",
  storageBucket: "inkkeep-bd631.firebasestorage.app",
  messagingSenderId: "12279574927",
  appId: "1:12279574927:web:558791cd0a3a4bac709bfa",
  measurementId: "G-NX003PJZPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);