import { FC, useState, useEffect } from "react";
import Sidebar from "@components/Sidebar";
import Overview from "@components/Overview";
import TableContracts from "@components/TableContracts";
import TableFleet from "@components/TableFleet";
import Systems from "@components/Systems";
import TableMarket from "@components/TableMarket";

const GamePage: FC = () => {
    const [subPage, setSubPage] = useState<string>("Overview");
    const [isWideScreen, setIsWideScreen] = useState<boolean>(window.innerWidth > 1600);
    const renderSubPage = () => {
        switch (subPage) {
            case "Overview":
                return <Overview />;
            case "Contracts":
                return <TableContracts />;
            case "Fleet":
                return <TableFleet />;
            case "Systems":
                return <Systems />;
            case "Markets":
                return <TableMarket />;
            // Add more cases for other components
            default:
                return <Overview />;
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 1600);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div style={{ display: "flex",flexDirection: isWideScreen ? "column" : "row",  height: "93vh"}}>
            <Sidebar setSubPage={setSubPage} wideScreen={isWideScreen}/>
            <div style={{ width: "min(80%, 1400px)",marginInline: "auto" }}>{renderSubPage()}</div>
        </div>
    );
};


export default GamePage;
