import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the structure of the location object
interface LocationType {
    id: string;
    location: string;
}

// Define the structure of the context
interface LocationContextType {
    locations: LocationType[];
    addLocation: (location: LocationType) => void;
    removeLocation: (id: string) => void;
}

// Create the context
const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Create a provider component
const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locations, setLocations] = useState<LocationType[]>([]);

    // Add a new location to the array
    const addLocation = (location: LocationType) => {
        setLocations((prevLocations) => [...prevLocations, location]);
    };

    // Remove a location by id
    const removeLocation = (id: string) => {
        setLocations((prevLocations) => prevLocations.filter((loc) => loc.id !== id));
    };

    return (
        <LocationContext.Provider value={{ locations, addLocation, removeLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

// Custom hook to use the LocationContext
const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
};

export { LocationProvider, useLocation };
