import { AiFillCopy } from 'react-icons/ai';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import TeX from '@matejmazur/react-katex';
import { useMemo } from 'react';
import {
  makeMathJaxCalcEquation,
  makeMathMLCalcEquation,
} from '../../helper-functions/mathjax-syntax';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { globalNotifcation } from '../../state/notification-state';
import { products, reactants } from '../../state/thermo-state';
import { CalculatedValues } from '../../types/SubstanceHandlers';

const EquationCard = ({
  type,
  calcVals,
}: {
  type: 'enthalpy' | 'entropy' | 'gibs';
  calcVals: CalculatedValues;
}) => {
  const reactantsArray = useRecoilValue(reactants);
  const productsArray = useRecoilValue(products);
  const { copyToClipboard, success } = useCopyToClipboard();
  const equationLatex = useMemo(
    () =>
      makeMathJaxCalcEquation(reactantsArray, productsArray, type, calcVals),
    [reactantsArray, productsArray, type, calcVals]
  );
  const mathMLEquation = useMemo(
    () => makeMathMLCalcEquation(reactantsArray, productsArray, calcVals, type),
    [reactantsArray, productsArray, type, calcVals]
  );

  const setGlobalNoti = useSetRecoilState(globalNotifcation);
  const handleCopyClick = () => {
    if (calcVals[type] !== null) {
      copyToClipboard(mathMLEquation);
      if (success) {
        setGlobalNoti('Copied to clipboard');
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-between px-4 py-3 text-white overflow-x-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-discord-dark">
      <TeX>{equationLatex}</TeX>
      <button
        onClick={handleCopyClick}
        type="button"
        className="bg-discord-btn ml-2 p-3 transition-all rounded-lg transform scale-100 ease-in-out hover:scale-105"
      >
        <AiFillCopy color="white" />
      </button>
    </div>
  );
};

export default EquationCard;
