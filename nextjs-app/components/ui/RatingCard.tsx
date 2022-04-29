import Image from 'next/image'
import React from 'react'

const RatingCard = ({ name, review, photoURL }: { name: string, review: string, photoURL: string }) => {
	return (
		<article className="w-full bg-white relative p-8 flex flex-col">
			<section className="flex flex-col items-center justify-center">
				<Image
					src={photoURL}
					className=""
					height={50}
					width={50}
				/>
				<h1 className="font-bold text-2xl">{name}</h1>
			</section>
			<section className="text-justify">
				<p>
					{review}
				</p>
			</section>
		</article>
	)
}

export default RatingCard