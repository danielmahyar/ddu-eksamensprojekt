import { AiFillCopy } from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';
import TeX from '@matejmazur/react-katex';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { errorNotification } from '../../state/error-state';
import { globalNotifcation } from '../../state/notification-state';

type Props = {
  type: 'Entalpi' | 'Entropi' | 'Gibbs Energi';
  numVal: number | null;
  unit: string;
  chemicalSignature: string;
};

const ResultCard = ({ type, numVal, unit, chemicalSignature }: Props) => {
  const { copyToClipboard, success } = useCopyToClipboard();
  const setNotification = useSetRecoilState(globalNotifcation);
  const setGlobalError = useSetRecoilState(errorNotification);

  const handleCopyClick = () => {
    if (numVal !== null) {
      const num = numVal.toFixed(3).toString();
      copyToClipboard(num);
      if (success) {
        setNotification(`${type} added to clipboard`);
      }
    } else {
      setGlobalError({
        message: `${type} has no value to copy`,
        color: 'bg-discord-purple',
      });
    }
  };

  return (
    <div className="flex justify-between px-4 py-3">
      <div className="flex flex-col">
        <div className="flex flex-row items-center space-x-2 text-discord-text-primary">
          <h2 className="text-discord-text-primary space-x-2 font-bold uppercase text-sm ">
            {type}:
          </h2>
          <TeX>{chemicalSignature}</TeX>
        </div>
        <div className="text-white font-bold uppercase text-sm ">
          {numVal !== null && (
            <TeX className="normal-case">{`${numVal.toFixed(3)} ${unit}`}</TeX>
          )}
          {numVal === null && <p>Ikke alle stoffer havde værdi for {type}</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={handleCopyClick}
        className="bg-discord-btn p-3 transition-all rounded-lg transform scale-100 ease-in-out hover:scale-105"
      >
        <AiFillCopy color="white" />
      </button>
    </div>
  );
};

export default ResultCard;
