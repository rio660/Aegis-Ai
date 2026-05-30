import { type PublicKeyRegistry, type KeyValueStorage } from '@aegis/licensing';
export declare function getActivationRequestCode(storage: KeyValueStorage, appVersion?: string): Promise<string>;
export declare function activateOnce(storage: KeyValueStorage, activationKey: string, publicKeys: PublicKeyRegistry, appVersion?: string): Promise<{
    status: import("@aegis/shared-types").LicenseStatus;
    storedLicense?: import("@aegis/shared-types").StoredLicense;
}>;
export declare function launchLicenseStatus(storage: KeyValueStorage, publicKeys: PublicKeyRegistry, appVersion?: string): Promise<import("@aegis/shared-types").LicenseStatus>;
