export interface ServerResets {
    next: string;
    frequency: string;
}

interface Leaderboard {
    mostCredits: Array<{ agentSymbol: string; credits: number }>;
    mostSubmittedCharts: Array<{ agentSymbol: string; chartCount: number }>;
}

export interface LeaderboardItem {
    agentSymbol: string;
    credits?: number; // You might want to adjust this based on the actual response
    chartCount?: number; // You might want to adjust this based on the actual response
}

export interface Link {
    name: string;
    url: string;
}

export interface Announcement {
    title: string;
    body: string;
}

interface GameInfo {
    status: string;
    version: string;
    resetDate: string;
    description: string;
    stats: {
        agents: number;
        ships: number;
        systems: number;
        waypoints: number;
    };
    leaderboards: Leaderboard;
    serverResets: ServerResets;
    announcements: Announcement[];
    links: Link[];
}

export default GameInfo;
