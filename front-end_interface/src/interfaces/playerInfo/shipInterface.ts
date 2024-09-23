export interface Ship {
    symbol: string;
    registration: {
        name: string;
        factionSymbol: string;
        role: string; // You might want to create a union type for the possible values here
    };
    nav: {
        systemSymbol: string;
        waypointSymbol: string;
        route: {
            destination: {
                symbol: string;
                type: string; // You might want to create a union type for the possible values here
                systemSymbol: string;
                x: number;
                y: number;
            };
            origin: {
                symbol: string;
                type: string; // You might want to create a union type for the possible values here
                systemSymbol: string;
                x: number;
                y: number;
            };
            departureTime: string;
            arrival: string;
        };
        status: string; // You might want to create a union type for the possible values here
        flightMode: string; // You might want to create a union type for the possible values here
    };
    crew: {
        current: number;
        required: number;
        capacity: number;
        rotation: string; // You might want to create a union type for the possible values here
        morale: number;
        wages: number;
    };
    frame: {
        symbol: string;
        name: string;
        description: string;
        condition: number;
        integrity: number;
        moduleSlots: number;
        mountingPoints: number;
        fuelCapacity: number;
        requirements: {
            power: number;
            crew: number;
            slots: number;
        };
    };
    reactor: {
        symbol: string;
        name: string;
        description: string;
        condition: number;
        integrity: number;
        powerOutput: number;
        requirements: {
            power: number;
            crew: number;
            slots: number;
        };
    };
    engine: {
        symbol: string;
        name: string;
        description: string;
        condition: number;
        integrity: number;
        speed: number;
        requirements: {
            power: number;
            crew: number;
            slots: number;
        };
    };
    cooldown: {
        shipSymbol: string;
        totalSeconds: number;
        remainingSeconds: number;
        expiration: string;
    };
    modules: {
        symbol: string;
        capacity: number;
        range: number;
        name: string;
        description: string;
        requirements: {
            power: number;
            crew: number;
            slots: number;
        };
    }[];
    mounts: {
        symbol: string;
        name: string;
        description: string;
        strength: number;
        deposits: string[];
        requirements: {
            power: number;
            crew: number;
            slots: number;
        };
    }[];
    cargo: {
        capacity: number;
        units: number;
        inventory: {
            symbol: string;
            name: string;
            description: string;
            units: number;
        }[];
    };
    fuel: {
        current: number;
        capacity: number;
        consumed: {
            amount: number;
            timestamp: string;
        };
    };
}
