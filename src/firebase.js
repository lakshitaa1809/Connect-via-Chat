import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrsx-soOYhgey6exWomVa47htRyeMzw-I",
  authDomain: "connect-via-chat.firebaseapp.com",
  projectId: "connect-via-chat",
  storageBucket: "connect-via-chat.appspot.com",
  messagingSenderId: "846203429834",
  appId: "1:846203429834:web:3a4956264279c7fb426533",
  measurementId: "G-CC25X6TEXD"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
