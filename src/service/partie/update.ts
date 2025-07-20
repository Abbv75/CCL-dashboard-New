import { axiosInstance } from "../../constant";
import { TOURNOI_T } from "../../types";

export const update = async (id_tournoi: string, id_partie: string, partie: {
    dateHeure: string;
    id_gagnant?: string;
    id_tournoi: string;
    id_status: number;
}) => {
    try {
        const { data } = await axiosInstance.put(`/tournoi/${id_tournoi}/partie/${id_partie}`, partie);

        return data.data as TOURNOI_T;
    } catch (error: any) {
        return false;
    }
};