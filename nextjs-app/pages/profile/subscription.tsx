import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AuthCheck from '../../components/authentication/AuthCheck';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../lib/setup/firebase';
import { handleLogout } from '../../lib/helper-functions/user-auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { StripeUIHandler } from '../../lib/handlers/stripeHandler';
import { StripeSubscription } from '../../types/StripeTypes';
import Sidebar from '../../components/ui/profile/Sidebar';
import { NextPage } from 'next';
import SubscriptionCard from '../../components/ui/SubscriptionCard';

const SubscriptionPage: NextPage = () => {

	return (
		<main className="h-screen flex flex-col bg-background">
			<AuthCheck>
				<section className="flex w-full h-full">
					<Sidebar />
					<article className="p-10 w-full overflow-y-auto">
						<h1 className="text-3xl font-thin">Dine Abonnementer</h1>
						<p>Adminstrér dine abonnementer og se dine tidligere betalinger</p>
						<SubscribeToPlan />
					</article>
				</section>
			</AuthCheck>
		</main>
	)
}


function SubscribeToPlan() {
	const stripe = useStripe();
	const elements: any = useElements();
	const [handler, setHandler] = useState<StripeUIHandler | null>(null)
	const [user] = useAuthState(auth);
	const [plan, setPlan] = useState<any>();
	const [subscriptions, setSubscriptions] = useState<StripeSubscription[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null)


	useEffect(() => {
		if(!stripe) return 
		const handler = new StripeUIHandler(stripe)
		setHandler(handler)
	}, [stripe])

	// Get current subscriptions on mount
	useEffect(() => {
		if(!user || !handler) return
		getSubscriptions();
	}, [user, handler]);

	// Fetch current subscriptions from the API
	const getSubscriptions = async () => {
		if (!handler) return
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
		if (!handler) return
		setLoading(true);
		await handler.cancelSubscription(id)
		getSubscriptions();
		setLoading(false);
	};

	// Handle the submission of card details
	const handleSubmit = async (event: any) => {
		if (!handler) return
		event.preventDefault();
		setLoading(true);
		const cardElement: any = elements.getElement(CardElement);
		await handler.newSubscription(cardElement, plan, user)
		getSubscriptions();
		setLoading(false);
		setPlan(null);
	};

	return (
		<section>
			<article>
				<section>
					<ul className="flex items-center justify-between px-4">
						<li>Status</li>
						<li>Abonnement</li>
						<li>Pris</li>
						<li>Dato</li>
						<li>Adminstrér</li>
					</ul>
				</section>
				<div>
					{subscriptions.length > 0 && subscriptions.map((sub) => (
						<SubscriptionCard item={sub} handleCancel={cancel}/>
						// <div key={sub.id}>
						// 	{sub.id}. Next payment of {sub.plan.amount} due{' '}
						// 	{new Date(sub.current_period_end * 1000).toUTCString()}
						// 	--
						// 	{new Date(sub.start_date * 1000).toUTCString()}
						// 	<button
						// 		onClick={() => cancel(sub.id)}
						// 		disabled={loading}>
						// 		Cancel
						// 	</button>
						// </div>
					))}
				</div>
				
			</article>
		</section>

	);
}

export default SubscriptionPage