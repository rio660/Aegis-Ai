const LICENSE_KEY = 'aegis.license';
const REDEEMED_PREFIX = 'aegis.redeemed.';
const AUDIT_KEY = 'aegis.activationAudit';
export async function hasRedeemedActivationKey(storage, activationKeyHash) { return (await storage.getItem(`${REDEEMED_PREFIX}${activationKeyHash}`)) === '1'; }
export async function markActivationKeyRedeemed(storage, activationKeyHash) { await storage.setItem(`${REDEEMED_PREFIX}${activationKeyHash}`, '1'); }
export async function saveVerifiedLicense(storage, license) { await storage.setItem(LICENSE_KEY, JSON.stringify(license)); await markActivationKeyRedeemed(storage, license.activationKeyHash); }
export async function loadStoredLicense(storage) { const raw = await storage.getItem(LICENSE_KEY); if (!raw)
    return null; try {
    return JSON.parse(raw);
}
catch {
    return null;
} }
export async function clearStoredLicense(storage) { await storage.removeItem?.(LICENSE_KEY); }
export async function appendActivationAuditLog(storage, entry) { const logs = await getActivationAuditLogs(storage); logs.push(entry); await storage.setItem(AUDIT_KEY, JSON.stringify(logs)); }
export async function getActivationAuditLogs(storage) { const raw = await storage.getItem(AUDIT_KEY); return raw ? JSON.parse(raw) : []; }
export class MemoryStorage {
    map = new Map();
    getItem(k) { return this.map.get(k) ?? null; }
    setItem(k, v) { this.map.set(k, v); }
    removeItem(k) { this.map.delete(k); }
    clear() { this.map.clear(); }
    keys() { return [...this.map.keys()]; }
}
