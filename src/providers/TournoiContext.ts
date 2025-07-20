import { createContext } from "react";
import { STATUS_T, TOURNOI_T, USE_STATE_T } from "../types";

export const TournoiContext = createContext({} as {
    tournoiList: TOURNOI_T[], settournoiList: USE_STATE_T<TOURNOI_T[]>,
    statusList: STATUS_T[],
    tournoiToEdit?: TOURNOI_T,
    settournoiToEdit: USE_STATE_T<TOURNOI_T | undefined>
});