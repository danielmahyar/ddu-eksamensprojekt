import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import AuthCheck from '../../components/authentication/AuthCheck'
import MetaForProfile from '../../components/seo-tags/MetaForProfile'
import Sidebar from '../../components/ui/profile/Sidebar'
import { auth } from '../../lib/setup/firebase'

const Settings: NextPage = () => {
	const router = useRouter()

	const handleSignout = async () => {
		await router.replace("/")
		await auth.signOut()
	}
	return (
		<>
			<MetaForProfile title="Profil - Indstillinger"/>
			<main className="h-screen flex flex-col bg-background">
				<AuthCheck>
					<section className="flex w-full h-full">
						<Sidebar />
						<article className="p-10 w-full overflow-y-auto">
							<button className="px-4 py-2 bg-red-600 rounded-lg text-white font-bold" onClick={handleSignout}>Sign Out</button>
						</article>
					</section>
				</AuthCheck>
			</main>
		</>

	)
}

export default Settings