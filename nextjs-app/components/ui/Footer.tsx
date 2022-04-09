import Image from 'next/image'
import React from 'react'
import logo from '../../public/helpify.png'
import { FaDiscord, FaFacebook, FaTwitter, FaGithub, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full px-6 flex flex-col h-auto py-10 bg-primary space-y-12">
      <section className="grid grid-cols-1 md:w-full lg:w-5/6 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-start gap-12">
        <article className="grid xl:col-span-2">
          <div className="flex flex-col items-start justify-between space-y-2">
            <Image
              src={logo}
              height="100"
              width="200"
              objectFit='scale-down'
              className="cursor-pointer"
            />
            <p className="text-white">Helpify er der for at hjælpe dig med din uddannelse.</p>
            <ul className="flex space-x-2">
              <FaDiscord
                size={40}
                className="bg-[#7289DA] text-white p-2 rounded-lg cursor-pointer"
              />
              <FaFacebook
                size={40}
                className="bg-[#1877F2] text-white p-2 rounded-lg cursor-pointer"
              />
              <FaYoutube
                size={40}
                className="bg-white text-[#FF0000] p-2 rounded-lg cursor-pointer"
              />
              <FaTwitter
                size={40}
                className="bg-[#1DA1F2] text-white p-2 rounded-lg cursor-pointer"
              />
              <FaGithub
                size={40}
                className="bg-[#231E1B] text-white p-2 rounded-lg cursor-pointer"
              />
            </ul>
          </div>
        </article>
        <article>
          <h1 className="text-white font-bold text-lg">Hjælp og Service</h1>
          <ul>
            <p className="text-white">Om Helpify</p>
            <p className="text-white">FAQ</p>
            <p className="text-white">Support</p>
            <p className="text-white">Privatlivs Politik</p>
            <p className="text-white">Certifikater</p>
          </ul>
        </article>
        <article>
          <h1 className="text-white font-bold text-lg">Kontakt</h1>
          <ul>
            <p className="text-white">+45 52 23 23 23</p>
            <p className="text-white">support@helpify.com</p>
          </ul>
        </article>
      </section>
      <section className="w-full text-center">
        <p className="text-white">© All Rights Reserved by Vocast Production 2022</p>
      </section>
    </footer>
  )
}

export default Footer