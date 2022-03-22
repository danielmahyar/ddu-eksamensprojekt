import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import GenerateView from '../../components/thermo-components/GenerateView';
import Products from '../../components/thermo-components/Products';
import Reactions from '../../components/thermo-components/Reactions';
import SiteContainer from '../../components/thermo-components/SiteContainer';
import { makeMathJaxEquation } from '../../helper-functions/mathjax-syntax';
import { products, reactants } from '../../state/thermo-state';
import { ThermoHeaderContext } from '../ThermoPage';

const CalculatePage = () => {
  const reactantsArray = useRecoilValue(reactants);
  const productsArray = useRecoilValue(products);
  const [generateView, setGenerateView] = useState<boolean>(false);
  const { setHeaderTitle }: any = useContext(ThermoHeaderContext);
  const navigate = useNavigate();
  const canGenerateReactant = useMemo(
    () =>
      reactantsArray.length !== 0 &&
      reactantsArray.every(
        (reactant) => 'substance' in reactant && reactant.chosen
      ),
    [reactantsArray]
  );
  const canGenerateProduct = useMemo(
    () =>
      productsArray.length !== 0 &&
      productsArray.every(
        (product) => 'substance' in product && product.chosen
      ),
    [productsArray]
  );

  useEffect(() => {
    setHeaderTitle('Beregn termodynamiske egenskaber');
  }, [setHeaderTitle]);

  const handleSubmitClick = (e: any) => {
    e.preventDefault();

    navigate('/thermo/results');
  };
  return (
    <SiteContainer>
      <Reactions />
      <Products />

      {canGenerateReactant && canGenerateProduct && (
        <>
          <h1 className="text-2xl font-bold text-white uppercase border-b border-discord-border mb-5 pb-2">
            Fortsæt
          </h1>
          <button
            onClick={() => setGenerateView(true)}
            className="bg-discord-purple transition-all text-white font-bold px-2 py-2 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
            type="button"
          >
            {generateView ? (
              <GenerateView
                formula={makeMathJaxEquation(reactantsArray, productsArray)}
              />
            ) : (
              <p>Vil du se reaktionen?</p>
            )}
          </button>
          <button
            type="submit"
            onClick={handleSubmitClick}
            className="bg-discord-purple transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
          >
            Beregn
          </button>
        </>
      )}
    </SiteContainer>
  );
};

export default CalculatePage;
