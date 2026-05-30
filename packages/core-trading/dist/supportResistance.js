export function supportResistance(candles) { const recent = candles.slice(-30); return { support: Math.min(...recent.map(c => c.low)), resistance: Math.max(...recent.map(c => c.high)) }; }
