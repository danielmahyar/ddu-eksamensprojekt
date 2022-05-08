import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import Image from "next/image";
import { useRouter } from "next/router";
const images = ["https://picsum.photos/200/300?grayscale", "https://picsum.photos/200/300?grayscale", "https://picsum.photos/200/300?grayscale"]


const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
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
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
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

let pageTime = 0
export default function Carousel() {
	const [[page, direction], setPage] = useState([0, 0]);

	// We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
	// then wrap that within 0-2 to find our image ID in the array below. By passing an
	// absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
	// detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
	const imageIndex = wrap(0, images.length, page);

	useEffect(() => {
		const interval = setInterval(() => {
			if(pageTime === 2) {
				pageTime = 0;
				setPage([pageTime, direction])
				return
			}
			++pageTime
			setPage([pageTime, direction])
		}, 5000);
		return () => {
			console.log("Test")
			clearInterval(interval)
		};
	}, [])


	const paginate = (newDirection: number) => {
		if (page + newDirection === images.length) return
		setPage([page + newDirection, newDirection]);
	};

	return (
		<article className="relative w-full h-auto flex flex-col items-center">
			<AnimatePresence initial={false} custom={direction}>
				{imageIndex === 0 && (
					<AmfoLabsSection index={imageIndex} direction={direction} paginate={paginate} />
				)}
				{imageIndex === 1 && (
					<AmfoLabsSection text="Pampolabs" index={imageIndex} direction={direction} paginate={paginate} />
				)}
				{imageIndex === 2 && (
					<AmfoLabsSection text="Xanthophyllium" index={imageIndex} direction={direction} paginate={paginate} />
				)}
			</AnimatePresence>
			<ul className="flex items-center bottom-10 justify-center space-x-2 h-10 w-auto absolute z-10">
				<li onClick={() => setPage([0, direction])} className={`w-8 h-[6px] rounded-lg transition-all ease-in-out ${page === 0 ? 'bg-highlight' : 'bg-slate-400'} hover:bg-slate-200 cursor-pointer`}></li>
				<li onClick={() => setPage([1, direction])} className={`w-8 h-[6px] rounded-lg transition-all ease-in-out ${page === 1 ? 'bg-highlight' : 'bg-slate-400'} hover:bg-slate-200 cursor-pointer`}></li>
				<li onClick={() => setPage([2, direction])} className={`w-8 h-[6px] rounded-lg transition-all ease-in-out ${page === 2 ? 'bg-highlight' : 'bg-slate-400'} hover:bg-slate-200 cursor-pointer`}></li>
			</ul>
		</article>
	);
};


function AmfoLabsSection({ index, direction, paginate, text = 'AmfoLabs' }: any) {
	const router = useRouter()
	return (
		<motion.article
			key={index}
			custom={direction}
			variants={variants}
			className=""
			initial="enter"
			animate="center"
			exit="exit"
			transition={{
				x: { type: "spring", stiffness: 300, damping: 26 },
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
					>Helpifys {text}</h1>
					<p className="text-center md:text-left text-2xl">Det eneste program du behøver til termodynamik emnet i gym. Har alting <strong className="font-bold">du</strong> skal bruge til <strong className="font-bold">eksamen</strong></p>
					<div className="flex flex-col lg:flex-row items-center md:items-start justify-center space-y-2 lg:space-x-2 lg:space-y-0">
						<button
							onClick={() => router.push('/products/amfolabs')}
							className="bg-secondary hidden md:block px-14 w-64 font-bold py-3 rounded-lg cursor-pointer"
						>Prøv produktet</button>
						<button
							onClick={() => router.push('/products/prices')}
							className="bg-secondary px-14 w-48 font-bold py-3 rounded-lg"
						>Se priser</button>
					</div>
					<div className="h-20 md:h-32" />
				</section>

				<section className="w-full hidden md:flex items-center justify-center lg:justify-end">
					<div className=" select-none rounded-full w-36 h-36 md:w-72 md:h-72 lg:h-96 lg:w-96 relative">
						<Image
							src={'/helpify-transparent-vector.svg'}
							layout="fill"
							className="rounded-full "
						/>
					</div>
				</section>
			</article>

		</motion.article>
	)
}

