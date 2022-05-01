import { NextPage } from 'next'
import React from 'react'
import AuthCheck from '../../components/authentication/AuthCheck'
import MetaForProfile from '../../components/seo-tags/MetaForProfile'
import Sidebar from '../../components/ui/profile/Sidebar'

const DashboardPage: NextPage = () => {
	return (
		<>
			<MetaForProfile title="Profil - Dashboard" />

			<main className="h-screen flex flex-col bg-background">
				<AuthCheck>
					<section className="flex w-full h-full">
						<Sidebar />
						<article>
						</article>
					</section>
				</AuthCheck>
			</main>
		</>
	)
}

export default DashboardPage