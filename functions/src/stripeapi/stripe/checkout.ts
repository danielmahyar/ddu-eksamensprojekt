import { stripe } from '../../setup'
import Stripe from 'stripe'

export async function createStripeCheckoutSession(
	line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
	customerID: string
){
	const url = process.env.WEBAPP_URL || "http://localhost:3000";
	const session = await stripe.checkout.sessions.create(({
		mode: 'subscription',
		payment_method_types: ['card'],
		customer: customerID,
		line_items,
		success_url: `${url}/payment/confirmation?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${url}/payment/failed`
	}));


	return session;
}