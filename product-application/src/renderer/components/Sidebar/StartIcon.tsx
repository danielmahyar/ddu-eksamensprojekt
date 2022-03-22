import { Link } from 'react-router-dom';
import vocast from '../../../../assets/AmfoLabsBig.svg';

const StartIcon = () => {
  return (
    <Link
      to="/"
      className="transform transition-all relative cursor-pointer rounded-3xl hover:bg-discord-purple bg-discord-gray group hover:rounded-2xl"
    >
      <span className="absolute rounded top-1.5 z-50 -right-20 text-white p-2 font-bold bg-discord-dark transform scale-0 transition-all ease-in origin-left group-hover:scale-100">
        Home
      </span>
      <img
        src={vocast}
        className="transform transition-all relative cursor-pointer rounded-3xl hover:bg-discord-purple bg-discord-gray group hover:rounded-2xl"
        height="100%"
        width="100%"
        alt=""
      />
    </Link>
  );
};

export default StartIcon;
