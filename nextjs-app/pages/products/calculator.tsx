import { GetServerSidePropsContext, NextPage } from 'next'
import React, { useCallback, useState } from 'react'
import { resetServerContext } from "react-beautiful-dnd";
import MetaForProduct from '../../components/seo-tags/MetaForProduct';
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

const Calculator: NextPage = () => {

  return (
    <>
      <MetaForProduct />
      <main className="flex flex-col">
        <p>2H + O -&gt; H2O</p>
        Opskriv beregningen af standard entalpiændring
        <DragAndDropGame initial={initial}/>
      </main>
    </>
  );
}

export default Calculator