import Image from 'next/image';
import React, { useContext } from 'react'
import logo from '../../../public/helpify.png'
import {  FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { MdCardMembership, MdDashboard, MdSettings, MdSubscriptions } from 'react-icons/md';
import { UserContext } from '../../../lib/context/auth-context';

const Sidebar = () => {
  const { user, extraInfo } = useContext(UserContext) 

  return (
    <aside className="h-full w-56 bg-primary flex-shrink-0 flex flex-col">
      <section className="w-full h-auto px-2">
        <Link href="/">
          <Image
            src={logo}
            width={200}
            objectFit="contain"
            className="cursor-pointer"
          />
        </Link>
      </section>
      <section className="flex w-full flex-1 flex-col items-start justify-center text-white">
        <ul className="w-full h-full">
          <Link href="/profile">
            <li className="cursor-pointer h-auto flex items-center space-x-2 justify-start w-full py-2 px-4 group ">
              <FaHome className="bg-secondary p-2 rounded-full transform transition-all opacity-100 group-hover:opacity-70 group-hover:scale-105" size={40} />
              <p className="font-bold ">Oversigt</p>
            </li>
          </Link>
          <Link href="/profile/dashboard">
            <li className="cursor-pointer h-auto flex items-center space-x-2 justify-start w-full py-2 px-4 group ">
              <MdDashboard className="bg-secondary p-2 rounded-full transform transition-all opacity-100 group-hover:opacity-70 group-hover:scale-105" size={40} />
              <p className="font-bold ">Apps</p>
            </li>
          </Link>
          <Link href="/profile/subscription">
            <li className="cursor-pointer h-auto flex items-center space-x-2 justify-start w-full py-2 px-4 group ">
              <MdCardMembership className="bg-secondary p-2 rounded-full transform transition-all opacity-100 group-hover:opacity-70 group-hover:scale-105" size={40} />
              <p className="font-bold ">Abonnementer</p>
            </li>
          </Link>
          <Link href="/profile/settings">
            <li className="cursor-pointer h-auto flex items-center space-x-2 justify-start w-full py-2 px-4 group ">
              <MdSettings className="bg-secondary p-2 rounded-full transform transition-all opacity-100 group-hover:opacity-70 group-hover:scale-105" size={40} />
              <p className="font-bold ">Indstillinger</p>
            </li>
          </Link>
        </ul>
      </section>
      <section className="h-28 flex items-center px-4 text-white space-x-2">
        <Image 
          src={user?.photoURL || "https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png"}
          width={55}
          height={55}
          className="rounded-full"
        />        
        <span className="truncate">{user?.displayName || extraInfo.fullName}</span>
      </section>


    </aside>
  )
}

export default Sidebar