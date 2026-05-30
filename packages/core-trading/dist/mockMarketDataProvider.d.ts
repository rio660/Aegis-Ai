import type { MarketDataProvider, MarketDataResult } from './marketDataProvider.js';
export declare class MockMarketDataProvider implements MarketDataProvider {
    name: string;
    getCandles(asset: string, timeframe: string, limit?: number): Promise<MarketDataResult>;
}
