import api from "@api/apiConfig";
import { AxiosRequestConfig } from "axios";

export const checkSystems = async (limit: number, page: number): Promise<any> => {
    const options: AxiosRequestConfig = {
        method: "GET",
        url: `/systems?limit=${limit}&page=${page}`,
    };

    try {
        const data = await api.request(options);
        return data.data;
    } catch (error) {
        console.error(error);
    }
};
