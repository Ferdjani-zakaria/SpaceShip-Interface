import api from "@api/apiConfig";

export const sellMyGoods = async (
    miningShipSymbol: string,
    typeOfGood: string,
    number: number
): Promise<any> => {
    const options = {
        method: "POST",
        url: `/my/ships/${miningShipSymbol}/sell`,
        data: { symbol: typeOfGood, units: number },
    };

    try {
        const { data } = await api.request(options);
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to propagate it further if needed
    }
};
