// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbpJFSgBckcwQeAcMFUki4wDsuExc6wZc",
  authDomain: "storagefb-ada03.firebaseapp.com",
  projectId: "storagefb-ada03",
  storageBucket: "storagefb-ada03.appspot.com",
  messagingSenderId: "524803587859",
  appId: "1:524803587859:web:c0472dff78e12f6bdc64e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);