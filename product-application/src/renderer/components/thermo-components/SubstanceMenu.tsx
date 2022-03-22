/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useLayoutEffect, useState, useRef } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import TeX from '@matejmazur/react-katex';
import { fetchSubstance } from '../../helper-functions/substance-fetch';
import { globalNotifcation } from '../../state/notification-state';
import { guideBoxElement } from '../../state/thermo-state';
import { Substance } from '../../types/Substance';

type PropsType = {
  substanceName: string;
  handleSubstanceAdd: (_: Substance) => void;
};

const SubstanceMenu = ({ substanceName, handleSubstanceAdd }: PropsType) => {
  const [substances, setSubstances] = useState<Substance[] | null>(null);
  const setElementHighlight = useSetRecoilState(guideBoxElement);
  const setNotification = useSetRecoilState(globalNotifcation);
  const containerRef = useRef<any>();
  useLayoutEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useLayoutEffect(() => {
    if (substanceName === '') return;
    fetchSubstance(substanceName)
      .then((fetchedSubstances: Substance[]) => {
        return setSubstances(fetchedSubstances);
      })
      .catch((err) => {});
  }, [substanceName, setSubstances]);

  const addSubstance = (substance: Substance) => {
    setElementHighlight(substance);
    handleSubstanceAdd(substance);
  };

  const handleShowMessage = (message: string) => {
    setNotification(message);
  };

  return (
    <div
      ref={containerRef}
      className="max-h-52 w-full z-0 overflow-y-auto border rounded border-discord-border bg-discord-gray scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-discord-dark"
    >
      {substances &&
        substances.map((substance) => (
          <div
            key={uuidv4()}
            role="button"
            tabIndex={0}
            className="cursor-pointer group-scope flex items-center justify-between py-2 px-4 transition ease-in-out hover:bg-discord-light text-white"
            onClick={() => addSubstance(substance)}
          >
            <TeX>{`${substance.name}(${substance.form})`}</TeX>
            {substance?.approved ? (
              <div className="flex items-center justify-between">
                <p className="transition-all ease-in-out mr-2 opacity-0 group-scope-hover:opacity-75 text-green-500 font-bold">
                  Godkendt
                </p>
                <AiFillCheckCircle
                  color="green"
                  className="transition-all ease-in-out opacity-0 group-scope-hover:opacity-75"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="transition-all ease-in-out mr-2 opacity-0 group-scope-hover:opacity-75 text-red-500 font-bold">
                  Ikke godkendt
                </p>
                <BiErrorCircle
                  onMouseOver={() =>
                    handleShowMessage('This substance has not approved')
                  }
                  color="red"
                  className="transition-all ease-in-out opacity-0 group-scope-hover:opacity-75"
                />
              </div>
            )}
          </div>
        ))}
      {substances !== null && substances.length === 0 && (
        <div className="flex items-center justify-center py-2">
          <p className="transition-all ease-in-out mr-2 text-red-400 font-bold">
            Ingen stoffer fundet
          </p>
          <BiErrorCircle
            onMouseOver={() =>
              handleShowMessage('This substance has not approved')
            }
            color="red"
            className="transition-all ease-in-out"
          />
        </div>
      )}
    </div>
  );
};

export default SubstanceMenu;
