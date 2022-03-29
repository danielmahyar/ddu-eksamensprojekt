import { NextPage } from 'next'
import React, { useContext, useState } from 'react'
import { handleEmailLogin, handleGoogleLogin } from '../lib/helper-functions/user-auth'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import { UserContext } from '../lib/context/auth-context';

type Inputs = {
  email: string,
  password: string,
};


const Login: NextPage = () => {
  const { user } = useContext(UserContext)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  if(user){
    router.replace("/profile")
  }
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await handleEmailLogin(data.email, data.password)
    if(res) {
      
    }
  };
  
  return (
    <main>
      <button onClick={handleGoogleLogin}>Google</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Enter" {...register("email")} />
        <input type="password" placeholder="Enter" {...register("password")} />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default Login