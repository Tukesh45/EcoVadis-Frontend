import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgwOXCaq03-ReV8IPcLnTPhyw4M558ySg",
  authDomain: "data-collector-2886a.firebaseapp.com",
  projectId: "data-collector-2886a",
  storageBucket: "data-collector-2886a.appspot.com",
  messagingSenderId: "424330977357",
  appId: "1:424330977357:web:5bcdbe2bb22456f3413c04",
  measurementId: "G-60W9LJQNTP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
