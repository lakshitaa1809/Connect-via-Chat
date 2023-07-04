import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiCBlXDf50fCoZCUx9UpSNdGrT-ziNWTg",
  authDomain: "chatbox-cddf3.firebaseapp.com",
  projectId: "chatbox-cddf3",
  storageBucket: "chatbox-cddf3.appspot.com",
  messagingSenderId: "235801052066",
  appId: "1:235801052066:web:5c1059c3d14c5346d9e8fb",
};
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
