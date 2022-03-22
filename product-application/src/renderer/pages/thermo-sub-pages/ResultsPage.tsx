/* eslint-disable consistent-return */
import { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { useRecoilValue } from 'recoil';
import TeX from '@matejmazur/react-katex';
import { ThermoDynamicForm } from 'renderer/types/Substance';
import SiteContainer from '../../components/thermo-components/SiteContainer';
import { ThermoHeaderContext } from '../ThermoPage';
import ResultCard from '../../components/thermo-components/ResultCard';
import { products, reactants } from '../../state/thermo-state';
import { fetchCalculation } from '../../helper-functions/substance-fetch';
import EquationCard from '../../components/thermo-components/EquationCard';
import Table from '../../components/thermo-components/Table';
import CommentResults from '../../components/thermo-components/CommentResults';
import {
  enthalpyUnit,
  entropyUnit,
  gibsUnit,
  makeMathJaxEquation,
} from '../../helper-functions/mathjax-syntax';
import SymbolResultCard from '../../components/thermo-components/SymbolResultCard';

const TypesArray: ThermoDynamicForm[] = ['enthalpy', 'entropy', 'gibs'];

const ResultsPage = () => {
  const { setHeaderTitle }: any = useContext(ThermoHeaderContext);
  const reactantsArray = useRecoilValue(reactants);
  const productsArray = useRecoilValue(products);
  const navigate = useNavigate();
  const calcVals = useMemo(
    () => fetchCalculation({ productsArray, reactantsArray }),
    [productsArray, reactantsArray]
  );
  const { enthalpy, entropy, gibs } = calcVals;

  useEffect(() => {
    if (
      reactantsArray[0].substance === null ||
      productsArray[0].substance === null
    )
      return navigate('/thermo/calculate', { state: 'replace' });
    setHeaderTitle('Resultater');
  }, [setHeaderTitle, navigate, reactantsArray, productsArray]);

  const reactantsTable = useMemo(
    () =>
      reactantsArray.map(({ substance }) => ({
        name: `${substance?.name}(${substance?.form})`,
        enthalpy: `${substance?.enthalpy ?? 'ingen værdi'} kJ/mol`,
        entropy: `${substance?.entropy ?? 'ingen værdi'} J/(mol·K)`,
        gibs: `${substance?.gibs ?? 'ingen værdi'} kJ/mol`,
      })),
    [reactantsArray]
  );

  const productsTable = useMemo(
    () =>
      productsArray.map(({ substance }) => ({
        name: `${substance?.name}(${substance?.form})`,
        enthalpy: `${substance?.enthalpy ?? 'ingen værdi'} kJ/mol`,
        entropy: `${substance?.entropy ?? 'ingen værdi'} J/(mol·K)`,
        gibs: `${substance?.gibs ?? 'ingen værdi'} kJ/mol`,
      })),
    [productsArray]
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Navn',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Entalpi',
        accessor: 'enthalpy',
      },
      {
        Header: 'Entropi',
        accessor: 'entropy',
      },
      {
        Header: 'Gibbs Energi',
        accessor: 'gibs',
      },
    ],
    []
  );

  const handleGoBack = () => {
    navigate('/thermo/calculate', { state: 'back' });
  };

  return (
    <SiteContainer>
      <div className="w-full mb-2">
        <button
          onClick={handleGoBack}
          type="button"
          className="flex items-center justify-center h-10 w-10 bg-discord-purple rounded-full"
        >
          <TiArrowBack size={20} color="white" />
        </button>
      </div>
      <div className="w-full h-auto mb-4 space-y-6 overflow-x-hidden">
        <div className="bg-discord-dark py-6 px-4 rounded w-full h-auto">
          <h1 className="text-white text-xl font-bold mb-2">Reaktionsskema</h1>
          <div className="bg-discord-gray rounded-lg p-4 text-white">
            <TeX>{makeMathJaxEquation(reactantsArray, productsArray)}</TeX>
          </div>
        </div>

        <div className="bg-discord-dark py-6 px-4 rounded w-full h-auto">
          <h1 className="text-white text-xl font-bold mb-2">
            Beregninger i symboler
          </h1>
          <div className="bg-discord-gray rounded-lg ">
            {TypesArray.map((type) => {
              return <SymbolResultCard key={type} target={type} />;
            })}
          </div>
        </div>

        <div className="bg-discord-dark py-6 px-4 rounded w-full h-auto overflow-x-auto">
          <h1 className="text-white text-xl font-bold mb-2">Udregninger</h1>
          <div className="bg-discord-gray rounded-lg">
            {TypesArray.map((type) => {
              return (
                <EquationCard key={type} type={type} calcVals={calcVals} />
              );
            })}
          </div>
        </div>

        <div className="bg-discord-dark py-6 px-4 rounded w-full h-auto">
          <h1 className="text-white text-xl font-bold mb-2">Beregninger</h1>
          <div className="bg-discord-gray rounded-lg ">
            <ResultCard
              type="Entalpi"
              numVal={enthalpy}
              unit={enthalpyUnit}
              chemicalSignature={'\\Delta H^{\\theta}'}
            />
            <ResultCard
              type="Entropi"
              numVal={entropy}
              unit={entropyUnit}
              chemicalSignature={'\\Delta S^{\\theta}'}
            />
            <ResultCard
              type="Gibbs Energi"
              numVal={gibs}
              unit={gibsUnit}
              chemicalSignature={'\\Delta G^{\\theta}'}
            />
          </div>
        </div>

        <CommentResults calcVals={calcVals} />

        <div className="bg-discord-dark py-6 px-4 rounded w-full h-auto overflow-x-auto">
          <h1 className="text-white text-xl font-bold mb-2">
            Reaktanternes værdier
          </h1>
          <Table columns={columns} data={reactantsTable} />
        </div>

        <div className="bg-discord-dark py-6 px-4 rounded w-full h-auto overflow-x-auto">
          <h1 className="text-white text-xl font-bold mb-2">
            Produkternes værdier
          </h1>
          <Table columns={columns} data={productsTable} />
        </div>
      </div>
    </SiteContainer>
  );
};

export default ResultsPage;
