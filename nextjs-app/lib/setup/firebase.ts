// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const env = process.env.NODE_ENV

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf1Ah_8GDD0qI8hiDeZhnr-PE_N-oMBJM",
  authDomain: "ddu-eksamensprojekt-71224.firebaseapp.com",
  projectId: "ddu-eksamensprojekt-71224",
  storageBucket: "ddu-eksamensprojekt-71224.appspot.com",
  messagingSenderId: "75404224874",
  appId: "1:75404224874:web:459ccf824c0327c4aedd13"
}

let app;

// Initialize Firebase for NextJS App
if (!getApps().length) {
	app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()

export const functions = getFunctions(app)
export const db = getFirestore(app)

if(env === "development"){
  connectFunctionsEmulator(functions, 'localhost', 5001)
}

// export const analytics = getAnalytics(app);
