import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB95hTt-ipwz0w1tlo8y-bao8YtUDYBqbA",
    authDomain: "fir-6ef90.firebaseapp.com",
    projectId: "fir-6ef90",
    storageBucket: "fir-6ef90.appspot.com",
    messagingSenderId: "417774034069",
    appId: "1:417774034069:web:11863bdf8d2412c372cf9c",
    measurementId: "G-X9LEHMX8LF"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage =getStorage(app);