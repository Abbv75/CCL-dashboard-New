import { createContext } from "react";
import { TOURNOI_T, USE_STATE_T } from "../types";

export const TournoiContext = createContext({} as {
    tournoiList: TOURNOI_T[], settournoiList: USE_STATE_T<TOURNOI_T[]>
});