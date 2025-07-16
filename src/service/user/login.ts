import { axiosInstance } from "../../constant";
import { USER_T } from "../../types";

export default async (login: string, motDePasse: string) => {
    try {
        const { data } = await axiosInstance.post('/auth/login', { login, motDePasse });

        localStorage.setItem('currentUser', JSON.stringify(data.data));

        return data.data as USER_T;
    } catch (error: any) {
        return false;
    }
};