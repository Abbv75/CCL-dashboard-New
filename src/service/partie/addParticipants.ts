import { axiosInstance } from "../../constant";
import { PARTIE_T } from "../../types";

export const addParticipants = async (idTournoi: string, idPartie: string, liste: string[]) => {
    try {
        const { data } = await axiosInstance.post(
            `/tournoi/${idTournoi}/partie/${idPartie}/participants/add`,
            { participants: liste }
        );

        return data.data as PARTIE_T;
    } catch (error: any) {
        return false;
    }
};

