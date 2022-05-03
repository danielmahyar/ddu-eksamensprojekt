/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { AiFillCheckCircle, AiFillCopy } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import copyToClipboard from 'copy-to-clipboard'
import { MathJax } from 'better-react-mathjax';
import toast from 'react-hot-toast';

const GuideCard = ({ type, numVal, unit, copyableUnit }: any) => {
  const [localError, setLocalError] = useState<boolean>(false);
  const [showCheck, setShowCheck] = useState<boolean>(false);

  const handleClipboardClick = (): void => {
    if (numVal === null) {
      setLocalError(true);
    } else {
      copyToClipboard(`${numVal.toString()} ${copyableUnit}`);
      toast.success(`Kopierede ${numVal.toString()} ${copyableUnit}`)
      setShowCheck(true);
    }
  };

  return (
    <div
      className="flex relative group cursor-pointer flex-col text-white transition-all ease-in-out justify-center w-full h-20  rounded px-4 border border-discord-light hover:border-blue-500"
      role="button"
      tabIndex={0}
      onClick={handleClipboardClick}
    >
      {showCheck && !localError && (
        <AiFillCheckCircle
          color="green"
          className="absolute transition-all ease-in-out right-3 top-3 opacity-0 group-hover:opacity-75"
        />
      )}
      {!showCheck && !localError && (
        <AiFillCopy className="absolute transition-all ease-in-out right-3 top-3 opacity-0 group-hover:opacity-75" />
      )}

      {!showCheck && localError && (
        <BiErrorCircle
          color="red"
          className="absolute transition-all ease-in-out right-3 top-3 opacity-0 group-hover:opacity-75"
        />
      )}

      <h3 className="text-discord-text-primary font-bold uppercase">{type}</h3>

      <div className="flex items-center justify-center">
        {numVal !== null ? (
          <MathJax>{`\\( ${numVal} ${unit} \\)`}</MathJax>
        ) : (
          <p>Stoffet har ingen {type}</p>
        )}
      </div>
    </div>
  );
};

export default GuideCard;
