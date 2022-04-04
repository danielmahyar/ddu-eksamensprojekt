import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { StorageTypes } from "../../types/LocalStorage";
import { auth, db, googleAuthProvider } from "../setup/firebase";
import Router from 'next/router'

/**
 * Log in to Google Authentication via. Email and Password.
 * Makes UI change by using AuthState hook
 * @returns auth-state-update | error
 */
export async function handleEmailLogin(
	email: string, 
	password: string
): Promise<void> {
	try {
		await signInWithEmailAndPassword(auth, email, password)
	} catch (error: any) {
		console.error(error)
		throw error
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
): Promise<void> {
	try {
		await createUserWithEmailAndPassword(auth, email, password)

	} catch (error) {
		throw error
	}

}

export async function handleUserFirestoreCreate(
	user: User,
	username?: string,
	email?: string, 
	photoURL = "https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png",
	memberStatus = "NORMAL_USER"
){
	try {
		await setDoc(
			doc(db, 'users', user.uid),
			{
				username: username || user.displayName,
				email: email || user.email,
				photoURL,
				memberStatus
			}
		)
	} catch (error) {
		throw error
	}
}

/**
 * Creates user in to Google Authentication via. Google Provider.
 * Makes UI change by using AuthState hook
 * @returns auth-state-update
 */
export async function handleGoogleLogin(): Promise<void> {
	try {
		await signInWithPopup(auth, googleAuthProvider)
	} catch (error) {
		console.error(error)
		throw error
	}
		
}

export function saveUserLastLocation(lastLocation: string): void {
	if (typeof window === 'undefined') return
	localStorage.removeItem(StorageTypes.LastLocation)
	localStorage.setItem(StorageTypes.LastLocation, JSON.stringify(lastLocation))
}

export function getUserLastLocation(): string | null {
	if (typeof window === 'undefined') return null
	const storageData = localStorage.getItem(StorageTypes.LastLocation)
	if(!storageData) return null
	const url: string = JSON.parse(storageData)
	return url.substring(1)
}

export async function handleLogout(){
	await auth.signOut()
	await Router.replace('/')
}
