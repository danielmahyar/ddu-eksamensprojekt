/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable consistent-return */
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSetRecoilState } from 'recoil';
import SiteContainer from '../../components/thermo-components/SiteContainer';
import { ChemicalForm, SourceBook, Substance } from '../../types/Substance';
import { ThermoHeaderContext } from '../ThermoPage';
import { guideBoxElement } from '../../state/thermo-state';
import { globalNotifcation } from '../../state/notification-state';
import { errorNotification } from '../../state/error-state';

const { ipcRenderer } = window.substances_fetch;

const INTIAL_SOURCE_VAL: SourceBook = {
  title: 'DATABOG',
  authors: [
    'Erik Strandgaard Andersen',
    'Paul Jespersgaard',
    'Ove Grønbæk Østergaard',
  ],
  publishers: ['F&K Forlaget'],
  site: '86-99',
  sourceDate: {
    yearMade: 2016,
    yearRead: 2022,
  },
};

const INITIAL_SUBSTANCE_VAL: Substance = {
  _id: uuidv4(),
  name: '',
  enthalpy: 0,
  entropy: 0,
  gibs: 0,
  author: 'Anonymous',
  form: ChemicalForm.solid,
  approved: false,
  source: INTIAL_SOURCE_VAL,
};

const ElementInsertPage = () => {
  const { setHeaderTitle }: any = useContext(ThermoHeaderContext);
  const setElementHighlight = useSetRecoilState(guideBoxElement);
  const setNoti = useSetRecoilState(globalNotifcation);
  const setError = useSetRecoilState(errorNotification);
  const [elementInformation, setElementInfo] = useState<Substance>(
    INITIAL_SUBSTANCE_VAL
  );
  const { enthalpy, entropy, gibs } = elementInformation;

  useEffect(() => {
    setHeaderTitle('Indsæt stoffer');
  }, [setHeaderTitle]);

  const handleHighlight = () => {
    setElementHighlight(elementInformation);
  };

  const handleChange = (changes: any) => {
    const tempObj = {
      ...elementInformation,
      ...changes,
    };
    setElementInfo(tempObj);
  };

  const addSubstance = () => {
    if (elementInformation.name === '')
      return setError({ message: 'Intet navn givet', color: 'bg-discord-red' });
    ipcRenderer
      .invoke('add-substance', elementInformation)
      .then((e: { status: boolean; message: string }) => {
        if (e?.status === false)
          return setError({ message: e?.message, color: 'bg-discord-red' });
        setNoti(`Indsat ${elementInformation.name} i programmet`);
        return setElementInfo({
          _id: uuidv4(),
          name: '',
          enthalpy: 0,
          entropy: 0,
          gibs: 0,
          author: 'Anonymous',
          form: ChemicalForm.solid,
          approved: false,
        });
      })
      .catch(() => {
        setError({
          message: 'Der opstod problemer med værdierne. Tjek dine værdier igen',
          color: 'bg-discord-red',
        });
      });
  };

  return (
    <SiteContainer>
      <div
        role="article"
        onClick={handleHighlight}
        className="flex flex-col space-y-5 relative w-full h-full flex-shrink-0 group"
      >
        <div className="w-full h-auto flex flex-col space-y-2 mb-6">
          <div className="flex flex-row h-auto w-full space-x-3">
            <div className="flex flex-col w-full">
              <span className="uppercase mb-2 font-bold text-discord-text-highlight text-xs">
                Skriv stoffets navn
              </span>
              <input
                value={elementInformation.name}
                onChange={(e) => handleChange({ name: e.target.value })}
                onBlur={handleHighlight}
                type="text"
                className="bg-discord-gray w-full px-2 p-3 text-white transition-all duration-500 font-semibold rounded border border-discord-dark outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-32">
              <span className="uppercase mb-2 font-bold text-discord-text-highlight text-xs">
                Form
              </span>
              <select
                className="bg-discord-gray px-2 p-3 text-white w-full border rounded border-discord-dark transition-all duration-500 outline-none focus:border-blue-500"
                onInput={(e) => handleChange({ form: e.currentTarget.value })}
                onBlur={handleHighlight}
                value={elementInformation.form}
              >
                <option value="s">Solid</option>
                <option value="aq">Aqua</option>
                <option value="l">Liquid</option>
                <option value="g">Gas</option>
              </select>
            </div>
          </div>

          {/* Custom thermodynamic values */}
          <div className="flex space-x-2">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between uppercase mb-2 font-bold text-discord-text-highlight text-xs">
                <h1>Entalpi</h1>
              </div>

              {enthalpy !== null ? (
                <>
                  <input
                    onChange={(e) =>
                      handleChange({ enthalpy: e.target.valueAsNumber })
                    }
                    value={enthalpy}
                    onBlur={handleHighlight}
                    type="number"
                    className="bg-discord-gray w-full appearance-none px-2 p-3 text-white transition-all duration-500 font-semibold rounded-t border border-discord-dark outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleChange({ enthalpy: null })}
                    className="bg-discord-btn rounded-b py-2 text-white transition-all font-semibold hover:bg-discord-gray"
                  >
                    Har ingen værdi
                  </button>
                </>
              ) : (
                <>
                  <input
                    value="No Value Selected"
                    type="text"
                    disabled
                    className="bg-discord-gray w-full appearance-none px-2 p-3 text-gray-300 font-semibold rounded-t border border-discord-dark outline-none"
                  />
                  <button
                    onClick={() => handleChange({ enthalpy: 0 })}
                    type="button"
                    className="bg-discord-btn rounded-b py-2 text-white transition-all font-semibold hover:bg-discord-gray"
                  >
                    Har en værdi
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-col w-full">
              <span className="uppercase mb-2 font-bold text-discord-text-highlight text-xs">
                Entropi
              </span>
              {entropy !== null ? (
                <>
                  <input
                    onChange={(e) =>
                      handleChange({ entropy: e.target.valueAsNumber })
                    }
                    value={entropy}
                    onBlur={handleHighlight}
                    type="number"
                    className="bg-discord-gray w-full appearance-none px-2 p-3 text-white transition-all duration-500 font-semibold rounded-t border border-discord-dark outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleChange({ entropy: null })}
                    type="button"
                    className="bg-discord-btn rounded-b py-2 text-white transition-all font-semibold hover:bg-discord-gray"
                  >
                    Har ingen værdi
                  </button>
                </>
              ) : (
                <>
                  <input
                    value="No Value Selected"
                    type="text"
                    disabled
                    className="bg-discord-gray w-full appearance-none px-2 p-3 text-gray-300 font-semibold rounded-t border border-discord-dark outline-none"
                  />
                  <button
                    onClick={() => handleChange({ entropy: 0 })}
                    type="button"
                    className="bg-discord-btn rounded-b py-2 text-white transition-all font-semibold hover:bg-discord-gray"
                  >
                    Har en værdi
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-col w-full">
              <span className="uppercase mb-2 font-bold text-discord-text-highlight text-xs">
                Gibbs Energi
              </span>

              {gibs !== null ? (
                <>
                  <input
                    onChange={(e) =>
                      handleChange({ gibs: e.target.valueAsNumber })
                    }
                    value={gibs}
                    onBlur={handleHighlight}
                    type="number"
                    className="bg-discord-gray w-full appearance-none px-2 p-3 text-white transition-all duration-500 font-semibold rounded-t border border-discord-dark outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleChange({ gibs: null })}
                    type="button"
                    className="bg-discord-btn rounded-b py-2 text-white transition-all font-semibold hover:bg-discord-gray"
                  >
                    Har ingen værdi
                  </button>
                </>
              ) : (
                <>
                  <input
                    value="No Value Selected"
                    type="text"
                    disabled
                    className="bg-discord-gray w-full appearance-none px-2 p-3 text-gray-300 font-semibold rounded-t border border-discord-dark outline-none"
                  />
                  <button
                    onClick={() => handleChange({ gibs: 0 })}
                    type="button"
                    className="bg-discord-btn rounded-b py-2 text-white transition-all font-semibold hover:bg-discord-gray"
                  >
                    Har en værdi
                  </button>
                </>
              )}
            </div>
          </div>
          {elementInformation.approved &&
          elementInformation?.approved === true ? (
            <button
              onClick={() => handleChange({ approved: false })}
              type="button"
              className="bg-discord-green w-32 rounded py-2 text-white transition-all font-semibold hover:bg-discord-gray"
            >
              Godkendt
            </button>
          ) : (
            <button
              onClick={() => handleChange({ approved: true })}
              type="button"
              className="bg-discord-red w-32 rounded py-2 text-white transition-all font-semibold hover:bg-discord-gray"
            >
              Ikke godkendt
            </button>
          )}
        </div>
        <button
          type="submit"
          onClick={addSubstance}
          className="bg-discord-purple w-full transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
        >
          Gem
        </button>
      </div>
    </SiteContainer>
  );
};

export default ElementInsertPage;
