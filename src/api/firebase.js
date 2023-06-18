import { initializeAuth, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCDwUYtdoPQ6CL9pZrzUCq1MtkP2vcI2kk",
    authDomain: "chatklatch.firebaseapp.com",
    projectId: "chatklatch",
    storageBucket: "chatklatch.appspot.com",
    messagingSenderId: "197917949514",
    appId: "1:197917949514:web:ecc0e4a40d2c515bc030b3",
    
    measurementId: "G-XRN6G1GFQJ"
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

