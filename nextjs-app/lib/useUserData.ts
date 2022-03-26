import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

export const useUserData = () => {
	const [user, userLoading, error] = useAuthState(auth)

	useEffect(() => {
		if(error) return

		let unsub;

		if (user) {
			//Get user data...
			// const ref = doc(firestore, 'users', user.uid)

			// unsub = onSnapshot(ref, (user) => {
			// 	setUsername(user.data()?.username)
			// })

		} else {
		}

		return unsub;

	}, [user, error])

	return { 
		user: (user !== undefined) ? user : null,
		userLoading 
	}
} 