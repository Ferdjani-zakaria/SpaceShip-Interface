import api from "../apiConfig";
import { AxiosRequestConfig } from "axios";

export const checkMarket = async (
    systemSymbol: string,
    asteroidFieldWaypointSymbol: string
): Promise<any> => {
    const options: AxiosRequestConfig = {
        method: "GET",
        url: `/systems/${systemSymbol}/waypoints/${asteroidFieldWaypointSymbol}/market`,
    };

    try {
        const { data } = await api.request(options);
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
};
