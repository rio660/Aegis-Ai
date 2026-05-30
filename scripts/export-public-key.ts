import { readFileSync } from 'node:fs';
const keypair = JSON.parse(readFileSync(process.argv[2] ?? 'license-keypair.json','utf8')) as {keyId:string; publicKeyPem:string};
console.log(JSON.stringify({keyId:keypair.keyId, publicKeyPem:keypair.publicKeyPem}, null, 2));
