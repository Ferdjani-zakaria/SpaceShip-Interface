import api from "../apiConfig";
import { AxiosRequestConfig } from "axios";
import Market from "@interfaces/playerInfo/marketInterface";


export const checkMarket = async (
    systemSymbol: string,
    waypointSymbol: string
): Promise<Market> => {
    const options: AxiosRequestConfig = {
        method: "GET",
        url: `/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`,
    };

    try {
        const { data } = await api.request(options);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
