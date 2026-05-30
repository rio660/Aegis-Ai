import type { PublicKeyRegistry } from './public-key.js';
export declare function addPublicKey(registry: PublicKeyRegistry, keyId: string, publicKeyPem: string): PublicKeyRegistry;
export declare function getPublicKey(registry: PublicKeyRegistry, keyId: string): string | undefined;
