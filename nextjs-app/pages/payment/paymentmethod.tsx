import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { SetupIntent } from '@stripe/stripe-js'
import { httpsCallable } from 'firebase/functions'
import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaArrowLeft, FaRegCreditCard } from 'react-icons/fa'
import AuthCheck from '../../components/authentication/AuthCheck'
import { functions } from '../../lib/setup/firebase'

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
	const [setupIntent, setSetupIntent] = useState<SetupIntent>();

	useEffect(() => {
		const fn = httpsCallable<any, any>(functions, 'saveCard')

		fn().then((response) => {
			console.log(response)
			setSetupIntent(response.data)
		})
	}, [])

	const handleSubmit = async () => {
		if (!elements || !stripe || !setupIntent) return
		const cardElement = elements.getElement(CardElement)
		console.log("Test")
		if (!cardElement) return
		if (!setupIntent.client_secret) return

		const { setupIntent: updatedSetupIntent, error } = await stripe.confirmCardSetup(setupIntent?.client_secret, {
			payment_method: {
				card: cardElement
			}
		})

		if (error) {
			// alert(error.message);
			toast.error(error.type)
			console.log(error);
		} else {
			setSetupIntent(updatedSetupIntent);
			// await getWallet();
			// alert('Success! Card added to your wallet');
			toast.success('Success! Card added to your wallet')
		}
	}

	return (
		<AuthCheck>
			<main className="w-full p-5">

				<section className="w-full flex flex-col items-center bg-primary">
					<article className="flex flex-col w-full relative p-10 items-center text-white">
						<button onClick={() => router.back()} className="absolute top-0 -translate-y-1/2 left-0 bg-secondary text-white items-center justify-start font-bold text-left rounded-lg flex px-4 py-1">
							<FaArrowLeft />
							<p>Tilbage</p>
						</button>

						<FaRegCreditCard size={50} />
						<h1 className="text-3xl">Tilføj betalingsmetode</h1>
					</article>
					<article className="flex flex-col w-full h-96 bg-slate-300">
						<div id="card" />
						{/* <PaymentElement /> */}
						<CardElement />
						{/* <CardNumberElement/>
						<CardExpiryElement />
						<CardCvcElement /> */}
						<button onClick={handleSubmit} className="bg-secondary">Tilføj betalingsmetode</button>
					</article>
				</section>

				<form action="">

				</form>
			</main>
		</AuthCheck>
	)
}

export default AddPaymentMethodPage