import Link from 'next/link'
import React from 'react'

const SignInUI = () => {
	return (
		<main className="w-full min-h-screen">
			<h1 className="text-center font-bold text-4xl">Hov. Der ser vidst ud til, at du ikke er logget ind</h1>
			<section className="flex flex-col p-2 space-y-2">
				<Link href="/login">
					<button className=" px-4 py-2 bg-secondary text-white rounded-lg">
						Log ind
					</button>
				</Link>
				<Link href="/">
					<button className="px-4 py-2 bg-secondary text-white rounded-lg">
						Gå tilbage til startside
					</button>
				</Link>
			</section>

		</main>
	)
}

export default SignInUI