import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { connectToDatabase, disconnectFromDatabase } from "./database/mongoose";
import { Agent } from "@models/agentModel";
import {
    checkAgent,
    checkGameStatus,
    registerNewAgent,
    checkAllContracts,
    checkMyShips,
    acceptContract,
    checkWaypoints,
    checkSystems,
    checkOneWaypoint,
    checkMarket,
} from "@api/basicPlayFct";
import cors from "cors";
import corsOptions from "@middlewares/cors/corsOptions";
import { hashPassword } from "@utils/encryptionUtils";
import { generateScryptKey, decryptText } from "@utils/encryptionUtils";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const port = (process.env.PORT as string) || 3000;
const encryptionKey = process.env.ENCRYPTION_KEY as string;

connectToDatabase();

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.post("/login", async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;
        const agent = await Agent.findOne({ symbol: name });
        if (!agent) {
            // If no agent is found, return a 404 Not Found response
            console.log("no agent");
            return res.status(404).json({ message: "Agent not found" });
        }
        const hashedPassword = await hashPassword(password, agent.salt);
        if (agent && hashedPassword !== agent.password) {
            console.log("not the right password");
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const key = await generateScryptKey(encryptionKey, agent.salt);
        const tokenFromDB = decryptText(agent.encryptedToken, agent.iv, key);

        res.cookie("auth_token", tokenFromDB, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000 * 2,
        }); // 2 hour expiry
        res.send("User logged");
    } catch (error) {
        // Handle any errors and return a 500 Internal Server Error response
        console.error("Error retrieving token:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route for user registration
app.post("/register", async (req: Request, res: Response) => {
    try {
        const userInfo = req.body;
        // external api registration
        const token: string = await registerNewAgent(userInfo.symbol, userInfo.faction);
        // internal database registration
        const newAgent = new Agent({
            ...userInfo,
            encryptedToken: token,
        });
        await newAgent.save();
        res.sendStatus(201); // Created
    } catch (error) {
        res.sendStatus(500); // Internal Server Error
    }
});

app.post("/logOut", async (req: Request, res: Response) => {
    if (req.cookies["auth_token"]) {
        res.cookie("auth_token", "", {
            httpOnly: true,
            secure: false,
            expires: new Date(0),
        });
        res.send("User loggedOut");
    }
});

app.post("/api/gameInfo", async (req: Request, res: Response) => {
    try {
        const response = await checkGameStatus();
        res.status(200).send(response);
    } catch (error) {
        res.sendStatus(500);
    }
});
app.post("/api/my/agent", async (req: Request, res: Response) => {
    try {
        if (req.cookies) {
            const response = await checkAgent(req.cookies["auth_token"]);
            res.status(200).send(response);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

app.post("/api/my/ships", async (req: Request, res: Response) => {
    try {
        if (req.cookies) {
            const response = await checkMyShips(req.cookies["auth_token"]);
            res.status(200).send(response);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});
app.post("/api/contracts", async (req: Request, res: Response) => {
    try {
        if (req.cookies) {
            const response = await checkAllContracts(req.cookies["auth_token"]);
            res.status(200).send(response);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

app.post("/api/contracts/:contractId/accept", async (req, res) => {
    const contractId = req.params.contractId;
    try {
        if (req.cookies) {
            const response = await acceptContract(contractId, req.cookies["auth_token"]);
            res.status(200).send(response);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

app.post("/api/systems", async (req, res) => {
    const { limit, page, systemSymbol, typeOfWaypoint, traits, waypointSymbol } = req.body;

    try {
        let response;

        if (systemSymbol && waypointSymbol) {
            response = await checkOneWaypoint(limit, page, systemSymbol, waypointSymbol);
        } else if (systemSymbol) {
            response = await checkWaypoints(limit, page, systemSymbol, traits, typeOfWaypoint);
        } else {
            response = await checkSystems(limit, page);
        }
        if ((!response || [response.data].length === 0) && !traits && !typeOfWaypoint) {
            return res.status(404).json({ error: "System not found" });
        }

        res.status(200).send(response);
    } catch (error) {
        console.error("Error in /api/systems:", error);
        res.sendStatus(500);
    }
});

app.post("/api/market", async (req: Request, res: Response) => {
    try {
        const authToken = req.cookies["auth_token"];
        if (authToken) {
            // Step 1: Get ships
            const shipsResponse = await checkMyShips(authToken);
            const ships = shipsResponse.data;

            // Step 2: Fetch market data for each ship's waypoint
            const shipMarketDataPromises = ships.map(async (ship: any) => {
                const { systemSymbol, waypointSymbol } = ship.nav;
                try {
                    // Step 3: Check market data at the waypoint
                    const marketDataResponse = await checkMarket(systemSymbol, waypointSymbol);
                    const marketData = marketDataResponse?.data;

                    return { marketData: marketData || null };
                } catch (error) {
                    console.error(`Error fetching market data for waypoint ${waypointSymbol}:`, error);
                    return { ship, marketData: null };
                }
            });

            // Step 4: Resolve all market data requests
            const shipsWithMarketData = await Promise.all(shipMarketDataPromises);


            // Step 5: Send the combined data back to the client
            res.status(200).json(shipsWithMarketData);
        }
    } catch (error) {
        console.error("Error in /api/market:", error);
        res.sendStatus(500);
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

process.on("SIGINT", async () => {
    await disconnectFromDatabase();
    console.log("Exiting server...");
    process.exit(0);
});
