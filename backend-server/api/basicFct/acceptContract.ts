import { AxiosRequestConfig } from "axios";
import api from "@api/apiConfig";

export const acceptContract = async (contractId: string, token: string): Promise<any> => {
    const options: AxiosRequestConfig = {
        method: "POST",
        url: `/my/contracts/${contractId}/accept`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await api.request(options);
        console.log("accepted");
        return data;
    } catch (error) {
        console.log("not");
        // console.error(error);
    }
};
