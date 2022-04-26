import { useState } from "react";

export function useSidebar() {
	const [pressed, setPressed] = useState<boolean>(false)

	return { pressed, setPressed }
}