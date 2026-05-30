import { type Candle } from './indicators.js';
export type MarketRegime = 'UPTREND' | 'DOWNTREND' | 'RANGING' | 'CHOPPY';
export declare function classifyMarketRegime(candles: Candle[]): MarketRegime;
