import type { AuditLogEntry, StoredLicense } from '@aegis/shared-types';
import type { KeyValueStorage } from './device.js';
const LICENSE_KEY = 'aegis.license';
const REDEEMED_PREFIX = 'aegis.redeemed.';
const AUDIT_KEY = 'aegis.activationAudit';
export async function hasRedeemedActivationKey(storage: KeyValueStorage, activationKeyHash: string): Promise<boolean> { return (await storage.getItem(`${REDEEMED_PREFIX}${activationKeyHash}`)) === '1'; }
export async function markActivationKeyRedeemed(storage: KeyValueStorage, activationKeyHash: string): Promise<void> { await storage.setItem(`${REDEEMED_PREFIX}${activationKeyHash}`, '1'); }
export async function saveVerifiedLicense(storage: KeyValueStorage, license: StoredLicense): Promise<void> { await storage.setItem(LICENSE_KEY, JSON.stringify(license)); await markActivationKeyRedeemed(storage, license.activationKeyHash); }
export async function loadStoredLicense(storage: KeyValueStorage): Promise<StoredLicense|null> { const raw = await storage.getItem(LICENSE_KEY); if (!raw) return null; try { return JSON.parse(raw) as StoredLicense; } catch { return null; } }
export async function clearStoredLicense(storage: KeyValueStorage): Promise<void> { await storage.removeItem?.(LICENSE_KEY); }
export async function appendActivationAuditLog(storage: KeyValueStorage, entry: AuditLogEntry): Promise<void> { const logs = await getActivationAuditLogs(storage); logs.push(entry); await storage.setItem(AUDIT_KEY, JSON.stringify(logs)); }
export async function getActivationAuditLogs(storage: KeyValueStorage): Promise<AuditLogEntry[]> { const raw = await storage.getItem(AUDIT_KEY); return raw ? JSON.parse(raw) as AuditLogEntry[] : []; }
export class MemoryStorage implements KeyValueStorage { private map = new Map<string,string>(); getItem(k:string){ return this.map.get(k) ?? null; } setItem(k:string,v:string){ this.map.set(k,v); } removeItem(k:string){ this.map.delete(k); } clear(){ this.map.clear(); } keys(){ return [...this.map.keys()]; } }
