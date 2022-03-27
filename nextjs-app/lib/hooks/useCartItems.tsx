import { useState } from "react";
import toast from "react-hot-toast";
import { ItemType } from "../../types/ItemType";
import { addCartItemToStorage, getAllCartItems } from "../helper-functions/cart-storage";

export function useCartItems() {
	const [cartItems, setCartItems] = useState<ItemType[]>(getAllCartItems())

	const addCartItem = (item: ItemType) => {
		toast.success("Added cart item to cart")
		addCartItemToStorage(item)
		setCartItems([...cartItems, item])
	}


	return { cartItems, addCartItem }
}