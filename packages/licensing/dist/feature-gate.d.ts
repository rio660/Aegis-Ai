import type { LicenseFeature, LicensePayload, Plan } from '@aegis/shared-types';
export declare function getPlanFeatures(plan: Plan): LicenseFeature[];
export declare function isFeatureEnabled(license: Pick<LicensePayload, 'features'> | null | undefined, feature: LicenseFeature): boolean;
export declare function requireFeature(license: Pick<LicensePayload, 'features'> | null | undefined, feature: LicenseFeature): void;
