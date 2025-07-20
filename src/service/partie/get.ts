import { axiosInstance } from "../../constant";
import { PARTIE_T } from "../../types";

export const get = async (idTournoi: string, idPartie: string) => {
    try {
        const { data } = await axiosInstance.get(`/tournoi/${idTournoi}/partie/${idPartie}`);

        return data.data as PARTIE_T;
    } catch (error: any) {
        return false;
    }
};