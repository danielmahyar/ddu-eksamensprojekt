import { useContext } from 'react';
import { MdClear } from 'react-icons/md';
import { ThermoHeaderContext } from '../../pages/ThermoPage';
import jolly from '../../../../assets/jolly.png';

const SiteContainer = ({ children }: any) => {
  const { headerTitle, resetAllState }: any = useContext(ThermoHeaderContext);

  return (
    <div className="p-6 pr-8 w-full h-full z-0 bg-discord-light flex flex-col scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-discord-dark overflow-y-visible">
      <div className="mb-10 border-b border-discord-border flex items-center justify-between">
        <h1 className="font-semibold mb-2 text-gray-300 text-xl rounded uppercase">
          {headerTitle}
        </h1>
        <img
          src={jolly}
          alt="Jolly"
          className="h-8 transition-all opacity-0 hover:opacity-100"
        />
        <MdClear
          onClick={() => resetAllState()}
          size={18}
          className="text-gray-300 font-bold mr-4 cursor-pointer transform transition-all rotate-0 hover:rotate-180"
        />
      </div>

      <div className="flex flex-col ">{children}</div>
    </div>
  );
};

export default SiteContainer;
