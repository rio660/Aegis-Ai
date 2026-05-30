import { createHash, generateKeyPairSync, randomBytes, sign, timingSafeEqual as nodeTimingSafeEqual, verify } from 'node:crypto';
export function base64urlEncode(input) {
    const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : Buffer.from(input);
    return buf.toString('base64url');
}
export function base64urlDecode(input) { return Buffer.from(input, 'base64url'); }
export function sha256(input) { return createHash('sha256').update(input).digest('hex'); }
export function randomToken(bytes = 24) { return randomBytes(bytes).toString('base64url'); }
export function generateUuid() { return crypto.randomUUID(); }
export function canonicalJson(value) { return JSON.stringify(value, Object.keys(value).sort()); }
export function generateKeyPair(keyId = `ed25519-${Date.now()}`) {
    const { publicKey, privateKey } = generateKeyPairSync('ed25519');
    return { keyId, publicKeyPem: publicKey.export({ type: 'spki', format: 'pem' }).toString(), privateKeyPem: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString() };
}
export function signPayload(payload, privateKeyPem) { return base64urlEncode(sign(null, Buffer.from(canonicalJson(payload)), privateKeyPem)); }
export function verifySignature(payload, signatureBase64Url, publicKeyPem) {
    try {
        return verify(null, Buffer.from(canonicalJson(payload)), publicKeyPem, base64urlDecode(signatureBase64Url));
    }
    catch {
        return false;
    }
}
export function timingSafeEqual(a, b) {
    const ba = Buffer.from(a);
    const bb = Buffer.from(b);
    return ba.length === bb.length && nodeTimingSafeEqual(ba, bb);
}
