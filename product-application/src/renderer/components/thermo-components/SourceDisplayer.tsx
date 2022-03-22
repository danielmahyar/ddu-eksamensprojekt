import { SourceBook } from 'renderer/types/Substance';

type Props = {
  source: SourceBook;
};

const SourceDisplayer = ({ source }: Props) => {
  const authorsString: string =
    'authors' in source ? source.authors.join(',') : '';
  return (
    <div className="flex justify-between items-center px-5 h-20 bg-discord-user flex-shrink-0">
      <div className="flex flex-col">
        <div className="flex w-36 space-x-2">
          <h2 className="text-white font-bold truncate">{source.title}</h2>
          <p className="text-white font-bold">[{source.sourceDate.yearMade}]</p>
        </div>
        <div className="flex w-36">
          <p className="text-discord-text-secondary text-sm truncate">
            {authorsString}
          </p>
        </div>
      </div>
      <span className="text-white font-bold h-12 w-auto px-2 bg-discord-purple flex items-center justify-center rounded-full">
        s. {source.site || 0}
      </span>
    </div>
  );
};

export default SourceDisplayer;
