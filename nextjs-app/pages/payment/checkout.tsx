import React from 'react'
import AuthCheck from '../../components/authentication/AuthCheck'

const Checkout = () => {
  return (
    <main className="min-h-screen h-auto">
      <AuthCheck lastLocation="payment/checkout">
        Let's buy this
      </AuthCheck>
    </main>
  )
}

export default Checkout