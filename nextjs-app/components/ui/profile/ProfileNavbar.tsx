import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import logo from '../../../public/helpify.png'

const ProfileNavbar = () => {
  const router = useRouter()

  return (
    <nav className="bg-primary w-full h-auto">
      <Image
        src={logo}
        onClick={() => router.replace('/')}
        height="80"
        width="180"
        objectFit='scale-down'
        className="cursor-pointer"
      />
    </nav>
  )
}

export default ProfileNavbar