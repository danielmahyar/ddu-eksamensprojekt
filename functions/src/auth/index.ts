import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import { sendWelcomeEmail } from "../mail";


export const welcomeEmail = functions.auth.user().onCreate(async (user, context) => {
	//send email
	try {
		await sendWelcomeEmail(user.email || "", user.displayName || "Nye Bruger")
		const data = {
			photoURL: user.photoURL || "",
			email: user.email,
			username: user.displayName || ""
		}
		await firestore().collection('users').doc(user.uid).create(data)
	} catch (error) {
		console.log(error)
	}
});

export const cleanupUserDelete = functions.auth.user().onDelete(async (user) => {
	try {
		await sendWelcomeEmail(user.email || "", user.displayName || "Nye Bruger")
		await firestore().collection('users').doc(user.uid).delete()
	} catch (error) {
		console.log(error)
	}
})