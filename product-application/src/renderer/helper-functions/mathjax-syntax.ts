/* eslint-disable no-useless-escape */
/* eslint-disable default-case */
import { SubstanceUI } from '../types/Substance';
import { CalculatedValues } from '../types/SubstanceHandlers';

export type SubstanceType = 'enthalpy' | 'entropy' | 'gibs';

export const frac = '\\frac';
export const dot = '\\cdot';
export const delta = '\\Delta';
export const theta = '\\theta';
export const arrow = '\\to';

export const enthalpyUnit = '\\frac{kJ}{mol}';
export const entropyUnit = '\\frac{J}{mol \\cdot K}';
export const gibsUnit = '\\frac{kJ}{mol}';

export const enthalpyUnitUnicode = 'kJ/mol';
export const entropyUnitUnicode = 'J/(mol \\cdot K)';
export const gibsUnitUnicode = 'kJ/mol';

const substancesToString = (substances: SubstanceUI[]): string => {
  const substancesString = substances.reduce(
    (string: string, { substance, coefficient }: SubstanceUI) => {
      if (substance?.name === '') return string;
      const coefficientString = coefficient === 1 ? '' : coefficient;
      return `${string} ${coefficientString}${substance?.name} (${substance?.form}) +`;
    },
    ''
  );

  return substancesString.substring(0, substancesString.length - 1);
};

export const makeMathJaxEquation = (
  reactans: SubstanceUI[],
  products: SubstanceUI[]
): string => {
  const reactantString = substancesToString(reactans);
  const productString = substancesToString(products);

  return reactantString + arrow + productString;
};

const sortSymbol = (target: SubstanceType): string => {
  switch (target) {
    case 'enthalpy':
      return `H^${theta}`;
    case 'entropy':
      return `S^${theta}`;
    case 'gibs':
      return `G^${theta}`;
    default:
      return '';
  }
};

export const sortUnit = (target: SubstanceType): string => {
  switch (target) {
    case 'enthalpy':
      return enthalpyUnit;
    case 'entropy':
      return entropyUnit;
    case 'gibs':
      return gibsUnit;
    default:
      return '';
  }
};

const substanceValuesToString = (
  substances: SubstanceUI[],
  target: 'enthalpy' | 'entropy' | 'gibs'
): string => {
  const substancesString = substances.reduce(
    (string: string, { substance, coefficient }: SubstanceUI) => {
      if (substance === null) return string;
      if (substance?.name === '') return string;
      const coefficientString = coefficient === 1 ? '' : coefficient;
      return `${string}${coefficientString} ${coefficientString && dot} ${
        substance[target] !== null ? substance[target]?.toFixed(3) : '?'
      } ${sortUnit(target)} +`;
    },
    ''
  );

  return substancesString.substring(0, substancesString.length - 1);
};

const substanceSymbolToString = (
  substances: SubstanceUI[],
  target: 'enthalpy' | 'entropy' | 'gibs'
): string => {
  const substancesString = substances.reduce(
    (string: string, { substance, coefficient }: SubstanceUI) => {
      const coefficientString = coefficient === 1 ? '' : coefficient;
      return `${string}${coefficientString} ${
        coefficientString && dot
      } ${sortSymbol(target)}({${substance?.name}}_{(${substance?.form})}) +`;
    },
    ''
  );
  return substancesString.substring(0, substancesString.length - 1);
};

export const makeMathJaxCalcEquation = (
  reactans: SubstanceUI[],
  products: SubstanceUI[],
  target: 'enthalpy' | 'entropy' | 'gibs',
  calcVals: CalculatedValues
): string => {
  const reactantString = substanceValuesToString(reactans, target);
  const productString = substanceValuesToString(products, target);

  return `${delta} ${sortSymbol(
    target
  )} = (${productString}) - (${reactantString}) = ${
    calcVals[target] === null ? '?' : calcVals[target]?.toFixed(3)
  } ${sortUnit(target)}`;
};

