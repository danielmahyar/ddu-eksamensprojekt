/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { BsCalculator, BsSearch } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import {
  MdClear,
  MdFullscreen,
  MdOutlineMinimize,
  MdOutlineSettings,
} from 'react-icons/md';
import { useState } from 'react';
import { globalModal } from './state/modal-state';
import { errorNotification } from './state/error-state';
import { globalNotifcation } from './state/notification-state';
import SideBarContainer from './components/Sidebar/SideBarContainer';
import MainPage from './pages/MainPage';
import ThermoPage from './pages/ThermoPage';
import Notifcation from './components/global/Notifcation';
import Error from './components/global/Error';
import CalculatePage from './pages/thermo-sub-pages/CalculatePage';
import ElementEditPage from './pages/thermo-sub-pages/ElementEditPage';
import ElementInsertPage from './pages/thermo-sub-pages/ElementInsertPage';
import PageNotFound from './pages/PageNotFound';
import ResultsPage from './pages/thermo-sub-pages/ResultsPage';
import Modal from './components/global/Modal';
import FindPage from './pages/FindPage';
import SettingsPage from './pages/SettingsPage';

const { ipcRenderer } = window.app_cycle;

export const routes = [
  {
    exact: true,
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/thermo',
    renderable: true,
    name: 'TH',
    text: 'Beregner',
    Icon: () => <BsCalculator className="text-discord-purple" size={20} />,
    element: <ThermoPage />,
    defaultRoute: '/thermo/calculate',
    sub_routes: [
      {
        path: '/thermo/calculate',
        element: <CalculatePage />,
      },
      {
        path: '/thermo/results',
        element: <ResultsPage />,
      },
      {
        path: '/thermo/editor',
        element: <ElementEditPage />,
      },
      {
        path: '/thermo/insert',
        element: <ElementInsertPage />,
      },
      {
        path: '/thermo/*',
        element: <CalculatePage />,
      },
    ],
  },
  {
    path: '/find-substance',
    renderable: true,
    name: 'FS',
    text: 'Find et stof',
    Icon: () => <BsSearch className="text-discord-purple" size={20} />,
    element: <FindPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
];

const App = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const message = useRecoilValue(globalNotifcation);
  const error = useRecoilValue(errorNotification);
  const modal = useRecoilValue(globalModal);

  const closeWindow = () => {
    ipcRenderer.invoke('close_window');
  };

  const fullScreen = () => {
    ipcRenderer.invoke('fullscreen_window');
  };

  const minimizeWindow = () => {
    ipcRenderer.invoke('minimize_window');
  };

  const handleSettingsShow = () => {
    setShowSettings((prev) => !prev);
  };

  return (
    <div className="h-screen flex flex-col bg-discord-dark select-none relative z-0">
      {modal.show && <Modal message={modal.message} />}
      {message && <Notifcation message={message} />}

      <div className="draggable w-full h-8 flex items-center flex-shrink-0 justify-start pl-2">
        <p className="text-discord-text-highlight font-bold w-full ">
          AmfoLabs
        </p>
        <div className="w-full h-full flex items-center justify-end">
          <button
            type="button"
            onClick={handleSettingsShow}
            className="text-white transition-all ease-in-out group titlebar-button hover:bg-discord-hover h-full px-4"
          >
            <MdOutlineSettings
              size={18}
              className="transition-all ease-in-out transform rotate-0 group-hover:rotate-90"
              color={showSettings ? '#5865F2' : 'white'}
            />
          </button>
          <button
            type="button"
            onClick={minimizeWindow}
            className="text-white transition-all ease-in-out titlebar-button hover:bg-discord-hover h-full px-4"
          >
            <MdOutlineMinimize color="white" />
          </button>
          <button
            type="button"
            onClick={fullScreen}
            className="text-white transition-all ease-in-out titlebar-button hover:bg-discord-hover flex items-center h-full px-4"
          >
            <MdFullscreen color="white" />
          </button>
          <button
            type="button"
            onClick={closeWindow}
            className="text-white transition-all ease-in-out titlebar-button hover:bg-discord-red cursor-pointer px-4 h-full "
          >
            <MdClear color="white" />
          </button>
        </div>
      </div>
      {!showSettings && (
        <main
          className={`transition-all ease-out h-full flex bg-discord-dark  overflow-y-hidden relative ${
            modal.show === true ? 'blur' : ''
          }`}
        >
          <SideBarContainer routes={routes} />
          <section className="h-full w-full flex flex-col">
            {error.message && (
              <Error message={error.message} color={error.color} />
            )}
            <Routes>
              {routes.map((route, index: number) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.sub_routes &&
                    route.sub_routes.map((subRoute, subIndex: number) => (
                      <Route
                        key={subIndex}
                        path={subRoute.path}
                        element={subRoute.element}
                      />
                    ))}
                </Route>
              ))}
            </Routes>
          </section>
        </main>
      )}

      {showSettings && <SettingsPage />}
    </div>
  );
};

export default App;
