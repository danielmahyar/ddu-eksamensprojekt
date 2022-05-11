import Stripe from "stripe";
import { firestore } from 'firebase-admin';

/**
 * Stripe global value with registered API_KEY
 */
export const stripe = new Stripe("sk_test_51ElZLlHEMIrqYYjGwSgK1ugfDsEtAAuKvXlPnWu76xpXSn0gzbsOnbfwsv1UW6VOYpzhPzjdTZlcHF1ooYiwbPvJ00MQiWHPCh", {
	apiVersion: "2020-08-27"
})


/**
 * Global Firestore Instance
 */
export const db = firestore()