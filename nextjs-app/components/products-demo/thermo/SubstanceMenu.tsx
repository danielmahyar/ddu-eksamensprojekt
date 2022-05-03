/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useLayoutEffect, useState, useRef } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { ChemicalForm, guideBoxElement } from '../../../lib/atoms/thermo-state';
import { Substance } from '../../../lib/atoms/thermo-state';
import toast from 'react-hot-toast';
import { MathJax } from 'better-react-mathjax';

type PropsType = {
  substanceName: string;
  handleSubstanceAdd: (_: Substance) => void;
};

const SubstanceMenu = ({ substanceName, handleSubstanceAdd }: PropsType) => {
  const [substances, setSubstances] = useState<Substance[] | null>(null);
  const setElementHighlight = useSetRecoilState(guideBoxElement);
  const containerRef = useRef<any>();
  useLayoutEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useLayoutEffect(() => {
    setSubstances([
      {
        "_id": "55ec7a14-55fb-4a12-93cf-0d2229db4905",
        "name": "Ag^+",
        "enthalpy": 105.79,
        "entropy": 73.45,
        "gibs": 77.16,
        "author": "Anonymous",
        "form": ChemicalForm.aquatic,
        "approved": false,
        "source": {
          "title": "DATABOG",
          "authors": [
            "Erik Strandgaard Andersen",
            "Paul Jespersgaard",
            "Ove Grønbæk Østergaard"
          ],
          "publishers": [
            "F&K Forlaget"
          ],
          "site": "86-99",
          "sourceDate": {
            "yearMade": 2016,
            "yearRead": 2022
          }
        }
      },
      {
        "_id": "b6d9c4b7-8795-4e15-830e-f6181e74bfae",
        "name": "AgCl",
        "enthalpy": -127.01,
        "entropy": 96.25,
        "gibs": -109.86,
        "author": "Anonymous",
        "form": ChemicalForm.solid,
        "approved": true
      },
      {
        "_id": "55ec7a14-55fb-4a12-93cf-0d2229db4905",
        "name": "Cl^-",
        "enthalpy": -167.08,
        "entropy": 56.6,
        "gibs": -131.2,
        "author": "Anonymous",
        "form": ChemicalForm.aquatic,
        "approved": true,
        "source": {
          "title": "DATABOG",
          "authors": [
            "Erik Strandgaard Andersen",
            "Paul Jespersgaard",
            "Ove Grønbæk Østergaard"
          ],
          "publishers": [
            "F&K Forlaget"
          ],
          "site": "86-99",
          "sourceDate": {
            "yearMade": 2016,
            "yearRead": 2022
          }
        }
      }
    ])
  }, [setSubstances]);

  const addSubstance = (substance: Substance) => {
    setElementHighlight(substance);
    handleSubstanceAdd(substance);
  };

  const handleShowMessage = (message: string) => {
    toast.success(message);
  };

  return (
    <div
      ref={containerRef}
      className="max-h-52 w-full z-0 overflow-y-auto border rounded border-discord-border bg-discord-gray scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-discord-dark"
    >
      {substances &&
        substances.map((substance) => (
          <div
            key={uuidv4()}
            role="button"
            tabIndex={0}
            className="cursor-pointer group-scope flex items-center justify-between py-2 px-4 transition ease-in-out hover:bg-discord-light text-white"
            onClick={() => addSubstance(substance)}
          >
            <MathJax >{`\\( ${substance.name || " "}(${substance.form || " "}) \\)`}</MathJax>
            {substance?.approved ? (
              <div className="flex items-center justify-between">
                <p className="transition-all ease-in-out mr-2 opacity-0 group-scope-hover:opacity-75 text-green-500 font-bold">
                  Godkendt
                </p>
                <AiFillCheckCircle
                  color="green"
                  className="transition-all ease-in-out opacity-0 group-scope-hover:opacity-75"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="transition-all ease-in-out mr-2 opacity-0 group-scope-hover:opacity-75 text-red-500 font-bold">
                  Ikke godkendt
                </p>
                <BiErrorCircle
                  onMouseOver={() =>
                    handleShowMessage('This substance has not approved')
                  }
                  color="red"
                  className="transition-all ease-in-out opacity-0 group-scope-hover:opacity-75"
                />
              </div>
            )}
          </div>
        ))}
      {substances !== null && substances.length === 0 && (
        <div className="flex items-center justify-center py-2">
          <p className="transition-all ease-in-out mr-2 text-red-400 font-bold">
            Ingen stoffer fundet
          </p>
          <BiErrorCircle
            onMouseOver={() =>
              handleShowMessage('This substance has not approved')
            }
            color="red"
            className="transition-all ease-in-out"
          />
        </div>
      )}
    </div>
  );
};

export default SubstanceMenu;
