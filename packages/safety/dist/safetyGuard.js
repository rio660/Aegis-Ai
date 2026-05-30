export const CORE_SAFETY_MESSAGE = 'Winrate 100% tidak realistis dan tidak boleh dijadikan target. Target yang benar adalah disiplin eksekusi, risk management, dan evaluasi performa berbasis data.';
export const BLOCKED_RESPONSE = 'Klaim ini tidak realistis dan berbahaya. Aplikasi ini hanya membantu analisis, simulasi, dan risk management.';
export const BLOCKED_PHRASES = ['profit guaranteed', '100% winrate', 'risk-free', 'no loss', 'always profitable', 'get rich quick', 'all in', 'tanpa stop loss', 'pasti profit', 'pasti naik', 'pasti turun', 'anti loss', 'bebas risiko'];
export function containsBlockedPhrase(text) { const lower = text.toLowerCase(); return BLOCKED_PHRASES.some(p => lower.includes(p)); }
export function guardText(text) { if (containsBlockedPhrase(text))
    return { allowed: false, message: text.toLowerCase().includes('100% winrate') ? CORE_SAFETY_MESSAGE : BLOCKED_RESPONSE }; return { allowed: true }; }
export function enforceTradeSafety(input) { const reasons = []; if (input.recommendationText && containsBlockedPhrase(input.recommendationText))
    reasons.push('BLOCKED_CLAIM'); if (!input.stopLoss)
    reasons.push('STOP_LOSS_REQUIRED'); if (input.riskReward !== null && input.riskReward !== null && input.riskReward !== undefined && input.riskReward < 1.5)
    reasons.push('RISK_REWARD_TOO_LOW'); if (input.usesMartingale)
    reasons.push('MARTINGALE_BLOCKED'); if (input.averagingDownHasNewSetup === false)
    reasons.push('AVERAGING_DOWN_WITHOUT_SETUP'); if (reasons.includes('STOP_LOSS_REQUIRED'))
    return { decision: 'NO_TRADE', blockedReasons: reasons }; if (reasons.length)
    return { decision: input.riskReward !== null && input.riskReward !== undefined && input.riskReward < 1.5 ? 'WAIT' : 'NO_TRADE', blockedReasons: reasons }; return { decision: input.decision, blockedReasons: [] }; }
