import { generateKeyPair } from '@aegis/licensing';
const rotated = generateKeyPair(`ed25519-${new Date().toISOString().slice(0,10)}`);
console.log(JSON.stringify(rotated, null, 2));
