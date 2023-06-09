import { initializeApp } from "firebase/app";
import {getAuth,FacebookAuthProvider,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsrU9m7qNCzTT6Df30pAGqjwad8DrMOKo",
  authDomain: "todolist-5c55b.firebaseapp.com",
  projectId: "todolist-5c55b",
  storageBucket: "todolist-5c55b.appspot.com",
  messagingSenderId: "39215304269",
  appId: "1:39215304269:web:f34406029d24b6ead31604"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const gProvider = new GoogleAuthProvider() 
export const fProvider = new FacebookAuthProvider()
export const db = getFirestore(app) 
export const storage = getStorage(app);