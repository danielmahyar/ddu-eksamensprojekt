import React from 'react'
import { IconType } from 'react-icons'
import { motion, Variants } from 'framer-motion'

const Card = ({ title, Icon, text }: { title: string, Icon: IconType, text: string }) => {
	const cardVariants: Variants = {
		offscreen: {
			scale: 0
		},
		onscreen: {
			scale: 1,
			rotate: 0,
			transition: {
				type: "spring",
				bounce: 0.2,
				duration: 0.5
			}
		}
	};

	return (
		<motion.article
			className="w-full h-72 p-4 bg-white rounded-xl flex items-center justify-center transition-all cursor-default ease-in-out group hover:shadow-xl"
			initial="offscreen"
			whileHover={{ scale: 1.05 }}
			whileInView="onscreen"
			viewport={{ once: true, amount: 0.8 }}
		>
			<motion.div
				className="flex flex-col space-y-4 items-center justify-center relative"
				variants={cardVariants}
			>
				<h1 className="text-black font-bold">{title}</h1>
				<Icon size={60} className=" transform scale-100 transition-all ease-in-out group-hover:scale-105" />
				<p className="text-black text-center">{text}</p>
			</motion.div>
		</motion.article>
	)
}

export default Card