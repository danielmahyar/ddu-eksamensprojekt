const SiteContainer = ({ children }: any) => {
  return (
    <div className="p-6 pr-8 w-full h-full z-0 bg-discord-light flex flex-col scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-discord-dark overflow-y-visible">
      <div className=" border-b mb-2 border-discord-border flex items-center justify-between">
        <h1 className="font-semibold mb-4 text-gray-300 text-xl rounded uppercase">
          Find stof
        </h1>
      </div>

      <div className="flex flex-col ">{children}</div>
    </div>
  );
};

export default SiteContainer;
