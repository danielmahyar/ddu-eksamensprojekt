/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { BsCalculator, BsSearch } from 'react-icons/bs';
import { GiChemicalDrop } from 'react-icons/gi';
import { MdClear } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const MainPreviewCard = ({ route }: any) => {
  const navigate = useNavigate();

  const IconConfig = {
    size: 35,
    className:
      'text-discord-purple transform rotate-0 transition-all ease-in-out group-hover:rotate-45',
  };

  const Icon = () => {
    switch (route.path) {
      case '/thermo':
        return <BsCalculator {...IconConfig} />;
      case '/find-substance':
        return <BsSearch {...IconConfig} />;
      case '/molar-mass':
        return <GiChemicalDrop {...IconConfig} />;
      default:
        return <MdClear {...IconConfig} />;
    }
  };

  const text = () => {
    switch (route.path) {
      case '/thermo':
        return 'Thermodynamic Calculations';
      case '/find-substance':
        return 'Find a specific substance';
      case '/molar-mass':
        return 'Calculate Molar Mass';
      default:
        return <MdClear {...IconConfig} />;
    }
  };

  const handleClick = () => {
    navigate(route?.defaultRoute || route.path);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className="h-56 w-36 border-black border-1 bg-discord-gray cursor-pointer transition-all rounded-2xl group hover:bg-discord-hover hover:rounded-3xl"
    >
      <div className="w-full whitespace-pre-wrap h-full flex flex-col space-y-2 items-center justify-center">
        <Icon />
        <p className="font-bold text-white text-center">{text()}</p>
      </div>
    </div>
  );
};

export default MainPreviewCard;
