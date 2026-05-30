import type { TradingDecision } from '@aegis/shared-types';
export declare const CORE_SAFETY_MESSAGE = "Winrate 100% tidak realistis dan tidak boleh dijadikan target. Target yang benar adalah disiplin eksekusi, risk management, dan evaluasi performa berbasis data.";
export declare const BLOCKED_RESPONSE = "Klaim ini tidak realistis dan berbahaya. Aplikasi ini hanya membantu analisis, simulasi, dan risk management.";
export declare const BLOCKED_PHRASES: string[];
export declare function containsBlockedPhrase(text: string): boolean;
export declare function guardText(text: string): {
    allowed: boolean;
    message?: string;
};
export interface TradeSafetyInput {
    decision: TradingDecision;
    stopLoss?: number | null;
    entry?: number | null;
    takeProfit?: number | null;
    riskReward?: number | null;
    recommendationText?: string;
    averagingDownHasNewSetup?: boolean;
    usesMartingale?: boolean;
}
export declare function enforceTradeSafety(input: TradeSafetyInput): {
    decision: TradingDecision;
    blockedReasons: string[];
};
