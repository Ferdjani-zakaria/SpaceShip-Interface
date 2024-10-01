import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { IconButton, Table, Sheet, Typography } from "@mui/joy";

// components
import TableLayer from "@components/commun/TableLayer";
import ShipModel from "./commun/shipModel";

// interfaces
import type { Ship } from "interfaces/playerInfo/shipInterface";

// constants
import { fleetTableHeaders } from "@const/headersConst";
// css

// icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


const RowDetails = ({
    open,
    colSpan,
    headers,
    name,
    values,
}: {
    open: boolean;
    colSpan: number;
    headers: string[];
    name: string;
    values: any[];
}) => {
    const cellDifference = colSpan - headers.length - 1;
    return (
        <tr>
            <td style={{ height: 0, padding: 0 }} colSpan={colSpan}>
                {open && (
                    <Sheet
                        variant="soft"
                        sx={{
                            pl: 10,
                            display: "flex",
                            gap: "0.8rem",    
                        }}
                    >
                        <Typography
                            sx={{
                                margin: "0",
                                padding: "0",
                                textAlign: "left",
                                fontWeight: "bold",
                                textDecoration: "underLine",
                                minWidth: "4rem",
                            }}
                        >
                            {name}
                        </Typography>
                        <Table
                            borderAxis="bothBetween"
                            size="sm"
                            aria-label="details"
                            variant="soft"
                            color="primary"
                        >
                            <thead style={{ fontSize:"0.9rem"}}>
                                <tr>
                                    {headers.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                    {cellDifference > 0 &&
                                        Array.from({ length: cellDifference }).map((_, index) => (
                                            <th key={`empty-${index}`}> </th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody >
                                <tr >
                                    {values.map((value, cellIndex) => (
                                        <td key={cellIndex} style={{ fontSize:"0.8rem"}}>{value || "0 or Unknown"}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </Table>
                    </Sheet>
                )}
            </td>
        </tr>
    );
};

function Row(props: { ship: Ship; initialOpen?: boolean }) {
    const { ship } = props;
    const [open, setOpen] = useState(props.initialOpen || false);

    return (
        <Fragment>
            <tr>
                <td style={{display:"flex", justifyContent: "center", alignItems:"center"}}>
                    <ShipModel />
                    <IconButton
                        aria-label="expand row"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </td>
                <td>{ship.symbol}</td>
                <td>{ship.registration.role}</td>
                <td>{ship.nav.status}</td>
                <td>{ship.cooldown.remainingSeconds ? ship.cooldown.remainingSeconds : "Yes"}</td>
                <td>
                    {ship.cargo.units}/{ship.cargo.capacity}
                </td>
                <td>
                    {ship.fuel.current}/{ship.fuel.capacity}
                </td>
            </tr>
            <RowDetails
                open={open}
                colSpan={7}
                headers={["Current(req)/max", "Morale", "Rotation", "Wages"]}
                name={"Crew"}
                values={[
                    `${ship.crew.current}(${ship.crew.required})/${ship.crew.capacity}`,
                    `${ship.crew.morale}/100`,
                    ship.crew.rotation,
                    ship.crew.wages,
                ]}
            />
            <RowDetails
                open={open}
                colSpan={7}
                headers={[
                    "Symbol",
                    "Condition",
                    "intergrity",
                    "moduleSlots",
                    "mountingPoints",
                    "Power",
                ]}
                name={"frame"}
                values={[
                    ship.frame.symbol,
                    `${ship.frame.condition} / 1`,
                    `${ship.frame.integrity} / 1`,
                    ship.frame.moduleSlots,
                    ship.frame.mountingPoints,
                    ship.frame.requirements.power,
                ]}
            />
            <RowDetails
                open={open}
                colSpan={7}
                headers={["Symbol", "Condition", "Integrity", "Speed", "Power"]}
                name={"engine"}
                values={[
                    ship.engine.symbol,
                    `${ship.engine.condition} / 1`,
                    `${ship.engine.integrity} / 1`,
                    ship.engine.speed,
                    ship.engine.requirements.power,
                ]}
            />
            <RowDetails
                open={open}
                colSpan={7}
                headers={["Symbol", "Condition", "Integrity", "PowerOutput", "Power"]}
                name={"reactor"}
                values={[
                    ship.reactor.symbol,
                    `${ship.reactor.condition} / 1`,
                    `${ship.reactor.integrity} / 1`,
                    ship.reactor.powerOutput,
                    ship.reactor.requirements.power,
                ]}
            />
        </Fragment>
    );
}

interface Meta {
    total: number;
    page: number;
    limit: number;
}

export default function TableContracts() {
    const [ships, setShips] = useState<{ data: Ship[]; meta: Meta }>({
        data: [],
        meta: { total: 0, page: 1, limit: 10 },
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.post(
                    "http://localhost:3000/api/my/ships",
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setShips(res.data);
            } catch (err) {
                console.error("Error fetching contract information:", err);
            }
        }

        fetchData();
    }, []);

    const handleChangePage = ({ newLimit, newPage }: { newLimit: number; newPage: number }) => {
        setShips((prev) => ({
            ...prev,
            meta: {
                ...prev.meta,
                limit: newLimit,
                page: newPage,
            },
        }));
    };

    return (
        <TableLayer headers={fleetTableHeaders} meta={ships.meta} changeDisplay={handleChangePage}>
            {
                <Fragment>
                    {ships.data?.map((ship, index) => (
                        <Row key={index} ship={ship} />
                    ))}
                </Fragment>
            }
        </TableLayer>
    );
}
