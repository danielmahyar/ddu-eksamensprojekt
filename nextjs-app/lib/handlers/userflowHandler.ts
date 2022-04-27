import Router from "next/router";

export function buyItem(productID: string): void {
	Router.push(`/payment/checkout?productID=${productID}`);
	
}

export function confirmPurchase() {
	Router.push("/payment/confirmation")
}