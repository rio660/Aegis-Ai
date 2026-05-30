export function addPublicKey(registry, keyId, publicKeyPem) { return { ...registry, [keyId]: publicKeyPem }; }
export function getPublicKey(registry, keyId) { return registry[keyId]; }
