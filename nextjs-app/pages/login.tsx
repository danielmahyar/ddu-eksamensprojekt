import { GetServerSideProps, NextPage } from 'next'
import React, { useContext, useState } from 'react'
import { handleEmailLogin, handleGoogleLogin } from '../lib/helper-functions/user-auth'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import { UserContext } from '../lib/context/auth-context';
import { handleRedirect } from '../lib/helper-functions/redirects';
import google from '../public/google-icon.png'
import Image from 'next/image';
import Link from 'next/link';

type Inputs = {
  email: string,
  password: string,
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { data: null }
  }
}

const Login: NextPage = () => {
  const { user } = useContext(UserContext)
  const router = useRouter()
  handleRedirect(user, router)
  const [error, setError] = useState<Error | null>(null)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await handleEmailLogin(data.email, data.password)
  };

  return (
    <main className="min-h-screen w-full">
      <section className="h-full w-full my-5 space-y-6 bg-primary flex flex-col p-8">
        <h1 className="text-white text-2xl text-center ">Log ind</h1>
        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center space-x-2 px-5 py-2 bg-white rounded-full cursor-pointer transition-all hover:opacity-75">
          <Image
            src={google}
            width={30}
            height={30}
          />
          <p className="ml-2 font-bold">Opret med Google</p>
        </button>
        <hr className="w-full rounded-lg" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <div className="flex flex-col">
            <label className="text-white font-thin" htmlFor="email">Email</label>
            <input className="text-white py-2 px-4 bg-transparent border rounded-lg" type="email" placeholder="test@test.com" {...register("email")} />
          </div>
          <div className="flex flex-col">
            <label className="text-white font-thin" htmlFor="password">Password</label>
            <input className="text-white py-2 px-4 bg-transparent border rounded-lg" type="password" placeholder="Enter" {...register("password")} />
          </div>
          <button className="bg-secondary py-2 px-4 rounded-lg text-white font-bold" type="submit">Log ind</button>
        </form>
				<p className="text-white text-center">Ikke oprettet? Så lav en profil <Link href="/signup"><span className="font-bold text-highlight cursor-pointer">her</span></Link></p>

      </section>

    </main>
  )
}

export default Login