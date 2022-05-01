import Image from 'next/image';
import React, { useContext } from 'react'
import logo from '../../../public/helpify-transparent-vector.svg'
import { FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { MdCardMembership, MdDashboard, MdSettings, MdSubscriptions } from 'react-icons/md';
import { UserContext } from '../../../lib/context/auth-context';
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';

const sideElements: Array<{ route: string, Icon: IconType, title: string}> = [
  {
    route: '/profile',
    Icon: FaHome,
    title: 'Oversigt'
  },
  {
    route: '/profile/dashboard',
    Icon: MdDashboard,
    title: 'Apps'
  },
  {
    route: '/profile/subscription',
    Icon: MdCardMembership,
    title: 'Abonnementer'
  },
  {
    route: '/profile/settings',
    Icon: MdSettings,
    title: 'Indstillinger'
  },
]

const Sidebar = () => {
  const { user, extraInfo } = useContext(UserContext)
  const router = useRouter()
  return (
    <aside className="h-full w-56 bg-primary flex-shrink-0 flex flex-col">
      <section className="w-full h-auto p-2">
        <Link href="/">
          <div className="w-auto flex items-center space-x-2 lg:w-full transition-all rounded-xl ease-in cursor-pointer p-4 group hover:bg-secondary">
            <div
            >
              <Image
                src={logo}
                height="100"
                width="100"
                objectFit='scale-down'
                className="cursor-pointer"
              />
            </div>
            <h1
              className="text-white font-thin text-3xl"
            >Helpify</h1>
          </div>
        </Link>
      </section>
      <section className="flex w-full flex-1 flex-col items-start justify-center text-white">
        <ul className="w-full h-full space-y-1">
          {sideElements.map((sideElement, i) => (
            <RouteCard key={i} {...sideElement} currRoute={router.pathname}/>
          ))}
        </ul>
      </section>
      <section className="h-28 flex items-center justify-start px-2">
        <Link href="/profile/settings">
          <div className="h-auto w-full p-2 rounded-lg flex items-center cursor-pointer transition-all ease-in-out text-white space-x-2 group hover:bg-secondary">
            <Image
              src={user?.photoURL || "https://www.everblazing.org/wp-content/uploads/2017/06/avatar-372-456324-300x300.png"}
              width={55}
              height={55}
              className="rounded-full"
            />
            <span className="truncate">{user?.displayName || extraInfo.fullName}</span>
          </div>
        </Link>
      </section>


    </aside>
  )
}

function RouteCard({ route, title, Icon, currRoute }: { route: string, title: string, Icon: IconType, currRoute: string }) {

  return (
    <Link href={route}>
      <li className={`cursor-pointer h-auto ${route === currRoute && ' bg-secondary'} flex items-center space-x-2 justify-start w-full py-2 px-4 group transition-all ease-in hover:bg-secondary`}>
        <Icon className="bg-secondary p-2 rounded-full transform transition-all group-hover:scale-105" size={40} />
        <p className="font-bold ">{title}</p>
      </li>
    </Link>
  )
}

export default Sidebar