import React, { forwardRef, useState } from 'react'
import { BrowserView } from 'react-device-detect'
import { MdClear } from 'react-icons/md'
import Reactants from './Reactants'

const ElectronThermoView = forwardRef((props, ref) => {
	const [state, setState] = useState(1)
	return (
		<article ref={ref as any} className="flex h-screen">
			<aside
				className={`h-full w-72 transition-all duration-700 ease-in-out flex-shrink-0 relative z-10 bg-primary  flex flex-col border-discord-border`}
			>
				<div className="h-14 w-full mb-2 flex items-center shadow flex-shrink-0 p-2">
					<h1 className="text-xl font-bold text-white ml-2">
						Information om stof
					</h1>
				</div>
				<div className="p-2 overflow-y-auto  h-full w-full scrollbar-thin scrollbar-track-discord-gray scrollbar-thumb-discord-dark">
					<div className="p-0 h-full ">
						<div
							className="flex relative group cursor-pointer flex-col text-white transition-all ease-in-out justify-center w-full h-20  rounded px-4 border border-discord-light hover:border-blue-500"
							role="button"
							tabIndex={0}
						>
							<h3 className="text-discord-text-primary font-bold uppercase">Entalpi</h3>

							<div className="flex items-center justify-center">
								<p>Stoffet har ingen dwadaw</p>
							</div>
						</div>
						<div
							className="flex relative group cursor-pointer flex-col text-white transition-all ease-in-out justify-center w-full h-20  rounded px-4 border border-discord-light hover:border-blue-500"
							role="button"
							tabIndex={0}
						>
							<h3 className="text-discord-text-primary font-bold uppercase">Entalpi</h3>

							<div className="flex items-center justify-center">
								<p>Stoffet har ingen dwadaw</p>
							</div>
						</div>
						<div
							className="flex relative group cursor-pointer flex-col text-white transition-all ease-in-out justify-center w-full h-20  rounded px-4 border border-discord-light hover:border-blue-500"
							role="button"
							tabIndex={0}
						>
							<h3 className="text-discord-text-primary font-bold uppercase">Entalpi</h3>

							<div className="flex items-center justify-center">
								<p>Stoffet har ingen dwadaw</p>
							</div>
						</div>

					</div>
				</div>

			</aside>
			<div className="p-6 pr-8 w-full h-full z-0 bg-primary flex flex-col scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-discord-dark overflow-y-visible">
				<div className="mb-10 border-b border-discord-border flex items-center justify-between">
					<h1 className="font-semibold mb-2 text-gray-300 text-xl rounded uppercase">
						Beregn termodynamik
					</h1>
					<MdClear
						size={18}
						className="text-gray-300 font-bold mr-4 cursor-pointer transform transition-all rotate-0 hover:rotate-180"
					/>
				</div>

				{state === 1 && (
					<div className="flex flex-col ">
						<Reactants />
						<Reactants />

						{/* {canGenerateReactant && canGenerateProduct && ( */}
						<>
							<h1 className="text-2xl font-bold text-white uppercase border-b border-discord-border mb-5 pb-2">
								Fortsæt
							</h1>
							<button
								className="bg-[#5865F2] transition-all text-white font-bold px-2 py-2 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
								type="button"
							>
								<p>Vil du se reaktionen?</p>
							</button>
							<button
								type="submit"
								onClick={() => setState(2)}
								className="bg-[#5865F2] transition-all text-white font-bold px-2 py-3 rounded mb-2 hover:opacity-80 disabled:bg-discord-gray border-discord-purple disabled:border disabled:hover:opacity-100"
							>
								Beregn
							</button>
						</>
						{/* )} */}
					</div>
				)}

				{state === 2 && (
					<p>Results</p>
				)}

			</div>
		</article>
	)
})

export default ElectronThermoView