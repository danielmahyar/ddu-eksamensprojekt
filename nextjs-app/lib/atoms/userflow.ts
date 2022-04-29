import { atom } from "recoil";
import { BaseSubscriptionVariants, SubscriptionProduct } from "../../types/ProductsTypes";

export enum UserState {
	buyProductAfterSignup = "BUY_PRODUCT_AFTER_SIGNUP",
	signupToProfile = "SIGNUP_TO_PROFILE"
}

export const userflow = atom<{ flow: UserState, tempProduct: SubscriptionProduct}>({
	key: "userflow",
	default: {
		flow: UserState.signupToProfile,
		tempProduct: {
			name: "",
			photoURL: "",
			price: 0,
			productID: "",
			stripeID: "",
			type: BaseSubscriptionVariants.one_month
		}
	}
})
