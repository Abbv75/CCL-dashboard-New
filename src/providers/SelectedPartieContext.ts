import { createContext } from "react";
import { PARTIE_T } from "../types";

export const SelectedPartieContext = createContext({} as {
    partie?: PARTIE_T,
});