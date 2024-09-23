interface Waypoint {
    symbol: string; // The symbol of the waypoint.
    type: WaypointType; // The type of waypoint.
    systemSymbol: string; // The symbol of the system.
    x: number; // Relative position of the waypoint on the system's x axis.
    y: number; // Relative position of the waypoint on the system's y axis.
    orbitals: Orbital[]; // Waypoints that orbit this waypoint.
    orbits: string; // The symbol of the parent waypoint, if this waypoint is in orbit around another waypoint.
    faction: Faction; // The faction that controls the waypoint.
    traits: Trait[]; // The traits of the waypoint.
    modifiers: Modifier[]; // The modifiers of the waypoint.
    chart: Chart; // The chart of a system or waypoint, which makes the location visible to other agents.
    isUnderConstruction: boolean; // True if the waypoint is under construction.
}

type traitSymbol =
    | "UNCHARTED"
    | "UNDER_CONSTRUCTION"
    | "MARKETPLACE"
    | "SHIPYARD"
    | "OUTPOST"
    | "SCATTERED_SETTLEMENTS"
    | "SPRAWLING_CITIES"
    | "MEGA_STRUCTURES"
    | "PIRATE_BASE"
    | "OVERCROWDED"
    | "HIGH_TECH"
    | "CORRUPT"
    | "BUREAUCRATIC"
    | "TRADING_HUB"
    | "INDUSTRIAL"
    | "BLACK_MARKET"
    | "RESEARCH_FACILITY"
    | "MILITARY_BASE"
    | "SURVEILLANCE_OUTPOST"
    | "EXPLORATION_OUTPOST"
    | "MINERAL_DEPOSITS"
    | "COMMON_METAL_DEPOSITS"
    | "PRECIOUS_METAL_DEPOSITS"
    | "RARE_METAL_DEPOSITS"
    | "METHANE_POOLS"
    | "ICE_CRYSTALS"
    | "EXPLOSIVE_GASES"
    | "STRONG_MAGNETOSPHERE"
    | "VIBRANT_AURORAS"
    | "SALT_FLATS"
    | "CANYONS"
    | "PERPETUAL_DAYLIGHT"
    | "PERPETUAL_OVERCAST"
    | "DRY_SEABEDS"
    | "MAGMA_SEAS"
    | "SUPERVOLCANOES"
    | "ASH_CLOUDS"
    | "VAST_RUINS"
    | "MUTATED_FLORA"
    | "TERRAFORMED"
    | "EXTREME_TEMPERATURES"
    | "EXTREME_PRESSURE"
    | "DIVERSE_LIFE"
    | "SCARCE_LIFE"
    | "FOSSILS"
    | "WEAK_GRAVITY"
    | "STRONG_GRAVITY"
    | "CRUSHING_GRAVITY"
    | "TOXIC_ATMOSPHERE"
    | "CORROSIVE_ATMOSPHERE"
    | "BREATHABLE_ATMOSPHERE"
    | "THIN_ATMOSPHERE"
    | "JOVIAN"
    | "ROCKY"
    | "VOLCANIC"
    | "FROZEN"
    | "SWAMP"
    | "BARREN"
    | "TEMPERATE"
    | "JUNGLE"
    | "OCEAN"
    | "RADIOACTIVE"
    | "MICRO_GRAVITY_ANOMALIES"
    | "DEBRIS_CLUSTER"
    | "DEEP_CRATERS"
    | "SHALLOW_CRATERS"
    | "UNSTABLE_COMPOSITION"
    | "HOLLOWED_INTERIOR"
    | "STRIPPED";

type WaypointType =
    | "PLANET"
    | "GAS_GIANT"
    | "MOON"
    | "ORBITAL_STATION"
    | "JUMP_GATE"
    | "ASTEROID_FIELD"
    | "ASTEROID"
    | "ENGINEERED_ASTEROID"
    | "ASTEROID_BASE"
    | "NEBULA"
    | "DEBRIS_FIELD"
    | "GRAVITY_WELL"
    | "ARTIFICIAL_GRAVITY_WELL"
    | "FUEL_STATION";

interface Orbital {
    symbol: string;
}

interface Faction {
    symbol: string;
}

interface Trait {
    symbol: traitSymbol;
    name: string;
    description: string;
}

interface Modifier {
    symbol: string;
    name: string;
    description: string;
}

interface Chart {
    waypointSymbol: string;
    submittedBy: string;
    submittedOn: string;
}

export type { Orbital, Faction, Trait, Modifier, Chart, WaypointType };

export default Waypoint;
