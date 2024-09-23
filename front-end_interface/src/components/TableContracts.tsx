import { useState, useEffect, Fragment } from "react";
import { IconButton, Table, Sheet } from "@mui/joy";
import axios from "axios";

// components
import AcceptContractBtn from "@components/AcceptContractBtn";
import TableLayer from "@components/commun/TableLayer";

// icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// intefaces
import type { Contract } from "interfaces/playerInfo/contractInterface";

// utils
import { formatDate } from "@utils/formatDate";

// consts
import { contractTableHeaders } from "@const/headersConst";

function Row(props: { row: Contract; initialOpen?: boolean }) {
    const { row } = props;
    const [open, setOpen] = useState(props.initialOpen || false);

    return (
        <Fragment>
            <tr>
                <td>
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
                <td style={{ fontWeight: "bold" }}>{row.id}</td>
                <td>{row.factionSymbol}</td>
                <td>{row.type}</td>
                <td>
                    {row.terms.payment.onAccepted} + {row.terms.payment.onFulfilled}
                </td>
                <td>
                    <AcceptContractBtn ID={row.id} accepted={row.accepted} />
                </td>
            </tr>
            <tr>
                <td style={{ height: 0, padding: 0 }} colSpan={6}>
                    {open && (
                        <Sheet
                            variant="soft"
                            sx={{
                                p: 1,
                                pl: 6,
                                boxShadow: "inset 0 3px 6px 0 rgba(0 0 0 / 0.08)",
                            }}
                        >
                            <Table
                                borderAxis="bothBetween"
                                size="sm"
                                aria-label="terms"
                                sx={{
                                    "--TableCell-paddingX": "0.5rem",
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th>Deadline</th>
                                        <th>Trade</th>
                                        <th>Destination</th>
                                        <th>Units Fulfilled</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {row.terms.deliver.map((deliver, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: "center" }}>
                                                {formatDate(row.terms.deadline)}
                                            </td>
                                            <td>{deliver.tradeSymbol}</td>
                                            <td>{deliver.destinationSymbol}</td>
                                            <td>
                                                {deliver.unitsFulfilled}/{deliver.unitsRequired}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Sheet>
                    )}
                </td>
            </tr>
        </Fragment>
    );
}

interface Meta {
    total: number;
    page: number;
    limit: number;
}

export default function TableContracts() {
    const [rows, setRows] = useState<{ data: Contract[]; meta: Meta }>({
        data: [],
        meta: { total: 0, page: 1, limit: 10 },
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.post(
                    "http://localhost:3000/api/contracts",
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

    const handleChangePage = ({ newLimit, newPage }: { newLimit: number; newPage: number }) => {
        setRows((prev) => ({
            ...prev,
            meta: {
                ...prev.meta,
                limit: newLimit,
                page: newPage,
            },
        }));
    };

    return (
        <TableLayer
            headers={contractTableHeaders}
            meta={rows.meta}
            changeDisplay={handleChangePage}
        >
            {
                <Fragment>
                    {rows.data.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </Fragment>
            }
        </TableLayer>
    );
}
