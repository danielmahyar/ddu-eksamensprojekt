import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React, { forwardRef, useMemo, useState } from 'react'
import { BrowserView } from 'react-device-detect'
import { MdClear } from 'react-icons/md'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { editElement, fetchCalculation, guideBoxElement, makeMathJaxEquation, products, reactants, ThermoDynamicForm } from '../../../lib/atoms/thermo-state'
import EquationCard from './EquationCard'
import GenerateView from './GenerateView'
import GuideBar from './GuideBar'
import Products from './Products'
import Reactants from './Reactants'



const TypesArray: ThermoDynamicForm[] = ['enthalpy', 'entropy', 'gibs'];

const ElectronThermoView = forwardRef((props, ref: any) => {
	const [state, setState] = useState(1)
	const reactantsArray = useRecoilValue(reactants);
	const productsArray = useRecoilValue(products);
	const [generateView, setGenerateView] = useState<boolean>(false);
	const resetReactants = useResetRecoilState(reactants);
	const resetProducts = useResetRecoilState(products);
	const resetElementHighlight = useResetRecoilState(guideBoxElement);
	const resetEditElement = useResetRecoilState(editElement);
   
	const resetAllState = () => {
	  resetReactants();
	  resetProducts();
	  resetElementHighlight();
	  resetEditElement();
	  setState(1)
	};

	const calcVals = useMemo(
		() => fetchCalculation({ productsArray, reactantsArray }),
		[productsArray, reactantsArray]
	);

	const canGenerateReactant = useMemo(
		() =>
			reactantsArray.length !== 0 &&
			reactantsArray.every(
				(reactant) => 'substance' in reactant && reactant.chosen
			),
		[reactantsArray]
	);
	const canGenerateProduct = useMemo(
		() =>
			productsArray.length !== 0 &&
			productsArray.every(
				(product) => 'substance' in product && product.chosen
			),
		[productsArray]
	);
	return (
		<MathJaxContext>
			<article ref={ref} className="flex h-screen">
				<GuideBar />
				<div className="p-6 pr-8 w-full h-full z-0 bg-discord-light flex flex-col scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-discord-dark overflow-y-visible">
					<div className="mb-10 border-b border-discord-border flex items-center justify-between">
						<h1 className="font-semibold mb-2 text-gray-300 text-xl rounded uppercase">
							Beregn termodynamik
						</h1>
						<MdClear
							size={18}
							onClick={resetAllState}
							className="text-gray-300 font-bold mr-4 cursor-pointer transform transition-all rotate-0 hover:rotate-180"
						/>
					</div>

					{state === 1 && (
						<div className="flex flex-col ">
							<Reactants />
							<Products />

							{canGenerateReactant && canGenerateProduct && (
								<>
									<h1 className="text-2xl font-bold text-white uppercase border-b border-discord-border mb-5 pb-2">
										Fortsæt
									</h1>
									<button
										className="bg-discord-purple transition-all text-white font-bold px-2 py-2 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
										onClick={() => setGenerateView(true)}
										type="button"
									>
										{generateView ? (
											<GenerateView
												formula={makeMathJaxEquation(reactantsArray, productsArray)}
											/>
										) : (
											<p>Vil du se reaktionen?</p>
										)}
									</button>
									<button
										type="submit"
										onClick={() => setState(2)}
										className="bg-[#5865F2] transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
									>
										Beregn
									</button>
								</>
							)}
						</div>
					)}

					{state === 2 && (
						<div className="bg-discord-dark py-6 px-4 rounded w-full h-auto overflow-x-auto">
							<h1 className="text-white text-xl font-bold mb-2">Udregninger</h1>
							<div className="bg-discord-gray rounded-lg">
								{TypesArray.map((type) => {
									return (
										<EquationCard key={type} type={type} calcVals={calcVals} />
									);
								})}
							</div>
						</div>
					)}

				</div>
			</article>
		</MathJaxContext>
	)
})

export default ElectronThermoView