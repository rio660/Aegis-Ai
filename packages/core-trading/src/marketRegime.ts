import { ema, type Candle } from './indicators.js';
export type MarketRegime = 'UPTREND'|'DOWNTREND'|'RANGING'|'CHOPPY';
export function classifyMarketRegime(candles: Candle[]): MarketRegime { if (candles.length < 30) return 'CHOPPY'; const closes=candles.map(c=>c.close); const fast=ema(closes,10).at(-1)!; const slow=ema(closes,30).at(-1)!; const diff=(fast-slow)/slow; if (diff > 0.01) return 'UPTREND'; if (diff < -0.01) return 'DOWNTREND'; return 'RANGING'; }
