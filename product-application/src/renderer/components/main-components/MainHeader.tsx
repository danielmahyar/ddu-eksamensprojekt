/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { GiChemicalDrop } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const MainHeader = () => {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <div className="p-2 h-14 flex-shrink-0 z-20 w-full flex items-center overflow-y-hidden scrollbar-thin scrollbar-track-discord-gray scrollbar-thumb-discord-dark overflow-x-scroll shadow bg-discord-light">
      {/* Header of Friends header */}
      <div className="px-4 flex items-center justify-center border-r border-discord-border mr-2 flex-shrink-0">
        <GiChemicalDrop color="#8E9297" className="mr-3" size={30} />
        <h2 className="font-bold text-white pointer-events-none ">Startside</h2>
      </div>
      <div className="flex items-center space-x-3 overflow-clip flex-shrink-0">
        <h2
          onClick={() => handleNav('/thermo/calculate')}
          role="button"
          tabIndex={0}
          className="font-semibold text-white px-2 rounded cursor-pointer transition-all bg-discord-dark hover:bg-discord-hover"
        >
          Termodynamik beregner
        </h2>
        <h2
          onClick={() => handleNav('/thermo/insert')}
          role="button"
          tabIndex={0}
          className="font-semibold text-white px-2 rounded cursor-pointer transition-all bg-discord-dark hover:bg-discord-hover"
        >
          Indsæt stoffer
        </h2>
        <h2
          onClick={() => handleNav('/molar-mass')}
          role="button"
          tabIndex={0}
          className="font-semibold text-white px-2 rounded cursor-pointer transition-all  bg-discord-dark hover:bg-discord-hover"
        >
          Molar Mass
        </h2>
      </div>
    </div>
  );
};

export default MainHeader;
