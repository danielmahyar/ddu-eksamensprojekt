import { atom } from 'recoil'
import { v4 as uuidv4 } from 'uuid';
import { Substance, SubstanceUI } from '../types/Substance';

export const reactants = atom<SubstanceUI[]>({
	key: 'reactants',
	default: [
		{
			id: uuidv4(),
			type: "reactant",
			chosen: false,
			coefficient: 1,
			substance: null
		}
	]
})

export const products = atom<SubstanceUI[]>({
	key: 'products',
	default: [
		{
			id: uuidv4(),
			type: "product",
			chosen: false,
			coefficient: 1,
			substance: null
		}
	]
})


export const editElement = atom<Substance | null>({
	key: 'editElement',
	default: null
})

export const guideBoxHighligt = atom({
	key: 'guideBoxHighligt',
	default: false
})

export const guideBoxElement = atom<Substance | null>({
	key: 'guideBoxElement',
	default: null
})