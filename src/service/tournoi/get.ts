import { axiosInstance } from "../../constant";
import { TOURNOI_T } from "../../types";

export const get = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(`/tournoi/${id}`);

        return data.data as TOURNOI_T;
    } catch (error: any) {
        return false;
    }
};