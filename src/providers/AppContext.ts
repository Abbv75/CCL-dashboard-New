import { createContext } from "react";
import { USE_STATE_T, USER_T } from "../types";

export const AppContext = createContext({} as {
    currentUser?: USER_T, setcurrentUser: USE_STATE_T<USER_T | undefined>
});