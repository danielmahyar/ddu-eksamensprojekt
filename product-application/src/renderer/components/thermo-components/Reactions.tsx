/* eslint-disable no-plusplus */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import Collapsible from 'react-collapsible';
import { BiUpArrow } from 'react-icons/bi';
import Element from './Element';
import { reactants } from '../../state/thermo-state';
import { ChemicalForm, Substance, SubstanceUI } from '../../types/Substance';
import CustomElement from './CustomElement';

const Reactions = () => {
  const [reactantsState, setReactants] = useRecoilState(reactants);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const containerRef = useRef<any>();
  let customCount = 0;

  useEffect(() => {
    if (collapsed === false) return;
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [collapsed, containerRef]);

  const handleReactantAdd = useCallback(() => {
    const newElement: SubstanceUI = {
      id: uuidv4(),
      coefficient: 1,
      type: 'reactant',
      chosen: false,
      substance: null,
    };
    setReactants((prev) => [...prev, newElement]);
  }, [setReactants]);

  const handleReactantCustomAdd = useCallback(() => {
    const tempSubstance: Substance = {
      _id: uuidv4().toString(),
      enthalpy: 0,
      entropy: 0,
      gibs: 0,
      name: '',
      form: ChemicalForm.aquatic,
      author: 'Anonymous',
    };

    const newSubstanceUI: SubstanceUI = {
      id: uuidv4().toString(),
      coefficient: 1,
      substance: tempSubstance,
      chosen: true,
      type: 'reactant',
      specialUI: 'custom',
    };
    setReactants((prev) => [...prev, newSubstanceUI]);
  }, [setReactants]);

  return (
    <section className="p-4 md:p-2">
      <div className="border-b border-discord-border">
        <h1 className="font-bold text-white text-2xl mb-5 uppercase">
          Reaktanter
        </h1>
      </div>
      <div ref={containerRef} />
      <div className="w-full flex items-center justify-center mt-2">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          type="button"
          className="bg-discord-purple rounded-full w-10 h-10 flex items-center justify-center transition-all text-white font-bold px-2 py-3 mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple"
        >
          <BiUpArrow
            className={`transform transition-all ease-in-out ${
              collapsed ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </button>
      </div>
      <Collapsible open={collapsed} trigger={<></>}>
        {reactantsState.map((reactant: SubstanceUI) => {
          if (reactant?.specialUI === 'custom') {
            customCount += 1;
            return (
              <CustomElement
                key={reactant.id}
                item={reactant}
                count={customCount}
              />
            );
          }
          return <Element key={reactant.id} item={reactant} />;
        })}

        <div className="h-full w-full flex space-x-2 mt-2">
          <button
            type="submit"
            onClick={handleReactantAdd}
            className="bg-discord-btn w-full transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
          >
            +
          </button>
          <button
            type="submit"
            onClick={handleReactantCustomAdd}
            className="bg-discord-btn w-56 transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
          >
            Brugerdefineret +
          </button>
        </div>
      </Collapsible>
    </section>
  );
};

export default Reactions;
