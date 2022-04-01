import  { firestore, auth } from "firebase-admin";
import * as functions from "firebase-functions";
import { sendWelcomeEmail } from "../mail";

functions.firestore.document("users/{uid}").onCreate(async (snapshot, context) => {
	const userData = snapshot.data()
	try {
		await sendWelcomeEmail(userData.email, userData.displayName)
		await auth().updateUser(context.params.uid, {
			displayName: userData.displayName,
			email: userData.email,
		})
	} catch (error) {
		console.log(error)
	}
})

export const cleanupUserDelete = functions.auth.user().onDelete(async (user) => {
	try {
		await sendWelcomeEmail(user.email || "", user.displayName || "Nye Bruger")
		await firestore().collection('users').doc(user.uid).delete()
	} catch (error) {
		console.log(error)
	}
})