import axios from "axios";

export const AxiosInstense = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD,
})