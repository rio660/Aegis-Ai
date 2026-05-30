import type { ActivationRequestPayload, LicenseFeature, LicensePayload, Plan } from '@aegis/shared-types';
export declare function buildLicensePayload(input: {
    request: ActivationRequestPayload;
    telegramUserId: string;
    telegramUsername: string | null;
    plan: Plan;
    features: LicenseFeature[];
    expiresAt: string | null;
    keyId: string;
    appVersionMin?: string;
    appVersionMax?: string | null;
}): LicensePayload;
export declare function issueActivationKey(payload: LicensePayload, privateKeyPem: string): {
    activationKey: string;
    activationKeyHash: string;
};
