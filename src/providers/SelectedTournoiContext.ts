import { createContext } from "react";
import { TOURNOI_T, USE_STATE_T } from "../types";

export const SelectedTournoiContext = createContext({} as {
    tournoi?: TOURNOI_T, settournoi: USE_STATE_T<TOURNOI_T | undefined>
});