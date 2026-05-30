import { classifyMarketRegime } from './marketRegime.js';
export function detectStrategy(candles) { if (candles.length < 50)
    return { setup: 'insufficient_data', decision: 'NEED_MORE_DATA', confidence: 0 }; const regime = classifyMarketRegime(candles); if (regime === 'CHOPPY' || regime === 'RANGING')
    return { setup: regime.toLowerCase(), decision: 'WAIT', confidence: 0.55 }; return { setup: `${regime.toLowerCase()}_pullback_candidate`, decision: regime === 'UPTREND' ? 'CANDIDATE_BUY' : 'CANDIDATE_SELL', confidence: 0.62 }; }
