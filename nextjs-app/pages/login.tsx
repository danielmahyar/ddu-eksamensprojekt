import { NextPage } from 'next'
import { handleEmailLogin, handleGoogleLogin } from '../lib/helper-functions/user-auth'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
import google from '../public/google-icon.png'
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { userflow, UserState } from '../lib/atoms/userflow';
import { buyItem } from '../lib/handlers/userflowHandler';

type Inputs = {
  email: string,
  password: string,
};

const Login: NextPage = () => {
  const router = useRouter()
  const currUserflow = useRecoilValue(userflow)
  // const [error, setError] = useState<Error | null>(null)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const load = toast.loading('Bekræfter')
    try {
      const user = await handleEmailLogin(data.email, data.password)
      toast.dismiss(load)

      switch (currUserflow.flow) {
        case UserState.buyProductAfterSignup:
          buyItem(currUserflow.tempProduct, user)
          toast.success('Bekræftet')
          router.replace('/payment/checkout')
          break
        case UserState.signupToProfile:
          toast.success('Bekræftet')
          router.replace('/profile')
          break
        default:
          toast.success('Bekræftet')
          router.replace('/')
          break
      }

    } catch (error: any) {
      toast.dismiss(load)
      toast.error(error.message)
    }
  };

  const handleGoogleLocalLogin = async () => {
    const load = toast.loading('Bekræfter')
    try {
      const user = await handleGoogleLogin()
      toast.dismiss(load)
      switch (currUserflow.flow) {
        case UserState.buyProductAfterSignup:
          buyItem(currUserflow.tempProduct, user)
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
    } catch (error: any) {
      toast.dismiss(load)
      toast.error(error.message)
    }


  }

  return (
    <main className=" w-full bg-background">
      <section className="h-full w-full my-5 bg-primary max-w-6xl mx-auto">
        <div className="h-full w-full  space-y-6 flex flex-col p-8">
          <h1 className="text-white text-2xl text-center ">Log ind</h1>
          <button onClick={handleGoogleLocalLogin} className="w-full flex items-center justify-center space-x-2 px-5 py-2 bg-white rounded-full cursor-pointer transition-all hover:opacity-75">
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

        </div>

      </section>

    </main>
  )
}

export default Login