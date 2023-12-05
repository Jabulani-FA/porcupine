// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSoA-QvjV-kl-MZSSs8sVoPRVDkeUH4bs",
  authDomain: "todos-4d7ae.firebaseapp.com",
  projectId: "todos-4d7ae",
  storageBucket: "todos-4d7ae.appspot.com",
  messagingSenderId: "988666729082",
  appId: "1:988666729082:web:d08d0cc687d4784605e1c3",
  measurementId: "G-KEB5PR8EBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;