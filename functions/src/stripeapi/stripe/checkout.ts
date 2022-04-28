import { stripe } from '../../setup'
import Stripe from 'stripe'

export async function createStripeCheckoutSession(
	line_items: Stripe.Checkout.SessionCreateParams.LineItem[]
){
	const url = process.env.WEBAPP_URL || "http://localhost:3000";
	const session = await stripe.checkout.sessions.create(({
		payment_method_types: ['card'],
		line_items,
		success_url: `${url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${url}/payment/failed`
	}));

	return session;
}