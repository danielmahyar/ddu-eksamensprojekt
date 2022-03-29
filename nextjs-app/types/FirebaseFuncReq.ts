import { StripeSubscription } from "./StripeTypes";

export type NewSubscriptionReq = {
	plan: string;
	payment_method: string
}

export type NewSubscriptionRes = {
	data: {
		subscription: StripeSubscription;
	}
}

export type CancelSubscriptionReq = {
	id: string;
}

export type CancelSubscriptionRes = {
	data: {
		subscription: StripeSubscription;
	}
}

export type GetSubscriptionsRes = {
	data: {
		subscriptions: StripeSubscription[]
	}
}