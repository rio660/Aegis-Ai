import type { PublicKeyRegistry } from './public-key.js';
export function addPublicKey(registry: PublicKeyRegistry, keyId: string, publicKeyPem: string): PublicKeyRegistry { return { ...registry, [keyId]: publicKeyPem }; }
export function getPublicKey(registry: PublicKeyRegistry, keyId: string): string | undefined { return registry[keyId]; }
