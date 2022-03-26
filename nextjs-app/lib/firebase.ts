// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFunctions } from 'firebase/functions'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf1Ah_8GDD0qI8hiDeZhnr-PE_N-oMBJM",
  authDomain: "ddu-eksamensprojekt-71224.firebaseapp.com",
  projectId: "ddu-eksamensprojekt-71224",
  storageBucket: "ddu-eksamensprojekt-71224.appspot.com",
  messagingSenderId: "75404224874",
  appId: "1:75404224874:web:459ccf824c0327c4aedd13"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const functions = getFunctions(app)
export const firestore = getFirestore(app)

