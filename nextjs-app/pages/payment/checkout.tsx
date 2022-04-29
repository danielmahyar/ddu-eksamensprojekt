import { useStripe } from '@stripe/react-stripe-js'
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { FaPlusCircle } from 'react-icons/fa'
import AuthCheck from '../../components/authentication/AuthCheck'
import CheckoutCard from '../../components/ui/CheckoutCard'
import { UserContext } from '../../lib/context/auth-context'
import { confirmPurchase } from '../../lib/handlers/userflowHandler'
import { db } from '../../lib/setup/firebase'
import { CartItem } from '../../types/ProductsTypes'

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { user } = useContext(UserContext)
  const stripe = useStripe()
  const router = useRouter()

  const handleConfirmPurchase = () => {
    confirmPurchase(stripe, cartItems)
  }

  const handleDeleteProduct = (cartID: string) => {
    if (!user) return
    toast.promise(deleteDoc(doc(db, 'users', user?.uid, 'cartItems', cartID)), {
      loading: 'Sletter',
      success: 'Slettede produktet',
      error: 'Der var problemer med at slette produktet'
    }, { duration: 1000 })
  }

  const calculateTotal: number = useMemo(() => (
    cartItems.reduce((acc, item) => (acc + item.price), 0)
  ), [cartItems])


  useEffect(
    () => {
      if (!user) return
      const unsub = onSnapshot(collection(db, 'users', user?.uid, 'cartItems'), (data) => {
        toast.loading("Indlæser dine produkter", { duration: 1000 })

        setCartItems(
          data.docs.map((ci) => {
            const cartItem = ci.data() as CartItem
            return {
              ...cartItem,
              cartID: ci.id
            }
          })
        )

        // toast.dismiss(loading)
        // toast.success("Hentede din indkøbskurv")
      })
      return unsub
    }
    , [user])

  return (
    <AuthCheck>
      <main className="min-h-screen h-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 p-10 bg-background">

        <section className="md:col-span-2 lg:col-span-3 space-y-3">
          <h1 className="font-bold text-4xl">Din Indkøbskurv</h1>
          <ul className="space-y-2">
            {cartItems.length === 0 && (
              <>
                <p>Du har ingen produkter. Tryk her for at se vores udvalg</p>
                <button onClick={() => router.replace("/")} className="w-full max-w-3xl bg-primary py-2 flex items-center justify-center border-2 ">
                  <FaPlusCircle size={40} className="text-highlight bg-primary p-2 rounded-full" />

                </button>
              </>
            )}
            {cartItems && cartItems.map((cartItem, index) => (
              <CheckoutCard item={cartItem} handleDeleteProduct={handleDeleteProduct} key={index} />
            ))}
          </ul>
        </section>
        <section className=" h-fit md:col-span-2 lg:col-span-2 bg-primary text-white flex flex-col justify-between p-5">

          <article className="space-y-5">
            <h1 className="text-2xl">Pris i alt</h1>

            <div className="">

              {cartItems && cartItems.map((cartItem, index) => (
                <div key={index} className="flex justify-between">
                  <p>{cartItem.name}</p>
                  <p>{cartItem.price}kr</p>

                </div>
              ))}
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{calculateTotal}kr</p>
              </div>

              <hr className="w-full h-[1px] bg-black opacity-20 my-3" />

              <div className="flex justify-between font-bold">
                <p>Pris i alt (inkl. moms)</p>
                <p>{calculateTotal}kr</p>
              </div>
            </div>


            <button onClick={handleConfirmPurchase} className="px-4 py-2 w-full bg-secondary rounded-md">Bekræft betaling</button>

          </article>
        </section>

      </main>
    </AuthCheck>
  )
}

export default Checkout