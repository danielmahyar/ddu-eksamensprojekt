import { stripe } from '../../setup'
// import Stripe from 'stripe'
import * as functions from "firebase-functions";
import { sendSubscriptionMail } from '../../mail';
// import { firestore } from 'firebase-admin';

// const webhookHandlers: any = {
// 	'payment_intent.succeeded': async (data: Stripe.PaymentIntent) => {
// 		// Add your business logic here
// 		console.log("Test")
// 	},
// 	'payment_method.attached': async (data: Stripe.PaymentMethod) => {

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

// 	},
// 	'payment_succeeded': async (data: Stripe.Invoice) => {
// 		// Add your business logic here
// 		console.log("Payment done")
// 	},
// 	'payment_failed': async (data: Stripe.Invoice) => {

// 		const customer = await stripe.customers.retrieve(data.customer as string) as Stripe.Customer;
// 		const userSnapshot = await db.collection('users').doc(customer.metadata.firebaseUID).get();
// 		await userSnapshot.ref.update({ status: 'PAST_DUE' });

// 	}
// }

export const handleStripeWebhook = async (req: functions.https.Request, res: functions.Response) => {
	const sig = req.headers['stripe-signature'] || ""
	let event;

	try {
		event = stripe.webhooks.constructEvent(req.rawBody, sig, "whsec_sitBVFkNGitl0hKd7te8ocYfyQUPslgi");
	} catch (err: any) {
		res.status(400).send(`Webhook Error: ${err.message}`);
		return;
	}

	switch (event.type) {
		case 'checkout.session.completed':
			const session = event.data.object;
			console.log(session)
			await sendSubscriptionMail('thediamonds764@gmail.com', 'Daniel Cargar Mahyar')
			// Then define and call a function to handle the event checkout.session.completed
			res.status(200).json({ recieved: true })
			break;
		case 'payment_method.attached':
			const paymentMethod = event.data.object;
			console.log(paymentMethod)
			// Then define and call a function to handle the event payment_method.attached
			res.status(200).json({ recieved: true })

			break;
		// ... handle other event types
		default:
			res.status(500).json({ handled: false })
			console.log(`Unhandled event type ${event.type}`);
	}

}