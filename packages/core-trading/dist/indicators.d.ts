export interface Candle {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}
export declare function sma(values: number[], period: number): number[];
export declare function ema(values: number[], period: number): number[];
export declare function rsi(values: number[], period?: number): number[];
export declare function atr(candles: Candle[], period?: number): number[];
