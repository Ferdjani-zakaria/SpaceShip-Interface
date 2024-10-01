import { useState, useEffect } from "react";
import GameInfoInterface, { LeaderboardItem } from "interfaces/gameInfo/GameInfoInterface";
import { formatDate } from "@utils/formatDate";
import axios from "axios";

function GameInfoDisplay() {
    const [gameInfo, setGameInfo] = useState<GameInfoInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGameInfo = async () => {
            axios
                .post("http://localhost:3000/api/gameInfo", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    setGameInfo(res.data);
                    setLoading(false);
                    console.log(res.data.resetDate);
                })
                .catch((err) => {
                    console.error("Error fetching game information:", err);
                });
              
        };

        fetchGameInfo();
    }, []);

    return (
        <div className="gameInfo_wrap">
            <div>
                {loading && <p>Loading...</p>}
                {gameInfo && !loading && (
                    <>
                        <div className="resetInfo">
                            <h2>Next reset: {formatDate(gameInfo.serverResets.next)}</h2>
                            <p>{gameInfo.status}</p>
                        </div>
                        <h2>About</h2>
                        <p className="aboutGame">{gameInfo.description}</p>
                    </>
                )}
            </div>
            <div className="leaderBoard-wrap">
                <h2>Leaderboards</h2>
                {loading && <p>Loading...</p>}
                {gameInfo && gameInfo.leaderboards && !loading && (
                    <div className="flex-evenly">
                        <div>
                            <h3>Most Credits</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Agent Symbol</th>
                                        <th>Credits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gameInfo.leaderboards.mostCredits.map(
                                        (item: LeaderboardItem, index: number) => (
                                            <tr key={index}>
                                                <td>{item.agentSymbol}</td>
                                                <td>{item.credits}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h3>Most Submitted Charts</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Agent Symbol</th>
                                        <th>Chart Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gameInfo.leaderboards.mostSubmittedCharts.map(
                                        (item: LeaderboardItem, index: number) => (
                                            <tr key={index}>
                                                <td>{item.agentSymbol}</td>
                                                <td>{item.chartCount}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GameInfoDisplay;
