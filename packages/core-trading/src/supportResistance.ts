import type { Candle } from './indicators.js';
export function supportResistance(candles: Candle[]): {support:number; resistance:number} { const recent=candles.slice(-30); return { support: Math.min(...recent.map(c=>c.low)), resistance: Math.max(...recent.map(c=>c.high)) }; }
