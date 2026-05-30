export function runBacktest(candles) { return { trades: Math.max(0, Math.floor(candles.length / 25) - 1), note: 'Simulation only; not financial advice and no profit guarantee.' }; }
