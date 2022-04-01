import { NextPage } from 'next'
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../lib/context/auth-context';
import { handleGoogleLogin } from '../lib/helper-functions/user-auth';

type Inputs = {
	email: string,
	password: string,
	rep_password: string,
	username: string
};

const SignUp: NextPage = () => {
	const { user } = useContext(UserContext)
	const router = useRouter()
	if (user) {
		router.replace("/profile")
	}
	const [stage, setStage] = useState<number>(1)
	const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
	};
	return (
		<main>

			<form onSubmit={handleSubmit(onSubmit)}>
				{stage === 1 && (
					<>
						<input type="text" placeholder="Enter" {...register("email")} />
						<input type="password" placeholder="Enter" {...register("password")} />
						<input type="password" placeholder="Enter" {...register("rep_password")} />
						<button onClick={() => setStage(prev => prev + 1)}>Next</button>
					</>
				)}

				{stage === 2 && (
					<>
						<input type="text" placeholder="Enter" {...register("username")} />
						<button type="submit">Submit</button>
					</>
				)}

			</form>
			<button onClick={handleGoogleLogin}>Google</button>
		</main>
	)
}

export default SignUp