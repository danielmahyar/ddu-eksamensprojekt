import { deleteDoc, doc } from 'firebase/firestore'
import Image from 'next/image'
import React from 'react'
import { FaSearch, FaTrash } from 'react-icons/fa'
import temp from '../../public/amfolabs-logo.png'
import { BaseSubscriptionVariants, CartItem } from '../../types/ProductsTypes'

const CheckoutCard = ({ item, handleDeleteProduct }: { item: CartItem, handleDeleteProduct: any }) => {

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
					
					{
						sortDescriptionText(item.type)
					}

					<div className="flex md:flex-row items-center text-sm justify-center p-2 space-x-4">
						<button
							className="text-white bg-red-600 py-2 px-4 flex items-center justify-center rounded-lg"
							onClick={() => handleDeleteProduct(item.cartID)}
						>
							<FaTrash size={10} />
							<p className="text-white">Slet</p>

						</button>
						|
						<FaSearch size={25} />
						Led efter nye produkter
					</div>
				</article>
			</section>
		</article>
	)
}

function sortDescriptionText(subType: BaseSubscriptionVariants) {
	const now = new Date(Date.now());

	switch (subType) {
		case BaseSubscriptionVariants.one_month:
			return (
				<>
					<h2 className="text-center">AmfoLabs til Termodynamik</h2>
					<h3 className="text-center">1 måneds abonnement</h3>
					<p className="text-center">Frem til {new Date(now.setMonth(now.getMonth() + 1)).toUTCString()}</p>
				</>
			)
		case BaseSubscriptionVariants.three_month:
			return (
				<>
					<h2 className="text-center">AmfoLabs til Termodynamik</h2>
					<h3 className="text-center">3 måneders abonnement</h3>
					<p className="text-center">Frem til {new Date(now.setMonth(now.getMonth() + 3)).toUTCString()}</p>
				</>
			)
		case BaseSubscriptionVariants.yearly:
			return (
				<>
					<h2 className="text-center">AmfoLabs til Termodynamik</h2>
					<h3 className="text-center">Årligt abonnement</h3>
					<p className="text-center">Frem til {new Date(now.setMonth(now.getMonth() + 12)).toUTCString()}</p>
				</>
			)
	}
}

export default CheckoutCard