import { base64urlDecode, base64urlEncode, sha256, signPayload } from './crypto.js';
export function createActivationKey(payload, privateKeyPem) { const p = base64urlEncode(JSON.stringify(payload)); const sig = signPayload(payload, privateKeyPem); return `AEGIS-LIC.${p}.${sig}`; }
export function parseActivationKey(key) { const parts = key.trim().split('.'); if (parts.length !== 3 || parts[0] !== 'AEGIS-LIC')
    throw new Error('INVALID_FORMAT'); return { payload: JSON.parse(base64urlDecode(parts[1]).toString('utf8')), signature: parts[2] }; }
export function hashActivationKey(key) { return sha256(key); }
export function clearRawActivationKey() { return ''; }
