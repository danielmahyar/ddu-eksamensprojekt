import React, { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import TeX from '@matejmazur/react-katex';
import { AiFillCopy } from 'react-icons/ai';
import {
  makeMathJaxSymbolEquation,
  makeMathMLSymbolEquation,
} from '../../helper-functions/mathjax-syntax';
import { products, reactants } from '../../state/thermo-state';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { globalNotifcation } from '../../state/notification-state';

const SymbolResultCard = ({ target }: any) => {
  const reactantsArray = useRecoilValue(reactants);
  const productsArray = useRecoilValue(products);
  const symbolString = makeMathJaxSymbolEquation(
    reactantsArray,
    productsArray,
    target
  );
  const equationMathML = useMemo(
    () => makeMathMLSymbolEquation(reactantsArray, productsArray, target),
    [reactantsArray, productsArray, target]
  );
  const { copyToClipboard, success } = useCopyToClipboard();
  const setGlobalNoti = useSetRecoilState(globalNotifcation);
  const handleCopyClick = () => {
    copyToClipboard(equationMathML);
    if (success) {
      setGlobalNoti('Copied to clipboard');
    }
  };
  return (
    <div className="w-full flex items-center justify-between px-4 py-3 text-white overflow-x-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-discord-dark">
      <TeX>{symbolString}</TeX>
      <button
        onClick={handleCopyClick}
        type="button"
        className="bg-discord-btn p-3 transition-all rounded-lg transform scale-100 ease-in-out hover:scale-105"
      >
        <AiFillCopy color="white" />
      </button>
    </div>
  );
};

export default SymbolResultCard;
