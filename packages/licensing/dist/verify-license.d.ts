import type { LicensePayload, LicenseStatus, StoredLicense } from '@aegis/shared-types';
import type { PublicKeyRegistry } from './public-key.js';
import type { KeyValueStorage } from './device.js';
export declare function isLicenseExpired(payload: LicensePayload, now?: Date): boolean;
export declare function isAppVersionAllowed(payload: LicensePayload, appVersion: string): boolean;
export declare function getLicenseStatus(payload: LicensePayload | undefined | null, opts: {
    deviceId: string;
    appVersion: string;
    now?: Date;
}): LicenseStatus;
export declare function verifyLicenseForDevice(payload: LicensePayload, signature: string, deviceId: string, appVersion: string, keys: PublicKeyRegistry, now?: Date): LicenseStatus;
export declare function verifyActivationKey(input: {
    activationKey: string;
    deviceId: string;
    appVersion: string;
    publicKeys: PublicKeyRegistry;
    storage?: KeyValueStorage;
    now?: Date;
}): Promise<{
    status: LicenseStatus;
    storedLicense?: StoredLicense;
}>;
export declare function verifyStoredLicenseOnLaunch(storage: KeyValueStorage, deviceId: string, appVersion: string, publicKeys: PublicKeyRegistry, now?: Date): Promise<LicenseStatus>;
