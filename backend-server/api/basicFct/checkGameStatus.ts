import { AxiosRequestConfig } from "axios";
import api from "../apiConfig";

export const checkGameStatus = async (): Promise<any> => {
    const options: AxiosRequestConfig = {
        method: "GET",
        url: "/",
    };

    try {
        const { data } = await api.request(options);
        return data;
    } catch (error) {
        return error;
    }
};
