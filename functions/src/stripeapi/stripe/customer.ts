import Stripe from "stripe";
import { db, stripe } from "../../setup";

export async function getOrCreateCustomer(userId: string, params?: Stripe.CustomerCreateParams) {

	const userSnapshot = await db.collection('users').doc(userId).get();
 
	const { stripeCustomerId, email, fullName }: any = userSnapshot.data()
 
	// If missing customerID, create it
	if (!stripeCustomerId) {
	    // CREATE new customer
	    const customer = await stripe.customers.create({
		   email,
		   metadata: {
			  firebaseUID: userId
		   },
		   name: fullName,
		   ...params
	    });
	    await userSnapshot.ref.update({ stripeCustomerId: customer.id });
	    return customer;
	} else {
	    return await stripe.customers.retrieve(stripeCustomerId) as Stripe.Customer;
	}
 
 }

 export async function createCustomer(
	email: string, 
	firebaseUID: string, 
	params?: Stripe.CustomerCreateParams
): Promise<Stripe.Response<Stripe.Customer>> {
	 return await stripe.customers.create({
		email,
		metadata: {
			firebaseUID
		},
		...params
	 })
 }

 /**
 * Creates a SetupIntent used to save a credit card for later use
 */
export async function createSetupIntent(userId: string) {

	const customer = await getOrCreateCustomer(userId);
 
	return stripe.setupIntents.create({ 
	    customer: customer.id,
	})
 }
 
export async function deleteCustomer(customerId: string){
	return await stripe.customers.del(customerId)
}

 /**
  * Returns all payment sources associated to the user
  */
 export async function listPaymentMethods(userId: string) {
	const customer = await getOrCreateCustomer(userId);
 
	return stripe.paymentMethods.list({
	    customer: customer.id,
	    type: 'card',
	});
 }