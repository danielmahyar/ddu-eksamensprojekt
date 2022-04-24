import { doc, getDoc } from 'firebase/firestore';
import Router from 'next/router'
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../setup/firebase";

export const useUserData = () => {
	const [user, userLoading, error] = useAuthState(auth)
	useEffect(() => {
		if(error) return

		let unsub;

		if (user) {
			const data = getDoc(doc(db, "users", user.uid)).then((userData) => {
				const data = userData.data() || null
				if(!data) {
					Router.replace('/finalize-profile')
				} else if (user.displayName === null && !("fullName" in data)){
					console.log(user)
					Router.replace('/finalize-profile')
				}
			})

		} else {

		}

		return unsub;

	}, [user, error])

	return { 
		user: (user !== undefined) ? user : null,
		userLoading 
	}
} 