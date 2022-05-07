import { addDoc, collection } from "firebase/firestore";
import { httpsCallable } from 'firebase/functions'
import Router from "next/router";
import { SubscriptionProduct } from "../../types/ProductsTypes";
import { db, functions } from "../setup/firebase";
import { CartItem } from '../../types/ProductsTypes'
import { Stripe } from "@stripe/stripe-js";

export async function buyItem(subscriptionProduct: SubscriptionProduct, uid: string | null | undefined): Promise<void> {
	if (uid) {
		await addDoc(collection(db, 'users', uid, 'cartItems'), {
			...subscriptionProduct
		})
	}

	Router.push(`/payment/checkout`);

}

export async function confirmPurchase(stripe: Stripe | null, items: CartItem[], stripeCustomerId: string | null | undefined) {
	if (!stripe || !stripeCustomerId) return 
	const line_items = items.map((item) => ({
		price: item.stripeID,
		quantity: 1
	}))
	const body = { line_items, stripeCustomerId }
	console.log(body)
	const fn = httpsCallable<any, any>(functions, 'checkouts')
	const data = ((await fn(body)).data)
	console.log(data)
	const { error } = await stripe.redirectToCheckout({
		sessionId: data.id,
	});

	if (error) {
		console.log(error);
	}
}