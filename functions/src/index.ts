import * as functions from "firebase-functions";
import * as firebaseAdmin from 'firebase-admin'
firebaseAdmin.initializeApp()
import { firestore } from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';
import Stripe from 'stripe'

// import { handleStripeWebhook } from './stripe/webhooks';


const db = firebaseAdmin.firestore()
// const auth = firebaseAdmin.auth()


const config = functions.config()
const SG_API_KEY = config.sendgrid.key;
const STRIPE_API_KEY = config.stripe.key;

sgMail.setApiKey(SG_API_KEY);

export const stripe = new Stripe(STRIPE_API_KEY, {
	apiVersion: '2020-08-27'
})

import { createStripeCheckoutSession } from './stripe/checkout';
import { createPaymentIntent } from './stripe/payments';
import { createSetupIntent, listPaymentMethods } from './stripe/customer';
import { cancelSubscription, createSubscription, listSubscriptions } from './stripe/billing';

export const helloworld = functions.https.onRequest((req, res) => {
	res.send("Hello")
})

export const stripewebhooks = functions.https.onRequest(
	(req, res) => {
		handleStripeWebhook(req, res)
	}
)

export const checkouts = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const checkoutSession = await createStripeCheckoutSession(data.line_items)
	return checkoutSession
})

export const makePaymentIntent = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const setupIntent = await createPaymentIntent(data.amount)
	return setupIntent
})

export const saveCard = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const setupIntent = await createSetupIntent(context.auth.uid)
	return setupIntent
})

export const getCards = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const wallet = await listPaymentMethods(context.auth.uid)
	return wallet.data
})

export const newSubscription = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const subscription = await createSubscription(context.auth.uid, data.plan, data.payment_method);
	return subscription
})

export const getSubscriptions = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const subscriptions = await listSubscriptions(context.auth.uid);
	return subscriptions
})

export const unsubscribe = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	return await cancelSubscription(context.auth.uid, data.id)
})

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

const handleStripeWebhook = async (req: functions.https.Request, res: functions.Response) => {
	const sig = req.headers['stripe-signature'] || ""
	const event = stripe.webhooks.constructEvent(req['rawBody'], sig, functions.config().stripe.webhook_key)
	await webhookHandlers[event.type](event.data.object);
	res.status(200).json({ recieved: true })
}