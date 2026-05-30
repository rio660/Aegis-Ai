import { base64urlDecode, base64urlEncode, randomToken, sha256, timingSafeEqual } from './crypto.js';
import { getDeviceHash } from './device.js';
export function getRequestCodeChecksum(payloadB64) { return sha256(`AEGIS-REQ.${payloadB64}`).slice(0, 16); }
export function createRequestCode(input) { const payload = { type: 'AEGIS_ACTIVATION_REQUEST', requestId: input.requestId ?? crypto.randomUUID(), deviceId: input.deviceId, deviceHash: getDeviceHash(input.deviceId), appVersion: input.appVersion, platform: input.platform, createdAt: input.createdAt ?? new Date().toISOString(), nonce: randomToken() }; const p = base64urlEncode(JSON.stringify(payload)); return `AEGIS-REQ.${p}.${getRequestCodeChecksum(p)}`; }
export function parseRequestCode(code) { const parts = code.trim().split('.'); if (parts.length !== 3 || parts[0] !== 'AEGIS-REQ')
    throw new Error('INVALID_FORMAT'); if (!timingSafeEqual(getRequestCodeChecksum(parts[1]), parts[2]))
    throw new Error('INVALID_CHECKSUM'); const payload = JSON.parse(base64urlDecode(parts[1]).toString('utf8')); return payload; }
export function isRequestCodeExpired(payload, now = new Date()) { return now.getTime() - Date.parse(payload.createdAt) > 24 * 60 * 60 * 1000; }
export function validateRequestCode(code, now = new Date()) { const payload = parseRequestCode(code); if (payload.type !== 'AEGIS_ACTIVATION_REQUEST')
    throw new Error('INVALID_TYPE'); if (payload.deviceHash !== getDeviceHash(payload.deviceId))
    throw new Error('DEVICE_HASH_MISMATCH'); if (isRequestCodeExpired(payload, now))
    throw new Error('REQUEST_EXPIRED'); return payload; }
