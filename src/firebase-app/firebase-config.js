import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBYV6AcHTpjRAwB79Mn0L5F2Y0YN3v0mqw",
  authDomain: "monkey-blogging-c2461.firebaseapp.com",
  projectId: "monkey-blogging-c2461",
  storageBucket: "monkey-blogging-c2461.appspot.com",
  messagingSenderId: "397713108979",
  appId: "1:397713108979:web:c381e63065d60ba34eac86"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);