import  { firestore, auth } from "firebase-admin";
import * as functions from "firebase-functions";
import { sendWelcomeEmail } from "../mail";

export const createUser = functions.firestore.document("users/{uid}").onCreate(async (snapshot, context) => {
	const userData = snapshot.data()
	try {
		await auth().updateUser(context.params.uid, {
			displayName: userData.fullName,
			email: userData.email,
		})
		await sendWelcomeEmail(userData.email, userData.fullName, userData.photoURL)
	} catch (error) {
		console.log(error)
	}
})

export const cleanupUserDelete = functions.auth.user().onDelete(async (user) => {
	try {
		await firestore().collection('users').doc(user.uid).delete()
		await sendWelcomeEmail(user.email || "", user.displayName || "Nye Bruger")
	} catch (error) {
		console.log(error)
	}
})