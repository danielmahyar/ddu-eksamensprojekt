import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../../lib/context/auth-context'
import { CartContext } from '../../lib/context/cart-context'

const Navbar = () => {
  const { user, userLoading } = useContext(UserContext)
  const { cartItems } = useContext(CartContext)

  return (
    <nav className="w-full h-20 bg-gray-200">
      <Link href="/">Home</Link>
      {user ?
        <CustomerNav /> : !userLoading ? 
        <UserNav /> : <div></div>}
        <p>Shopping Cart: {cartItems.length}</p>
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