import { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";

// components
import TableLayer from "@components/commun/TableLayer";

// interfaces
import type { Market } from "@interfaces/playerInfo/marketInterface";

// const
import { marketTableHeaders } from "@const/headersConst";

interface MarketResponse {
    marketData: Market[];
}

interface Meta {
    total: number;
    page: number;
    limit: number;
}

interface MarketTableProps {
    row: Market;
}

const Row: React.FC<MarketTableProps> = ({ row }) => {
    // useEffect(() => {
      
    //         console.log(row);
      
    // }, [row]);

    return (
        <Fragment>
            <tr>
                <td>{row.symbol}</td>
                <td style={{ textAlign: "left" }}>
                    {row.exports?.map((item, i: number) => (
                                <div key={i}>{item.symbol.toLowerCase()}</div>
                            ))}
                </td>
                <td style={{ textAlign: "left" }}>
                    {row.imports?.map((item, i: number) => (
                                <div key={i}>{item.symbol.toLowerCase()}</div>
                            ))}
                </td>
                <td style={{ textAlign: "left" }}>
                    {row.exchange?.map((item, i: number) => (
                                <div key={i}>{item.symbol.toLowerCase()}</div>
                            ))}
                </td>
            
            </tr>
            {row.tradeGoods?.map((good) => (
                <tr key={good.symbol}>
                    <td>{good.symbol}</td>
                    <td>{good.type}</td>
                    <td>{good.tradeVolume}</td>
                    <td>{good.supply}</td>
                    <td>{good.activity}</td>
                    <td>{good.purchasePrice}</td>
                    <td>{good.sellPrice}</td>
                </tr>
            ))}
        </Fragment>
    );
};

const TableMarket = () => {
    const [rows, setRows] = useState<{ data: Market[]; meta: Meta }>({
        data: [],
        meta: { total: 1, page: 1, limit: 10 },
    });

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const res: AxiosResponse<MarketResponse> = await axios.post(
                    "http://localhost:3000/api/market",
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(res.data)

                if (res.data) {
                    setRows((prev) => ({
                        ...prev,
                        data: res.data,
                    }));
                } else {
                    console.error("Unexpected response data format");
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error("Error fetching market data:", err.message);
                } else {
                    console.error("An unknown error occurred.");
                }
            }
        };

        void fetchData();
    }, []);

    const handleChangePage = () => {
        return ;
    };

    return (
        <TableLayer
            headers={marketTableHeaders}
            meta={rows.meta}
            changeDisplay={handleChangePage}
        >
            <Fragment>
                {rows.data.map((row) => (
                    <Row key={row.symbol} row={row.marketData} />
                ))}
            </Fragment>
        </TableLayer>
    );
};

export default TableMarket;
