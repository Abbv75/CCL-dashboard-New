import { axiosInstance } from "../../constant";
import { TOURNOI_T } from "../../types";

export const getAll = async () => {
    try {
        const { data } = await axiosInstance.get('/tournoi');

        return data.data as TOURNOI_T[];
    } catch (error: any) {
        return false;
    }
};