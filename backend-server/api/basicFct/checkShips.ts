import api from "@api/apiConfig";
import { AxiosRequestConfig } from "axios";

export const checkShips = async (
    systemSymbol: string,
    shipyardWaypointSymbol: string
): Promise<any> => {
    const options: AxiosRequestConfig = {
        method: "GET",
        url: `/systems/${systemSymbol}/waypoints/${shipyardWaypointSymbol}/shipyard`,
    };

    try {
        const { data } = await api.request(options);
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
};
