import Image from 'next/image'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useContext } from 'react'
import { UserContext } from '../../lib/context/auth-context'
import { CartContext } from '../../lib/context/cart-context'
import logo from '../../public/helpify.png'

const Navbar = () => {
  const { user, userLoading } = useContext(UserContext)
  const { cartItems } = useContext(CartContext)

  return (
    <nav className="w-full px-6 h-24 lg:px-10 bg-primary flex items-center justify-between md:grid md:grid-cols-3 place-items-center">
      <div className="block md:hidden cursor-pointer transition-all hover:opacity-60">
        <GiHamburgerMenu size={38} className="text-white" />
      </div>
      <Link href="/">
        <Image
          src={logo}
          height="90"
          width="150"
          objectFit='scale-down'
          className="cursor-pointer"
        />
      </Link>

      <ul className="text-white space-x-5 w-full font-semibold hidden md:flex items-center justify-around">
        <Link href="/products/calculator"><p className="transition-all ease-in-out underline-offset-2 hover:underline cursor-pointer">Produkter</p></Link>
        <Link href="/products"><p className="transition-all ease-in-out underline-offset-2 hover:underline cursor-pointer">Priser</p></Link>
        <Link href="/products"><p className="transition-all ease-in-out underline-offset-2 hover:underline cursor-pointer">Om Helpify</p></Link>
      </ul>

      {user ?
        <CustomerNav /> :
        !userLoading ?
          <UserNav /> :
          <div>

          </div>
      }



    </nav>
  )
}

function UserNav() {
  return (
    <p className="text-white font-semibold cursor-pointer hover:underline">Log ind</p>
  )
}

function CustomerNav() {
  return (
    <ul>
      <p className="text-white font-semibold cursor-pointer hover:underline">Log ind</p>

    </ul>
  )
}

export default Navbar