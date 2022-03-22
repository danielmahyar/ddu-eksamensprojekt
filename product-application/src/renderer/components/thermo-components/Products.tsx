import { useCallback, useEffect, useRef, useState } from 'react';
import Collapsible from 'react-collapsible';
import { BiUpArrow } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { products } from '../../state/thermo-state';
import { ChemicalForm, Substance, SubstanceUI } from '../../types/Substance';
import CustomElement from './CustomElement';
import Element from './Element';

const Products = () => {
  const [productsState, setReactants] = useRecoilState(products);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  let customCount = 0;

  const handleReactantAdd = useCallback(() => {
    const newElement: SubstanceUI = {
      id: uuidv4(),
      coefficient: 1,
      type: 'product',
      chosen: false,
      substance: null,
    };
    setReactants((prev) => [...prev, newElement]);
  }, [setReactants]);

  const handleReactantCustomAdd = useCallback(() => {
    const tempSubstance: Substance = {
      _id: uuidv4().toString(),
      enthalpy: 0,
      entropy: 0,
      gibs: 0,
      name: '',
      form: ChemicalForm.aquatic,
      author: 'Anonymous',
    };

    const newSubstanceUI: SubstanceUI = {
      id: uuidv4().toString(),
      coefficient: 1,
      substance: tempSubstance,
      chosen: true,
      type: 'product',
      specialUI: 'custom',
    };
    setReactants((prev) => [...prev, newSubstanceUI]);
  }, [setReactants]);

  return (
    <section className="p-4 md:p-2">
      <div className="border-b border-discord-border">
        <h1 className="font-bold text-white text-2xl mb-5 uppercase">
          Produkter
        </h1>
      </div>
      <div className="w-full flex items-center justify-center mt-2">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          type="button"
          className="bg-discord-purple rounded-full w-10 h-10 flex items-center justify-center transition-all text-white font-bold px-2 py-3 mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
        >
          <BiUpArrow
            className={`transform transition-all ease-in-out ${
              collapsed ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </button>
      </div>
      <Collapsible open={collapsed} trigger={<></>}>
        {productsState.map((product: any) => {
          if (product?.specialUI === 'custom') {
            customCount += 1;
            return (
              <CustomElement
                key={product.id}
                item={product}
                count={customCount}
              />
            );
          }
          return <Element key={product.id} item={product} />;
        })}

        <div className="h-full w-full flex space-x-2 mt-2">
          <button
            type="submit"
            onClick={handleReactantAdd}
            className="bg-discord-btn w-full transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
          >
            +
          </button>
          <button
            type="submit"
            onClick={handleReactantCustomAdd}
            className="bg-discord-btn w-56 transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
          >
            Brugerdefineret +
          </button>
        </div>
      </Collapsible>
    </section>
  );
};

export default Products;
