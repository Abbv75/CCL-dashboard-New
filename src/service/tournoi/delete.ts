import { axiosInstance } from "../../constant";

export const deleteTournoi = async (tournoi_id: string) => {
    try {
        const { data } = await axiosInstance.delete(`/tournoi/${tournoi_id}`);

        return data;
    } catch (error: any) {
        return false;
    }
};