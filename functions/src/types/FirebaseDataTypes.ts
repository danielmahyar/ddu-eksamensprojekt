export enum CustomerType {
	NORMAL_USER = "NORMAL_USER",
	SUBSCRIBED_USER = "SUB_USER"
}

export type UserDocument = {
	email: string;
	fullName: string;
	memberStatus: CustomerType;
	photoURL: string;
	stripeCustomerId: string | null;
}