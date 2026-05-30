import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import type { BotStorage } from './bot-storage.js';
export function hashAdminPin(pin:string, salt=randomBytes(16).toString('hex')): string { const hash=createHash('sha256').update(`${salt}:${pin}`).digest('hex'); return `${salt}:${hash}`; }
export function verifyAdminPin(pin:string, stored:string): boolean { const [salt, hash]=stored.split(':'); const attempt=hashAdminPin(pin,salt).split(':')[1]; return timingSafeEqual(Buffer.from(hash), Buffer.from(attempt)); }
export function setupAdminPin(storage:BotStorage, pin:string){ storage.secrets.pinHash=hashAdminPin(pin); storage.secrets.failedPinAttempts=0; }
export function loginAdmin(storage:BotStorage, pin:string): boolean { if(storage.secrets.lockUntil && Date.parse(storage.secrets.lockUntil)>Date.now()) return false; if(!storage.secrets.pinHash) return false; const ok=verifyAdminPin(pin, storage.secrets.pinHash); if(ok){storage.secrets.failedPinAttempts=0; return true;} storage.secrets.failedPinAttempts++; if(storage.secrets.failedPinAttempts>=5) storage.secrets.lockUntil=new Date(Date.now()+15*60*1000).toISOString(); return false; }
export function isAdminTelegramId(storage:BotStorage, id:string|number): boolean { return storage.secrets.adminTelegramIds.includes(String(id)); }
