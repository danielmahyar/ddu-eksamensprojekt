import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../setup/firebase";

/**
 * Log in to Google Authentication via. Email and Password.
 * Makes UI change by using AuthState hook
 * @returns auth-state-update | error
 */
export async function handleEmailLogin(
	email: string, 
	password: string
): Promise<void | Error> {
	try {
		await signInWithEmailAndPassword(auth, email, password)
	} catch (error: any) {
		console.error(error)
	}
}

/**
 * Creates user in to Google Authentication via. Email and Password.
 * Makes UI change by using AuthState hook
 * @returns auth-state-update
 */
export async function createAccountWithEmail(
	email: string,
	password: string
): Promise<void | Error> {
	try {
		await createUserWithEmailAndPassword(auth, email, password)

	} catch (error) {
		
	}

}

/**
 * Creates user in to Google Authentication via. Google Provider.
 * Makes UI change by using AuthState hook
 * @returns auth-state-update
 */
export async function handleGoogleLogin(): Promise<void | Error> {
	try {
		await signInWithPopup(auth, googleAuthProvider)
	} catch (error) {
		console.error(error)
	}
		
}

export async function handleLogout(){
	await auth.signOut()
}
