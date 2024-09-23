import { AxiosRequestConfig } from "axios";
import Agent from "../../interfaces/playerInfo/agentInterface";
import api from "../apiConfig";

interface AgentData {
    data: Agent;
}

export const checkAgent = async (token: string): Promise<Agent | undefined> => {
    const options: AxiosRequestConfig = {
        method: "GET",
        url: "/my/agent",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    };

    try {
        const { data } = await api.request<AgentData>(options);
        return data.data;
    } catch (error) {
        return error;
    }
};
