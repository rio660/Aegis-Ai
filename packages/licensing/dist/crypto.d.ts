export declare function base64urlEncode(input: string | Buffer | Uint8Array): string;
export declare function base64urlDecode(input: string): Buffer;
export declare function sha256(input: string | Buffer): string;
export declare function randomToken(bytes?: number): string;
export declare function generateUuid(): string;
export declare function canonicalJson(value: unknown): string;
export interface LicenseKeyPair {
    publicKeyPem: string;
    privateKeyPem: string;
    keyId: string;
}
export declare function generateKeyPair(keyId?: string): LicenseKeyPair;
export declare function signPayload(payload: unknown, privateKeyPem: string): string;
export declare function verifySignature(payload: unknown, signatureBase64Url: string, publicKeyPem: string): boolean;
export declare function timingSafeEqual(a: string, b: string): boolean;
