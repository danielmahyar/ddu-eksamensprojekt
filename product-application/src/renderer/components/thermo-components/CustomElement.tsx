/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from 'react';
import Collapsible from 'react-collapsible';
import { MdClear } from 'react-icons/md';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { guideBoxElement, products, reactants } from '../../state/thermo-state';
import { Substance, SubstanceUI } from '../../types/Substance';

const CustomElement = ({
  item,
  count,
}: {
  item: SubstanceUI;
  count: number;
}) => {
  const { id, substance, type } = item;

  const [elementList, setElementList] = useRecoilState(
    type === 'reactant' ? reactants : products
  );
  const setElementHighlight = useSetRecoilState(guideBoxElement);

  const elementRef = useRef<any>();

  const handleElementUpdate = (newElement: SubstanceUI) => {
    const tempArray = [...elementList];
    const queryIndex = elementList.findIndex((r) => r.id === id);
    tempArray[queryIndex] = newElement;
    setElementList(tempArray);
  };

  const handleChange = (changes: any) => {
    const tempObj: Substance = { ...substance, ...changes };
    const tempElement = {
      ...item,
      substance: tempObj,
    };
    handleElementUpdate(tempElement);
  };

  const handleElementClick = () => {
    setElementHighlight(substance && { ...substance });
  };

  const handleElementDelete = () => {
    const tempArray = elementList.filter((r) => r.id !== id);
    setElementList(tempArray);
    setElementHighlight(null);
  };

  const handleHighlight = () => {
    setElementHighlight(substance && { ...substance });
  };

  return (
    <div
      ref={elementRef}
      role="button"
      tabIndex={-1}
      onClick={handleElementClick}
      className="flex flex-col relative w-full h-full py-2 overflow-hidden flex-shrink-0 group hover:bg-discord-hover px-4 pb-5 rounded-lg"
    >
      <MdClear
        onClick={handleElementDelete}
        size={15}
        className="hidden group-hover:flex items-center justify-center text-white absolute right-4 top-2 cursor-pointer hover:bg-discord-dark rounded-full h-6 w-6"
      />
      <h1 className="text-white font-bold text-2xl mb-2">Custom {count}</h1>

      <Collapsible
        open
        trigger={
          <button
            type="button"
            className="w-20 py-1 mb-2 text-discord-text-primary font-bold rounded bg-discord-btn"
          >
            Edit
          </button>
        }
      >
        <div className="w-full h-full flex flex-col space-y-6 mb-6">
          <div className="flex flex-row h-full w-full space-x-3">
            <div className="flex flex-col w-full">
              <span className="uppercase mb-2 font-bold text-discord-text-highlight text-xs">
                Skriv brugerdefineret stof navn
              </span>
              <input
                value={substance?.name}
                onChange={(e) => handleChange({ name: e.target.value })}
                type="text"
                className="bg-discord-gray w-full px-2 p-3 text-white transition-all duration-500 font-semibold rounded border border-discord-dark outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-32">
              <span className="uppercase mb-2 font-bold text-discord-text-highlight text-xs">
                Tilstandsform
              </span>
              <select
                className="bg-discord-gray px-2 p-3 text-white w-full border rounded border-discord-dark transition-all duration-500 outline-none focus:border-blue-500"
                onInput={(e) => handleChange({ form: e.currentTarget.value })}
                value={item.substance?.form}
              >
                <option value="s">Solid</option>
                <option value="aq">Aqua</option>
                <option value="l">Liquid</option>
                <option value="g">Gas</option>
              </select>
            </div>
            <div className="w-20">
              <span className="uppercase mb-2 font-bold text-discord-text-highlight text-xs">
                Koefficient
              </span>
              <input
                type="number"
                autoComplete="off"
                value={item?.coefficient}
                onChange={(e) =>
                  handleElementUpdate({
                    ...item,
                    coefficient: e.target.valueAsNumber,
                  })
                }
                name="coeffi"
                max="25"
                min="1"
                className="bg-discord-gray px-2 p-3 text-white w-full border rounded border-discord-dark transition-all duration-500 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Custom thermodynamic values */}
          <div className="flex space-x-2">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between uppercase mb-2 font-bold text-discord-text-highlight text-xs">
                <h1>Entalpi</h1>
              </div>

              {substance && substance.enthalpy !== null ? (
                <>
                  <input
                    onChange={(e) =>
                      handleChange({ enthalpy: e.target.valueAsNumber })
                    }
                    value={substance.enthalpy}
                    type="number"
                    className="bg-discord-gray w-full appearance-none px-2 p-3 text-white transition-all duration-500 font-semibold rounded-t border border-discord-dark outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleChange({ enthalpy: null })}
                    type="button"
                    className="bg-discord-btn rounded-b py-2 text-white transition-all font-semibold hover:bg-discord-gray"
                  >
                    Har en værdi
                  </button>
                </>
              ) : (
                <>
                  <input
                    value="Ingen værdi"
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
              {substance && substance.entropy !== null ? (
                <>
                  <input
                    onChange={(e) =>
                      handleChange({ entropy: e.target.valueAsNumber })
                    }
                    value={substance.entropy}
                    type="number"
                    className="bg-discord-gray w-full appearance-none px-2 p-3 text-white transition-all duration-500 font-semibold rounded-t border border-discord-dark outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleChange({ entropy: null })}
                    type="button"
                    className="bg-discord-btn rounded-b py-2 text-white transition-all font-semibold hover:bg-discord-gray"
                  >
                    Har ikke en værdi
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

              {substance && substance.gibs !== null ? (
                <>
                  <input
                    onChange={(e) =>
                      handleChange({ gibs: e.target.valueAsNumber })
                    }
                    value={substance.gibs}
                    type="number"
                    className="bg-discord-gray w-full appearance-none px-2 p-3 text-white transition-all duration-500 font-semibold rounded-t border border-discord-dark outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleChange({ gibs: null })}
                    type="button"
                    className="bg-discord-btn rounded-b py-2 text-white transition-all font-semibold hover:bg-discord-gray"
                  >
                    Har ikke en værdi
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
        </div>
      </Collapsible>
    </div>
  );
};

export default CustomElement;
