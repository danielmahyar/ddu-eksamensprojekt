import { GetServerSidePropsContext, NextPage } from 'next'
import React, { useCallback, useState } from 'react'
import { resetServerContext } from "react-beautiful-dnd";
import MetaForProduct from '../../components/seo-tags/MetaForProduct';
import DragAndDropGame from '../../components/ui/DragAndDropGame';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  resetServerContext()
  return { props: { data: [] } }
}

const Calculator: NextPage = () => {

  return (
    <>
      <MetaForProduct />
      <div className="flex flex-col">
        <p>2H + O -&gt; H2O</p>
        Opskriv beregningen af standard entalpiændring
        <DragAndDropGame />
      </div>
    </>
  );
}

export default Calculator