import { axiosInstance } from "../../constant";
import { TOURNOI_T } from "../../types";

export const removeParticipants = async (id: string, liste: string[]) => {
    try {
        const { data } = await axiosInstance.post(`/tournoi/${id}/participants/remove`, { participants: liste });

        return data.data as TOURNOI_T;
    } catch (error: any) {
        return false;
    }
};

