import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyA2LPk9TUvHgxv8zEwhZRwkmdjsGcnJTmc",
  authDomain: "your-typo.firebaseapp.com",
  projectId: "your-typo",
  storageBucket: "your-typo.firebasestorage.app",
  messagingSenderId: "53111207980",
  appId: "1:53111207980:web:811cd8b3f95c131f4f7989",
  measurementId: "G-VCJEPBZWVM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
