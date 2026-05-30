import type { LicensePayload } from '@aegis/shared-types';
import { base64urlDecode, base64urlEncode, sha256, signPayload } from './crypto.js';
export function createActivationKey(payload: LicensePayload, privateKeyPem: string): string { const p = base64urlEncode(JSON.stringify(payload)); const sig = signPayload(payload, privateKeyPem); return `AEGIS-LIC.${p}.${sig}`; }
export function parseActivationKey(key: string): {payload:LicensePayload; signature:string} { const parts = key.trim().split('.'); if (parts.length !== 3 || parts[0] !== 'AEGIS-LIC') throw new Error('INVALID_FORMAT'); return { payload: JSON.parse(base64urlDecode(parts[1]).toString('utf8')) as LicensePayload, signature: parts[2] }; }
export function hashActivationKey(key: string): string { return sha256(key); }
export function clearRawActivationKey(): string { return ''; }
