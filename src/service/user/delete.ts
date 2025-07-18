import { axiosInstance } from "../../constant";

export const deleteUser = async (id: string) => {
    try {
        const { data } = await axiosInstance.delete(`/user/${id}`);

        return data;
    } catch (error: any) {
        return false;
    }
};