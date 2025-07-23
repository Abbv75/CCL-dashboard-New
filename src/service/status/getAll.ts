import { axiosInstance } from "../../constant";
import { STATUS_T } from "../../types";

export default async () => {
    try {
        const { data } = await axiosInstance.get('/status');

        return data.data as STATUS_T[];
    } catch (error: any) {
        return false;
    }
};