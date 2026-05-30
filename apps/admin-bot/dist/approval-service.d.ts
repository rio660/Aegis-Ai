import type { LicenseFeature, Plan } from '@aegis/shared-types';
import type { BotStorage } from './bot-storage.js';
export declare class ApprovalService {
    private storage;
    constructor(storage: BotStorage);
    receiveRequest(code: string, telegramUserId: string, telegramUsername: string | null): import("@aegis/shared-types").ApprovalRequestRecord | {
        request: import("@aegis/shared-types").ActivationRequestPayload;
        telegramUserId: string;
        telegramUsername: string | null;
        status: "PENDING";
        receivedAt: string;
    };
    approve(requestId: string, opts: {
        plan: Plan;
        features: LicenseFeature[];
        expiresAt: string | null;
        adminTelegramId: string;
        reissue?: boolean;
    }): {
        activationKey: string;
    };
    deny(requestId: string, adminTelegramId: string): void;
    revoke(licenseId: string, reason: string, adminTelegramId: string): {
        licenseId: string;
        telegramUserId: string;
        deviceHash: string;
        revokedAt: string;
        reason: string;
        adminTelegramId: string;
    };
}
