import Image from 'next/image'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useContext } from 'react'
import { UserContext } from '../../lib/context/auth-context'
import logo from '../../public/helpify-transparent-vector.svg'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { User } from 'firebase/auth'
import { useRecoilValue } from 'recoil'

const Navbar = () => {
  const { user, userLoading, extraInfo } = useContext(UserContext)
  const router = useRouter()

  return (
    <header className="w-full px-6 h-28 bg-primary">
      <nav className=" md:w-full lg:w-5/6 mx-auto h-full flex items-center justify-between md:grid md:grid-cols-3 place-items-center py-2">
        <div className="block md:hidden cursor-pointer transition-all hover:opacity-60">
          <GiHamburgerMenu size={38} className="text-white" />
        </div>
        <div>
          <motion.div
            className="place-self-start"
            initial={{
              rotate: -180,
            }}
            animate={{
              rotate: 0,
              transition: {
                type: "spring",
                bounce: 0.2,
                duration: 2,
              }
            }}
            whileHover={{
              rotate: 10,
              transition: {
                type: "spring",
                bounce: 0.2,
                duration: .5,
              }
            }}
            
          >
            <Image
              src={logo}
              onClick={() => router.push("/")}
              height="100"
              width="100"
              objectFit='scale-down'
              className="cursor-pointer"
            />
          </motion.div>
        </div>


        <ul className="text-white w-72 font-semibold hidden md:flex items-center justify-around">
          <Link href="/products/amfolabs"><p className="link link-underline link-underline-black text-white">Produkter</p></Link>
          <Link href="/products/prices"><p className="link link-underline link-underline-black text-white">Priser</p></Link>
          <Link href="/aboutus"><p className="link link-underline link-underline-black text-white">Om Helpify</p></Link>
        </ul>

        {user ?
          <CustomerNav user={user} router={router} extraInfo={extraInfo} /> :
          !userLoading ?
            <UserNav /> :
            <div>

            </div>
        }
      </nav>
    </header>
  )
}

function UserNav() {
  return (
    <Link href="/login">
      <p className="text-white font-semibold link link-underline link-underline-black">Log ind</p>
    </Link>
  )
}

function CustomerNav({ user, router, extraInfo }: { user: User, router: any, extraInfo: any }) {
  return (
    <div onClick={() => router.push("/profile")} className="flex items-center justify-center space-x-2">
      <Image
        src={user.photoURL || "https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png"}
        className="rounded-full cursor-pointer"
        alt="User Picture"
        width={40}
        height={40}
      />
      <p className="text-white font-semibold link link-underline link-underline-black">{user.displayName || extraInfo?.fullName}</p>
    </div>
  )
}

export default Navbar