import { axiosInstance } from "../../constant";
import { TOURNOI_T, USER_T } from "../../types";

export const create = async (tournoi: {
    nom: string,
    id_status: string,
    date_debut?: string,
    frais_inscription?: string,
    montant_a_gagner?: string,
    nb_max_participants?: string,
    id_gagnant?: 'string',
}) => {
    try {
        const { data } = await axiosInstance.post(`/tournoi`, tournoi);

        return data.data as TOURNOI_T;
    } catch (error: any) {
        return false;
    }
};