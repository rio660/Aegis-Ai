import type { LicenseFeature, LicensePayload, Plan } from '@aegis/shared-types';
import { ALL_FEATURES } from '@aegis/shared-types';
const PLAN_FEATURES: Record<Plan, LicenseFeature[]> = { DEMO:['market_dashboard'], BASIC:['market_dashboard','ai_analysis','paper_trading','journal'], PRO:['market_dashboard','ai_analysis','paper_trading','journal','backtesting','performance_review','alerts'], LIFETIME: ALL_FEATURES };
export function getPlanFeatures(plan: Plan): LicenseFeature[] { return PLAN_FEATURES[plan]; }
export function isFeatureEnabled(license: Pick<LicensePayload,'features'> | null | undefined, feature: LicenseFeature): boolean { return Boolean(license?.features.includes(feature)); }
export function requireFeature(license: Pick<LicensePayload,'features'> | null | undefined, feature: LicenseFeature): void { if (!isFeatureEnabled(license, feature)) throw new Error('FEATURE_NOT_ALLOWED'); }
