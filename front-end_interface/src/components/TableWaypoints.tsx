import { Fragment } from "react";

import Waypoint from "interfaces/playerInfo/waypointInterface";

interface TableProps {
    data: Waypoint[];
}

const TableWaypoints = ({ data }: TableProps) => {
    return (
        <Fragment>
            {data &&
                (Array.isArray(data) ? data : [data]).map((row, index) => (
                    <tr key={index}>
                        <td>{row.symbol}</td>
                        <td>{row.type}</td>
                        <td>
                            {row.x}/{row.y}
                        </td>
                        <td>{row.faction?.symbol ? row.faction.symbol : "None"}</td>
                        <td style={{ textAlign: "left" }}>
                            {row.traits?.map((trait, i: number) => (
                                <div key={i}>{trait.symbol.toLowerCase()}</div>
                            ))}
                        </td>
                        <td>
                            {row.modifiers?.map((modifier, i: number) => (
                                <div key={i}>{modifier.symbol}</div>
                            ))}
                        </td>
                        <td style={{ textAlign: "left" }}>
                            {row.chart ? (
                                <div>
                                    <div>{`${row.chart.submittedBy}`}</div>
                                    <div>{`${new Date(
                                        row.chart.submittedOn
                                    ).toLocaleDateString()}`}</div>
                                </div>
                            ) : (
                                "N/A"
                            )}
                        </td>
                    </tr>
                ))}
        </Fragment>
    );
};

export default TableWaypoints;
