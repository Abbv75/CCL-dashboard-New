import { createContext } from "react";
import { PARTIE_T, TOURNOI_T } from "../types";

export const SelectedPartieContext = createContext({} as {
    partie?: PARTIE_T,
    tournoi: TOURNOI_T,
    loadPartie: any
});