/* eslint-disable import/no-cycle */
import MainPreviewBar from './MainPreviewBar';

const MainContentSelection = () => {
  return (
    <div className="p-4 pr-8 border-1 border-black space-y-2 w-full h-full z-0 bg-discord-light flex flex-col scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-discord-dark overflow-y-visible">
      <MainPreviewBar />
    </div>
  );
};
export default MainContentSelection;
