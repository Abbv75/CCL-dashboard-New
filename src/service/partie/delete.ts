import { axiosInstance } from "../../constant";

export const deletePartie = async (tournoi_id: string, partie_id: string) => {
    try {
        const { data } = await axiosInstance.delete(`/tournoi/${tournoi_id}/partie/${partie_id}`);

        return data;
    } catch (error: any) {
        return false;
    }
};