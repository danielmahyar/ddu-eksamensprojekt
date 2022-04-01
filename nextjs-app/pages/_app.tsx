import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContext } from '../lib/context/auth-context'
import { useUserData } from '../lib/hooks/useUserData'
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../lib/setup/stripe'
import Footer from '../components/ui/Footer'
import Navbar from '../components/ui/Navbar'
import { useCartItems } from '../lib/hooks/useCartItems'
import { CartContext } from '../lib/context/cart-context'



function MyApp({ Component, pageProps }: AppProps) {
  const { user, userLoading } = useUserData()
  const { cartItems, addCartItem, deleteCartItem } = useCartItems()
  return (
    <UserContext.Provider value={{ user, userLoading }} >
      <CartContext.Provider value={{ cartItems, addCartItem, deleteCartItem }}>
        <Navbar />
        <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
        <Footer />
      </CartContext.Provider>
      <Toaster
        // toastOptions={{
        //   className: 'px-10',
        //   style: {
        //     border: '1px solid #713200',
        //     padding: '16px',
        //     color: '#713200',
        //   },
        // }}
      />
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
        )} */}
    </UserContext.Provider>
  )
}

export default MyApp
