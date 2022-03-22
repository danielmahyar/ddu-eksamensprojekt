/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { AiFillCheckCircle, AiFillCopy } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import TeX from '@matejmazur/react-katex';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { errorNotification } from '../../state/error-state';
import { globalNotifcation } from '../../state/notification-state';

const GuideCard = ({ type, numVal, unit }: any) => {
  const [notification, setNotification] = useRecoilState(globalNotifcation);
  const setGlobalError = useSetRecoilState(errorNotification);
  const [localError, setLocalError] = useState<boolean>(false);
  const { copyToClipboard, success } = useCopyToClipboard();
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const handleClipboardClick = (): void => {
    if (numVal === null) {
      setGlobalError({
        message: "Can't copy empty value to clipboard",
        color: 'bg-red-700',
      });
      setLocalError(true);
    } else {
      copyToClipboard(numVal);
      if (success && notification !== `Added ${type} to Clipboard`) {
        setNotification(`Added ${type} to Clipboard`);
        setShowCheck(true);
      }
    }
  };

  return (
    <div
      className="flex relative group cursor-pointer bg-discord-dark flex-col text-white transition-all ease-in-out justify-center w-full h-20  rounded px-4 border border-discord-light hover:border-blue-500"
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

      <div className="flex items-center justify-center lg:justify-start">
        {numVal !== null ? (
          <TeX>{`${numVal} ${unit}`}</TeX>
        ) : (
          <p>Substance has no {type}</p>
        )}
      </div>
    </div>
  );
};

export default GuideCard;
