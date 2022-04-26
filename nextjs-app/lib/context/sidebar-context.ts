import { createContext, Dispatch, SetStateAction } from "react";

export const SideBarContext = createContext<{ pressed: boolean, setPressed: any }>({ pressed: false, setPressed: () => {}})