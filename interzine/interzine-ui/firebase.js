// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD01xjfPGJDlffFYOk-2XTyrPTDTzXTtJg",
  authDomain: "intersinee.firebaseapp.com",
  projectId: "intersinee",
  storageBucket: "intersinee.appspot.com",
  messagingSenderId: "31453578951",
  appId: "1:31453578951:web:a8af142250fea8d09e60e2",
  measurementId: "G-W6THT95LWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);