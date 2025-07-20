import { axiosInstance } from "../../constant";

export const create = async (user: {
    nom: string,
    login: string,
    motDePasse: string,
    id_role: string,
    idCOD?: string,
    telephone: 'string',
    email?: 'string',
    whatsapp?: 'string',
    adresse?: 'string',
}) => {
    try {
        const { data } = await axiosInstance.post(`/user`, user);

        return data.data;
    } catch (error: any) {
        return false;
    }
};