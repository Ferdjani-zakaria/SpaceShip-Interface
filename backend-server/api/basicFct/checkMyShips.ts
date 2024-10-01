import api from "@api/apiConfig";
import { AxiosRequestConfig } from "axios";
import {Ship} from "@interfaces/playerInfo/shipInterface";
interface ShipData {
    data: Ship[];
}

export const checkMyShips = async (token: string): Promise<any> => {
    const options: AxiosRequestConfig = {
        method: "GET",
        url: "/my/ships",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const { data } = await api.request<ShipData>(options);
        return data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};
