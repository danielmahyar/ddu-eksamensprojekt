import { createContext } from 'react'
import { ItemType } from '../../types/ItemType'

type CartContextType = {
	cartItems: ItemType[]
	addCartItem: (item: ItemType) => void
	deleteCartItem: (item: ItemType) => void
}

export const CartContext = createContext<CartContextType>({
	cartItems: [],
	addCartItem: (item: ItemType) => {},
	deleteCartItem: (item: ItemType) => {}
})