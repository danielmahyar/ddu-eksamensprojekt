import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContext } from '../lib/context/auth-context'
import { useUserData } from '../lib/hooks/useUserData'
import { Toaster } from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../lib/setup/stripe'
import Footer from '../components/ui/Footer'
import Navbar from '../components/ui/Navbar'
import { useRouter } from 'next/router'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { user, userLoading, extraInfo } = useUserData()

  return (
    <UserContext.Provider value={{ user, userLoading, extraInfo }} >
      <RecoilRoot>
        <Elements stripe={stripePromise}>
          {router.pathname.includes('/profile') ? (
            <>
              <Component {...pageProps} />
              <Toaster
                position="bottom-right"
              />
            </>
          ) : (
            <>
              <Navbar />
              <Component {...pageProps} />
              <Footer />
              <Toaster />
            </>
          )}
        </Elements>
      </RecoilRoot>
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