import { sha256 } from './crypto.js';
const DEVICE_ID_KEY = 'aegis.deviceId';
export function generateDeviceId() { return crypto.randomUUID(); }
export async function getOrCreateDeviceId(storage) { const existing = await storage.getItem(DEVICE_ID_KEY); if (existing)
    return existing; const id = generateDeviceId(); await storage.setItem(DEVICE_ID_KEY, id); return id; }
export function getDeviceHash(deviceId) { return sha256(deviceId); }
export function getDeviceSummary(deviceId) { return `${getDeviceHash(deviceId).slice(0, 12)}…`; }
