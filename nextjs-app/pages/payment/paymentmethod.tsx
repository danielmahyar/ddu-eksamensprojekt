import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FaArrowLeft, FaRegCreditCard } from 'react-icons/fa'
import AuthCheck from '../../components/authentication/AuthCheck'

const AddPaymentMethodPage: NextPage = () => {
	const router = useRouter() 
	const stripe = useStripe()
	const elements = useElements()

	useEffect(() => {
		const element = elements?.create('card', {
			style: {
			  base: {
			    iconColor: '#c4f0ff',
			    color: '#fff',
			    fontWeight: '500',
			    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
			    fontSize: '16px',
			    fontSmoothing: 'antialiased',
			    ':-webkit-autofill': {
				 color: '#fce883',
			    },
			    '::placeholder': {
				 color: '#87BBFD',
			    },
			  },
			  invalid: {
			    iconColor: '#FFC7EE',
			    color: '#FFC7EE',
			  },
			},
		   });

		element?.mount('#card')

		return () => {
			element?.unmount()
		}
	}, [router])

	const handleSubmit = () => {
		if(!elements) return
		const cardElement = elements.getElement(CardElement);
		
	}

	return (
		<AuthCheck>
			<main className="w-screen p-5">

				<section className="w-full flex flex-col items-center bg-primary">
					<article className="flex flex-col w-full relative p-10 items-center text-white">
						<button onClick={() => router.back()} className="absolute top-0 -translate-y-1/2 left-0 bg-secondary text-white items-center justify-start font-bold text-left rounded-lg flex px-4 py-1">
							<FaArrowLeft />
							<p>Tilbage</p>
						</button>

						<FaRegCreditCard size={50}/>
						<h1 className="text-3xl">Tilføj betalingsmetode</h1>
					</article>
					<article className="flex flex-col w-full h-96 bg-slate-300">
						<div id="card"/>
						{/* <PaymentElement /> */}
						{/* <CardElement className="flex flex-col"/> */}
						{/* <CardNumberElement/>
						<CardExpiryElement />
						<CardCvcElement /> */}
						<button className="bg-secondary">Tilføj betalingsmetode</button>
					</article>
				</section>

				<form action="">

				</form>
			</main>
		</AuthCheck>
	)
}

export default AddPaymentMethodPage