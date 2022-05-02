import { NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { userflow, UserState } from '../lib/atoms/userflow';
import { UserContext } from '../lib/context/auth-context';
import { buyItem } from '../lib/handlers/userflowHandler';
import { createAccountWithEmail, handleGoogleLogin } from '../lib/helper-functions/user-auth';
import { auth } from '../lib/setup/firebase';
import google from '../public/google-icon.png'

type Inputs = {
	fullName: string,
	email: string,
	password: string,
	rep_password: string,
};

const SignUp: NextPage = () => {
	const { user: currUser } = useContext(UserContext)
	const router = useRouter()
	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
	const currUserflow = useRecoilValue(userflow)
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const load = toast.loading("Opretter din profil")
		if (currUser) return
		if (data.password === "" || data.rep_password === "") return
		if (data.password !== data.rep_password) return
		const newUser = await createAccountWithEmail({ ...data })
		await auth.currentUser?.reload()
		toast.dismiss(load)
		toast.success('Bruger oprettet')
		switch (currUserflow.flow) {
			case UserState.buyProductAfterSignup:
				buyItem(currUserflow.tempProduct, newUser)
				router.replace('/payment/checkout')
				break
			case UserState.signupToProfile:
				console.log("TEEEST")
				router.replace('/profile')
				break
			default:
				router.replace('/')
				break
		}

	};

	const handleLocalGoogleLogin = async () => {
		const load = toast.loading("Opretter din profil")

		const newUser = await handleGoogleLogin()
		toast.dismiss(load)
		toast.success('Bruger oprettet')
		switch (currUserflow.flow) {
			case UserState.buyProductAfterSignup:
				buyItem(currUserflow.tempProduct, newUser)
				router.replace('/payment/checkout')
				break
			case UserState.signupToProfile:
				console.log("TEEEST")
				router.replace('/profile')
				break
			default:
				router.replace('/')
				break
		}
	}
	return (
		<main className="min-h-screen w-full">
			<section className="h-full w-full my-5 space-y-6 bg-primary max-w-6xl mx-auto flex flex-col p-8">
				<h1 className="text-white font-thin text-2xl text-center">Opret profil</h1>

				<form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col space-y-2">
						<label className="text-white font-thin" htmlFor="fullName">Fulde navn</label>
						<input className="text-white py-2 px-4 bg-transparent border rounded-lg" type="text" placeholder="Navn" {...register("fullName")} />
					</div>
					<div className="flex flex-col space-y-2">
						<label className="text-white font-thin" htmlFor="email">Email</label>
						<input className="text-white py-2 px-4 bg-transparent border rounded-lg" type="email" placeholder="name@text.dk" {...register("email")} />
					</div>
					<div className="flex flex-col space-y-2">
						<label className="text-white font-thin" htmlFor="password">Adgangskode</label>
						<input className="text-white py-2 px-4 bg-transparent border rounded-lg" type="password" placeholder="Kode" {...register("password")} />
					</div>
					<div className="flex flex-col space-y-2">
						<label className="text-white font-thin" htmlFor="fullName">Gentag adgangskode</label>
						<input className="text-white py-2 px-4 bg-transparent border rounded-lg" type="password" placeholder="Gentag kode" {...register("rep_password")} />
					</div>
					<button className="bg-secondary py-2 px-4 rounded-lg text-white font-bold" type="submit">Opret profil</button>
				</form>
				<button onClick={handleLocalGoogleLogin} className="w-full flex items-center justify-center space-x-2 px-5 py-2 bg-white rounded-full cursor-pointer transition-all hover:opacity-75">
					<Image
						src={google}
						width={30}
						height={30}
					/>
					<p className="ml-2 font-bold">Opret med Google</p>
				</button>
				<p className="text-white text-center">Har du allerede en profil? Så log ind <Link href="/login"><span className="font-bold text-highlight cursor-pointer">her</span></Link></p>
			</section>
		</main >
	)
}

export default SignUp