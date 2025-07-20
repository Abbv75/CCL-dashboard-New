import { axiosInstance } from "../../constant";
import { PARTIE_T } from "../../types";

export const removeParticipants = async (idTournoi: string, idPartie: string, liste: string[]) => {
    try {
        const { data } = await axiosInstance.post(
            `/tournoi/${idTournoi}/partie/${idPartie}/participants/remove`,
            { participants: liste }
        );

        return data.data as PARTIE_T;
    } catch (error: any) {
        return false;
    }
};

