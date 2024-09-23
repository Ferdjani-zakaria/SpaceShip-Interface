import api from "@api/apiConfig";
import { AxiosRequestConfig } from "axios";

export const getContractInfo = async (contractIndex: number): Promise<any | null> => {
    const options: AxiosRequestConfig = {
        url: "/my/contracts",
    };

    try {
        const { data } = await api.request(options);
        const response = data.data;

        if (Array.isArray(response) && response.length > 0) {
            return response[contractIndex]; // Return the first object in the 'data' array
        } else {
            return null; // Handle the case where there are no objects in 'data'
        }
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
};
