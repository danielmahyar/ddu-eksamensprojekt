import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../setup/firebase";

export const useUserData = () => {
	const [user, userLoading, error] = useAuthState(auth)
	const [userExtra, setUser] = useState<any>(null)
	useEffect(() => {
		if (error) return
		if (!user) return
		let unsub;

		const data = getDoc(doc(db, "users", user.uid)).then((userData) => {
			const data = userData.data() || null
			setUser({ ...data })
		})

		return unsub;

	}, [user, error])

	return {
		user: (user !== undefined) ? user : null,
		extraInfo: userExtra || null,
		userLoading
	}
} 