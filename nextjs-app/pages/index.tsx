import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { IconType } from 'react-icons/lib';
import MetaForIndex from '../components/seo-tags/MetaForIndex'
import Card from '../components/ui/Card';
import { AiFillQuestionCircle, AiFillThunderbolt, AiFillSafetyCertificate } from "react-icons/ai";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { MdReportProblem } from "react-icons/md";
import { GiPuzzle } from "react-icons/gi";
import RatingsSection from '../components/ui/products/RatingsSection';
import Image from 'next/image';
import Carousel from '../components/ui/Carousel';

export const getStaticProps: GetStaticProps = async (context) => {

  return {
    props: {

    }
  }
}

const cards: Array<{ title: string, Icon: IconType, text: string }> = [
  {
    title: "Hjælp til Gymnasiet",
    Icon: AiFillQuestionCircle,
    text: "Gymnasiet er hårdt, og derfor ønsker vi at hjælpe dig, der ønsker at spare tid og kræfter på lange beregninger. Naturfaglige fag er vores passion!"
  },
  {
    title: "Tidsmæssig hjælp",
    Icon: AiFillThunderbolt,
    text: "Naturfaglige fag byder tit på langhårede beregninger, hvor ens tålmodighed er vigtig for facitet. Det kræver ekstremt meget tid og dette kan vi netop hjælpe med!"
  },
  {
    title: "Sikkerhed i dine facit",
    Icon: AiFillSafetyCertificate,
    text: "Kender du følelsen, når du ikke er sikker på om facitet er korrekt? Dette er helt normalt, og med vores IT-værktøjer kan du nemt og hurtigt gennemtjekke dine facit."
  },
  {
    title: "Muligheder for højere karakter",
    Icon: BsFillArrowUpCircleFill,
    text: "Terminsprøver eller eksamener bliver bedømt med karakter. Hvis du drømmer om en højere karakter i dine naturfaglige fag, burde du måske overveje lidt hjælp fra Helpify."
  },
  {
    title: "Mindre Stress",
    Icon: MdReportProblem,
    text: "Mange afleveringer og Tidspres? Er du generelt stresset under prøver? Vores hjælpemidler får dig hurtigere igennem, sådan at stressniveauet forhåbentligt falder."
  },
  {
    title: "Afklare specifikke emner",
    Icon: GiPuzzle,
    text: "Naturfaglige fag er et bredt fagområde, og indeholder derfor specifikke emner i massevis. Vi tilbyder IT-værktøjer som netop hjælper med specifikke emner."
  }
]

const ratings: Array<{ name: string, review: string, photoURL: string, role: string }> = [
  {
    name: "Hans Olsen",
    review: "Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer.",
    photoURL: "https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg",
    role: "Student"
  },
  {
    name: "Hans Olsen",
    review: "Jeg købte et 3 måneders abonnement til AmfoLabs og kunne ikke være mere tilfreds. Produktet hjalp mig meget tidsmæsigt til eksamen, og jeg scorede en høj karakter i sidste ende. Helpify har lavet nogen fede IT-værktøjer og jeg kan kun anbafale dem fra min egen erfaring.",
    photoURL: "https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg",
    role: "Student"
  },
  {
    name: "Hans Olsen",
    review: "Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer.",
    photoURL: "https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg",
    role: "Student"
  },
]

const Home: NextPage = () => {

  return (
    <>
      <MetaForIndex />

      <main className="min-h-screen h-auto bg-background space-y-10">

        <section className="h-auto overflow-hidden bg-primary w-full flex">
          <Carousel />

        </section>


        <section className="w-full max-w-6xl mx-auto h-auto">
          <article className="h-auto space-y-4 pt-10 px-4 lg:px-0">

            <h1 className="text-center font-bold text-4xl">Hvad ønsker Helpify?</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:px-4">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  {...card}
                />
              ))}
            </div>
          </article>
        </section>

        <section className='w-full bg-secondary h-auto pb-14'>

          <section className='pt-10'>
            <h1 className='text-center text-4xl font-bold text-white'>Vores Produkter til dig</h1>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-end px-10 space-y-8">
            <article className='bg-primary h-auto mt-10 text-white'>
              <h1 className='text-center text-2xl mt-4'>AmfoLabs</h1>
              <p className='p-4 text-center'>Termodynamik byder på ekstremme beregninger af entalpi- og entropiændringen, samt ændringen i Gibbs Energi. Brug AmfoLabs og gør dig selv en tjeneste.</p>
              <div className=' flex justify-center pt-2'>
                <div className="border-4 border-highlight rounded-full">
                  <Image
                    src={'/amfolabs-logo.svg'}
                    width={200}
                    height={200}
                    className=" rounded-full"
                  />
                </div>
              </div>
              <div className='flex justify-center my-6'>
                <button
                  className="py-2 px-10 rounded-md bg-secondary opacity-100 transition-all ease-in-out hover:opacity-80"
                >Læs Mere</button>
              </div>
            </article>

            <article className='bg-primary h-auto mt-10 text-white'>
              <h1 className='text-center text-2xl mt-4'>AmfoLabs</h1>
              <p className='p-4 text-center'>Termodynamik byder på ekstremme beregninger af entalpi- og entropiændringen, samt ændringen i Gibbs Energi. Brug AmfoLabs og gør dig selv en tjeneste.</p>
              <div className=' flex justify-center pt-2'>
                <div className="border-4 border-highlight rounded-full">
                  <Image
                    src={'/amfolabs-logo.svg'}
                    width={200}
                    height={200}
                    className=" rounded-full"
                  />
                </div>
              </div>
              <div className='flex justify-center my-6'>
                <button
                  className="py-2 px-10 rounded-md bg-secondary opacity-100 transition-all ease-in-out hover:opacity-80"
                >Læs Mere</button>
              </div>
            </article>

            <article className='bg-primary h-auto mt-10 text-white'>
              <h1 className='text-center text-2xl mt-4'>AmfoLabs</h1>
              <p className='p-4 text-center'>Termodynamik byder på ekstremme beregninger af entalpi- og entropiændringen, samt ændringen i Gibbs Energi. Brug AmfoLabs og gør dig selv en tjeneste.</p>
              <div className=' flex justify-center w-auto rounded-full pt-2'>
                <div className="border-4 border-highlight rounded-full">
                  <Image
                    src={'/amfolabs-logo.svg'}
                    width={200}
                    height={200}
                    className=" rounded-full"
                  />
                </div>
              </div>
              <div className='flex justify-center my-6'>
                <button
                  className="py-2 px-10 rounded-md bg-secondary opacity-100 transition-all ease-in-out hover:opacity-80"
                >Læs Mere</button>
              </div>
            </article>
          </div>
        </section>
        <section className='py-8 bg-background'>
          <RatingsSection title={"Se hvad andre synes om Helpify"} ratings={ratings} />
        </section>
      </main>
    </>



  )
}

export default Home
