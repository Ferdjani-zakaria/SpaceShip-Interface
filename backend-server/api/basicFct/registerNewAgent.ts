import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RegistrationApiResponse } from "../../interfaces/registerform/RegisterResponse";

export const registerNewAgent = async (
    symbol: string,
    faction: string
    // password: string
): Promise<string> => {
    // Make API call to register new agent
    const options: AxiosRequestConfig = {
        method: "POST",
        url: "https://api.spacetraders.io/v2/register",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        data: { faction: faction, symbol: symbol },
    };
    try {
        const apiResponse: AxiosResponse<RegistrationApiResponse> = await axios.request(
            options
        );

        // If API call is successful, save data to local database
        if (apiResponse.data) {
            const { token } = apiResponse.data.data;
            return token;
        }
    } catch (error) {
        console.error("Error during agent registration:", error);
    }
    return "";
};
