import { FC, useState } from "react";
import Sidebar from "@components/Sidebar";
import Overview from "@components/Overview";
import TableContracts from "@components/TableContracts";
import TableFleet from "@components/TableFleet";
import Systems from "@components/Systems";

const GamePage: FC = () => {
    const [subPage, setSubPage] = useState<string>("Overview");
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
            // Add more cases for other components
            default:
                return <Overview />;
        }
    };
    return (
        <div style={{ display: "flex", height: "93vh" }}>
            <Sidebar setSubPage={setSubPage} />
            <div style={{ flex: 1, maxWidth: "80%", marginInline: "auto" }}>{renderSubPage()}</div>
        </div>
    );
};

export default GamePage;
