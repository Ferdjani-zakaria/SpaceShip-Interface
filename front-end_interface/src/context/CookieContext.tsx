import React, { createContext, useContext, useState, ReactNode } from "react";

interface CookieContextType {
    isCookiePresent: boolean;
    setCookiePresent: (value: boolean) => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const CookieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isCookiePresent, setIsCookiePresent] = useState<boolean>(false);

    return (
        <CookieContext.Provider value={{ isCookiePresent, setCookiePresent: setIsCookiePresent }}>
            {children}
        </CookieContext.Provider>
    );
};

const useCookie = () => {
    const context = useContext(CookieContext);
    if (context === undefined) {
        throw new Error("useCookie must be used within a CookieProvider");
    }
    return context;
};

export { CookieProvider, useCookie };
