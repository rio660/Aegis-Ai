import type { LicensePayload } from '@aegis/shared-types';
export declare function createActivationKey(payload: LicensePayload, privateKeyPem: string): string;
export declare function parseActivationKey(key: string): {
    payload: LicensePayload;
    signature: string;
};
export declare function hashActivationKey(key: string): string;
export declare function clearRawActivationKey(): string;
