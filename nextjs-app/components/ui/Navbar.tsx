import Link from 'next/link'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { UserContext } from '../../lib/context/auth-context'
import { CartContext } from '../../lib/context/cart-context'
import { exampleToast } from './toasts/ExampleToast'

const Navbar = () => {
  const { user, userLoading } = useContext(UserContext)
  const { cartItems } = useContext(CartContext)

  return (
    <nav className="w-full h-20 bg-gray-200 grid grid-cols-3 place-items-center">
      <Link href="/">Home</Link>
      {user ?
        <CustomerNav /> : !userLoading ?
          <UserNav /> : <div></div>}
      <Link href="/payment/cart">
        <p> Shopping Cart: {cartItems.length}</p>
      </Link>
    </nav>
  )
}

function UserNav() {
  return (
    <>
      <p>This is normal user nav</p>
    </>
  )
}

function CustomerNav() {
  return (
    <>
      <p>This is customer nav</p>
    </>
  )
}

export default Navbar