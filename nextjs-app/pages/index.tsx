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
        <title>Helpify - Din hjælper til eksamen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen h-auto">
        <section className="h-96 bg-primary w-full">

        </section>
      </main>
    </>
  )
}

export default Home
