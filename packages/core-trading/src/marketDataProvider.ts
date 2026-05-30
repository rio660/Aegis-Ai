import type { DataStatus } from '@aegis/shared-types';
import type { Candle } from './indicators.js';
export interface MarketDataResult { asset:string; timeframe:string; status:DataStatus; lastUpdated:string; candles:Candle[]; }
export interface MarketDataProvider { name:string; getCandles(asset:string,timeframe:string,limit:number): Promise<MarketDataResult>; }
