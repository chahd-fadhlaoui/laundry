import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCXjhNB6MIcueUYGTiSidr-xft3HwIg7Zo",
  authDomain: "laundry-application-15eaa.firebaseapp.com",
  projectId: "laundry-application-15eaa",
  storageBucket: "laundry-application-15eaa.firebasestorage.app",
  messagingSenderId: "682854935389",
  appId: "1:682854935389:web:b2a7058e4bcb0cace556b4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export {auth,db};