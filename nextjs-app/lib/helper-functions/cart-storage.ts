import { ItemType } from "../../types/ItemType"

enum StorageTypes {
	CartItems = "CART_ITEMS"
}

export function getAllCartItems(): ItemType[] {
	if (typeof window === 'undefined') return []
	const RAW_JSON_DATA = localStorage.getItem(StorageTypes.CartItems)
	if(!RAW_JSON_DATA) return []
	const cartItems: ItemType[] = JSON.parse(RAW_JSON_DATA)
	return cartItems
}

export function addCartItemToStorage(item: ItemType){
	if (typeof window === 'undefined') return 
	const RAW_JSON_DATA = localStorage.getItem(StorageTypes.CartItems)

	if(!RAW_JSON_DATA) {
		const dataToStorage = [item]
		localStorage.setItem(StorageTypes.CartItems, JSON.stringify(dataToStorage))
	} else {
		const storageData: ItemType[] = JSON.parse(RAW_JSON_DATA)
		storageData.push(item)
		localStorage.setItem(StorageTypes.CartItems, JSON.stringify(storageData))
	}
}