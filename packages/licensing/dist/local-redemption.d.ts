import type { AuditLogEntry, StoredLicense } from '@aegis/shared-types';
import type { KeyValueStorage } from './device.js';
export declare function hasRedeemedActivationKey(storage: KeyValueStorage, activationKeyHash: string): Promise<boolean>;
export declare function markActivationKeyRedeemed(storage: KeyValueStorage, activationKeyHash: string): Promise<void>;
export declare function saveVerifiedLicense(storage: KeyValueStorage, license: StoredLicense): Promise<void>;
export declare function loadStoredLicense(storage: KeyValueStorage): Promise<StoredLicense | null>;
export declare function clearStoredLicense(storage: KeyValueStorage): Promise<void>;
export declare function appendActivationAuditLog(storage: KeyValueStorage, entry: AuditLogEntry): Promise<void>;
export declare function getActivationAuditLogs(storage: KeyValueStorage): Promise<AuditLogEntry[]>;
export declare class MemoryStorage implements KeyValueStorage {
    private map;
    getItem(k: string): string | null;
    setItem(k: string, v: string): void;
    removeItem(k: string): void;
    clear(): void;
    keys(): string[];
}
