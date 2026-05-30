import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
export function hashAdminPin(pin, salt = randomBytes(16).toString('hex')) { const hash = createHash('sha256').update(`${salt}:${pin}`).digest('hex'); return `${salt}:${hash}`; }
export function verifyAdminPin(pin, stored) { const [salt, hash] = stored.split(':'); const attempt = hashAdminPin(pin, salt).split(':')[1]; return timingSafeEqual(Buffer.from(hash), Buffer.from(attempt)); }
export function setupAdminPin(storage, pin) { storage.secrets.pinHash = hashAdminPin(pin); storage.secrets.failedPinAttempts = 0; }
export function loginAdmin(storage, pin) { if (storage.secrets.lockUntil && Date.parse(storage.secrets.lockUntil) > Date.now())
    return false; if (!storage.secrets.pinHash)
    return false; const ok = verifyAdminPin(pin, storage.secrets.pinHash); if (ok) {
    storage.secrets.failedPinAttempts = 0;
    return true;
} storage.secrets.failedPinAttempts++; if (storage.secrets.failedPinAttempts >= 5)
    storage.secrets.lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString(); return false; }
export function isAdminTelegramId(storage, id) { return storage.secrets.adminTelegramIds.includes(String(id)); }
