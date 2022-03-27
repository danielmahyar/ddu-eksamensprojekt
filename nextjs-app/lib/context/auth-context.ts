import { User } from 'firebase/auth'
import { createContext } from 'react'

export const UserContext = createContext<{ user: User | null, userLoading: boolean }>({
	user: null,
	userLoading: true
})