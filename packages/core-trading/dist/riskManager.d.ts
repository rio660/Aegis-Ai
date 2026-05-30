import type { TradingDecision } from '@aegis/shared-types';
export interface RiskCalculation {
    entry: number;
    stopLoss: number | null;
    takeProfit: number | null;
    riskReward: number | null;
    maxRiskPerTrade: number;
    positionSize: number;
    decision: TradingDecision;
}
export declare function calculateRisk(input: {
    accountEquity: number;
    riskPct: number;
    entry: number;
    stopLoss?: number | null;
    takeProfit?: number | null;
    decision: TradingDecision;
}): RiskCalculation;
