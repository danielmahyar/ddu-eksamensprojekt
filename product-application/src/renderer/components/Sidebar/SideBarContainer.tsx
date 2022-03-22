/* eslint-disable react/no-array-index-key */
import FeatureIcon from './FeatureIcon';
import StartIcon from './StartIcon';

const SideBarContainer = ({ routes }: any) => {
  return (
    <div className="h-full scrollbar-hide overflow-x-hidden z-50 bg-discord-dark w-[72px] relative flex-shrink-0">
      <div className="flex flex-col space-y-3  justify-center items-center p-2">
        <StartIcon />
        <div className="bg-discord-border w-[32px] h-[2px]" />
        {routes.map((route: any, index: number) => {
          if (!route?.renderable) return null;

          return (
            <FeatureIcon
              path={route?.defaultRoute || route.path}
              name={route.name}
              text={route.text}
              parentRoute={route?.defaultRoute ? route.path : ''}
              key={index}
              Icon={route.Icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SideBarContainer;
