/* eslint-disable no-underscore-dangle */
import { Substance, SubstanceData, SubstanceUI } from '../types/Substance';
import { CalculatedValues } from '../types/SubstanceHandlers';

const { ipcRenderer } = window.substances_fetch;

const calcVals = (substances: SubstanceUI[]): CalculatedValues => {
  const intialReducerVal: CalculatedValues = {
    enthalpy: 0,
    entropy: 0,
    gibs: 0,
  };

  const result = substances.reduce((prevSub, currSub) => {
    const { coefficient, substance } = currSub;
    const co = coefficient || 1;

    const calcEnthalpy =
      substance?.enthalpy !== null && substance?.enthalpy !== undefined
        ? co * substance?.enthalpy
        : null;
    const calcEntropy =
      substance?.entropy !== null && substance?.entropy !== undefined
        ? co * substance?.entropy
        : null;
    const calcGibs =
      substance?.gibs !== null && substance?.gibs !== undefined
        ? co * substance?.gibs
        : null;

    return {
      enthalpy:
        prevSub.enthalpy !== null && calcEnthalpy !== null
          ? prevSub?.enthalpy + calcEnthalpy
          : null,
      entropy:
        prevSub.entropy !== null && calcEntropy !== null
          ? prevSub.entropy + calcEntropy
          : null,
      gibs:
        prevSub.gibs !== null && calcGibs !== null
          ? prevSub.gibs + calcGibs
          : null,
    };
  }, intialReducerVal);

  return result;
};

export interface ResultsType {
  reactans: Substance[];
  products: Substance[];
}

export const fetchSubstance = async (name: string) => {
  const result: SubstanceData[] = await ipcRenderer.invoke('get_substances');
  const searchChemicalSymbols = new RegExp(`(${name})`, `i`);
  const searchCommonName = new RegExp(`(${name})`, `i`);

  const searchedArray = result.filter((sub: any) => {
    if (!('searchName' in sub)) return searchChemicalSymbols.test(sub.name);
    const symbolTest = searchChemicalSymbols.test(sub.name);
    const searchNameTest = searchCommonName.test(sub.searchName);
    return !!(symbolTest || searchNameTest);
  });

  const mappedArray: Substance[] = searchedArray.map((sub: any) => ({
    ...sub,
    _id: sub._id.$oid,
    __v: null,
  }));

  return mappedArray;
};

export const updateSubstance = async (
  substance: Substance
): Promise<boolean> => {
  return ipcRenderer.invoke('update-specific-substance', {
    ...substance,
  });
};

export const deleteSubstance = async (
  substance: Substance
): Promise<boolean> => {
  return ipcRenderer.invoke('delete-specific-substance', {
    ...substance,
  });
};

export const fetchCalculation = (substances: {
  reactantsArray: SubstanceUI[];
  productsArray: SubstanceUI[];
}): CalculatedValues => {
  const { reactantsArray, productsArray } = substances;
  const reactantsVal = calcVals(reactantsArray);
  const productsVal = calcVals(productsArray);

  const results: CalculatedValues = {
    enthalpy:
      reactantsVal.enthalpy !== null && productsVal.enthalpy !== null
        ? productsVal.enthalpy - reactantsVal.enthalpy
        : null,
    entropy:
      reactantsVal.entropy !== null && productsVal.entropy !== null
        ? productsVal.entropy - reactantsVal.entropy
        : null,
    gibs:
      reactantsVal.gibs !== null && productsVal.gibs !== null
        ? productsVal.gibs - reactantsVal.gibs
        : null,
  };

  return results;
};
