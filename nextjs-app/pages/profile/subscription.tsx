import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AuthCheck from '../../components/authentication/AuthCheck';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../lib/setup/firebase';
import { handleLogout } from '../../lib/helper-functions/user-auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { StripeUIHandler } from '../../lib/handlers/stripeHandler';
import { StripeSubscription } from '../../types/StripeTypes';

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
	const [subscriptions, setSubscriptions] = useState<StripeSubscription[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null)

	const handler = new StripeUIHandler(stripe)

	// Get current subscriptions on mount
	useEffect(() => {
		getSubscriptions();
	}, [user]);

	// Fetch current subscriptions from the API
	const getSubscriptions = async () => {
		if (user) {
			try {
				const subscriptions = await handler.getSubscriptions()
				setSubscriptions(
					subscriptions
				)
			} catch (error: any) {
				console.log(error)
				setError(error)
			}

		}
	};

	// Cancel a subscription
	const cancel = async (id: string) => {
		setLoading(true);
		await handler.cancelSubscription(id)
		getSubscriptions();
		setLoading(false);
	};

	// Handle the submission of card details
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		setLoading(true);
		const cardElement: any = elements.getElement(CardElement);
		await handler.newSubscription(cardElement, plan, user)
		getSubscriptions();
		setLoading(false);
		setPlan(null);
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
						{subscriptions.length > 0 && subscriptions.map((sub) => (
							<div key={sub.id}>
								{sub.id}. Next payment of {sub.plan.amount} due{' '}
								{new Date(sub.current_period_end * 1000).toUTCString()}
								--
								{new Date(sub.start_date * 1000).toUTCString()}
								<button
									onClick={() => cancel(sub.id)}
									disabled={loading}>
									Cancel
								</button>
							</div>
						))}
					</div>
				</div>
				{error && (
					<p className="text-red-600">{error.name === "FirebaseError" ? "Something wrong with server. Please try again later" : error.message}</p>
				)}
				<div>
					<button onClick={handleLogout}>Sign out</button>
				</div>
			</div>

		</>
	);
}

export default Subscription