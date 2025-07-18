import { createContext } from "react";
import { USE_STATE_T, USER_T } from "../types";

export const UserContext = createContext({} as {
    userList: USER_T[], setuserList: USE_STATE_T<USER_T[]>
});