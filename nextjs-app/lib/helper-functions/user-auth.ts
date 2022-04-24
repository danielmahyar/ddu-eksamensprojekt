import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { StorageTypes } from "../../types/LocalStorage";
import { auth, db, googleAuthProvider } from "../setup/firebase";
import Router from 'next/router'
import { CustomerType } from "../../types/CustomerTypes";

type NewUserInfo = {
	email: string;
	password: string;
	fullName: string;
	photoURL?: string;
}

const PLACEHOLDER_PHOTOURL = "https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png"

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
	user: NewUserInfo
): Promise<void> {
	const { email, password, fullName, photoURL } = user
	try {
		const newUser = await createUserWithEmailAndPassword(auth, email, password)
		await handleUserFirestoreCreate(newUser.user, fullName, email, photoURL, CustomerType.NORMAL_USER)
	} catch (error) {
		throw error
	}

}

export async function handleUserFirestoreCreate(
	user: User,
	fullName?: string,
	email?: string, 
	photoURL = PLACEHOLDER_PHOTOURL,
	memberStatus = CustomerType.NORMAL_USER
){
	try {
		await setDoc(
			doc(db, 'users', user.uid),
			{
				fullName: fullName || user.displayName,
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
