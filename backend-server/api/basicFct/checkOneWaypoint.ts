import api from "@api/apiConfig";
import { AxiosRequestConfig } from "axios";
import Waypoint from "@interfaces/playerInfo/waypointInterface";

interface WaypointData {
    data: Waypoint;
    meta: {
        total: Number;
        page: Number;
        limit: Number;
    };
}

export const checkOneWaypoint = async (
    limit: number,
    page: number,
    systemSymbol: String,
    wayPointSystem: String
): Promise<WaypointData | undefined> => {
    const options: AxiosRequestConfig = {
        method: "GET",
        params: {
            limit: limit,
            page: page,
        },
        url: `/systems/${systemSymbol}/waypoints/${wayPointSystem}`,
    };

    try {
        const data = await api.request<WaypointData>(options);
        return data.data;
    } catch (error) {
        console.error("Can't fetch for the waypointData");
        // throw error; // Re-throw the error to propagate it further if needed
    }
};
