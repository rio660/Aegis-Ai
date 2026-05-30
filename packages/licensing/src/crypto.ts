import { createHash, generateKeyPairSync, randomBytes, sign, timingSafeEqual as nodeTimingSafeEqual, verify } from 'node:crypto';

export function base64urlEncode(input: string | Buffer | Uint8Array): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : Buffer.from(input);
  return buf.toString('base64url');
}
export function base64urlDecode(input: string): Buffer { return Buffer.from(input, 'base64url'); }
export function sha256(input: string | Buffer): string { return createHash('sha256').update(input).digest('hex'); }
export function randomToken(bytes = 24): string { return randomBytes(bytes).toString('base64url'); }
export function generateUuid(): string { return crypto.randomUUID(); }
export function canonicalJson(value: unknown): string { return JSON.stringify(value, Object.keys(value as Record<string, unknown>).sort()); }
export interface LicenseKeyPair { publicKeyPem:string; privateKeyPem:string; keyId:string; }
export function generateKeyPair(keyId = `ed25519-${Date.now()}`): LicenseKeyPair {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  return { keyId, publicKeyPem: publicKey.export({ type:'spki', format:'pem' }).toString(), privateKeyPem: privateKey.export({ type:'pkcs8', format:'pem' }).toString() };
}
export function signPayload(payload: unknown, privateKeyPem: string): string { return base64urlEncode(sign(null, Buffer.from(canonicalJson(payload)), privateKeyPem)); }
export function verifySignature(payload: unknown, signatureBase64Url: string, publicKeyPem: string): boolean {
  try { return verify(null, Buffer.from(canonicalJson(payload)), publicKeyPem, base64urlDecode(signatureBase64Url)); } catch { return false; }
}
export function timingSafeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a); const bb = Buffer.from(b);
  return ba.length === bb.length && nodeTimingSafeEqual(ba, bb);
}
