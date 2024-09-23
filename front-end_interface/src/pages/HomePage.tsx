import React from "react";
import SignInForm from "../components/auth/SignInForm";
import GameInfoDisplay from "../components/GameInfoDisplay";

const HomePage: React.FC = () => {
    return (
        <div>
            <SignInForm />
            <GameInfoDisplay />
        </div>
    );
};
export default HomePage;
