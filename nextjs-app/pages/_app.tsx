import '../styles/globals.css'
import dynamic from "next/dynamic";
import type { AppProps } from 'next/app'
import { UserContext } from '../lib/context/auth-context'
import { useUserData } from '../lib/hooks/useUserData'
import { Toaster } from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../lib/setup/stripe'
const Navbar = dynamic(() => import('../components/ui/Navbar'))
const Footer = dynamic(() => import('../components/ui/Footer'))
import { useRouter } from 'next/router'
import { RecoilRoot } from 'recoil'
import { domAnimation, LazyMotion } from 'framer-motion';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { user, userLoading, extraInfo } = useUserData()

  return (
    <UserContext.Provider value={{ user, userLoading, extraInfo }} >
      <LazyMotion features={domAnimation}>
        <RecoilRoot>
          <Elements stripe={stripePromise}>

            {/* TOASTER CONFIGURATION FOR PROFILE SITE */}
            {router.pathname.includes('/profile') ? (
              <Toaster
                position="bottom-right"
              />
            ) : (
              <>
                <Navbar />
                <Toaster />
              </>
            )}

            <Component {...pageProps} />

            {!router.pathname.includes('/profile') && (
              <>
                <Footer />
                <Toaster />
              </>
            )}
          </Elements>
        </RecoilRoot>
      </LazyMotion>
    </UserContext.Provider>
  )
}




export default MyApp






{/* {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button onClick={() => toast.dismiss(t.id)}>X</button>
                )}
              </>
            )}
          </ToastBar>
        )}
*/}

// toastOptions={{
//   className: 'px-10',
//   style: {
//     border: '1px solid #713200',
//     padding: '16px',
//     color: '#713200',
//   },
// }}