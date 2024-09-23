import { AxiosRequestConfig } from "axios";
import api from "../apiConfig";
import Contract from "../../interfaces/playerInfo/contractInterface";

interface AllContracts {
    data: Contract[];
}

export const checkAllContracts = async (
    token: string
): Promise<AllContracts | undefined> => {
    const options: AxiosRequestConfig = {
        url: "/my/contracts",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await api.request(options);
        if (data.data.length === 0) {
            return;
        }
        return data;
    } catch (error) {
        return error;
    }
};
