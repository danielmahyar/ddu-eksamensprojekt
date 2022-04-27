import { useRouter } from 'next/router'
import React from 'react'
import AuthCheck from '../../components/authentication/AuthCheck'
import CheckoutCard from '../../components/ui/CheckoutCard'
import { confirmPurchase } from '../../lib/handlers/userflowHandler'

const Checkout = () => {

  const router = useRouter()

  const { productID } = router.query

  const handleConfirmPurchase = () => {
    confirmPurchase()
  }

  return (
    <AuthCheck>
      <main className="h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 p-10 bg-background">

        <section className="md:col-span-2 lg:col-span-3 space-y-3">
          <h1 className="font-bold text-4xl">Din Indkøbskurv</h1>
          <ul className="space-y-2">
            <CheckoutCard />
            <CheckoutCard />
          </ul>
        </section>
        <section className=" h-fit md:col-span-1 lg:col-span-2 bg-primary text-white flex flex-col justify-between p-5">

          <article className="space-y-5">
            <h1 className="text-2xl">Pris i alt</h1>

            <div className="">
              <div className="flex justify-between">
                <p>AmfoLabs</p>
                <p>109kr</p>
              </div>
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>109kr</p>
              </div>

              <hr className="w-full h-[1px] bg-black opacity-20 my-3" />

              <div className="flex justify-between font-bold">
                <p>Pris i alt (inkl. moms)</p>
                <p>136,25kr</p>
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