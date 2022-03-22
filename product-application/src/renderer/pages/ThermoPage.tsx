import React, { useEffect, useState } from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import GuideBar from '../components/thermo-components/GuideBar';
import ThermoHeader from '../components/thermo-components/ThermoHeader';
import { setLastVisited } from '../electron-state/user-state';
import {
  editElement,
  guideBoxElement,
  products,
  reactants,
} from '../state/thermo-state';

export const ThermoHeaderContext = React.createContext({});

const ThermoPage = () => {
  // const [reactantsArray] = useRecoilState(reactants)
  // const [productsArray] = useRecoilState(products)
  const location = useLocation();
  const navigate = useNavigate();
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const resetReactants = useResetRecoilState(reactants);
  const resetProducts = useResetRecoilState(products);
  const resetElementHighlight = useResetRecoilState(guideBoxElement);
  const resetEditElement = useResetRecoilState(editElement);

  const resetAllState = () => {
    resetReactants();
    resetProducts();
    resetElementHighlight();
    resetEditElement();
  };

  const ThermoHeaderValue = {
    setHeaderTitle,
    headerTitle,
    resetAllState,
  };

  useEffect(() => {
    const today = new Date();
    setLastVisited({
      name: 'Thermodynamic values',
      route: '/thermo/calculate',
      time: today.getUTCMinutes().toString(),
    });
  }, []);

  useEffect(() => {
    if (location.pathname === '/thermo') {
      navigate('/thermo/calculate');
    }
  }, [location, navigate]);

  return (
    <ThermoHeaderContext.Provider value={ThermoHeaderValue}>
      <section className="flex w-full h-full">
        <GuideBar />

        <div className="flex flex-col w-full h-full bg-discord-gray overflow-hidden">
          <ThermoHeader />

          <Outlet />
        </div>
      </section>
    </ThermoHeaderContext.Provider>
  );
};

export default ThermoPage;
