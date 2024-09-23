import { useState, useEffect } from "react";
import axios from "axios";
import Agent from "interfaces/playerInfo/agentInterface";

function Overview() {
    const [agentInfo, setAgentInfo] = useState<Agent | null>(null);
    useEffect(() => {
        const fetchAgentInfo = async () => {
            axios
                .post(
                    "http://localhost:3000/api/my/agent",
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    setAgentInfo(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching agent information:", err);
                });
        };
        fetchAgentInfo();
    }, []);
    return (
        <div
            style={{
                padding: "2rem",
                border: " 1px solid #ffffff",
                color: "white",
                minHeight: "93vh",
            }}
        >
            <div style={{ border: "1px solid #fff" }}>
                <div>
                    <ul>
                        <li>
                            Faction :{" "}
                            {agentInfo
                                ? `${agentInfo.startingFaction}( ${agentInfo.headquarters})`
                                : "unknown"}
                        </li>
                        <li>Credit : {agentInfo ? agentInfo.credits : "unknown"}</li>
                        <li>Number of ships : {agentInfo ? agentInfo.shipCount : "unknown"}</li>
                    </ul>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default Overview;
