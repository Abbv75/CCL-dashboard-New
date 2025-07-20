import { createContext } from "react";
import { PARTIE_T, STATUS_T, TOURNOI_T, USE_STATE_T } from "../types";

export const SelectedTournoiContext = createContext({} as {
    tournoi?: TOURNOI_T, settournoi: USE_STATE_T<TOURNOI_T | undefined>,
    statusList: STATUS_T[],
    partieToEdit?: PARTIE_T,
    setpartieToEdit: USE_STATE_T<PARTIE_T | undefined>,
    loadTournoi: any
});