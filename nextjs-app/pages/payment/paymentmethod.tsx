import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { collection, getDocs } from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaArrowLeft, FaRegCreditCard } from 'react-icons/fa'
import AuthCheck from '../../components/authentication/AuthCheck'
import { UserContext } from '../../lib/context/auth-context'
import { db, functions } from '../../lib/setup/firebase'
import { StripeSubscription } from '../../types/StripeTypes'

export const getStaticProps: GetStaticProps = async () => {

	return {
		props: {
			name: "test"
		}
	}
}

const AddPaymentMethodPage: NextPage = () => {
	const router = useRouter()
	const stripe = useStripe()
	const elements = useElements()
	const { user, extraInfo } = useContext(UserContext)
	// const [setupIntent, setSetupIntent] = useState<SetupIntent>();

	// useEffect(() => {
	// 	const fn = httpsCallable<any, any>(functions, 'saveCard')
	// 	fn().then((response) => setSetupIntent(response.data))
	// }, [])

	const handleSubmit = async () => {
		const loading = toast.loading('Behandler dine kort oplysninger')
		if (!elements || !stripe || !user) return
		const cardElement = elements.getElement(CardElement)
		if (!cardElement) return

		const { paymentMethod, error } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement
		})


		if (error) {
			toast.dismiss(loading)
			toast.error(error.type)
			console.log(error);
			return
		}

		// toast.success('Kortet er nu oprettet!')

		if (!paymentMethod) return

		const dbData = await getDocs(collection(db, 'users', user?.uid, 'cartItems'))

		const fn = httpsCallable<{ email: string, displayName: string, plan: string, payment_method: string }, StripeSubscription>(functions, 'newSubscription')

		const { data: subscription } = await fn({ email: user.email || "", displayName: user.displayName || "", plan: dbData.docs[0].data().stripeID || "", payment_method: paymentMethod.id })

		const { latest_invoice } = subscription;

		if (latest_invoice.payment_intent) {
			const { client_secret, status } = latest_invoice.payment_intent;

			if (status === 'requires_action') {
				const { error: confirmationError } = await stripe.confirmCardPayment(
					client_secret
				);
				if (confirmationError) {
					console.error(confirmationError);
					toast.dismiss(loading)
					toast.error('unable to confirm card');
					return;
				}
			}
			toast.dismiss(loading)
			toast.success('Du er nu abonneret!');
			router.replace(`/payment/confirmation?itemId=1wwiM2PGNAXdTgP6S62d&stripeID=${extraInfo.stripeCustomerId}`)
		}

	}

	return (
		<AuthCheck>
			<main className="w-full p-5">

				<section className="w-full flex flex-col items-center bg-primary">
					<article className="flex flex-col w-full relative p-10 items-center text-white">
						<button onClick={() => router.back()} className="absolute top-4 left-4 bg-secondary text-white items-center justify-start font-bold text-left rounded-lg flex px-4 py-1">
							<FaArrowLeft />
							<p>Tilbage</p>
						</button>

						<FaRegCreditCard size={50} />
						<h1 className="text-3xl">Tilføj betalingsmetode</h1>
					</article>
					<article className="flex flex-col w-full h-auto bg-primary p-4 space-y-2">
						{/* <PaymentElement /> */}
						<CardElement className='border p-4 text-white'/>
						{/* <CardNumberElement/>
						<CardExpiryElement />
						<CardCvcElement /> */}
						<button onClick={handleSubmit} className="text-white rounded-md font-bold py-2 px-6 bg-secondary">Tilføj betalingsmetode</button>
					</article>
				</section>

			</main>
		</AuthCheck>
	)
}

export default AddPaymentMethodPage