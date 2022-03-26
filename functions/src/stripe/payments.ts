import { stripe } from '../setup'
export async function createPaymentIntent(amount: number) {
	const paymentIntet = await stripe.paymentIntents.create({
		amount,
		currency: 'dkk'
	})

	return paymentIntet
}