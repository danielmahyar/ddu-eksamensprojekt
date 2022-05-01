import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { useSetRecoilState } from 'recoil'
import MetaForIndex from '../../components/seo-tags/MetaForIndex'
import { userflow, UserState } from '../../lib/atoms/userflow'
import { UserContext } from '../../lib/context/auth-context'
import { buyItem } from '../../lib/handlers/userflowHandler'
import { BaseSubscriptionVariants, SubscriptionProduct } from '../../types/ProductsTypes'

const AMFOLABS = "1wwiM2PGNAXdTgP6S62d"
const ONE_MONTH_SUBSCRIPTION: SubscriptionProduct = {
	productID: AMFOLABS,
	stripeID: "price_1KtFjVHEMIrqYYjGT8TQztk4",
	name: "AmfoLabs",
	type: BaseSubscriptionVariants.one_month,
	photoURL: 'amfolabs-logo.png',
	price: 39
}
const THREE_MONTH_SUBSCRIPTION: SubscriptionProduct = {
	productID: AMFOLABS,
	stripeID: "price_1KtFkWHEMIrqYYjGRL41yEUg",
	name: "AmfoLabs",
	type: BaseSubscriptionVariants.three_month,
	photoURL: 'amfolabs-logo.png',
	price: 109
}
const YEARLY_SUBSCRIPTION: SubscriptionProduct = {
	productID: AMFOLABS,
	stripeID: "price_1KtFkyHEMIrqYYjGy3lJuziZ",
	name: "AmfoLabs",
	type: BaseSubscriptionVariants.yearly,
	photoURL: 'amfolabs-logo.png',
	price: 399
}

const productVariants = {
	ONE_MONTH_SUBSCRIPTION,
	THREE_MONTH_SUBSCRIPTION,
	YEARLY_SUBSCRIPTION
}
const PricesPage = () => {
	const { user } = useContext(UserContext)
	const router = useRouter()
	const setUserflow = useSetRecoilState(userflow)

	const handleBuyPressed = (productKeyName: BaseSubscriptionVariants) => {
		if (!user) {
			setUserflow({ flow: UserState.buyProductAfterSignup, tempProduct: productVariants[productKeyName] })
			router.push('/signup')
		} else {
			buyItem(productVariants[productKeyName], user?.uid)
		}
	}

	return (
		<>
			<MetaForIndex />
			<main className="min-h-screen">
				<section className="h-auto bg-secondary">
					<div className="w-full max-w-6xl mx-auto py-10 text-white relative space-y-14">
						{/* <div className="w-full  h-96 bg-secondary absolute -top-0 z-0" /> */}
						<h1 className="z-20 text-3xl text-center font-thin">Priser for AmfoLabs Calculator</h1>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-end px-5 space-y-4">
							<article className="z-10 h-auto p-8 bg-primary flex flex-col justify-around items-center">
								<h2 className="font-thin text-2xl">1 måneds abonnement</h2>
								<div className="h-10" />
								<h1 className="font-bold text-3xl">39 kr</h1>
								<div className="h-72" />
								<button
									onClick={() => handleBuyPressed(BaseSubscriptionVariants.one_month)}
									className="py-2 px-10 rounded-md bg-secondary opacity-100 transition-all ease-in-out hover:opacity-80"
								>Køb</button>
							</article>
							<article className="z-10 p-8 h-auto bg-primary flex flex-col justify-around items-center relative " >
								<div className="w-auto rounded-full h-auto px-5 py-1 absolute top-0 -translate-y-1/2 bg-highlight right-5">
									<p className="font-bold text-md text-black">POPULÆRT</p>
								</div>
								<h2 className="font-thin text-2xl">3 måneders abonnement</h2>
								<div className="h-10" />
								<h1 className="font-bold text-4xl">109 kr</h1>
								<div className="h-96" />
								<button
									onClick={() => handleBuyPressed(BaseSubscriptionVariants.three_month)}
									className="py-4 text-lg px-14 rounded-md bg-secondary opacity-100 transition-all ease-in-out hover:opacity-80"
								>Køb</button>
							</article>
							<article className="z-10 h-auto p-8 bg-primary flex flex-col justify-around items-center">
								<h2 className="font-thin text-2xl">Årligt abonnement</h2>
								<div className="h-10" />
								<h1 className="font-bold text-3xl">399 kr</h1>
								<div className="h-72" />
								<button
									onClick={() => handleBuyPressed(BaseSubscriptionVariants.yearly)}
									className="py-2 px-10 rounded-md bg-secondary opacity-100 transition-all ease-in-out hover:opacity-80"
								>Køb</button>
							</article>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export default PricesPage