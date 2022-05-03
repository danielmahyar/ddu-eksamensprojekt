import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import AuthCheck from '../../components/authentication/AuthCheck'
import MetaForProfile from '../../components/seo-tags/MetaForProfile'
import Sidebar from '../../components/ui/profile/Sidebar'
import { UserContext } from '../../lib/context/auth-context'
import { auth } from '../../lib/setup/firebase'
import logo from '../../public/helpify.png'
type Inputs = {
	fullName: string,
	email: string,
	password: string,
	rep_password: string,
};


const Settings: NextPage = () => {
	const router = useRouter()
	const { user, extraInfo } = useContext(UserContext)
	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		toast.success('Dine oplysninger er gemt')
	}

	const handleSignout = async () => {
		await router.replace("/")
		await auth.signOut()
	}
	return (
		<>
			<MetaForProfile title="Profil - Indstillinger" />
			<main className="h-screen flex flex-col bg-background">
				<AuthCheck>
					<section className="flex w-full h-full">
						<Sidebar />
						<article className="p-10 w-full overflow-y-auto">
							<h1 className="text-3xl font-thin">Indstillinger - {user?.displayName}</h1>
							<form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
								<section className="flex flex-col items-center justify-center w-full h-auto mb-8">
									<div className="w-auto h-auto mb-2 rounded-full">
										<Image
											height={100}
											width={100}
											src={user?.photoURL || extraInfo?.photoURL || logo}
											className="rounded-xl"
										/>
									</div>
									<div className="flex">
										<button className="bg-secondary w-32 py-2 text-white font-bold rounded-l-lg">Upload</button>
										<button className="bg-white w-32 py-2 text-black font-bold rounded-r-lg border">Fjern</button>
									</div>
								</section>
								<section className="flex">
									<article className="w-full space-y-4 border-t flex flex-col items-start justify-start h-56 p-8">
										<div className="flex flex-col w-full">
											<label className=" text-lg" htmlFor="fullname">Fulde navn</label>
											<input defaultValue={user?.displayName || extraInfo?.fullName} className="py-2 px-2 w-full border rounded-lg" type="text" {...register("fullName")} />
										</div>
										<div className="flex flex-col w-full">
											<label className=" text-lg" htmlFor="email">Email</label>
											<input defaultValue={user?.email || extraInfo?.email}className="py-2 px-2 w-full border rounded-lg" type="email" {...register("email")} />
										</div>
									</article>
									<article className="w-full space-y-4 border-t border-l flex flex-col items-start justify-start h-56 p-8">
										<div className="flex flex-col w-full">
											<label className=" text-lg" htmlFor="password">Adgangskode</label>
											<input className="py-2 px-2 w-full border rounded-lg" type="text"  {...register("password")} />
										</div>
										<div className="flex flex-col w-full">
											<label className=" text-lg" htmlFor="rep_password">Gentag adgangskode</label>
											<input className="py-2 px-2 w-full border rounded-lg" type="text" {...register("rep_password")} />
										</div>
									</article>
								</section>
								<div className="w-full flex items-center justify-center mt-5">
									<button className="bg-secondary py-2 px-12 rounded-lg text-white font-bold text-lg">Gem oplysninger</button>
								</div>
								<hr className="w-full h-[1px] bg-black my-5"/>
							</form>
							<button className="px-4 py-2 bg-red-600 rounded-lg text-white font-bold" onClick={handleSignout}>Sign Out</button>
						</article>
					</section>
				</AuthCheck>
			</main>
		</>

	)
}

export default Settings