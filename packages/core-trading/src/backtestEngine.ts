import type { Candle } from './indicators.js';
export function runBacktest(candles:Candle[]): {trades:number; note:string} { return {trades: Math.max(0, Math.floor(candles.length/25)-1), note:'Simulation only; not financial advice and no profit guarantee.'}; }