export const makeMathJaxSymbolEquation = (
  reactans: SubstanceUI[],
  products: SubstanceUI[],
  target: 'enthalpy' | 'entropy' | 'gibs'
): string => {
  const reactantString = substanceSymbolToString(reactans, target);
  const productString = substanceSymbolToString(products, target);

  const equationLatex = `${delta} ${sortSymbol(
    target
  )} = (${productString}) - (${reactantString})`;

  return equationLatex;
};

const sortMathMLSymbol = (target: SubstanceType) => {
  switch (target) {
    case 'enthalpy':
      return `
          <msup>
            <mi>&#x0394;H</mi>
            <mo>&#x03b8;</mo>
          </msup>
      `;
    case 'entropy':
      return `
        <msup>
          <mi>&#x0394;S</mi>
          <mo>&#x03b8;</mo>
        </msup>
      `;
    case 'gibs':
      return `
        <msup>
          <mi>&#x0394;G</mi>
          <mo>&#x03b8;</mo>
        </msup>
      `;
    default:
      return '';
  }
};

const sortMathMLUnit = (target: SubstanceType) => {
  switch (target) {
    case 'enthalpy':
      return `
          <mfrac>
            <mn>kJ</mn>
            <mo>mol</mo>
          </mfrac>
      `;
    case 'entropy':
      return `
        <mfrac>
          <mrow>
            <mn>J</mn>
          </mrow>
          <mrow>
            <mi>mol</mi>
            <mo>&#x22C5;</mo>
            <mi>K</mi>
          </mrow>
        </mfrac>
      `;
    case 'gibs':
      return `
        <mfrac>
          <mn>kJ</mn>
          <mo>mol</mo>
        </mfrac>
      `;
    default:
      return '';
  }
};

const extractSuperscript = (target: string): string => {
  const regex = new RegExp(/(?<=(\^\{))(.*?)(?=\})/, 'g');
  const superScript = regex.exec(target);
  if (superScript) return superScript[0];
  return '';
};

const extractSubscript = (target: string): string => {
  const regex = new RegExp(/(?<=(\_\{))(.*?)(?=\})/g);
  const subScript = regex.exec(target);
  if (!subScript) {
    const regexNoBrackets = new RegExp(/(?<=\_)[0-9]/g);
    const subScript2 = target.match(regexNoBrackets);
    if (subScript2) return subScript2[0];
    return '';
  }
  return subScript[0];
};

const extractName = (target: string): string => {
  const regex = new RegExp(/[A-Z][a-z]?/g);
  const result = target.match(regex);
  if (result) return result[0];
  return '';
};

const extractAtoms = (target: string): RegExpMatchArray | null => {
  const regex = new RegExp(
    /(([A-Z][a-z]|[A-Z])((\_\{.*?\})|(\_[0-9]))|(\^\{.*?\}))|([A-Z][a-z](\^\{.*?\}))|([A-Z][a-z]|[A-Z])|(\(.*?\)((\_\{.*?\})|(\_[0-9]))|(\^\{.*?\}))/g
  );
  return target.match(regex);
};

const latexToMathML = (subUi: SubstanceUI): string => {
  // Find substances
  // Segment their each atoms
  // Segment super and subscripts

  if (!subUi.substance) return '';
  const { substance } = subUi;
  const atoms = extractAtoms(substance.name) || [];

  const parsedAtoms = atoms.map((atom) => {
    const superScript = extractSuperscript(atom);
    const subScript = extractSubscript(atom);
    const name = extractName(atom);

    if (superScript !== '' && subScript !== '')
      return `
        <msup>
          <msub>
            <mi>${name}</mi>
            <mn>${subScript}</mn>
          </msub>
          <mi>${superScript}</mi>
        </msup>
      `;
    if (superScript === '' && subScript !== '')
      return `
        <msub>
          <mi>${name}</mi>
          <mn>${subScript}</mn>
        </msub>
      `;
    if (superScript !== '' && subScript === '')
      return `
        <msup>
          <mi>${name}</mi>
          <mo>${superScript}</mo>
        </msup>
      `;
    return `
      <mi>${name}</mi>
    `;
  });

  const resultString = parsedAtoms.reduce(
    (prev, mathMLObject) => prev + mathMLObject,
    ''
  );

  return resultString;
};

