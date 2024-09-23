import { useState } from "react";

interface RegisterFormProps {
    onRegister: (userInfo: { symbol: string; faction: string; password: string }) => void;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
    const [userInfo, setUserInfo] = useState({
        symbol: "",
        email: "",
        faction: "COSMIC",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInfo.symbol.length >= 3 && userInfo.symbol.length <= 14) {
            onRegister(userInfo);
        } else {
            setErrorMessage("Invalid symbol length");
        }
    };

    return (
        <div className="register-form form">
            <h2>Registration</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="symbol">Symbol (userName):</label>
                <input
                    type="text"
                    id="symbol"
                    value={userInfo.symbol}
                    onChange={handleChange}
                    autoComplete="false"
                    required
                />

                <label htmlFor="faction">Faction:</label>
                <select id="faction" value={userInfo.faction} onChange={handleChange} required>
                    <option defaultChecked value={"COSMIC"}>
                        COSMIC
                    </option>
                    <option value={"VOID"}>VOID</option>
                    <option value={"GALACTIC"}>GALACTIC</option>
                    {/* <option>QUANTUM</option>
                    <option>DOMINION</option>
                    <option>ASTRO</option>
                    <option>CORSAIRS</option>
                    <option>OBSIDIAN</option>
                    <option>AEGIS</option>
                    <option>UNITED</option>
                    <option>SOLITARY</option>
                    <option>COBALT</option>
                    <option>OMEGA</option>
                    <option>ECHO</option>
                    <option>LORDS</option>
                    <option>CULT</option>
                    <option>ANCIENTS</option>
                    <option>SHADOW</option>
                    <option>ETHEREA</option> */}
                </select>

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={userInfo.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
