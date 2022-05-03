import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import Image from "next/image";
const images = ["https://picsum.photos/200/300?grayscale", "https://picsum.photos/200/300?grayscale", "https://picsum.photos/200/300?grayscale"]

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 4000 : -4000,
			opacity: 0
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 4000 : -4000,
			opacity: 0
		};
	}
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};


export default function Carousel() {
	const [[page, direction], setPage] = useState([0, 0]);

	// We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
	// then wrap that within 0-2 to find our image ID in the array below. By passing an
	// absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
	// detect it as an entirely new image. So you can infinitely paginate as few as 1 images.

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	return (
		<>
			<AnimatePresence initial={false} custom={direction}>
				<motion.article
					key={page}
					custom={direction}
					variants={variants}
					className="w-full h-fit relative"
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 }
					}}
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={1}
					onDragEnd={(e, { offset, velocity }) => {
						const swipe = swipePower(offset.x, velocity.x);

						if (swipe < -swipeConfidenceThreshold) {
							paginate(1);
						} else if (swipe > swipeConfidenceThreshold) {
							paginate(-1);
						}
					}}
				>
					<article className="w-full h-auto max-w-6xl mx-auto flex flex-col py-0 md:flex-row text-white md:py-20 px-4">
						<section className=" w-full flex flex-col items-center md:items-start space-y-6 overflow-hidden">
							<div className="h-20 md:h-32" />
							<h1
								className="text-center md:text-left text-4xl md:text-5xl"
							>Helpifys AmfoLabs</h1>
							<p className="text-center md:text-left text-2xl">Det eneste program du behøver til termodynamik emnet i gym. Har alting <strong className="font-bold">du</strong> skal bruge til <strong className="font-bold">eksamen</strong></p>
							<div className="flex flex-col lg:flex-row items-center md:items-start justify-center space-y-2 lg:space-x-2 lg:space-y-0">
								<button
									className="bg-secondary hidden md:block px-14 w-64 font-bold py-3 rounded-lg cursor-pointer"
								>Prøv produktet</button>
								<button
									className="bg-secondary px-14 w-48 font-bold py-3 rounded-lg"
								>Se priser</button>
							</div>
							<div className="h-20 md:h-32" />
						</section>

						<section className="w-full hidden md:flex items-center justify-center lg:justify-end">
							<div className="border-4 border-highlight rounded-full w-36 h-36 md:w-72 md:h-72 lg:h-96 lg:w-96 relative">
								<Image
									src={'/amfolabs-logo.svg'}
									layout="fill"
									className="rounded-full"
								/>
							</div>
						</section>
					</article>

				</motion.article>
			</AnimatePresence>
			<div className="next" onClick={() => paginate(1)}>
				{"‣"}
			</div>
			<div className="prev" onClick={() => paginate(-1)}>
				{"‣"}
			</div>
		</>
	);
};