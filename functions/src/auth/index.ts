import  { firestore, auth } from "firebase-admin";
import * as functions from "firebase-functions";
import { sendDeleteEmail, sendWelcomeEmail } from "../mail";
import { db } from "../setup";
import { createCustomer, deleteCustomer } from "../stripeapi/stripe/customer";

export const createUser = functions.firestore.document("users/{uid}").onCreate(async (snapshot, context) => {
	const userData = snapshot.data()
	try {
		await auth().updateUser(context.params.uid, {
			displayName: userData.fullName,
			email: userData.email,
		})
		const customer = await createCustomer(userData.email, context.params.uid)
		await snapshot.ref.update({
			stripeCustomerId: customer.id
		})
		await sendWelcomeEmail(userData.email, userData.fullName, userData.photoURL)
	} catch (error) {
		console.log(error)
	}
})

export const cleanupUserDelete = functions.auth.user().onDelete(async (user) => {
	const data = await db.doc(`users/${user.uid}`).get()
	const userData = data.data() || {}
	const subcollections = await db.collection(`users`).doc(user.uid).listCollections()
	try {
		await deleteCustomer(userData.stripeCustomerId)
		await firestore().collection('users').doc(user.uid).delete()
		for (const collection of subcollections) {
			db.recursiveDelete(collection)
		}
		// await deleteCollection(firestore, `users/${user.uid}/cartItems`, 10)
		await sendDeleteEmail(user.email || "", user.displayName || "Nye Bruger")
	} catch (error) {
		console.log(error)
	}
})

// async function deleteCollection(db: any, collectionPath: string, batchSize: any) {
// 	const collectionRef = db.collection(collectionPath);
// 	const query = collectionRef.orderBy('__name__').limit(batchSize);
   
// 	return new Promise((resolve, reject) => {
// 	  deleteQueryBatch(db, query, resolve).catch(reject);
// 	});
// }

// async function deleteQueryBatch(db: any, query: any, resolve: any) {
// 	const snapshot = await query.get();
   
// 	const batchSize = snapshot.size;
// 	if (batchSize === 0) {
// 	  // When there are no documents left, we are done
// 	  resolve();
// 	  return;
// 	}
   
// 	// Delete documents in a batch
// 	const batch = db.batch();
// 	snapshot.docs.forEach((doc: any) => {
// 	  batch.delete(doc.ref);
// 	});
// 	await batch.commit();
   
// 	// Recurse on the next process tick, to avoid
// 	// exploding the stack.
// 	process.nextTick(() => {
// 	  deleteQueryBatch(db, query, resolve);
// 	});
//    }
   