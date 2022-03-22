import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import TeX from '@matejmazur/react-katex';
import SiteContainer from '../components/find-components/SiteContainer';
import ThermoHeader from '../components/thermo-components/ThermoHeader';
import { setLastVisited } from '../electron-state/user-state';
import SubstanceMenu from '../components/thermo-components/SubstanceMenu';
import { Substance } from '../types/Substance';
import GuideCard from '../components/find-components/GuideCard';
import {
  enthalpyUnit,
  entropyUnit,
  gibsUnit,
} from '../helper-functions/mathjax-syntax';
import { editElement } from '../state/thermo-state';

const FindPage = () => {
  const [searchName, setSearch] = useState<string>('');
  const [searchElement, setElement] = useState<Substance | null>(null);
  const setEditElement = useSetRecoilState(editElement);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    setLastVisited({
      name: 'Find substance',
      route: '/find-substance',
      time: today.getUTCMinutes().toString(),
    });
  }, []);

  const handleNewSearch = () => {
    setSearch('');
    setElement(null);
  };

  const handleEditElement = () => {
    setEditElement(searchElement);
    navigate('/thermo/editor');
  };

  const handleSetSubstance = (substance: Substance) => {
    setElement(substance);
  };

  return (
    <section className="flex w-full h-full">
      <div className="flex flex-col w-full h-full bg-discord-gray">
        <ThermoHeader />

        <SiteContainer>
          {searchElement ? (
            <div className="w-full h-full space-y-2">
              <div className="font-bold text-white text-2xl flex space-x-3">
                <p>Det søgte stof: </p>
                <TeX>{`${searchElement.name}(${searchElement.form})`}</TeX>
              </div>
              <div className="flex flex-col space-y-3">
                <GuideCard
                  type="enthalpy"
                  numVal={searchElement.enthalpy}
                  unit={enthalpyUnit}
                />
                <GuideCard
                  type="entropy"
                  numVal={searchElement.entropy}
                  unit={entropyUnit}
                />
                <GuideCard
                  type="gibs"
                  numVal={searchElement.gibs}
                  unit={gibsUnit}
                />
              </div>
              <button
                onClick={handleNewSearch}
                className="bg-discord-purple w-full transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
                type="button"
              >
                Find et nyt stof
              </button>
              <button
                onClick={handleEditElement}
                type="button"
                className="bg-discord-btn w-full transition-all text-white font-bold p-2 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
              >
                Rediger nuværrende stof
              </button>
            </div>
          ) : (
            <div>
              <input
                value={searchName}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Søg efter et stof"
                className="bg-discord-gray w-full px-2 p-3 text-white transition-all duration-500 font-semibold rounded border border-discord-dark outline-none focus:border-blue-500"
              />
              {searchName && (
                <SubstanceMenu
                  substanceName={searchName}
                  handleSubstanceAdd={handleSetSubstance}
                />
              )}
            </div>
          )}
        </SiteContainer>
      </div>
    </section>
  );
};

export default FindPage;
