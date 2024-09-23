import { ReactNode, useState } from "react";
import { Table, Sheet, Box, Select, Option, IconButton, Typography } from "@mui/joy";

// css
import styles from "@assets/styles/tableStyle.module.css";

//icons
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface TableLayerProps {
    headers: string[];
    meta: { page: number; limit: number; total: number };
    changeDisplay(params: { newLimit: number; newPage: number }): void;
    children?: ReactNode;
}

const TableLayer = ({ headers, meta, children, changeDisplay }: TableLayerProps) => {
    const [page, setPage] = useState(meta.page - 1);
    const [rowsPerPage, setRowsPerPage] = useState(meta.limit);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
        changeDisplay({ newLimit: rowsPerPage, newPage: newPage + 1 }); // Increment page by 1
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newValue = event.target.value as number;
        setRowsPerPage(newValue);
        setPage(0);
        changeDisplay({ newLimit: newValue, newPage: 1 });
    };
    return (
        <Sheet
            variant="outlined"
            sx={{
                marginTop: "2.5rem",
                width: "100%",
                boxShadow: "sm",
                borderRadius: "sm",
                textAlign: "center",
                maxHeight: "450px",
                overflowY: "scroll",
                backgroundColor: "#724bff33",
            }}
        >
            <Table
                aria-labelledby="tableTitle"
                className={styles.mainTable}
                borderAxis="bothBetween"
                variant="soft"
                color="primary"
                hoverRow
            >
                <thead className={styles.centerThead}>
                    <tr className={styles.thead}>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles.tbody}>{children}</tbody>
                <tfoot className={styles.tfoot}>
                    <tr>
                        <td colSpan={headers.length}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Select
                                    onChange={(_, value) => {
                                        handleChangeRowsPerPage({
                                            target: { value },
                                        } as any);
                                    }}
                                    value={rowsPerPage}
                                >
                                    <Option value={5}>5</Option>
                                    <Option value={10}>10</Option>
                                    <Option value={20}>20</Option>
                                </Select>
                                <Typography textAlign="center" sx={{ minWidth: 80 }}>
                                    {`Page ${meta.page} of ${Math.ceil(meta.total / rowsPerPage)}`}
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <IconButton
                                        size="sm"
                                        color="neutral"
                                        variant="outlined"
                                        disabled={page === 0}
                                        onClick={() => handleChangePage(page - 1)}
                                        sx={{ bgcolor: "background.surface" }}
                                    >
                                        <KeyboardArrowLeftIcon />
                                    </IconButton>
                                    <IconButton
                                        size="sm"
                                        color="neutral"
                                        variant="outlined"
                                        disabled={page >= Math.ceil(meta.total / rowsPerPage) - 1}
                                        onClick={() => handleChangePage(page + 1)}
                                        sx={{ bgcolor: "background.surface" }}
                                    >
                                        <KeyboardArrowRightIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Sheet>
    );
};

export default TableLayer;
