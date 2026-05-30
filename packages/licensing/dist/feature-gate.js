import { ALL_FEATURES } from '@aegis/shared-types';
const PLAN_FEATURES = { DEMO: ['market_dashboard'], BASIC: ['market_dashboard', 'ai_analysis', 'paper_trading', 'journal'], PRO: ['market_dashboard', 'ai_analysis', 'paper_trading', 'journal', 'backtesting', 'performance_review', 'alerts'], LIFETIME: ALL_FEATURES };
export function getPlanFeatures(plan) { return PLAN_FEATURES[plan]; }
export function isFeatureEnabled(license, feature) { return Boolean(license?.features.includes(feature)); }
export function requireFeature(license, feature) { if (!isFeatureEnabled(license, feature))
    throw new Error('FEATURE_NOT_ALLOWED'); }
