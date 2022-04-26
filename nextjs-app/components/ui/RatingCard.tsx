import Image from 'next/image'
import React from 'react'

const RatingCard = ({ name, review, photoURL }: { name: string, review: string, photoURL: string}) => {
  return (
    <article className="w-full bg-white">
	    <Image 
	    		src={photoURL}
			height={50}
			width={50}
	    />
	    <h1>{name}</h1>
	    <p>
		    {review}
	    </p>
    </article>
  )
}

export default RatingCard