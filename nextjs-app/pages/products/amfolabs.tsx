import { GetServerSidePropsContext, GetStaticPropsContext, NextPage } from 'next'
import { IconType } from 'react-icons';
import { FaHourglassHalf, FaSchool, FaScrewdriver, FaSearch, FaVial, FaWeight, FaWikipediaW } from 'react-icons/fa';
import ElectronThermoView from '../../components/products-demo/thermo/ElectronThermoView';
import MetaForProduct from '../../components/seo-tags/MetaForProduct';
import Card from '../../components/ui/Card';
import { motion } from "framer-motion"
import { useContext, useRef, useState } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { buyItem } from '../../lib/handlers/userflowHandler';
import { UserContext } from '../../lib/context/auth-context';
import { BaseSubscriptionVariants, SubscriptionProduct } from '../../types/ProductsTypes';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userflow, UserState } from '../../lib/atoms/userflow';
import RatingsSection from '../../components/ui/products/RatingsSection';
import Image from 'next/image';

export async function getStaticProps(context: GetStaticPropsContext) {
  return { props: { data: [] } }
}
const initial = [')', '2', '*', 'O', 'H', ')', '(', '(', '+', 'ΔH', '=', ')', '(', 'H2O', '(', ')', '-'].map((k, i) => {
  const custom: any = {
    id: `id-${i}`,
    content: `${k}`
  };

  return custom;
});

const cards: Array<{ title: string, Icon: IconType, text: string }> = [
  {
    title: "Fleksibilitet",
    Icon: FaVial,
    text: "Kan bruges på internettet og downloades som program til eksamen"
  },
  {
    title: "Tidsmæssig hjælp",
    Icon: FaHourglassHalf,
    text: "AmfoLabs er specielt designet for at gå fra en uløselig opgave til et flot 12-tal"
  },
  {
    title: "Lærenemt",
    Icon: FaScrewdriver,
    text: "Hog N er overpowered, og derfor har vi designet AmfoLabs til at være brugervenlig"
  },
  {
    title: "Mindre lektier",
    Icon: FaSchool,
    text: "Med AmfoLabs behøver du ikke bruge meget tid på dine opgaver, så du kan fokusere på det, som er vigtigere"
  },
  {
    title: "Eksamenshjælp",
    Icon: FaSearch,
    text: "Fjern dødvægten på dine skuldre"
  },
  {
    title: "Overblik over alle stoffer",
    Icon: FaWikipediaW,
    text: "Indholder alle de termodymaniske værdier for Databogen Fysik/Kemi 2016"
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


const AmfoLabsPage: NextPage = () => {
  const [items, setItems] = useState<Array<number>>([0, 1, 2, 3])
  const [start, setStart] = useState<boolean>(false)
  const router = useRouter()
  const pricesRef = useRef<any>();
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


  return (
    <>
      <MetaForProduct />
      <main className="flex flex-col bg-background space-y-24 pb-20">
        <section className="w-full bg-primary">
          <article className="w-full max-w-6xl mx-auto flex md:h-auto text-white py-10 md:py-20 px-4 md:px-10 ">
            <section className="w-full flex flex-col items-center md:items-start space-y-6 overflow-hidden">
              <div className="h-20 md:h-32" />
              <motion.h1
                className="text-center md:text-left text-4xl md:text-5xl"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
              >AmfoLabs <br /> Hjælper dig med kemi </motion.h1>
              <motion.button
                className="bg-secondary px-20 py-3 rounded-lg"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                onClick={() => pricesRef.current.scrollIntoView({ behavior: 'smooth' })}
              >Køb</motion.button>
              <div className="h-20 md:h-32" />

            </section>
            <section className="hidden md:block w-full">
              <div className="h-12" />

              <div className="w-full bg-white flex items-center justify-center h-full">
                <Image 
                  src={'/amfolabs-logo.svg'}
                  width={400}
                  height={400}
                />
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

              </div>

            </section>
          </article>

        </section>
        <section className="w-full max-w-6xl mx-auto h-auto">
          <article className="h-auto space-y-4 pt-10 px-4 lg:px-0">

            <h1 className="text-center text-2xl">Hvad tilbyder AmfoLabs?</h1>

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

        {/* ELECTRON VIEW HERE */}

        <section className="hidden h-auto md:flex flex-col space-y-5">

          <h1 className="text-center text-2xl">Prøv AmfoLabs selv</h1>

          <ElectronThermoView />
        </section>

        <section className="h-auto max-w-6xl mx-auto  flex flex-col md:flex-row pt-5 md:space-x-5 md:p-8">
          <article className="w-full flex flex-col items-start justify-center p-4">
            <h1 className="font-bold text-2xl text-center md:text-left">Sikkert og Tidsbesparende</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum ratione non consequatur, commodi dolorem iste libero, quod ab omnis iure distinctio vel sit. Fugit, quasi! Deserunt molestiae aliquid corrupti voluptatibus?
              Architecto ratione libero sapiente saepe illum reprehenderit, adipisci ipsa nulla ex nesciunt magnam numquam omnis, consequatur distinctio aspernatur, fuga recusandae suscipit tempora ut fugiat vitae voluptate quis. Mollitia, enim provident?</p>
          </article>
          <article className="w-full flex items-center justify-center">
            <video autoPlay muted loop style={{ width: '100%', aspectRatio: "16 / 9" }}>
              <source src='/video.mp4' />
            </video>
          </article>
        </section>

        <section ref={pricesRef} className="h-auto bg-secondary">
          <div className="w-full max-w-6xl mx-auto py-10 text-white relative space-y-14">
            {/* <div className="w-full  h-96 bg-secondary absolute -top-0 z-0" /> */}
            <h1 className="z-20 text-3xl text-center ">Priser</h1>
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

        <RatingsSection ratings={ratings} />



      </main>
    </>
  );
}

export default AmfoLabsPage