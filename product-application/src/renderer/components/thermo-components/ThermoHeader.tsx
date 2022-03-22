import { GiChemicalDrop } from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';

const ThermoHeader = () => {
  const location = useLocation();

  const highlight = (path: string): string => {
    return location.pathname === path ? 'bg-discord-purple' : 'bg-discord-dark';
  };
  return (
    <div className="p-2 h-14 flex-shrink-0 z-20 w-full flex items-center overflow-y-hidden scrollbar-thin scrollbar-track-discord-gray scrollbar-thumb-discord-dark overflow-x-scroll shadow bg-discord-light">
      {/* Header of Friends header */}
      <div className="px-4 flex items-center justify-center border-r border-discord-border mr-2 flex-shrink-0">
        <GiChemicalDrop color="#8E9297" className="mr-3" size={30} />
        <h2 className="font-bold text-white pointer-events-none ">
          Termodynamik
        </h2>
      </div>
      <div className="flex items-center space-x-3 overflow-clip flex-shrink-0">
        <Link
          to="/thermo/calculate"
          className={`font-semibold text-white px-2 rounded cursor-pointer transition-all ${highlight(
            '/thermo/calculate'
          )} hover:bg-discord-hover`}
        >
          Beregner
        </Link>
        <Link
          to="/thermo/insert"
          className={`font-semibold text-white px-2 rounded cursor-pointer transition-all ${highlight(
            '/thermo/insert'
          )} hover:bg-discord-hover`}
        >
          Indsæt yderligere stoffer
        </Link>
        <Link
          to="/thermo/editor"
          className={`font-semibold text-white px-2 rounded cursor-pointer transition-all  ${highlight(
            '/thermo/editor'
          )} hover:bg-discord-hover`}
        >
          Redigering
        </Link>
      </div>
    </div>
  );
};

export default ThermoHeader;
