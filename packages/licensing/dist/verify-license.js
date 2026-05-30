import { getDeviceHash } from './device.js';
import { parseActivationKey, hashActivationKey } from './activation-key.js';
import { verifySignature } from './crypto.js';
import { hasRedeemedActivationKey, loadStoredLicense, saveVerifiedLicense } from './local-redemption.js';
export function isLicenseExpired(payload, now = new Date()) { return payload.expiresAt !== null && Date.parse(payload.expiresAt) <= now.getTime(); }
function compareSemver(a, b) { const pa = a.split('.').map(Number), pb = b.split('.').map(Number); for (let i = 0; i < 3; i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d)
        return d;
} return 0; }
export function isAppVersionAllowed(payload, appVersion) { if (compareSemver(appVersion, payload.appVersionMin) < 0)
    return false; if (payload.appVersionMax && compareSemver(appVersion, payload.appVersionMax) > 0)
    return false; return true; }
export function getLicenseStatus(payload, opts) { if (!payload)
    return 'MISSING'; if (payload.type !== 'AEGIS_LICENSE')
    return 'INVALID_FORMAT'; if (payload.deviceId !== opts.deviceId || payload.deviceHash !== getDeviceHash(opts.deviceId))
    return 'DEVICE_MISMATCH'; if (isLicenseExpired(payload, opts.now))
    return 'EXPIRED'; if (!isAppVersionAllowed(payload, opts.appVersion))
    return 'APP_VERSION_NOT_ALLOWED'; return 'ACTIVE'; }
export function verifyLicenseForDevice(payload, signature, deviceId, appVersion, keys, now = new Date()) { const pub = keys[payload.keyId]; if (!pub)
    return 'INVALID_SIGNATURE'; if (!verifySignature(payload, signature, pub))
    return 'INVALID_SIGNATURE'; return getLicenseStatus(payload, { deviceId, appVersion, now }); }
export async function verifyActivationKey(input) { let parsed; try {
    parsed = parseActivationKey(input.activationKey);
}
catch {
    return { status: 'INVALID_FORMAT' };
} const h = hashActivationKey(input.activationKey); if (input.storage && await hasRedeemedActivationKey(input.storage, h))
    return { status: 'TAMPERED_STORAGE' }; const status = verifyLicenseForDevice(parsed.payload, parsed.signature, input.deviceId, input.appVersion, input.publicKeys, input.now); if (status !== 'ACTIVE')
    return { status }; const stored = { licensePayload: parsed.payload, licenseSignature: parsed.signature, activationKeyHash: h, activatedAt: new Date().toISOString(), deviceId: input.deviceId, licenseStatus: 'ACTIVE', featureFlags: parsed.payload.features, localActivationAuditLog: [{ id: crypto.randomUUID(), at: new Date().toISOString(), action: 'ACTIVATED', detail: { licenseId: parsed.payload.licenseId } }] }; if (input.storage)
    await saveVerifiedLicense(input.storage, stored); return { status, storedLicense: stored }; }
export async function verifyStoredLicenseOnLaunch(storage, deviceId, appVersion, publicKeys, now = new Date()) { const stored = await loadStoredLicense(storage); if (!stored)
    return 'MISSING'; if (stored.deviceId !== deviceId || stored.licensePayload.deviceId !== deviceId)
    return 'TAMPERED_STORAGE'; return verifyLicenseForDevice(stored.licensePayload, stored.licenseSignature, deviceId, appVersion, publicKeys, now); }
