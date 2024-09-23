import { checkAgent } from "./basicFct/checkAgent.ts";
import { checkAllContracts } from "./basicFct/checkAllContracts.ts";
import { acceptContract } from "./basicFct/acceptContract.ts";
import { getContractInfo } from "./basicFct/getContractInfo.ts";
import { checkWaypoints } from "./basicFct/checkWaypoints.ts";
import { checkOneWaypoint } from "./basicFct/checkOneWaypoint.ts";
import { checkSystems } from "./basicFct/checkSystems.ts";
import { checkShips } from "./basicFct/checkShips.ts";
import { getShip } from "./basicFct/getShip.ts";
import { checkMyShips } from "./basicFct/checkMyShips.ts";
import { makeShipOrbit } from "./basicFct/makeShipOrbit.ts";
import { navigateShip } from "./basicFct/navigateShip.ts";
import { dockShip } from "./basicFct/dockShip.ts";
import { refuelShip } from "./basicFct/refuelShip.ts";
import { extract } from "./basicFct/extract.ts";
import { checkGameStatus } from "./basicFct/checkGameStatus.ts";
import { checkMarket } from "./basicFct/checkMarket.ts";
import { checkMyCargo } from "./basicFct/checkMyCargo.ts";
import { sellMyGoods } from "./basicFct/sellMyGoods.ts";
import { registerNewAgent } from "./basicFct/registerNewAgent.ts";

export {
    registerNewAgent,
    checkAgent,
    sellMyGoods,
    navigateShip,
    checkAllContracts,
    acceptContract,
    getContractInfo,
    checkWaypoints,
    checkOneWaypoint,
    checkSystems,
    makeShipOrbit,
    checkShips,
    getShip,
    checkMyShips,
    checkMyCargo,
    checkMarket,
    extract,
    refuelShip,
    dockShip,
    checkGameStatus,
};
