import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { useRouter } from 'next/router';
const variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 }
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 }
	}
};

const itemIds = [0, 1, 2, 3, 4];
const Navigation = ({ toggle }: any) => {
	const router = useRouter()

	const handleClick = (destination: string) => {
		toggle((prev: boolean) => !prev)
		router.push(destination)
	}

	return (
		<motion.aside className="h-screen flex flex-col items-center justify-start z-50 bg-primary w-[300px] fixed top-0 left-0">
			<section className="flex  w-full items-center p-2">
				<button className="rounded-full h-10 w-10 bg-white " onClick={() => toggle((prev: any) => !prev)}>X</button>

			</section>
			<section className="flex flex-col  h-full w-full items-start justify-start px-4 text-white font-bold">
				<h1 className="text-2xl font-thin mb-5">Navigation</h1>
				<button onClick={() => handleClick('/products/amfolabs')}>
					Produkter
				</button>
				<button onClick={() => handleClick('/products/prices')}>
					Priser
				</button>
				<button onClick={() => handleClick('/aboutus')}>
					Om us
				</button>
			</section>
			<section className="h-28 p-2 w-full">
					<button  onClick={() => handleClick('/login')} className="bg-secondary px-4 py-2 text-white font-bold rounded-lg">
						Log ind
					</button>
			</section>
		</motion.aside>
	)
}

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const itemVariants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 }
		}
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 }
		}
	}
};


const Item = ({ i }: any) => {
	const style = { border: `2px solid ${colors[i]}` };
	return (
		<motion.li
			variants={itemVariants}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
		>
			<div className="icon-placeholder" style={style} />
			<div className="text-placeholder" style={style} />
		</motion.li>
	);
}

export default Navigation