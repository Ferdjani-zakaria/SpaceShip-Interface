import { Fragment, useState, useEffect } from "react";
import axios from "axios";

// components
import TableSystems from "@components/TableSystems";
import TableWaypoints from "@components/TableWaypoints";
import TagInput from "@components/commun/tagInput";
import TableLayer from "./commun/TableLayer";
import { Box, Input, Button, Select, Option, FormControl } from "@mui/joy";

// interfaces
import Waypoint from "interfaces/playerInfo/waypointInterface";

// consts
import { WayPointType, WayPointTrait } from "@const/wayPointConst";
import { systemsTableHeaders, WaypointsTableHeaders } from "@const/headersConst";

// icons
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SearchIcon from "@mui/icons-material/Search";

interface Faction {
    symbol: string;
}

interface systemData {
    symbol: string;
    sectorSymbol: string;
    type: string;
    x: number;
    y: number;
    waypoints: Waypoint[];
    factions: Faction[];
}

interface Meta {
    total: number;
    page: number;
    limit: number;
}

const Systems = () => {
    const [searchOptions, setSearchOptions] = useState({
        systemSymbol: "",
        waypointSymbol: "",
        typeOfWaypoint: "",
        traits: [] as string[],
        limit: 10,
        page: 1,
    });

    const [apiData, setApiData] = useState<{
        data: systemData[] | Waypoint[];
        meta: Meta;
        searchForSystem: boolean;
    }>({
        data: [],
        meta: { total: 1, page: 1, limit: 10 },
        searchForSystem: true,
    });

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!loading) {
            const fetchData = async () => {
                setLoading(true);
                const { limit, page, systemSymbol, waypointSymbol, typeOfWaypoint, traits } =
                    searchOptions;

                try {
                    const res = await axios.post(
                        "http://localhost:3000/api/systems",
                        {
                            limit,
                            page,
                            systemSymbol,
                            typeOfWaypoint,
                            traits: traits.length === 0 ? undefined : traits,
                            waypointSymbol,
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (waypointSymbol || systemSymbol) {
                        setApiData({
                            data: res.data.data,
                            meta: res.data.meta || { total: 1, page: 1, limit: 10 },
                            searchForSystem: false,
                        });
                    } else {
                        setApiData({
                            data: res.data.data,
                            meta: res.data.meta || { total: 0, page: 1, limit: 10 },
                            searchForSystem: true,
                        });
                    }
                    setError(null);
                } catch (err) {
                    console.error("Error fetching data:", err);
                    setError("Failed to fetch data. Please check the system or waypoint symbol.");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [searchOptions]);

    const handleFilter = () => {
        const pattern = /^[A-Z0-9]{2}-[A-Z0-9]{3,4}$/;
        const patternTwo = /^[A-Z0-9]{2}-[A-Z0-9]{3,4}-[A-Z0-9]{3,4}$/;
        const valueTrimmed = inputValue.trim().toUpperCase();

        if (patternTwo.test(valueTrimmed)) {
            const parts = valueTrimmed.split("-");
            setSearchOptions((prev) => ({
                ...prev,
                systemSymbol: parts[0] + "-" + parts[1],
                waypointSymbol: valueTrimmed,
            }));
        } else if (pattern.test(valueTrimmed)) {
            setSearchOptions((prev) => ({
                ...prev,
                systemSymbol: valueTrimmed,
                waypointSymbol: "",
            }));
        } else {
            setError("Invalid symbol format. Please enter a valid system or waypoint symbol.");
        }
    };

    const handleBackClick = () => {
        setSearchOptions({
            systemSymbol: "",
            waypointSymbol: "",
            typeOfWaypoint: "",
            traits: [],
            limit: 10,
            page: 1,
        });
        setError(null);
    };

    const handleSelectWaypoint = (symbol: string) => {
        setError(null);
        setSearchOptions((prev) => ({
            ...prev,
            systemSymbol: symbol,
            waypointSymbol: "",
            limit: 10,
            page: 1,
        }));
    };

    const handleChangePage = ({ newLimit, newPage }: { newLimit: number; newPage: number }) => {
        if (error) {
            setSearchOptions((prev) => ({
                ...prev,
                systemSymbol: "",
                waypointSymbol: "",
            }));
            setInputValue("");
            setError(null);
        }
        setSearchOptions((prev) => ({ ...prev, limit: newLimit, page: newPage }));
    };

    return (
        <div>
            {apiData.searchForSystem ? (
                <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2, gap: 2 }}>
                    <Input
                        placeholder="system symbol"
                        size="sm"
                        startDecorator={<SearchIcon />}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button variant="solid" onClick={handleFilter} disabled={!inputValue}>
                        Search
                    </Button>
                    {error && <p style={{ color: "red", padding: "0", margin: "0" }}>{error}</p>}
                </Box>
            ) : (
                <Box sx={{ display: "flex", alignItems: "flex-end", mt: 2, mb: 2, gap: 2 }}>
                    <Button variant="solid" color="neutral" onClick={handleBackClick}>
                        <KeyboardArrowLeftIcon />
                    </Button>
                    <FormControl size="sm">
                        <Select
                            size="sm"
                            onChange={(_, value) => {
                                if (value !== null) {
                                    setSearchOptions((prev) => ({
                                        ...prev,
                                        typeOfWaypoint: value,
                                    }));
                                }
                            }}
                            value={searchOptions.typeOfWaypoint}
                            disabled={!!searchOptions.waypointSymbol}
                        >
                            <Option value="">Select a type</Option>
                            {Object.values(WayPointType)
                                .slice(1)
                                .map((type) => (
                                    <Option key={type} value={type}>
                                        {type}
                                    </Option>
                                ))}
                        </Select>
                    </FormControl>
                    <TagInput
                        suggestions={Object.values(WayPointTrait).slice(1)}
                        trait={searchOptions.traits}
                        handleChangeTrait={(updatedTraits) =>
                            setSearchOptions((prev) => ({
                                ...prev,
                                traits: updatedTraits,
                            }))
                        }
                        isDisabled={!!searchOptions.waypointSymbol}
                    />
                </Box>
            )}

            {apiData.searchForSystem ? (
                <TableLayer
                    headers={systemsTableHeaders}
                    meta={apiData.meta}
                    changeDisplay={handleChangePage}
                >
                    {
                        <Fragment>
                            <TableSystems
                                data={apiData.data as systemData[]}
                                listWaypoints={handleSelectWaypoint}
                            />
                        </Fragment>
                    }
                </TableLayer>
            ) : (
                <TableLayer
                    headers={WaypointsTableHeaders}
                    meta={apiData.meta}
                    changeDisplay={handleChangePage}
                >
                    {
                        <Fragment>
                            <TableWaypoints data={apiData.data as Waypoint[]} />
                        </Fragment>
                    }
                </TableLayer>
            )}
        </div>
    );
};

export default Systems;
