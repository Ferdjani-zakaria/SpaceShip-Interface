import { FC, useState } from "react";
import { Box, List, ListItem, ListItemButton, Tooltip } from "@mui/joy";
import styles from "@assets/styles/sideBar.module.css";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RocketIcon from "@mui/icons-material/Rocket";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

interface SidebarProps {
    setSubPage: (page: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ setSubPage }) => {
    const [selectedIndex, setSelectedIndex] = useState<string | null>("Overview");
    const icons = [
        <PersonIcon key="person" sx={{ color: "#ffd700" }} />,
        <RequestPageIcon key="request" sx={{ color: "#ffd700" }} />,
        <RocketIcon key="rocket" sx={{ color: "#ffd700" }} />,
        <TravelExploreIcon key="travel" sx={{ color: "#ffd700" }} />,
        <StorefrontIcon key="store" sx={{ color: "#ffd700" }} />,
        <StorefrontIcon key="store2" sx={{ color: "#ffd700" }} />,
    ];
    const handleListItemClick = (text: string) => {
        setSelectedIndex(text);
        setSubPage(text);
    };

    return (
        <Box className={styles.box}>
            <List>
                {["Overview", "Contracts", "Fleet", "Systems", "Shipyards", "Markets"].map(
                    (text, index) => (
                        <ListItem key={text}>
                            <Tooltip title={text} placement="right" variant="soft">
                                <ListItemButton
                                    onClick={() => handleListItemClick(text)}
                                    selected={selectedIndex === text}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "#724bff55 !important",
                                        },
                                        "&.Mui-selected": {
                                            backgroundColor: "#724bdd99 !important",
                                        },
                                    }}
                                >
                                    {icons[index]}
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    )
                )}
            </List>
        </Box>
    );
};

export default Sidebar;
