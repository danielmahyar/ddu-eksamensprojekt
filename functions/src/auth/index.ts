import { firestore, auth } from "firebase-admin";
import * as functions from "firebase-functions";
import { sendDeleteEmail, sendWelcomeEmail } from "../mail";
import { db } from "../setup";
import { createCustomer, deleteCustomer } from "../stripeapi/stripe/customer";
import { UserDocument } from "../types/FirebaseDataTypes";

export const createUser = functions.firestore.document("users/{uid}").onCreate(async (snapshot, context) => {
	const userData = snapshot.data() as UserDocument;
	try {
		await auth().updateUser(context.params.uid, {
			displayName: userData.fullName,
			email: userData.email,
		})
		const customer = await createCustomer(userData.email, context.params.uid, { name: userData.fullName })
		await snapshot.ref.update({
			stripeCustomerId: customer.id
		})
		await sendWelcomeEmail(userData.email, userData.fullName, userData.photoURL)
	} catch (error) {
		console.log(error)
	}
})

// export const createUserFromProviderLogin = functions.auth.user().onCreate(async (user) => {
// 	try {
// 		const customer = await createCustomer(user?.email || "", user.uid)
// 		await db.doc(`users/${user.uid}`).update({
// 			stripeCustomerId: customer.id
// 		})
// 		await sendWelcomeEmail(user?.email || "", user.displayName || "", user.photoURL)
// 	} catch (error) {
// 		console.log(error)
// 	}
// })

export const cleanupUserDelete = functions.auth.user().onDelete(async (user) => {
	const data = await db.doc(`users/${user.uid}`).get()
	const userData = data.data() as UserDocument
	const subcollections = await db.collection(`users`).doc(user.uid).listCollections()
	try {
		if (userData.stripeCustomerId) {
			await deleteCustomer(userData.stripeCustomerId)
		}
		await firestore().collection('users').doc(user.uid).delete()
		for (const collection of subcollections) {
			db.recursiveDelete(collection)
		}
		await sendDeleteEmail(user.email || "")
	} catch (error) {
		console.log(error)
		throw error
	}
})

