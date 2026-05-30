import { sha256 } from './crypto.js';
export interface KeyValueStorage { getItem(key:string): Promise<string|null>|string|null; setItem(key:string,value:string): Promise<void>|void; removeItem?(key:string): Promise<void>|void; }
const DEVICE_ID_KEY = 'aegis.deviceId';
export function generateDeviceId(): string { return crypto.randomUUID(); }
export async function getOrCreateDeviceId(storage: KeyValueStorage): Promise<string> { const existing = await storage.getItem(DEVICE_ID_KEY); if (existing) return existing; const id = generateDeviceId(); await storage.setItem(DEVICE_ID_KEY, id); return id; }
export function getDeviceHash(deviceId: string): string { return sha256(deviceId); }
export function getDeviceSummary(deviceId: string): string { return `${getDeviceHash(deviceId).slice(0, 12)}…`; }
