import { guardText, CORE_SAFETY_MESSAGE } from '@aegis/safety';
export function buildAIAnalysisPrompt(context, userQuestion = '') { const guard = guardText(userQuestion); if (!guard.allowed)
    return guard.message ?? CORE_SAFETY_MESSAGE; return `Analyze only this structured Aegis engine context. Do not fabricate numbers. Return NEED_MORE_DATA for incomplete data.\n${JSON.stringify(context, null, 2)}`; }
