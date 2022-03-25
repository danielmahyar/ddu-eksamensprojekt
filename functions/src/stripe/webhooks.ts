// import { stripe } from '..'
// import Stripe from 'stripe'
// import * as functions from "firebase-functions";
// import { firestore } from 'firebase-admin';
// import * as firebaseAdmin from "firebase-admin";
// export const db = firebaseAdmin.firestore()

// const webhookHandlers: any = {
// 	'payment_intent.succeeded': async (data: Stripe.PaymentIntent) => {
// 		// Add your business logic here
// 		console.log("Test")
// 	},
// 	'payment_intent.payment_failed': async (data: Stripe.PaymentIntent) => {
// 		// Add your business logic here
// 	},
// 	'customer.subscription.deleted': async (data: Stripe.Subscription) => {
// 		const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer;
// 		const userId = customer.metadata.firebaseUID;
// 		const userRef = db.collection('users').doc(userId);

// 		await userRef
// 			.update({
// 				activePlans: firestore.FieldValue.arrayRemove(data.id),
// 			});
// 	},
// 	'customer.subscription.canceled': async (data: Stripe.Subscription) => {
// 		const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer;
// 		const userId = customer.metadata.firebaseUID;
// 		const userRef = db.collection('users').doc(userId);

// 		await userRef
// 			.update({
// 				activePlans: firestore.FieldValue.arrayRemove(data.id),
// 			});
// 	},
// 	'customer.subscription.created': async (data: Stripe.Subscription) => {
// 		const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer;
// 		const userId = customer.metadata.firebaseUID;
// 		const userRef = db.collection('users').doc(userId);

// 		await userRef
// 			.update({
// 				activePlans: firestore.FieldValue.arrayUnion(data.id),
// 			});
// 	},
// 	'invoice.payment_succeeded': async (data: Stripe.Invoice) => {
// 		// Add your business logic here
// 	},
// 	'invoice.payment_failed': async (data: Stripe.Invoice) => {

// 		const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer;
// 		const userSnapshot = await db.collection('users').doc(customer.metadata.firebaseUID).get();
// 		await userSnapshot.ref.update({ status: 'PAST_DUE' });

// 	}
// }

// const handleStripeWebhook = async (req: functions.https.Request, res: functions.Response) => {
// 	const sig = req.headers['stripe-signature'] || ""
// 	const event = stripe.webhooks.constructEvent(req['rawBody'], sig, functions.config().stripe.webhook_key)
// 	await webhookHandlers[event.type](event.data.object);
// 	res.status(200).json({ recieved: true })
// }