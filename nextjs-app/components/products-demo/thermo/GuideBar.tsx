import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { guideBoxElement } from '../../../lib/atoms/thermo-state';
import GuideInformation from './GuideInformation';

const GuideBar = () => {
  const [elementInformation, setElementInfo] = useRecoilState(guideBoxElement);
  const [load, setLoad] = useState<boolean>(false);
  const ElementIsEmpty = elementInformation === null;

  useEffect(() => {
    setLoad(true);
    const unsub = setInterval(() => setLoad(false), 500);

    return () => {
      clearInterval(unsub);
    };
  }, [elementInformation, setLoad]);

  const handleClear = () => {
    setElementInfo(null);
  };

  return (
    <div
      className={`h-full w-72 transition-all duration-700 ease-in-out flex-shrink-0 relative z-10 bg-discord-gray  flex flex-col border-discord-border`}
    >
      <div className="h-14 w-full mb-2 flex items-center shadow flex-shrink-0 p-2">
        <h1 className="text-xl font-bold text-white ml-2">
          Information om stof
        </h1>
      </div>
      <div className="p-2 overflow-y-auto  h-full w-full scrollbar-thin scrollbar-track-discord-gray scrollbar-thumb-discord-dark">
        <div className="p-0 h-full ">
          {!ElementIsEmpty && (
            <>
              <GuideInformation
                elementInformation={elementInformation}
                load={load}
                handleClear={handleClear}
              />
            </>
          )}
          {ElementIsEmpty && (
            <div className="h-full w-full flex flex-col items-center justify-center text-white">
              <h1 className="text-xl font-bold text-discord-text-primary">
                Intet valgt :(
              </h1>
              <p className="font-bold text-center">
                Tryk på et stof for mere info
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideBar;
