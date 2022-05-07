import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import AuthCheck from '../../components/authentication/AuthCheck';
import { auth, functions } from '../../lib/setup/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { StripeUIHandler } from '../../lib/handlers/stripeHandler';
import { StripeCard, StripeSubscription } from '../../types/StripeTypes';
import Sidebar from '../../components/ui/profile/Sidebar';
import { NextPage } from 'next';
import SubscriptionCard from '../../components/ui/SubscriptionCard';
import MetaForProfile from '../../components/seo-tags/MetaForProfile';
import { httpsCallable } from 'firebase/functions';
import { Stripe } from '@stripe/stripe-js';
import PaymentMethodCard from '../../components/ui/PaymentMethodCard';
import { MdAdd } from 'react-icons/md';
import Loader from '../../components/ui/Loader';
import toast from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

const SubscriptionPage: NextPage = () => {


	return (
		<>
			<MetaForProfile title="Profil - Abonnementer" />
			<AuthCheck>
				<main className="h-screen flex flex-col bg-background">
					<section className="flex w-full h-full">
						<Sidebar />

						<StripeSection />
					</section>
				</main>
			</AuthCheck>
		</>
	)
}


function StripeSection() {
	const stripe = useStripe();
	const elements: any = useElements();
	const [handler, setHandler] = useState<StripeUIHandler | null>(null)
	const [user] = useAuthState(auth);
	const [plan, setPlan] = useState<any>();
	const [subscriptions, setSubscriptions] = useState<StripeSubscription[]>([]);
	const [wallets, setWallets] = useState<StripeCard[]>([])
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null)

	console.log(loading)
	useEffect(() => {
		if (!stripe) return
		const handler = new StripeUIHandler(stripe)
		setHandler(handler)
	}, [stripe])

	// Get current subscriptions on mount
	useEffect(() => {
		if (!user || !handler) return
		getSubscriptions();
		getWallet();
	}, [user, handler]);

	const getWallet = async () => {
		try {
			const fn = httpsCallable<null, StripeCard[]>(functions, 'getCards')
			const data = ((await fn()).data)
			setWallets(data)
			setLoading(false)
		} catch (error: any) {
			toast.error(error.message)
			setLoading(false)
		}


	}

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
		<article className="p-10 w-full overflow-y-auto">
			<section className="mb-20">
				<h1 className="text-3xl font-thin">Dine Abonnementer</h1>
				<p>Adminstrér dine abonnementer og se dine tidligere betalinger</p>
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
					<section>
						<Loader show={loading} />

						{subscriptions.length > 0 && subscriptions.map((sub, i) => (
							<SubscriptionCard key={i} item={sub} handleCancel={cancel} />
						))}
					</section>

				</article>
			</section>
			<section className="flex w-full h-full flex-col">
				<h1 className="text-3xl font-thin">Dine betalingsmetoder</h1>
				<p>Adminstrér dine abonnementer og se dine tidligere betalinger</p>
				<AnimatePresence
					initial={false}
					
				>
					<ul className="flex flex-col overflow-x-hidden">
						{wallets.length > 0 && wallets.map((wallet, i) => (
							<PaymentMethodCard key={i} item={wallet} />
						))}
					</ul>
				</AnimatePresence>

				{loading === false ? (
					<div className="w-full flex items-center justify-center">
						<button className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center">
							<MdAdd className="text-white" size={35} />
						</button>
					</div>
				) : (
					<Loader show={true} />
				)}


			</section>
		</article>


	);
}

export default SubscriptionPage