import React from 'react'
import { IconType } from 'react-icons'

const Card = ({ title, Icon, text }: { title: string, Icon: IconType, text: string }) => {
	return (
		<article className="w-full h-72 p-4 bg-white rounded-xl flex flex-col space-y-4 items-center justify-center transition-all cursor-default ease-in-out group hover:shadow-xl">
			<h1 className="text-black font-semibold">{title}</h1>
			<Icon size={60} className=" transform scale-100 transition-all ease-in-out group-hover:scale-105"/>
			<p className="text-black text-center">{text}</p>
		</article>
	)
}

export default Card