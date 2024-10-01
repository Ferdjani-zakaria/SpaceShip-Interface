import { Fragment } from "react";
import Waypoint from "interfaces/playerInfo/waypointInterface";

interface Faction {
    symbol: string;
}

interface Data {
    symbol: string;
    sectorSymbol: string;
    type: string;
    x: number;
    y: number;
    waypoints: Waypoint[];
    factions: Faction[];
}

interface TableProps {
    data: Data[];
    listWaypoints(symbol: string): void;
}

const TableSystems = ({ data, listWaypoints }: TableProps) => {
    return (
        <Fragment>
            {data?.map((row, index) => (
                <tr
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => listWaypoints(row.symbol)}
                >
                    <td>{row.symbol}</td>
                    <td>{row.type}</td>
                    <td>
                        {row.x}/{row.y}
                    </td>
                    <td>{row.waypoints ? row.waypoints.length : "N/A"}</td>
                    <td>
                        <table
                            style={{
                                fontSize: "0.875rem",
                                lineHeight: "1.2",
                                padding: "0",
                                margin: "0",
                            }}
                        >
                            <tbody>
                                <tr>
                                    <td
                                        style={{
                                            padding: "2px 8px",
                                            color: row.waypoints?.some(
                                                (waypoint) => waypoint.type === "FUEL_STATION"
                                            )
                                                ? "green"
                                                : "red",
                                        }}
                                    >
                                        Fuel Station
                                    </td>
                                    <td
                                        style={{
                                            padding: "2px 8px",
                                            color: row.waypoints?.some(
                                                (waypoint) => waypoint.type === "PLANET"
                                            )
                                                ? "green"
                                                : "red",
                                        }}
                                    >
                                        Planet
                                    </td>
                                    <td
                                        style={{
                                            padding: "2px 8px",
                                            color: row.waypoints?.some(
                                                (waypoint) => waypoint.type === "JUMP_GATE"
                                            )
                                                ? "green"
                                                : "red",
                                        }}
                                    >
                                        Jump Gate
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            ))}
        </Fragment>
    );
};
export default TableSystems;
