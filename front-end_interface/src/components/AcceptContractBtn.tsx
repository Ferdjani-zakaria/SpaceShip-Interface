import { useState } from "react";
import axios from "axios";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

interface AcceptContractBtnProps {
    ID: string;
    accepted: boolean;
}

const AcceptContractBtn: React.FC<AcceptContractBtnProps> = ({ ID, accepted }) => {
    const [success, setSuccess] = useState<boolean>(accepted);
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async () => {
        try {
            setLoading(true);
            const res = await axios.post(
                `http://localhost:3000/api/contracts/${ID}/accept`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 200) {
                setSuccess(true);
            }
        } catch (err) {
            console.error("Error accepting contract:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
            {loading ? (
                <Button loading>Loading</Button>
            ) : !success ? (
                <Button onClick={handleClick}>Accept</Button>
            ) : (
                <Button disabled>Accepted</Button>
            )}
        </Box>
    );
};

export default AcceptContractBtn;
