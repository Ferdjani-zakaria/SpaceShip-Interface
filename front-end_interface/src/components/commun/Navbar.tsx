import { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookie } from "@context/CookieContext";
import axios from "axios";
import OffSvg from "@assets/img/off-svgrepo-com.svg?react";

const Navbar: FC = () => {
    const navigate = useNavigate();
    const { isCookiePresent, setCookiePresent } = useCookie();
    const handleDisconnect = () => {
        axios
            .post(
                "http://localhost:3000/logOut",
                {},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    setCookiePresent(false);
                    navigate("/");
                } else {
                    throw new Error("You can't leave");
                }
            })
            .catch(() => {
                console.log("error");
            });
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    {isCookiePresent ? <Link to="/game">My Ship</Link> : <Link to="/">Home</Link>}
                </li>

                <li>
                    <a
                        href="https://docs.spacetraders.io"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        API Website
                    </a>
                </li>
                <li>
                    {isCookiePresent ? (
                        <div className="offSvgWrapper">
                            <OffSvg className="offSvg" onClick={() => handleDisconnect()} />
                        </div>
                    ) : (
                        <Link to="/register">Register</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
