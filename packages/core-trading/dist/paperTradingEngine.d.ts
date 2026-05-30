export interface PaperTrade {
    id: string;
    asset: string;
    side: 'LONG' | 'SHORT';
    entry: number;
    stopLoss: number;
    takeProfit?: number;
    openedAt: string;
    closedAt?: string;
    exit?: number;
}
export declare class PaperTradingEngine {
    private trades;
    open(t: Omit<PaperTrade, 'id' | 'openedAt'>): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        openedAt: string;
        asset: string;
        side: "LONG" | "SHORT";
        entry: number;
        stopLoss: number;
        takeProfit?: number | undefined;
        closedAt?: string | undefined;
        exit?: number | undefined;
    };
    list(): PaperTrade[];
}
