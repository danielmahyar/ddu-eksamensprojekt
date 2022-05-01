import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import MetaForIndex from '../components/seo-tags/MetaForIndex'

export const getStaticProps: GetStaticProps = async (context) => {

  return {
    props: {

    }
  }
}

const Home: NextPage = () => {

  return (
    <>
      <MetaForIndex />
      <main className="min-h-screen h-auto">
        <section className="h-96 bg-primary w-full flex justify-center">
            {/* <Carousel /> */}
            <h1 className="text-4xl font-thin text-white">Helpify - Din hjælp til eksamen</h1>
        </section>
      </main>
    </>
  )
}

export default Home
