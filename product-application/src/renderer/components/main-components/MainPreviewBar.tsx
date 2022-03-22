/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-cycle
import { routes } from '../../App';
import MainPreviewCard from './MainPreviewCard';

const MainPreviewBar = () => {
  return (
    <div className="w-full h-auto">
      <h1 className=" text-discord-text-primary border-b font-semibold border-discord-border uppercase text-2xl mb-5">
        Core Features
      </h1>
      <div className="w-full p-4 h-auto  flex items-center justify-center bg-discord-dark rounded-xl space-x-3">
        {routes.map((route) => {
          if (!route?.renderable) return null;
          return <MainPreviewCard key={route.path} route={route} />;
        })}
      </div>
    </div>
  );
};

export default MainPreviewBar;
