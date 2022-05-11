import * as functions from "firebase-functions";
import { createStripeCheckoutSession } from './stripe/checkout';
import { createPaymentIntent } from './stripe/payments';
import { createSetupIntent, listPaymentMethods } from './stripe/customer';
import { cancelSubscription, createSubscription, listSubscriptions } from './stripe/billing';
import { handleStripeWebhook } from "./stripe/webhooks";
import { sendSubscriptionMail } from '../mail';
import Stripe from "stripe";

/**
 * All Stripe functions exported from this index file
 * 
 * Functions are primarly targeted at registering and using Customer activities:
 * - Customer registration
 * - Added and getting Cards to Stripe Database
 */


/**
 * Listens to live events from Stripe Webhook.
 * Typically responds with e-mails to end user
 */
export const stripewebhooks = functions.https.onRequest(
	(req, res) => {
		handleStripeWebhook(req, res)
	}
)

/**
 * Create Stripe checkout page for end user in Frontend userflow
 */
export const checkouts = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const checkoutSession = await createStripeCheckoutSession(data.line_items, data.stripeCustomerId)
	console.log(checkoutSession)
	return checkoutSession
})

/**
 * NOT USED
 */
export const makePaymentIntent = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const setupIntent = await createPaymentIntent(data.amount)
	return setupIntent
})

/**
 * Saving card. Authentication handled by Google
 * @param {string} uid
 */
export const saveCard = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const setupIntent = await createSetupIntent(context.auth.uid)
	return setupIntent
})

/**
 * Get registered cards. Authentication handled by Google
 * @param {string} uid
 */
export const getCards = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const wallet = await listPaymentMethods(context.auth.uid)
	return wallet.data
})

/**
 * Add subscription to specific product. Authentication handled by Google
 * @param {string} uid
 * @param {string} productID
 */
export const newSubscription = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const subscription: Stripe.Subscription = await createSubscription(context.auth.uid, data.plan, data.payment_method);
	try {
		await sendSubscriptionMail(data.email, data.displayName)
	} catch (error) {
		
	}
	return subscription
})

/**
 * Saving card. Authentication handled by Google
 * @param {string} uid
 */
export const getSubscriptions = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	const subscriptions = await listSubscriptions(context.auth.uid);
	return subscriptions
})

/**
 * Saving card. Authentication handled by Google
 * @param {string} uid
 */
export const unsubscribe = functions.https.onCall(async (data, context) => {
	if (!context.auth) throw new Error('You must be authorized')
	return await cancelSubscription(context.auth.uid, data.id)
})

