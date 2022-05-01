import Image from 'next/image'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { forwardRef, useContext } from 'react'
import { UserContext } from '../../lib/context/auth-context'
import logo from '../../public/helpify-transparent-vector.svg'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { User } from 'firebase/auth'
import { FaArrowDown, FaHamburger } from 'react-icons/fa'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};





const Navbar = forwardRef<any, any>((props, ref) => {
  const { user, userLoading, extraInfo } = useContext(UserContext)
  const router = useRouter()

  return (
    <header
      className="w-full px-6 py-2 h-auto bg-primary"
    >

      <nav
        className="w-full max-w-[84rem] mx-auto h-full flex items-center justify-between py-2"
      >

        <div className="block lg:hidden w-full transition-all hover:opacity-60">
          <GiHamburgerMenu onClick={() => props.toggle((prev: any) => !prev)} size={38} className="text-white cursor-pointer" />
        </div>
        <div className="w-full flex flex-col md:flex-row transition-all items-center justify-center lg:justify-start md:space-x-2 lg:w-full cursor-pointer">
          <motion.div
            className=""
            onClick={() => router.push('/')}
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
              alt="Helpify Main Logo"
              height="100"
              width="100"
              objectFit='scale-down'
              className="cursor-pointer"
            />
          </motion.div>
          <motion.h1
            onClick={() => router.push('/')}
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
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
            className="text-white font-thin w-fit text-3xl"
          >Helpify</motion.h1>
        </div>


        <ul className="text-white w-4/5 text-lg hidden lg:flex items-center justify-around font-semibold ">
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
})

function UserNav() {
  return (
    <div className="w-full flex items-center justify-end">
      <Link href="/login">
        <p className="text-white font-semibold text-md transition-all cursor-pointer rounded-md border-highlight border border-opacity-0  hover:border-opacity-100 p-2">Log ind</p>
      </Link>
    </div>
  )
}

function CustomerNav({ user, router, extraInfo }: { user: User, router: any, extraInfo: any }) {
  return (
    <div onClick={() => router.push("/profile")} className="w-full flex items-center justify-end space-x-2">
      <Image
        src={user.photoURL || "https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png"}
        className="rounded-full "
        alt="User Picture"
        width={40}
        height={40}
      />
      <p className="text-white hidden lg:block font-semibold link link-underline link-underline-black truncate ">{user.displayName || extraInfo?.fullName}</p>
      <FaArrowDown className="text-white cursor-pointer" />
    </div>
  )
}

export default Navbar