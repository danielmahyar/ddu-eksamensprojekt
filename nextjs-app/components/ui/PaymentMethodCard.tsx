import Image from 'next/image'
import React from 'react'
import { StripeCard } from '../../types/StripeTypes'
import card from '../../public/card.png'
import { MdClear, MdSettings } from 'react-icons/md'
import { Variants, motion } from 'framer-motion'

const PaymentMethodCard = ({ item }: { item: StripeCard }) => {
	const { brand, last4 } = item.card
	const cardVariants: Variants = {
		offscreen: {
			x: -1000,
			opacity: 0
		},
		onscreen: {
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				bounce: 0.2,
				stiffness: 100,
				duration: 0.75
			}
		},
		exit: {
			x: -10000,
			opacity: 0
		}
	};

	return (
		<motion.li
			variants={cardVariants}
			initial="offscreen"
			animate="onscreen"
			exit="exit"
			className="w-full bg-white h-auto flex space-x-4 py-8 shadow-lg"
		>
			<div className="w-auto flex items-center pl-5">
				<Image
					src={card}
					height={60}
					width={60}
				/>
			</div>
			<div className="flex flex-col items-start justify-center w-full">
				<h1 className="font-bold text-lg">Primær kort</h1>
				<h2 className="capitalize">{brand}••••••••••••{last4}</h2>
			</div>
			<div className="w-auto flex items-center justify-center space-x-2 px-4">
				<button>
					<MdSettings size={35} />
				</button>
				<button>
					<MdClear size={35} />
				</button>

			</div>
		</motion.li>
	)
}

export default PaymentMethodCard