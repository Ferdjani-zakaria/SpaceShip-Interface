import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "https://api.spacetraders.io/v2",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;
