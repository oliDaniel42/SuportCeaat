// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHOYCeIVUZMAUVc-l9488UuV-d_IrlLJY",
  authDomain: "suporteceaat-app.firebaseapp.com",
  projectId: "suporteceaat-app",
  storageBucket: "suporteceaat-app.appspot.com",
  messagingSenderId: "142228935507",
  appId: "1:142228935507:web:72f26ae842f2b01ff647a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const  auth = initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage)
})


export const db = getFirestore(app);

export const usersRef = collection(db, "user")
export const roleRef = collection(db, "role")