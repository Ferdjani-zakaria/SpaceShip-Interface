import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookie } from "@context/CookieContext";
import axios from "axios";

const SignInForm: React.FC = () => {
    const { setCookiePresent } = useCookie();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        axios
            .post(
                "http://localhost:3000/login",
                {
                    name: username,
                    password: password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    setCookiePresent(true);
                    navigate("/game");
                } else {
                    throw new Error("Invalid credentials");
                }
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className="sign-in-form form ">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} autoComplete="false">
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </label>

                <button type="submit">Sign In</button>
            </form>
            <br />
            <div className="form-links">
                <Link to="/register">Sign Up</Link>
                <span> | </span>
                <Link to="/forgot-password">Forgot Password</Link>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SignInForm;
