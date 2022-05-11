import Image from 'next/image';
import dynamic from 'next/dynamic';
import { GetStaticPropsContext, NextPage } from 'next'
import { IconType } from 'react-icons';
import { FaBookOpen, FaHourglassHalf } from 'react-icons/fa';
import { AiFillThunderbolt, AiFillSafetyCertificate } from 'react-icons/ai'
import { RiFocus2Fill, RiWifiOffLine } from 'react-icons/ri'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
const RatingsSection = dynamic(() => import('../../components/ui/products/RatingsSection'));
const ElectronThermoView = dynamic(() => import('../../components/products-demo/thermo/ElectronThermoView'));
const MetaForProduct = dynamic(() => import('../../components/seo-tags/MetaForProduct'));
const Card = dynamic(() => import('../../components/ui/Card'));
import { motion } from "framer-motion"
import { useContext, useRef } from 'react';
import { buyItem } from '../../lib/handlers/userflowHandler';
import { UserContext } from '../../lib/context/auth-context';
import { BaseSubscriptionVariants, SubscriptionProduct } from '../../types/ProductsTypes';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userflow, UserState } from '../../lib/atoms/userflow';
import { GiJourney } from 'react-icons/gi';



const cards: Array<{ title: string, Icon: IconType, text: string }> = [
  {
    title: "Hurtige beregninger",
    Icon: AiFillThunderbolt,
    text: "Lange termodynamiske beregninger er kendte for at være tidskrævende. AmfoLabs sørger for at du på ingen tid kan udføre beregninger, der i hånden tager over 5 minutter hver. "
  },
  {
    title: "Gem Databogen væk",
    Icon: FaBookOpen,
    text: "AmfoLabs har alle værdierne tilknyttet til stofferne fra databogen fysik/kemi 2016. Du kommer aldrig til at lede efter værdier i en databog igen!"
  },
  {
    title: "Sikkerhed",
    Icon: AiFillSafetyCertificate,
    text: "Termodynamik byder på lange og svære beregninger, hvor en lille tastefejl kan afgøre resultatet. Med AmfoLabs vil fortegn og systematik aldrig være et problem igen."
  },
  {
    title: "Højere karakter",
    Icon: BsFillArrowUpCircleFill,
    text: "En lang, svær og uoverskuelig opgave, kan med AmfoLabs hurtigt løses til et stensikkert 12-tal. AmfoLabs hjælper dig nemlig med at minde om de vigtigste delkonklusioner. "
  },
  {
    title: "Eksamen mode",
    Icon: RiWifiOffLine,
    text: "Du kan bruge AmfoLabs på nettet, eller under eksamen, hvis du downloader applikationen. På denne måde kan værktøjet hjælpe dig, når det virkelig gælder."
  },
  {
    title: "Brugervenligt",
    Icon: GiJourney,
    text: "AmfoLabs er designet til at hjælpe dig. Et brugervenligt design sørger for at du hurtigt lærer programmet at kende, og dermed optimerer hurtigheden yderligere."
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
    review: "Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer. Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer.",
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

const PRODUCT_ID = "1wwiM2PGNAXdTgP6S62d"
const ONE_MONTH_SUBSCRIPTION: SubscriptionProduct = {
  productID: PRODUCT_ID,
  stripeID: "price_1KtFjVHEMIrqYYjGT8TQztk4",
  name: "AmfoLabs",
  type: BaseSubscriptionVariants.one_month,
  photoURL: 'amfolabs-logo.png',
  price: 39
}
const THREE_MONTH_SUBSCRIPTION: SubscriptionProduct = {
  productID: PRODUCT_ID,
  stripeID: "price_1KtFkWHEMIrqYYjGRL41yEUg",
  name: "AmfoLabs",
  type: BaseSubscriptionVariants.three_month,
  photoURL: 'amfolabs-logo.png',
  price: 109
}
const YEARLY_SUBSCRIPTION: SubscriptionProduct = {
  productID: PRODUCT_ID,
  stripeID: "price_1KtFkyHEMIrqYYjGy3lJuziZ",
  name: "AmfoLabs",
  type: BaseSubscriptionVariants.yearly,
  photoURL: 'amfolabs-logo.png',
  price: 399
}

const productVariants = {
  ONE_MONTH_SUBSCRIPTION,
  THREE_MONTH_SUBSCRIPTION,
  YEARLY_SUBSCRIPTION
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return { props: { data: [] } }
}

const AmfoLabsPage: NextPage = () => {
  const router = useRouter()
  const pricesRef = useRef<any>();
  const demoRef = useRef<any>();
  const productRef = useRef<any>();
  const { user } = useContext(UserContext)
  const setUserflow = useSetRecoilState(userflow)

  const handleBuyPressed = (productKeyName: BaseSubscriptionVariants) => {
    if (!user) {
      setUserflow({ flow: UserState.buyProductAfterSignup, tempProduct: productVariants[productKeyName] })
      router.push('/signup')
    } else {
      buyItem(productVariants[productKeyName], user?.uid)
    }
  }

  const handleScrollToProduct = () => {
    if (!demoRef?.current) return
    demoRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToProgram = () => {
    if (!productRef?.current) return
    productRef.current?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <>
      <MetaForProduct />
      <main className="flex flex-col bg-background space-y-24 pb-20">
        <section className="w-full bg-primary">
          <article className="w-full max-w-6xl mx-auto flex flex-col py-0 md:flex-row text-white md:py-20 px-4">
            <section className=" w-full flex flex-col items-center md:items-start space-y-6 overflow-hidden">
              <div className="h-20 md:h-32" />
              <motion.h1
                className="text-center md:text-left text-4xl md:text-5xl"
                initial={{ x: -700 }}
                animate={{ x: 0 }}
              >AmfoLabs</motion.h1>
              <motion.p initial={{ x: -700 }} animate={{ x: 0 }} className="text-center md:text-left text-2xl">Det eneste program du behøver til termodynamik emnet i gym. Har alting <strong className="font-bold">du</strong> skal bruge til <strong className="font-bold">eksamen</strong></motion.p>
              <div className="flex flex-col lg:flex-row items-center md:items-start justify-center space-y-2 lg:space-x-2 lg:space-y-0">
                <motion.button
                  className="bg-secondary hidden md:block px-14 w-64 font-bold py-3 rounded-lg cursor-pointer"
                  initial={{ x: -700 }}
                  animate={{ x: 0 }}
                  onClick={handleScrollToProduct}
                >Prøv produktet</motion.button>
                <motion.button
                  className="bg-secondary px-14 w-48 font-bold py-3 rounded-lg"
                  initial={{ x: -700 }}
                  animate={{ x: 0 }}
                  onClick={() => pricesRef.current.scrollIntoView({ behavior: 'smooth' })}
                >Se priser</motion.button>
              </div>
              <div className="h-20 md:h-32" />
            </section>

            <section className="w-full hidden md:flex items-center justify-center lg:justify-end">
              <div className="border-4 border-highlight rounded-full w-36 h-36 md:w-72 md:h-72 lg:h-96 lg:w-96 relative">
                <Image
                  src={'/amfolabs-logo.svg'}
                  layout="fill"
                  className="rounded-full"
                />
              </div>
            </section>
          </article>
        </section>


        <section className="w-full max-w-6xl mx-auto h-auto">
          <article className="h-auto space-y-4 pt-10 px-4 lg:px-0">

            <h1 className="text-center text-4xl font-bold mb-4">Hvad er AmfoLabs?</h1>
            <p className="text-center w-full px-2 md:w-3/4 mx-auto text-lg">Termodynamik beregninger i Kemi på A niveau, er  til tider et af de mest frustrerende emner at arbejde med. Først skal du finde de enkelte termodynamiske værdier fra en databog og sætte parenteser korrekt op.
              Helpify har derfor udviklet et program, som er specielt beregnet til kemi afleveringer og eksamen
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:px-4 pt-10">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  {...card}
                />
              ))}
            </div>
          </article>
        </section>

        <section className="h-auto bg-primary">
          <article className="max-w-6xl mx-auto text-white space-y-10 flex flex-col items-center justify-center py-10 px-4 md:space-x-5">
            <h1 className="font-bold text-4xl text-center">AmfoLabs sammenlignet med fysisk regning</h1>
            <div className='flex flex-col md:flex-row space-y-10 md:space-x-10 md:space-y-0'>
              <section className="flex overflow-x-auto flex-col md:flex-row w-full md:w-86 2xl:w-[40rem] h-auto ">
                <iframe width="100%" className=" aspect-video" src="https://www.youtube.com/embed/J6IVrv3MZ4k?&autoplay=1&controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
              </section>
              <section className="flex overflow-x-auto flex-col md:flex-row w-full md:w-86 2xl:w-[40rem] h-auto">
                <iframe width="100%" className=" aspect-video" src="https://www.youtube.com/embed/2vC1O8eFL1k?&autoplay=1&controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
              </section>
            </div>
            <button onClick={handleScrollToProduct} className="bg-secondary hidden md:block px-10 py-2 rounded-lg text-lg">Prøv programmet selv</button>
          </article>
        </section>

        <section>
          <article className="max-w-6xl mx-auto px-5 space-y-10 flex flex-col items-center justify-center pt-5 md:space-x-5 md:p-8">
            <h1 className="text-center text-4xl font-bold mb-4">TID og FOKUS gør AmfoLabs unikt</h1>
            <section className="flex flex-col md:flex-row  md:space-x-10">
              <div className="shadow-xl rounded-lg p-8 w-full flex flex-col text-center items-center justify-center">
                <FaHourglassHalf size={160} className="mb-2" />
                <h2 className="text-2xl font-bold mb-5">Mere tid</h2>
                <p className=" text-lg text-center">AmfoLabs hjælper dig med at flytte fokus fra at fejltjekke til at lave de andre opgaver</p>
              </div>
              <div className="shadow-xl rounded-lg p-8 w-full flex flex-col text-center items-center justify-center">
                <RiFocus2Fill size={160} className="mb-2" />
                <h2 className="text-2xl font-bold mb-5">Specialiseret</h2>
                <p className="text-lg text-center">AmfoLabs er fokuseret på at løse meget specifikke opgaver. Jo mere specifikt, jo bedre en oplevelse under eksamen</p>
              </div>
            </section>
          </article>
        </section>

        {/* ELECTRON VIEW HERE */}

        <section ref={demoRef} className="hidden h-auto md:flex flex-col pt-10 space-y-5 bg-primary">

          <h1 className="text-center text-4xl font-bold text-white">Prøv AmfoLabs selv</h1>
          <p className="w-3/4 mx-auto text-center text-white pb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, minus ut totam veniam praesentium alias deleniti eum unde temporibus molestias, fuga eos officia hic ullam culpa exercitationem sint, qui itaque.
            Dolorum id, dolore repellat quia, exercitationem optio recusandae itaque consequuntur earum at saepe distinctio perferendis corporis! Quis id aut velit, rem quas architecto. Reiciendis, hic magnam laboriosam sed praesentium nobis.
          </p>
          <button onClick={handleScrollToProgram} className="px-10 py-2 bg-secondary w-auto text-white rounded-lg font-bold mx-auto">Gå fuldskærm</button>
          <article ref={productRef} className="flex h-screen">
            <ElectronThermoView ref={productRef} />
          </article>
        </section>

        <section ref={pricesRef} className="h-auto bg-secondary">
          <div className="w-full max-w-6xl mx-auto py-10 text-white relative space-y-14">
            {/* <div className="w-full  h-96 bg-secondary absolute -top-0 z-0" /> */}
            <h1 className="z-20 text-4xl text-center font-bold">Priser</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-end px-5 space-y-4">
              <article className="z-10 h-auto p-8 bg-primary flex flex-col justify-around items-center">
                <h2 className="font-thin text-2xl">1 måneds abonnement</h2>
                <div className="h-10" />
                <h1 className="font-bold text-3xl">39 kr</h1>
                <div className="h-72" />
                <button
                  onClick={() => handleBuyPressed(BaseSubscriptionVariants.one_month)}
                  className="py-2 px-10 rounded-md bg-secondary opacity-100 transition-all ease-in-out hover:opacity-80"
                >Køb</button>
              </article>
              <article className="z-10 p-8 h-auto bg-primary flex flex-col justify-around items-center relative " >
                <div className="w-auto rounded-full h-auto px-5 py-1 absolute top-0 -translate-y-1/2 bg-highlight right-5">
                  <p className="font-bold text-md text-black">POPULÆRT</p>
                </div>
                <h2 className="font-thin text-2xl">3 måneders abonnement</h2>
                <div className="h-10" />
                <h1 className="font-bold text-4xl">109 kr</h1>
                <div className="h-96" />
                <button
                  onClick={() => handleBuyPressed(BaseSubscriptionVariants.three_month)}
                  className="py-4 text-lg px-14 rounded-md bg-secondary opacity-100 transition-all ease-in-out hover:opacity-80"
                >Køb</button>
              </article>
              <article className="z-10 h-auto p-8 bg-primary flex flex-col justify-around items-center">
                <h2 className="font-thin text-2xl">Årligt abonnement</h2>
                <div className="h-10" />
                <h1 className="font-bold text-3xl">399 kr</h1>
                <div className="h-72" />
                <button
                  onClick={() => handleBuyPressed(BaseSubscriptionVariants.yearly)}
                  className="py-2 px-10 rounded-md bg-secondary opacity-100 transition-all ease-in-out hover:opacity-80"
                >Køb</button>
              </article>
            </div>
          </div>
        </section>

        <RatingsSection title="Se hvad andre synes om AmfoLabs" ratings={ratings} />



      </main>
    </>
  );
}

export default AmfoLabsPage


{/*start === false ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <motion.button onClick={() => setStart(prev => !prev)} className="bg-highlight text-lg font-bold px-20 py-3 rounded-lg text-black">Spil</motion.button>
                  </div>
                ) : (
                  <MathJaxContext>

                    <MathJax>{"\\(Ag^{+}(aq) + Cl^{-}(aq) \\rightarrow AgCl\\)"}</MathJax>
                    Opskriv beregningen af standard entalpiændring
                    {/* <Reorder.Group axis="x" className="flex" values={items} onReorder={setItems}>
                  {items.map((item) => (
                    <Reorder.Item key={item} value={item} className="w-20 bg-highlight">
                      {item}
                    </Reorder.Item>
                  ))}
                </Reorder.Group> 
              }

                  </MathJaxContext>
                )*/}