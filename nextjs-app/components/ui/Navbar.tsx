import React, { useContext } from 'react'
import { UserContext } from '../../lib/context/auth-context'

const Navbar = () => {
  const { user, userLoading } = useContext(UserContext)

  return (
    <nav className="w-screen h-20 bg-gray-200">
      {user && !userLoading ? <UserNav /> : <CustomerNav />}
    </nav>
  )
}

function UserNav() {
  return (
    <>
    </>
  )
}

function CustomerNav() {
  return (
    <>
    </>
  )
}

export default Navbar