import { useState, useEffect, Fragment } from "react";
import { useLocation } from "../context/LocationContext";
import { IconButton, Table, Sheet } from "@mui/joy";
import axios from "axios";

// components

import TableLayer from "@components/commun/TableLayer";

const TableMarket = () => {
    const { locations } = useLocation();
    const [rows, setRows] = useState<{ data: Market[] }>({
        data: [],
    });

    const fetchData = async (location: string) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/Market",
                {},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.data) {
                setRows(res.data);
            }
        } catch (err) {
            console.error("Error fetching contract information:", err);
        }
    };
    const fetchLocations = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/Ships",
                {},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.data) {
                const locationsOfMyShips = [];
                for (let i = 0; i < res.data.length + 1; i++) {
                    locationsOfMyShips.push(res.data[i].nav.systemSymbol);
                }
                // need to set the cooki here
            }
        } catch (err) {
            console.error("Error fetching contract information:", err);
        }
    };

    useEffect(() => {
        if (locations.length === 0) {
            fetchLocations();
        }
        locations.map(({ location }) => {
            fetchData(location);
        });
    }, [locations]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.post(
                    "http://localhost:3000/api/Market",
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (res.data) {
                    setRows(res.data);
                }
            } catch (err) {
                console.error("Error fetching contract information:", err);
            }
        }

        fetchData();
    }, []);
    return (
        <TableLayer
        // headers={contractTableHeaders}
        // meta={rows.meta}
        // changeDisplay={handleChangePage}
        >
            {
                <Fragment>
                    {/* {rows.data.map((row) => (
                        <Row key={row.id} row={row} />
                    ))} */}
                </Fragment>
            }
        </TableLayer>
    );
};

export default TableMarket;
