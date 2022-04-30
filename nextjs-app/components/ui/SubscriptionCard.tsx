import React from 'react'
import { FaStop, FaTrash } from 'react-icons/fa'
import { MdClear } from 'react-icons/md'
import { StripeSubscription } from '../../types/StripeTypes'

const SubscriptionCard = ({ item, handleCancel }: { item: StripeSubscription, handleCancel: (id: string) => void }) => {

	const handleCancelClick = () => {
		handleCancel(item.id)
	}

	return (
		<article className="flex items-center justify-between w-full bg-white px-4 py-10 shadow-lg">
			<section>
				{item.status === 'active' ? (
					<svg className="checkmark h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
						<circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
						<path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
					</svg>
				) : (
					<div className="w-10 h-10 bg-red-600"/>
				)}
			</section>
			<section>
				{item.items.data[0].price.nickname}
			</section>
			<section>
				{item.items.data[0].price.product}
			</section>
			<section>
				Dato
			</section>
			<section>
				<button onClick={handleCancelClick}>
					<MdClear className="p-2 bg-red-600 rounded-full text-white" size={40} />
				</button>
			</section>
		</article>
	)
}

export default SubscriptionCard