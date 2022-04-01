import { User } from "firebase/auth";
import { NextRouter } from "next/router";
import { getUserLastLocation } from "./user-auth";

export function handleRedirect(user: User | null, router: NextRouter) {
	if (user) {
		router.replace(getUserLastLocation() || '/profile')
	}
}