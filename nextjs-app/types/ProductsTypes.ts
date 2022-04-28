export enum BaseSubscriptionVariants {
	one_month = "ONE_MONTH_SUBSCRIPTION",
	three_month = "THREE_MONTH_SUBSCRIPTION",
	yearly = "YEARLY_SUBSCRIPTION"
}

export type BaseProduct = {
	productID: string;
	stripeID: string;
	name: string;
	price: number;
	photoURL: string;
	type: BaseSubscriptionVariants;
}

export interface CartItem extends BaseProduct {
	cartID: string;
}

export interface SubscriptionProduct extends BaseProduct {

}