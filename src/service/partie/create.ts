import { axiosInstance } from "../../constant";
import { TOURNOI_T } from "../../types";

export const create = async (id_tournoi: string, partie: {
    dateHeure: string;
    id_gagnant?: string;
    id_tournoi: string;
    id_status: number;
}) => {
    try {
        const { data } = await axiosInstance.post(`/tournoi/${id_tournoi}/partie`, partie);

        return data.data as TOURNOI_T;
    } catch (error: any) {
        return false;
    }
};