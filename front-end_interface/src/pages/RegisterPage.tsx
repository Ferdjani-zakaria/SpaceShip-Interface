import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import axios from "axios";
// import api from "../api";

const RegisterPage: React.FC = () => {
    const handleRegister = async (userInfo: {
        symbol: string;
        email: string;
        faction: string;
        password: string;
    }) => {
        try {
            // http://localhost:3000/
            await axios.post("http://localhost:3000/register", userInfo, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            alert("Registration successful!");
        } catch (error) {
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <RegisterForm onRegister={handleRegister} />
        </div>
    );
};

export default RegisterPage;
