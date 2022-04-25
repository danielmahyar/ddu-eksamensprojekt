import { GetServerSidePropsContext, NextPage } from 'next'
import { resetServerContext } from "react-beautiful-dnd";
import { IconType } from 'react-icons';
import { FaHome, FaHourglassHalf, FaSchool, FaScrewdriver, FaSearch, FaVial, FaWeight, FaWikipediaW } from 'react-icons/fa';
import ElectronThermoView from '../../components/products-demo/thermo/ElectronThermoView';
import MetaForProduct from '../../components/seo-tags/MetaForProduct';
import Card from '../../components/ui/Card';
import DragAndDropGame from '../../components/ui/draggable/DragAndDropGame';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  resetServerContext()
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

const Calculator: NextPage = () => {

  return (
    <>
      <MetaForProduct />
      <main className="flex flex-col bg-background space-y-14">
        <section className="hidden md:block md:h-screen">
          <p>2H + O -&gt; H2O</p>
          Opskriv beregningen af standard entalpiændring
          <DragAndDropGame initial={initial} />
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
        {/* ELECTRON VIEW HERE */}
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

        <section className="h-screen">

        </section>

      </main>
    </>
  );
}

export default Calculator