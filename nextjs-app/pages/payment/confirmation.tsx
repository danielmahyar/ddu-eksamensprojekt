import { getBytes, getDownloadURL, ref } from 'firebase/storage'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { osName } from 'react-device-detect'
import toast from 'react-hot-toast'
import { FaApple, FaWindows } from 'react-icons/fa'
import AuthCheck from '../../components/authentication/AuthCheck'
import { UserContext } from '../../lib/context/auth-context'
import { storage } from '../../lib/setup/firebase'

const Confirmation: NextPage = () => {
  const router = useRouter()
  const [downloaded, setDownloaded] = useState<string>('')
  // const { itemId, stripeID } = router.query
  // if(!itemId || !stripeID){
  //   router.replace("/profile")
  // }
  const { user } = useContext(UserContext)

  useEffect(() => {
    getDownloadURL(ref(storage, `gs://ddu-eksamensprojekt-71224.appspot.com/products/calculator/windows/AmfoLabs Calculator Setup 4.5.0.exe`)).then((URL: string) => {
      setDownloaded(URL)
    })

  }, [])

  // const handleProgramDownload = async () => {
  //   const loading = toast.loading("Downloader...")
  //   try {
  //     toast.dismiss(loading)
  //     toast.success('Downloade programmet')

  //   } catch (error) {
  //     toast.dismiss(loading)
  //     toast.error('Kunne ikke downloade programmet')
  //   }
  // }

  return (
    <AuthCheck>
      <main className="min-h-screen text-white bg-background">
        <section className="w-full h-auto bg-primary my-10 space-y-10 p-10 flex flex-col items-center justify-center">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
          <h1 className="text-2xl font-bold text-center">Tilykke {user?.displayName}. <br /> Du har nu abonnement til AmfoLabs</h1>
          {downloaded !== "" && (
            <Link href={downloaded}>
              <button className="px-6 py-2 bg-secondary flex items-center justify-center space-x-3">
                <p>Download programmet</p>
                {osName === "Windows" && (
                  <FaWindows className="text-white" />
                )}
                {osName === "MacOS" && (
                  <FaApple className="text-white" />
                )}
              </button>
            </Link>
          )}
          <div className="flex flex-col items-center justify-center">
            <Link href="/profile/subscription"><p className="cursor-pointer">Se dine abonnementer</p></Link>
            <Link href="/profile"><p className="cursor-pointer">Se din profilside</p></Link>
          </div>
        </section>
      </main>
    </AuthCheck>
  )
}

export default Confirmation