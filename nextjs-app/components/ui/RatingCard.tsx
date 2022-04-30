import Image from 'next/image'
import React from 'react'

const RatingCard = ({ name, review, photoURL, role }: { name: string, review: string, photoURL: string, role: string }) => {
	return (
		<article className="w-full flex-shrink-0 bg-white rounded-lg relative space-y-2 p-6 flex flex-col h-full border-highlight border-t-2">
			<section className="flex flex-col items-center justify-center pt-10">
				<div className="absolute top-0 -translate-y-1/2 rounded-full z-10">
					<Image
						src={photoURL}
						className=" rounded-full"
						height={75}
						width={75}
					/>
				</div>
				<h1 className="font-bold text-xl">{name}</h1>
				<h2 className="font-thin text-2xl ">{role} HTX Roskilde</h2>
			</section>
			<section className="text-justify h-56 scroll-mt-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-highlight overflow-y-visible">
				<p className="text-black font-semibold pr-4">
					{review}
				</p>
			</section>
		</article>
	)
}

export default RatingCard