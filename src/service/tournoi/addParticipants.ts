import { axiosInstance } from "../../constant";
import { TOURNOI_T } from "../../types";

export const addParticipants = async (id: string, liste: string[]) => {
    try {
        const { data } = await axiosInstance.post(`/tournoi/${id}/participants/add`, { participants: liste });

        return data.data as TOURNOI_T;
    } catch (error: any) {
        return false;
    }
};

