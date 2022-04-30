import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

export const getStaticProps: GetStaticProps = async (context) => {

  return {
    props: {

    }
  }
}

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Helpify - Din støtte til Gymnasiet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen h-auto">
        <section className="h-96 bg-primary w-full flex justify-center">
            {/* <Carousel /> */}

        </section>
      </main>
    </>
  )
}

export default Home
