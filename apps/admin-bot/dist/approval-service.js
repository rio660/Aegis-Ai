import { validateRequestCode } from '@aegis/licensing';
import { buildLicensePayload, issueActivationKey } from './license-generator.js';
export class ApprovalService {
    storage;
    constructor(storage) {
        this.storage = storage;
    }
    receiveRequest(code, telegramUserId, telegramUsername) { const request = validateRequestCode(code); const existing = this.storage.requests.get(request.requestId); if (existing)
        return existing; const record = { request, telegramUserId, telegramUsername, status: 'PENDING', receivedAt: new Date().toISOString() }; this.storage.requests.set(request.requestId, record); this.storage.addAudit('REQUEST_RECEIVED', { requestId: request.requestId, deviceHash: request.deviceHash.slice(0, 12) }, telegramUserId); return record; }
    approve(requestId, opts) { const rec = this.storage.requests.get(requestId); if (!rec)
        throw new Error('REQUEST_NOT_FOUND'); if (rec.status === 'ISSUED' && !opts.reissue)
        throw new Error('DUPLICATE_APPROVAL_BLOCKED'); if (rec.status !== 'PENDING' && !opts.reissue)
        throw new Error('REQUEST_NOT_PENDING'); const keyId = this.storage.secrets.activeKeyId; const privateKeyPem = this.storage.secrets.privateKeyPem; if (!keyId || !privateKeyPem)
        throw new Error('SIGNING_KEY_NOT_CONFIGURED'); const payload = buildLicensePayload({ request: rec.request, telegramUserId: rec.telegramUserId, telegramUsername: rec.telegramUsername, plan: opts.plan, features: opts.features, expiresAt: opts.expiresAt, keyId }); const issued = issueActivationKey(payload, privateKeyPem); rec.status = opts.reissue ? 'REISSUED' : 'ISSUED'; this.storage.issued.set(payload.licenseId, { license: payload, activationKeyHash: issued.activationKeyHash, status: rec.status, issuedAt: payload.issuedAt, telegramUserId: rec.telegramUserId }); this.storage.addAudit(opts.reissue ? 'LICENSE_REISSUED' : 'LICENSE_ISSUED', { requestId, licenseId: payload.licenseId }, opts.adminTelegramId); return { activationKey: issued.activationKey }; }
    deny(requestId, adminTelegramId) { const rec = this.storage.requests.get(requestId); if (!rec)
        throw new Error('REQUEST_NOT_FOUND'); rec.status = 'DENIED'; this.storage.denied.set(requestId, rec); this.storage.addAudit('REQUEST_DENIED', { requestId }, adminTelegramId); }
    revoke(licenseId, reason, adminTelegramId) { const issued = this.storage.issued.get(licenseId); if (!issued)
        throw new Error('LICENSE_NOT_FOUND'); issued.status = 'REVOKED_LOCAL_RECORD'; const record = { licenseId, telegramUserId: issued.telegramUserId, deviceHash: issued.license.deviceHash, revokedAt: new Date().toISOString(), reason, adminTelegramId }; this.storage.revoked.set(licenseId, record); this.storage.addAudit('LOCAL_REVOKE_RECORDED', { licenseId, reason }, adminTelegramId); return record; }
}
