import type { TradingDecision } from '@aegis/shared-types';
import type { Candle } from './indicators.js';
export declare function detectStrategy(candles: Candle[]): {
    setup: string;
    decision: TradingDecision;
    confidence: number;
};
