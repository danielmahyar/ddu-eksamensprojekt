import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import SiteContainer from '../../components/thermo-components/SiteContainer';
import { ThermoHeaderContext } from '../ThermoPage';
import { Substance } from '../../types/Substance';
import SubstanceMenu from '../../components/thermo-components/SubstanceMenu';
import { globalModal } from '../../state/modal-state';
import {
  deleteSubstance,
  updateSubstance,
} from '../../helper-functions/substance-fetch';
import { globalNotifcation } from '../../state/notification-state';
import { errorNotification } from '../../state/error-state';
import { editElement } from '../../state/thermo-state';
import { getShowEditModal } from '../../electron-state/user-state';

const ElementEditPage = () => {
  const { setHeaderTitle, resetAllState }: any =
    useContext(ThermoHeaderContext);
  const [elementInformation, setElementInfo] = useRecoilState(editElement);
  const [searchName, setSearch] = useState<string>('');
  const [modal, setModal] = useRecoilState(globalModal);
  const setNoti = useSetRecoilState(globalNotifcation);
  const setError = useSetRecoilState(errorNotification);

  useLayoutEffect(() => {
    setHeaderTitle('Rediger i stoffer');
  }, [setHeaderTitle]);

  useEffect(() => {
    const deleteSubstanceFromDisk = async () => {
      if (!elementInformation) return;
      const res = await deleteSubstance(elementInformation);
      if (res) {
        setNoti(`Slettet ${elementInformation.name}`);
        setElementInfo(null);
        resetAllState();
      } else {
        setError({
          message: `Problem med at slette ${elementInformation.name}`,
          color: 'bg-discord-red',
        });
      }
    };

    const writeUpdatedSubstanceToDisk = async () => {
      if (!elementInformation) return;
      const res = await updateSubstance(elementInformation);
      if (res) {
        setNoti(`Opdateret ${elementInformation.name}`);
        setElementInfo(null);
        resetAllState();
      } else {
        setError({
          message: `Problemer med at opdatere ${elementInformation.name}`,
          color: 'bg-discord-red',
        });
      }
    };

    if (modal.type === 'show_edit_modal' && modal.accept === true) {
      writeUpdatedSubstanceToDisk();
    } else if (modal.type === 'show_delete_modal' && modal.accept === true) {
      deleteSubstanceFromDisk();
    }
  }, [
    modal,
    elementInformation,
    resetAllState,
    setElementInfo,
    setError,
    setNoti,
  ]);

  const handleSetSubstance = (selectedSubstance: Substance) => {
    setSearch('');
    setElementInfo(selectedSubstance);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (changes: any) => {
    const tempObj = {
      ...elementInformation,
      ...changes,
    };
    setElementInfo(tempObj);
  };

  const handleDeleteElement = async (): Promise<void> => {
    if (!elementInformation) return;
    if (!getShowEditModal())
      setModal({
        message: 'Testttt',
        show: true,
        accept: false,
        type: 'show_delete_modal',
      });

    const res = await deleteSubstance(elementInformation);
    console.log(res);
    if (res) {
      setNoti(`Slettede ${elementInformation.name}`);
      resetAllState();
      setElementInfo(null);
    } else {
      setError({
        message: `Problemer med at slette ${elementInformation.name}`,
        color: 'bg-discord-red',
      });
    }
  };

  const handleUpdateSubstance = async (): Promise<void> => {
    if (!elementInformation) return;
    if (!getShowEditModal())
      setModal({
        message: 'Testttt',
        show: true,
        accept: false,
        type: 'show_edit_modal',
      });
    const res = await updateSubstance(elementInformation);
    if (res) {
      setNoti(`Opdaterede ${elementInformation.name}`);
      setElementInfo(null);
      resetAllState();
    } else {
      setError({
        message: `Problemer med at opdatere ${elementInformation.name}`,
        color: 'bg-discord-red',
      });
    }
  };

  if (elementInformation) {
    const { enthalpy, entropy, gibs } = elementInformation;
    return (
      <SiteContainer>
        <div className="w-full h-full flex flex-col space-y-2 mb-6">
          <div className="flex flex-row h-auto w-full space-x-3">
            <div className="flex flex-col w-full">
              <span className="uppercase mb-2 font-bold text-discord-text-highlight text-xs">
                Enter Custom Substance name
              </span>
              <input
                value={elementInformation.name}
                onChange={(e) => handleChange({ name: e.target.value })}
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
                    type="number"
                    className="bg-discord-gray w-full appearance-none px-2 p-3 text-white transition-all duration-500 font-semibold rounded-t border border-discord-dark outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleChange({ enthalpy: null })}
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
                      handleChange({ entropy: e.currentTarget.valueAsNumber })
                    }
                    value={entropy}
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
          <button
            onClick={handleDeleteElement}
            type="button"
            className="w-20 bg-discord-red py-2"
          >
            Delete
          </button>
        </div>
        <button
          type="submit"
          onClick={handleUpdateSubstance}
          className="bg-discord-purple w-full transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
        >
          Update Substance
        </button>
      </SiteContainer>
    );
  }

  return (
    <SiteContainer>
      <div
        // onClick={handleElementClick}
        className="flex flex-col relative w-full h-full flex-shrink-0 group"
      >
        <div className="w-full h-full flex flex-col space-y-2 mb-6">
          <input
            value={searchName}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="bg-discord-gray w-full px-2 p-3 text-white transition-all duration-500 font-semibold rounded border border-discord-dark outline-none focus:border-blue-500"
          />
          {searchName && (
            <SubstanceMenu
              substanceName={searchName}
              handleSubstanceAdd={handleSetSubstance}
            />
          )}
        </div>
      </div>
    </SiteContainer>
  );
};

export default ElementEditPage;
