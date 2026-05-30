export class MockMarketDataProvider {
    name = 'mock';
    async getCandles(asset, timeframe, limit = 100) { const now = Date.now(); let price = 100; const candles = Array.from({ length: limit }, (_, i) => { const open = price; price += Math.sin(i / 5) + 0.2; const close = price; return { time: now - (limit - i) * 60000, open, high: Math.max(open, close) + 1, low: Math.min(open, close) - 1, close, volume: 1000 + i }; }); return { asset, timeframe, status: 'MOCK', lastUpdated: new Date().toISOString(), candles }; }
}
