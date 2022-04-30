import { Stripe } from '@stripe/stripe-js';
import { User } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import toast from 'react-hot-toast';
import { functions } from '../../lib/setup/firebase';
import { CancelSubscriptionReq, GetSubscriptionsRes } from '../../types/FirebaseFuncReq';
import { StripeSubscription } from '../../types/StripeTypes';

/**
 * Handles common Stripe opeartions and Toast notifications
 */
export class StripeUIHandler {

	private stripe: Stripe | null = null;

	constructor(stripe: Stripe | null){
		console.log("Made a new instance")
		this.stripe = stripe
	}

	getSubscriptions = async (): Promise<StripeSubscription[]> => {
		const load = toast.loading('Finder dine abonnement')
		const fn = httpsCallable<void, GetSubscriptionsRes>(functions, 'getSubscriptions')
		try {
			const data = ((await fn()).data).data
			toast.dismiss(load)
			toast.success(`Fandt ${(data.length > 1 ? 'dine abonnementer' : 'dit abonnement')}`)
			return data
			
		} catch (error: any) {
			toast.dismiss(load)
			toast.error("Der var nogle problemer. Prøv igen senere")
			throw error
		}
	}

	cancelSubscription = async (id: string): Promise<void> => {
		const load = toast.loading('Canceling your subscription')
		const fn = httpsCallable<CancelSubscriptionReq, GetSubscriptionsRes>(functions, 'unsubscribe')
		await fn({ id })
		toast.dismiss(load)
		toast.success("Fjernede dit abonnement")
	}

	newSubscription = async (cardElement: any, plan: string, user: User | null | undefined) => {
		if (!this.stripe || !user) return
		const load = toast.loading('Making you a subscription')
		const { paymentMethod, error } = await this.stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});
		if (error) {
			alert(error.message);
			toast.dismiss(load)
			return Error("Card information was wrong");
		}
		const fn = httpsCallable<{ plan: string, payment_method: string, email: string, displayName: string }, { subscription: any }>(functions, 'newSubscription')

		const subscription = (await fn({ plan, payment_method: paymentMethod.id, email: user?.email || "", displayName: user?.displayName || "" })).data
			// The subscription contains an invoice
			// If the invoice's payment succeeded then you're good, 
			// otherwise, the payment intent must be confirmed

			const { latest_invoice }: any = subscription;

			if (latest_invoice.payment_intent) {
				const { client_secret, status } = latest_invoice.payment_intent;

				if (status === 'requires_action') {
					const { error: confirmationError } = await this.stripe.confirmCardPayment(
						client_secret
					);
					if (confirmationError) {
						console.error(confirmationError);
					toast.dismiss(load)
						toast.error("Unable to confirm card information.")
						return;
					}
				}

				// success
				toast.dismiss(load)
				toast.success("You are now subscribed!")
			}
	}

}