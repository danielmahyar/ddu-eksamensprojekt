import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../setup/firebase";

export async function handleEmailLogin(
	email: string, 
	password: string
){
	try {
		await signInWithEmailAndPassword(auth, email, password)
	} catch (error: any) {
		return error
	}
}

export async function handleGoogleLogin(){
	await signInWithPopup(auth, googleAuthProvider)
}

export async function handleLogout(){
	await auth.signOut()
}
