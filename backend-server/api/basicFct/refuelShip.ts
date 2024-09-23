import api from "@api/apiConfig";
import { AxiosRequestConfig } from "axios";
export const refuelShip = async (shipSymbol: string): Promise<any> => {
    const options: AxiosRequestConfig = {
        method: "POST",
        url: `/my/ships/${shipSymbol}/refuel`,
    };

    try {
        const { data } = await api.request(options);
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
};
