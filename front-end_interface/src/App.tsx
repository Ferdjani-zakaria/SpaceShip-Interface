import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "@components/commun/Navbar";
import HomePage from "@pages/HomePage";
import GamePage from "@pages/GamePage";
import RegisterPage from "@pages/RegisterPage";
import { CookieProvider } from "@context/CookieContext";

const App: React.FC = () => {
    return (
        <CookieProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/game" element={<GamePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </Router>
        </CookieProvider>
    );
};

export default App;
