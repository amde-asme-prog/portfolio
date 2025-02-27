import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtSaDn8Z2wGTC33aXtveYRprNx7HU0dDs",
  authDomain: "portfolio-445d8.firebaseapp.com",
  projectId: "portfolio-445d8",
  storageBucket: "portfolio-445d8.firebasestorage.app",
  messagingSenderId: "716923746372",
  appId: "1:716923746372:web:103caf7497aa8645e1a411",
  measurementId: "G-DZN8Q6DF09",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  db,
  storage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  setDoc,
  doc,
  ref,
  uploadBytes,
  getDownloadURL,
};
