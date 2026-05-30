import type { ApprovalRequestRecord, AuditLogEntry, IssuedLicenseRecord, RevokedLicenseRecord } from '@aegis/shared-types';
export interface AdminSecrets {
    botToken?: string;
    adminTelegramIds: string[];
    privateKeyPem?: string;
    publicKeyPem?: string;
    activeKeyId?: string;
    pinHash?: string;
    lockUntil?: string;
    failedPinAttempts: number;
}
export declare class BotStorage {
    secrets: AdminSecrets;
    requests: Map<string, ApprovalRequestRecord>;
    issued: Map<string, IssuedLicenseRecord>;
    denied: Map<string, ApprovalRequestRecord>;
    revoked: Map<string, RevokedLicenseRecord>;
    audit: AuditLogEntry[];
    updateOffset: number;
    processedUpdates: Set<number>;
    setOffset(offset: number): void;
    addAudit(action: string, detail: Record<string, unknown>, actor?: string): void;
}
