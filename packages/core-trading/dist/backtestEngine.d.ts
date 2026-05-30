import type { Candle } from './indicators.js';
export declare function runBacktest(candles: Candle[]): {
    trades: number;
    note: string;
};
