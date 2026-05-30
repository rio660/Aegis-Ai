import { generateKeyPair } from '@aegis/licensing';
console.log(JSON.stringify(generateKeyPair(process.argv[2]), null, 2));
