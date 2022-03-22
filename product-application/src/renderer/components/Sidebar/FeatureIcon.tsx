import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const FeatureIcon = ({ path, parentRoute, text, Icon }: any) => {
  const location = useLocation();

  const handleLocationStyle = (): string => {
    const formattedRoute = location.pathname.substring(
      location.pathname.lastIndexOf('#') + 1,
      location.pathname.lastIndexOf('/')
    );
    if (!parentRoute)
      return location.pathname === path
        ? 'bg-discord-hover rounded-2xl'
        : 'bg-discord-active rounded-3xl';
    return parentRoute === formattedRoute || location.pathname === path
      ? 'bg-discord-hover rounded-2xl'
      : 'bg-discord-active rounded-3xl';
  };

  const handleActiveLocation = (): string => {
    const formattedRoute = location.pathname.substring(
      location.pathname.lastIndexOf('#') + 1,
      location.pathname.lastIndexOf('/')
    );
    if (!parentRoute) return location.pathname === path ? 'h-6' : '';
    return parentRoute === formattedRoute || location.pathname === path
      ? 'h-6'
      : '';
  };

  return (
    <Link
      to={path}
      className={`h-12 w-12 ${handleLocationStyle()} items-center justify-center transition-all relative cursor-pointer z-20 group hover:rounded-2xl`}
    >
      <span className="absolute rounded top-1.5 z-50 -right-16 text-white p-2 font-bold bg-discord-dark transform scale-0 transition-all ease-in origin-left group-hover:scale-100">
        Test
      </span>
      <div className="flex h-full w-full relative items-center justify-center">
        <span className="absolute w-auto p-4 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-discord-dark text-sm font-bold transition-all scale-0 duration-100 origin-left group-hover:scale-100">
          {text}
        </span>
        <span
          className={`h-4 w-4 absolute transition-all duration-100 ease-in-out transform rounded-full bg-white group-hover:rounded ${handleActiveLocation()} group-hover:h-6 -left-6 `}
        />
        {/* <p className="font-bold text-white">{name}</p> */}
        <Icon />
      </div>
    </Link>
  );
};

export default FeatureIcon;
