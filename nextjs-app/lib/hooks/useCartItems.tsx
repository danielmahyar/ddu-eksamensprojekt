import {  useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ItemType } from "../../types/ItemType";
import { addCartItemToStorage, deleteCartItemToStorage, getAllCartItems } from "../helper-functions/cart-storage";

export function useCartItems() {
	const [cartItems, setCartItems] = useState<ItemType[]>([])
	
	useEffect(() => {
		setCartItems(getAllCartItems() || [])
	}, [])

	const addCartItem = 
		(item: ItemType) => {
			toast.success("Added cart item to cart")
			addCartItemToStorage(item)
			setCartItems(getAllCartItems())
		}
	

	const deleteCartItem =
		(item: ItemType) => {
			toast.success("Removed Cart Item")
			deleteCartItemToStorage(item)
			setCartItems(getAllCartItems())
		}
	

	return { cartItems, addCartItem, deleteCartItem }
}