import api from "../apiConfig";
import { AxiosRequestConfig } from "axios";
export const checkMyCargo = async (miningShipSymbol: string): Promise<any> => {
    const options: AxiosRequestConfig = {
        method: "GET",
        url: `/my/ships/${miningShipSymbol}/cargo`,
    };

    try {
        const { data } = await api.request(options);
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
};
