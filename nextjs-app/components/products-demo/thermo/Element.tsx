/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { MdClear } from 'react-icons/md';

import SubstanceMenu from './SubstanceMenu';
import useClickOutside from '../../hooks/useClickOutside';

const Element = ({ item }: { item: any }) => {
  const { id, substance, chosen, type } = item;
  const [highlightBox, setHighlightBox] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>('');
  const setHighlight = useSetRecoilState(guideBoxHighligt);
  const [elementHighlight, setElementHighlight] =
    useRecoilState(guideBoxElement);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const elementRef = useRef<any>();
  const menuRef = useRef<any>();
  useClickOutside(elementRef, () => {
    setHighlight(false);
    setHighlightBox(false);
    setShowMenu(false);
  });

  useLayoutEffect(() => {
    elementRef.current.scrollIntoView({ behavior: 'smooth' });
    setHighlightBox(true);
  }, []);

  useEffect(() => {
    if (elementList[0].substance) return setInputName('');
  }, [elementList, setInputName]);

  useEffect(() => {
    if (showMenu !== true) return;

    menuRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [showMenu]);

  useEffect(() => {
    const isElement = elementHighlight !== null;
    const isLocalSubstance = substance !== null;

    if (isElement && isLocalSubstance) {
      setHighlight(true);
      setHighlightBox(elementHighlight._id === substance._id);
    }
  }, [elementHighlight, substance, setHighlightBox, setHighlight]);

  useEffect(() => {
    if (chosen && substance) return setElementHighlight({ ...substance });
  }, [chosen, setElementHighlight, substance]);

  const handleElementClick = () => {
    const isElement = elementHighlight !== null;
    const isLocalSubstance = substance !== null;
    setHighlightBox(true);
    elementRef.current.scrollIntoView({ behavior: 'smooth' });
    if (
      isElement &&
      isLocalSubstance &&
      elementHighlight?._id === substance?._id
    )
      return;
    setElementHighlight(substance && { ...substance });
  };

  const handleElementDelete = () => {
    const tempArray = elementList.filter((r) => r.id !== id);
    setElementList(tempArray);
    setElementHighlight(null);
  };

  const handleElementUpdate = (newElement: SubstanceUI) => {
    const tempArray = [...elementList];
    const queryIndex = elementList.findIndex((r) => r.id === id);
    tempArray[queryIndex] = newElement;
    setElementList(tempArray);
  };

  const handleSubstanceAdd = (substanceAdd: Substance) => {
    setShowMenu(false);

    handleElementUpdate({
      ...item,
      substance: substanceAdd,
      chosen: true,
    });
  };

  return (
    <div
      ref={elementRef}
      onClick={handleElementClick}
      role="none"
      className={`flex ${
        highlightBox ? 'border border-blue-500' : ''
      } relative w-full h-full overflow-hidden flex-shrink-0 group hover:bg-discord-hover px-4 pb-5 pt-8 rounded-lg`}
    >
      <MdClear
        onClick={handleElementDelete}
        size={15}
        className="hidden group-hover:flex items-center justify-center text-white absolute right-4 top-2 cursor-pointer hover:bg-discord-dark rounded-full h-6 w-6"
      />
      <div className="w-full h-full flex flex-col space-y-6 mb-6">
        <div className="flex flex-row h-full w-full space-x-3">
          <div className="flex items-center justify-center flex-shrink-0 aspect-square transition-all h-20 w-20 bg-discord-purple scale-100 hover:scale-105 rounded-full">
            <p className="font-bold text-xl">
              {substance &&
                substance.name.charAt(0).toUpperCase() +
                  substance.name.charAt(1)}
            </p>
          </div>
          <div className="flex flex-col w-full">
            <span className="uppercase mb-2 font-bold text-discord-text-highlight text-xs">
              Skriv stoffets navn
            </span>
            <div className="flex items-center group-scope">
              <input
                value={chosen && substance ? substance.name : inputName}
                placeholder="Navn"
                // onKeyDown={handleKeyDown}
                onChange={(e) => {
                  if (chosen) {
                    setInputName(e.target.value.toString());
                    setShowMenu(false);
                    handleElementUpdate({
                      ...item,
                      substance: null,
                      chosen: false,
                    });
                  } else {
                    setInputName(e.target.value.toString());
                    setShowMenu(true);
                  }
                }}
                type="text"
                className="bg-discord-gray w-full px-2 p-3 text-white transition-all duration-500 font-semibold rounded-l border-y border-l border-discord-dark outline-none group-scope-focus:border-blue-500"
              />
              <button
                onClick={() => setShowMenu(true)}
                type="button"
                className="w-20 px-2 py-3 font-semibold transition-all ease-in-out text-white opacity-100 bg-discord-purple border-r border-y border-discord-dark rounded-r hover:opacity-80"
              >
                Søg
              </button>
            </div>
          </div>
          <div ref={menuRef} />
          <div className="w-20">
            <span className="uppercase mb-2 font-bold text-discord-text-highlight text-xs">
              Koefficient
            </span>
            <input
              type="number"
              autoComplete="off"
              value={item?.coefficient}
              onChange={(e) =>
                handleElementUpdate({
                  ...item,
                  coefficient: e.target.valueAsNumber,
                })
              }
              name="coeffi"
              max="25"
              min="1"
              className="bg-discord-gray px-2 p-3 text-white w-full border rounded border-discord-dark transition-all duration-500 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {showMenu && (
          <div className="w-full h-full">
            <SubstanceMenu
              substanceName={inputName}
              handleSubstanceAdd={handleSubstanceAdd}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Element;
