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

export async function confirmPurchase(stripe: Stripe | null, items: CartItem[]) {
	// if (!stripe) return 
	// const line_items = items.map((item) => ({
	// 	name: item.name,
	// 	description: 'Product',
	// 	amount: item.price,
	// 	currency: 'dkk',
	// 	quantity: 1
	// }))
	// const body = { line_items }

	// const fn = httpsCallable<any, any>(functions, 'checkouts')
	// const sessionId = ((await fn(body)).data).data
	// console.log(sessionId)
	// const { error } = await stripe.redirectToCheckout({
	// 	sessionId,
	// });

	// if (error) {
	// 	console.log(error);
	// }

	Router.push("/payment/paymentmethod")
}