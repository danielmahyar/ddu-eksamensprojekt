import { AiFillCopy } from 'react-icons/ai';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMemo } from 'react';
import {
  makeMathJaxCalcEquation,
  makeMathMLCalcEquation,
} from '../../../lib/atoms/thermo-state';
import copyToClipboard from 'copy-to-clipboard';
import { products, reactants, CalculatedValues } from '../../../lib/atoms/thermo-state';
import { MathJax } from 'better-react-mathjax';
import toast from 'react-hot-toast';

const EquationCard = ({
  type,
  calcVals,
}: {
  type: 'enthalpy' | 'entropy' | 'gibs';
  calcVals: CalculatedValues;
}) => {
  const reactantsArray = useRecoilValue(reactants);
  const productsArray = useRecoilValue(products);
  const equationLatex = useMemo(
    () =>
      makeMathJaxCalcEquation(reactantsArray, productsArray, type, calcVals),
    [reactantsArray, productsArray, type, calcVals]
  );
  const mathMLEquation = useMemo(
    () => makeMathMLCalcEquation(reactantsArray, productsArray, calcVals, type),
    [reactantsArray, productsArray, type, calcVals]
  );

  const handleCopyClick = () => {
    if (calcVals[type] !== null) {
      navigator.clipboard.writeText(mathMLEquation);
      toast.success("Kopierede udtryk")
    }
  };

  return (
    <div className="w-full flex items-center justify-between px-4 py-3 text-white overflow-x-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-discord-dark">
      <MathJax>{`\\( ${equationLatex} \\)`}</MathJax>
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
