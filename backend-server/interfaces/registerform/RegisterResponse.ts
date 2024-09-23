import Agent from "../playerInfo/agentInterface";
import Contract from "../playerInfo/contractInterface";
import Faction from "../playerInfo/factionInterface";
import Ship from "../playerInfo/shipInterface";

interface Data {
    agent: Agent;
    contract: Contract;
    faction: Faction;
    ship: Ship;
    token: string;
}

interface RegistrationApiResponse {
    data: Data;
}

export type { RegistrationApiResponse };
