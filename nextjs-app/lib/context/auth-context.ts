import { User } from 'firebase/auth'
import { createContext } from 'react'

export const UserContext = createContext<{ user: User | null, extraInfo: any, userLoading: boolean }>({
	user: null,
	userLoading: true,
	extraInfo: null
})