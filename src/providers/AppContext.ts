import { createContext } from "react";
import { USER_T } from "../types";

export const AppContext = createContext({} as {
    currentUser?: USER_T, setcurrentUser?: (user: USER_T) => void,
});