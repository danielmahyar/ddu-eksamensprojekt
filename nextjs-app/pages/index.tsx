import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {

    }
  }
}

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Vocast Production</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen h-auto">
        <div className="perspective-9 mt-10">
          <div className="w-40 h-40 p-4 bg-red-500 translate-z-20 rotate-x-30 rotate-y-35 -rotate-z-20">
            <h2>3D transform</h2>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