const numtoMathML = (subUI: SubstanceUI, target: SubstanceType): string => {
  if (!subUI?.substance) return '';
  const num = subUI.substance[target];
  const numIsNegative = num !== null && num < 0;
  const MathMLObj = `
      <mi>${numIsNegative ? '<mo>(</mo>' : ''}${num}</mi> ${sortMathMLUnit(
    target
  )} ${numIsNegative ? '<mo>)</mo>' : ''}
    `;
  return MathMLObj;
};

export const makeMathMLSymbolEquation = (
  reactants: SubstanceUI[],
  products: SubstanceUI[],
  target: SubstanceType
): string => {
  const parsedReactants = reactants.map((sub) => latexToMathML(sub));
  const parsedProducts = products.map((sub) => latexToMathML(sub));
  const thermoSymbolMathML = sortMathMLSymbol(target);

  const reactantsString = parsedReactants.reduce(
    (prev, mathMLObject, index) => {
      const sub = reactants[index].substance;
      if (sub === null) return '';
      const { coefficient } = reactants[index];
      const { form } = sub;

      return `${prev}${index !== 0 && '<mo>+</mo>'}${
        coefficient !== 1 && `<mo>${coefficient}</mo><mo>&#x22C5;</mo>`
      }${thermoSymbolMathML}<mo>(</mo>${mathMLObject}<mo>(</mo><mo>${form}</mo><mo>)</mo><mo>)</mo>`;
    },
    ''
  );

  const productsString = parsedProducts.reduce((prev, mathMLObject, index) => {
    const sub = products[index].substance;
    if (sub === null) return '';
    const { coefficient } = products[index];
    const { form } = sub;

    return `${prev}
            ${index !== 0 && '<mo>+</mo>'}
            ${coefficient !== 1 && `<mo>${coefficient}</mo><mo>&#x22C5;</mo>`}
            ${thermoSymbolMathML}<mo>(</mo>${mathMLObject}<mo>(</mo><mo>${form}</mo><mo>)</mo><mo>)</mo>`;
  }, '');
  const result = `
    <math style="font-style: italic" xmlns="http://www.w3.org/1998/Math/MathML">
      ${thermoSymbolMathML}
      <mo>=</mo>
      <mo>(</mo>
      ${productsString}
      <mo>)</mo>
      <mo>-</mo>
      <mo>(</mo>
      ${reactantsString}
      <mo>)</mo>
    </math>
  `;

  return result;
};

export const makeMathMLCalcEquation = (
  reactants: SubstanceUI[],
  products: SubstanceUI[],
  calcVals: CalculatedValues,
  target: SubstanceType
): string => {
  const parsedReactants = reactants.map((sub) => numtoMathML(sub, target));
  const parsedProducts = products.map((sub) => numtoMathML(sub, target));
  const thermoSymbolMathML = sortMathMLSymbol(target);

  const reactantsString = parsedReactants.reduce(
    (prev, mathMLObject, index) => {
      const sub = reactants[index].substance;
      if (sub === null) return '';
      const { coefficient } = reactants[index];

      return `${prev}${index !== 0 && '<mo>+</mo>'}${
        coefficient !== 1 && `<mo>${coefficient}</mo><mo>&#x22C5;</mo>`
      }${mathMLObject}`;
    },
    ''
  );

  const productsString = parsedProducts.reduce((prev, mathMLObject, index) => {
    const sub = products[index].substance;
    if (sub === null) return '';
    const { coefficient } = products[index];

    return `${prev}
            ${index !== 0 && '<mo>+</mo>'}
            ${coefficient !== 1 && `<mo>${coefficient}</mo><mo>&#x22C5;</mo>`}
            ${mathMLObject}`;
  }, '');
  const result = `
    <math style="font-style: italic" xmlns="http://www.w3.org/1998/Math/MathML">
      ${thermoSymbolMathML}
      <mo>=</mo>
      <mo>(</mo>
      ${productsString}
      <mo>)</mo>
      <mo>-</mo>
      <mo>(</mo>
      ${reactantsString}
      <mo>)</mo>
      <mo>=</mo>
      <mo>${calcVals[target]?.toFixed(2)}</mo>
      ${sortMathMLUnit(target)}
    </math>
  `;

  return result;
};
