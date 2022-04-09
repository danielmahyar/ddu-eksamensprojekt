import { NextPage } from 'next'
import React from 'react'

const Confirmation: NextPage = () => {
  return (
    <>
      <main className="min-h-screen">
        <section className="w-full h-96 bg-primary my-10 flex items-center justify-center">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </section>
      </main>
    </>
  )
}

export default Confirmation