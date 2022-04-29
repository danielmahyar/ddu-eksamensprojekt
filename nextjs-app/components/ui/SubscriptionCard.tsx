import React from 'react'
import { FaStop, FaTrash } from 'react-icons/fa'
import { MdClear } from 'react-icons/md'
import { StripeSubscription } from '../../types/StripeTypes'

const SubscriptionCard = ({ item }: { item: StripeSubscription }) => {

	const handleCancel = () => {
		
	}

	return (
		<article className="flex items-center justify-between w-full bg-white px-4 py-10 shadow-lg">
			<section>
				{item.status}
			</section>
			<section>
				{item.items.data[0].subscription}
			</section>
			<section>
				Pris
			</section>
			<section>
				Dato
			</section>
			<section>
				<button onClick={handleCancel}>
					<MdClear className="p-2 bg-red-600 rounded-full text-white" size={40} />
				</button>
			</section>
		</article>
	)
}

export default SubscriptionCard