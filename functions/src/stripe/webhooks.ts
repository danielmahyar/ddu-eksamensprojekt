import { stripe, db } from '../setup'
import Stripe from 'stripe'
import * as functions from "firebase-functions";
import { firestore } from 'firebase-admin';

const webhookHandlers: any = {
	'payment_intent.succeeded': async (data: Stripe.PaymentIntent) => {
		// Add your business logic here
		console.log("Test")
	},
	'payment_intent.payment_failed': async (data: Stripe.PaymentIntent) => {
		// Add your business logic here
	},
	'customer.subscription.deleted': async (data: Stripe.Subscription) => {
		const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer;
		const userId = customer.metadata.firebaseUID;
		const userRef = db.collection('users').doc(userId);

		await userRef
			.update({
				activePlans: firestore.FieldValue.arrayRemove(data.id),
			});
	},
	'customer.subscription.canceled': async (data: Stripe.Subscription) => {
		const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer;
		const userId = customer.metadata.firebaseUID;
		const userRef = db.collection('users').doc(userId);

		await userRef
			.update({
				activePlans: firestore.FieldValue.arrayRemove(data.id),
			});
	},
	'customer.subscription.created': async (data: Stripe.Subscription) => {
		const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer;
		const userId = customer.metadata.firebaseUID;
		const userRef = db.collection('users').doc(userId);

		await userRef
			.update({
				activePlans: firestore.FieldValue.arrayUnion(data.id),
			});
	},
	'invoice.payment_succeeded': async (data: Stripe.Invoice) => {
		// Add your business logic here
	},
	'invoice.payment_failed': async (data: Stripe.Invoice) => {

		const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer;
		const userSnapshot = await db.collection('users').doc(customer.metadata.firebaseUID).get();
		await userSnapshot.ref.update({ status: 'PAST_DUE' });

	}
}

export const handleStripeWebhook = async (req: functions.https.Request, res: functions.Response) => {
	const sig = req.headers['stripe-signature'] || ""
	const event = stripe.webhooks.constructEvent(req['rawBody'], sig, "whsec_e95da56e7a387db3030/hooks[evt_3KgGfcHEMIrqYYjG1j9YOjsL]4ac5f3eacadcc5503d9440d7982bb362576ae4cc115279728")
	await webhookHandlers[event.type](event.data.object);
	res.status(200).json({ recieved: true })
}