import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContext } from '../lib/context/auth-context'
import { useUserData } from '../lib/hooks/useUserData'
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../lib/setup/stripe'
import Footer from '../components/ui/Footer'
import Navbar from '../components/ui/Navbar'
import { NextRouter, useRouter } from 'next/router'

const excludeRoutes = [
  '/profile'
]

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { user, userLoading } = useUserData()
  const renderWebshopContent = !isProfile(router, excludeRoutes)
  return (
    <UserContext.Provider value={{ user, userLoading }} >
      {renderWebshopContent && (
        <Navbar />
      )}
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
      {renderWebshopContent && (
        <Footer />
      )}
      <Toaster/>
    </UserContext.Provider>
  )
}

export default MyApp

function isProfile(router: NextRouter, routes: string[]): boolean {
  return router.pathname === routes[0]
}

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