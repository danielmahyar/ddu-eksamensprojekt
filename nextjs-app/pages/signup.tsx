import { NextPage } from 'next'
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../lib/context/auth-context';
import { createAccountWithEmail, handleGoogleLogin } from '../lib/helper-functions/user-auth';

type Inputs = {
	fullName: string,
	email: string,
	password: string,
	rep_password: string,
};

const SignUp: NextPage = () => {
	const { user } = useContext(UserContext)
	const router = useRouter()
	if (user) {
		router.replace("/profile")
	}
	const { register, handleSubmit,  formState: { errors } } = useForm<Inputs>();
	console.log(errors)
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log("Here")
		if (data.password === "" || data.rep_password === "") return
		if (data.password !== data.rep_password) return
		await createAccountWithEmail({ ...data })
	};
	return (
		<main>

			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" placeholder="Enter" {...register("fullName")} />
				<input type="text" placeholder="Enter" {...register("email")} />
				<input type="password" placeholder="Enter" {...register("password")} />
				<input type="password" placeholder="Enter" {...register("rep_password")} />
				<button type="submit">Submit</button>
			</form>
			<button onClick={handleGoogleLogin}>Google</button>
		</main>
	)
}

export default SignUp