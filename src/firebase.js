// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  where,
  query,
  startAfter,
  orderBy,
  limit,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAbjfoSIHsq9dx8B9NrBEncZtjnQZPUznc",
  authDomain: "shalkyi-movie.firebaseapp.com",
  projectId: "shalkyi-movie",
  storageBucket: "shalkyi-movie.appspot.com",
  messagingSenderId: "976459896648",
  appId: "1:976459896648:web:5e3af7c93c9e9a436c457d",
  measurementId: "G-JTM6J8RSL0",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage();
const auth = getAuth();
export {
  app,
  analytics,
  auth,
  doc,
  getDoc,
  firestore,
  collection,
  addDoc,
  storage,
  ref,
  updateDoc,
  uploadBytes,
  where,
  query,
  getDocs,
  getDownloadURL, // Include getDownloadURL in the export list
  orderBy,
  startAfter,
  limit,
};
