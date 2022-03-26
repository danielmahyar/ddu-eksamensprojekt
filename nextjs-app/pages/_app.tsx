import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContext } from '../lib/auth-context'
import { useUserData } from '../lib/useUserData'
import { Toaster } from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../lib/stripe'
import Footer from '../components/ui/Footer'
import Navbar from '../components/ui/Navbar'



function MyApp({ Component, pageProps }: AppProps) {
  const { user, userLoading } = useUserData()

  return (
    <UserContext.Provider
      value={{ user, userLoading }}
    >
      <Navbar />
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
      <Toaster />
      <Footer />
    </UserContext.Provider>
  )
}

export default MyApp
