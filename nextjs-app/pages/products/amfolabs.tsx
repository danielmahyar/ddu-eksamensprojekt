import { GetServerSidePropsContext, NextPage } from 'next'
import { IconType } from 'react-icons';
import { FaHourglassHalf, FaSchool, FaScrewdriver, FaSearch, FaVial, FaWeight, FaWikipediaW } from 'react-icons/fa';
import ElectronThermoView from '../../components/products-demo/thermo/ElectronThermoView';
import MetaForProduct from '../../components/seo-tags/MetaForProduct';
import Card from '../../components/ui/Card';
import RatingCard from '../../components/ui/RatingCard';
import { motion } from "framer-motion"
import { useState } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { buyItem } from '../../lib/handlers/userflowHandler';

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

const ratings: Array<{ name: string, review: string, photoURL: string }> = [
  {
    name: "Hans Olsen",
    review: "Jeg har brugt AmfoLabs siden starten af 3.g, og jeg kan kun anbefale AmfoLabs til jer.",
    photoURL: "https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg"
  }
]

const PRODUCT_ID = "1wwiM2PGNAXdTgP6S62d"

const AmfoLabsPage: NextPage = () => {
  const [items, setItems] = useState<Array<number>>([0, 1, 2, 3])
  const [start, setStart] = useState<boolean>(false)

  const handleBuyPressed = () => {
    buyItem(PRODUCT_ID)
  }


  return (
    <>
      <MetaForProduct />
      <main className="flex flex-col bg-background space-y-14">
        <section className="flex md:h-auto bg-primary text-white py-10 px-4 md:px-10">
          <article className="w-full flex flex-col items-center md:items-start space-y-6 overflow-hidden">
            <div className="h-20 md:h-32" />
            <motion.h1
              className="text-center md:text-left text-4xl md:text-6xl"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
            >AmfoLabs <br /> Hjælper dig med kemi </motion.h1>
            <motion.button
              className="bg-secondary px-20 py-3 rounded-lg"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              onClick={handleBuyPressed}
            >Køb</motion.button>
            <div className="h-20 md:h-32" />

          </article>
          <article className="hidden md:block w-full">
            <div className="h-24" />

            <div className="w-full bg-secondary h-full">

              {start === false ? (
                <div className="h-full w-full flex items-center justify-center">
                  <motion.button className="bg-highlight text-lg font-bold px-20 py-3 rounded-lg text-black">Spil</motion.button>
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
              */}

                </MathJaxContext>
              )}

            </div>



          </article>

        </section>
        <section className="h-auto space-y-4 p-6">

          <h1 className="text-center text-2xl">Hvad tilbyder AmfoLabs?</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card, index) => (
              <Card
                key={index}
                {...card}
              />
            ))}
          </div>



        </section>
        {/* ELECTRON VIEW HERE */}+
        
        <section className="hidden h-auto md:flex flex-col space-y-5">

          <h1 className="text-center text-2xl">Prøv AmfoLabs selv</h1>

          <ElectronThermoView />
        </section>

        <section className="h-auto  flex flex-col md:flex-row pt-5 md:space-x-5 md:p-8">
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

        <section className="h-auto relative ">
          <div className="w-full h-96 bg-secondary absolute -top-0 z-0" />
          <h1 className="z-20 text-white">Priser</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
            <article className="z-10 h-72 bg-primary">
              3 måneders pris
              <h2>109kr</h2>
            </article>
            <article className="z-10 h-96 bg-primary relative" >
              <div className="w-auto rounded-full h-auto px-5 py-1 absolute -top-2 bg-highlight right-5">
                <p className="font-bold text-md">POPULÆRT</p>
              </div>
              3 måneders pris
              <h2>109kr</h2>
            </article>
            <article className="z-10 h-72 bg-primary">
              3 måneders pris
              <h2>109kr</h2>
            </article>
          </div>
        </section>

        <section className="h-auto ">
          <div className="h-screen grid grid-cols-3">
            {ratings.map((ratingCard, index) => (
              <RatingCard
                key={index}
                {...ratingCard}
              />
            ))}
          </div>
        </section>

      </main>
    </>
  );
}

export default AmfoLabsPage