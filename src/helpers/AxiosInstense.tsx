import axios from "axios";

export const AxiosInstense = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})