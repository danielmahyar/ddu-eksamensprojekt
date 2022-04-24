import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import AuthCheck from '../components/authentication/AuthCheck'
import { UserContext } from '../lib/context/auth-context'
import { handleUserFirestoreCreate } from '../lib/helper-functions/user-auth'
import { CustomerType } from '../types/CustomerTypes'

const FinalizeProfile: NextPage = () => {
	const { user } = useContext(UserContext)
	const router = useRouter()
	const [fullName, setFullName] = useState<string>("")

	const registerUser = () => {
		if(!user) return 
		handleUserFirestoreCreate(user, fullName, user.email || "", user?.photoURL || "", CustomerType.NORMAL_USER)
		router.replace("/profile")
	}
	
	return (
		<main>
			<AuthCheck>
				<input type="text" onInput={(e) => setFullName(e.currentTarget.value)} id="" />
				<button onClick={registerUser}>Submit</button>
			</AuthCheck>
		</main>
	)
}

export default FinalizeProfile