import Image from 'next/image'
import React from 'react'
import { FaSearch, FaTrash } from 'react-icons/fa'
import temp from '../../public/amfolabs-logo.png'

const CheckoutCard = () => {
	return (
		<article className="bg-white shadow-lg p-5">
			<h1 className="font-bold py-6 px-8">AmfoLabs af Helpify</h1>
			<section className="flex flex-col md:flex-row items-center justify-center md:justify-start">
				<article>
					<Image
						src={temp}
						width={200}
						height={200}

					/>
				</article>
				<article className="flex flex-col">
					<h2 className="text-center">AmfoLabs til Termodynamik</h2>
					<h3 className="text-center">3 måneders abonnement</h3>
					<p className="text-center">Frem til 27/07/2022</p>

					<div className="flex md:flex-row items-center text-sm justify-center p-2 space-x-4">
						<FaTrash size={25} />
						Slet
						|
						<FaSearch size={25} />
						Led efter nye produkter
					</div>
				</article>
			</section>
		</article>
	)
}

export default CheckoutCard