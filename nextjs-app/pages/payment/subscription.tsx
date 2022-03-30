import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AuthCheck from '../../components/authentication/AuthCheck';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db, functions } from '../../lib/setup/firebase';
import { handleLogout } from '../../lib/helper-functions/user-auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { httpsCallable } from 'firebase/functions';
import { Stripe } from '@stripe/stripe-js';
import { CancelSubscriptionReq, GetSubscriptionsRes } from '../../types/FirebaseFuncReq';
import toast from 'react-hot-toast';

const Subscription = () => {
	return (
		<main>
			<AuthCheck>
				<SubscribeToPlan />
			</AuthCheck>
		</main>
	)
}

function UserData(props: any) {

	const [data, setData] = useState<any>({});

	// Subscribe to the user's data in Firestore
	useEffect(
		() => {
			const unsubscribe = onSnapshot(doc(db, 'users', props.user.uid), (doc) => {
				setData(doc.data())
			})
			return () => unsubscribe()
		},
		[props.user]
	)

	return (
		<pre>
			Stripe Customer ID: {data.stripeCustomerId} <br />
			Subscriptions: {JSON.stringify(data.activePlans || [])}
		</pre>
	);
}

function SubscribeToPlan(props: any) {
	const stripe = useStripe();
	const elements: any = useElements();
	const [user] = useAuthState(auth);

	const [plan, setPlan] = useState<any>();
	const [subscriptions, setSubscriptions] = useState<any>([]);
	const [loading, setLoading] = useState(false);

	// Get current subscriptions on mount
	useEffect(() => {
		getSubscrptions();
	}, [user]);

	// Fetch current subscriptions from the API
	const getSubscrptions = async () => {
		if (user) {
			const fn = httpsCallable<void, GetSubscriptionsRes>(functions, 'getSubscriptions')
			const subscriptions = ((await fn()).data).data
			setSubscriptions(
				subscriptions
			)
			console.log(subscriptions)
		}
	};

	// Cancel a subscription
	const cancel = async (id: string) => {
		setLoading(true);
		const fn = httpsCallable<CancelSubscriptionReq, GetSubscriptionsRes>(functions, 'unsubscribe')
		try {
			await fn({ id })
			toast.success("Fjernede dit abonnement")
			await getSubscrptions();
		} catch (error) {

		}

		setLoading(false);
	};

	// Handle the submission of card details
	const handleSubmit = async (event: any) => {
		if (!stripe) return
		setLoading(true);
		event.preventDefault();

		const cardElement: any = elements.getElement(CardElement);

		// Create Payment Method
		const { paymentMethod, error } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (error) {
			alert(error.message);
			setLoading(false);
			return;
		}

		// Create Subscription on the Server
		const fn = httpsCallable<{ plan: string, payment_method: string, email: string, displayName: string }, { subscription: any }>(functions, 'newSubscription')
		try {
			const subscription = (await fn({ plan, payment_method: paymentMethod.id, email: user?.email || "", displayName: user?.displayName || "" })).data
			// The subscription contains an invoice
			// If the invoice's payment succeeded then you're good, 
			// otherwise, the payment intent must be confirmed

			const { latest_invoice }: any = subscription;

			if (latest_invoice.payment_intent) {
				const { client_secret, status } = latest_invoice.payment_intent;

				if (status === 'requires_action') {
					const { error: confirmationError } = await stripe.confirmCardPayment(
						client_secret
					);
					if (confirmationError) {
						console.error(confirmationError);
						toast.error("Unable to confirm card information.")
						return;
					}
				}

				// success
				toast.success("You are now subscribed!")
				getSubscrptions();
			}

			setLoading(false);
			setPlan(null);
		} catch (error: any) {
			console.log(error?.message)
		}



	};

	return (
		<>
			<div>
				<div>
					{user && 'uid' in user && <UserData user={user} />}
				</div>

				<hr />

				<div>

					<button
						onClick={() => setPlan('price_1KgY2xHEMIrqYYjGShOuobD6')}>
						Choose Monthly $25/m
					</button>

					<button
						onClick={() => setPlan('price_1KgY2xHEMIrqYYjGShOuobD6')}>
						Choose Quarterly $50/q
					</button>

					<p>
						Selected Plan: <strong>{plan}</strong>
					</p>
				</div>
				<hr />

				<form onSubmit={handleSubmit} hidden={!plan}>

					<CardElement />
					<button type="submit" disabled={loading}>
						Subscribe & Pay
					</button>
				</form>

				<div>
					<h3>Manage Current Subscriptions</h3>
					<div>
						{subscriptions.length > 0 && subscriptions.map((sub: any) => (
							<div key={sub.id}>
								{sub.id}. Next payment of {sub.plan.amount} due{' '}
								{new Date(sub.current_period_end * 1000).toUTCString()}
								<button
									onClick={() => cancel(sub.id)}
									disabled={loading}>
									Cancel
								</button>
							</div>
						))}
					</div>
				</div>

				<div>
					<button onClick={handleLogout}>Sign out</button>
				</div>
			</div>

		</>
	);
}

export default Subscription