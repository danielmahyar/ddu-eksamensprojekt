/**
 * Customer Types
 */
export enum CustomerType {
	NORMAL_USER = "NORMAL_USER",
	SUBSCRIBED_USER = "SUB_USER"
}

/**
 * User Document under `users/{uid}` in firestore
 */
export type UserDocument = {
	email: string;
	fullName: string;
	memberStatus: CustomerType;
	photoURL: string;
	stripeCustomerId: string | null;
}