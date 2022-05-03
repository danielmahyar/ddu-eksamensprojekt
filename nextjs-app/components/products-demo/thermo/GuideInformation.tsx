import { MdClear } from 'react-icons/md';
import {
  enthalpyUnit,
  enthalpyUnitUnicode,
  entropyUnit,
  entropyUnitUnicode,
  gibsUnit,
  gibsUnitUnicode,
  Substance
} from '../../../lib/atoms/thermo-state';
import GuideCard from './GuideCard';
import { MathJax } from 'better-react-mathjax'

const GuideInformation = ({
  elementInformation,
  load,
  handleClear,
}: {
  elementInformation: Substance;
  load: boolean;
  handleClear: () => void;
}) => {
  const { enthalpy, gibs, entropy, form, name } = elementInformation;
  return (
    <div
      className={`h-full w-full transition-all ease-in-out px-2 space-y-2 ${
        load ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex items-center justify-between w-full text-white font-bold">
        <MathJax>{`\\( [${name} (${form})] \\)`}</MathJax>
        <MdClear
          onClick={handleClear}
          size={18}
          className="text-gray-300 font-bold mr-4 cursor-pointer transform transition-all rotate-0 hover:rotate-180"
        />
      </div>
      <GuideCard
        type="Entalpi"
        copyableUnit={enthalpyUnitUnicode}
        numVal={enthalpy}
        unit={enthalpyUnit}
      />
      <GuideCard
        type="Entropi"
        copyableUnit={entropyUnitUnicode}
        numVal={entropy}
        unit={entropyUnit}
      />
      <GuideCard
        type="Gibbs Energi"
        copyableUnit={gibsUnitUnicode}
        numVal={gibs}
        unit={gibsUnit}
      />

      {/* {'source' in elementInformation && <NavigatorFooter />} */}
    </div>
  );
};

export default GuideInformation;
