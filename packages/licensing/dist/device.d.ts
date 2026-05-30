export interface KeyValueStorage {
    getItem(key: string): Promise<string | null> | string | null;
    setItem(key: string, value: string): Promise<void> | void;
    removeItem?(key: string): Promise<void> | void;
}
export declare function generateDeviceId(): string;
export declare function getOrCreateDeviceId(storage: KeyValueStorage): Promise<string>;
export declare function getDeviceHash(deviceId: string): string;
export declare function getDeviceSummary(deviceId: string): string;
