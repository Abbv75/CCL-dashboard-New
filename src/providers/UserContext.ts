import { createContext } from "react";
import { LOADING_STATE_T, ROLE_T, USE_STATE_T, USER_T } from "../types";

export const UserContext = createContext({} as {
    userList: USER_T[], setuserList: USE_STATE_T<USER_T[]>,
    loadUser: any,
    loadingState: LOADING_STATE_T,
    roleList: ROLE_T[],
    userToEdit?: USER_T, setuserToEdit: USE_STATE_T<USER_T | undefined>,
});