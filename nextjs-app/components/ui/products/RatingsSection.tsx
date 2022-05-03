import React from 'react'
import RatingCard from '../RatingCard'

const RatingsSection = ({ ratings, title }: { title: string, ratings: Array<{ name: string, review: string, photoURL: string, role: string }> }) => {
	return (
		<section className="w-full max-w-6xl mx-auto h-auto mb-10 px-4 space-y-16">
			<h1 className="font-thin mb-10 text-4xl text-center">{title}</h1>
			<div className="w-auto grid grid-cols-1 h-auto lg:grid-cols-3 gap-4 space-y-10 lg:space-y-0">
				{ratings.map((ratingCard, index) => (
					<RatingCard
						key={index}
						{...ratingCard}
					/>
				))}

			</div>
			{/* <article className="w-full flex items-center justify-center space-x-2">
				<button className="w-10 h-10 rounded-full bg-white text-black">{'<'}</button>
				<button className="w-10 h-10 rounded-full bg-white text-black">{'>'}</button>
			</article> */}
		</section>
	)
}

export default RatingsSection