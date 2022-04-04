import Router from 'next/router'
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../setup/firebase";

export const useUserData = () => {
	const [user, userLoading, error] = useAuthState(auth)
	useEffect(() => {
		if(error) return

		let unsub;

		if (user) {
			if(user.displayName === null){
				Router.replace('/finalize-profile')
			}
		} else {
		}

		return unsub;

	}, [user, error])

	return { 
		user: (user !== undefined) ? user : null,
		userLoading 
	}
} 