import { atom } from 'recoil'

export const errorNotification = atom({
	key: "errorNotification",
	default: {
		message: "",
		color: "bg-discord-purple"
	}
})