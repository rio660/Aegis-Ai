import { BotRunner, BotStorage } from '@aegis/admin-bot';
export declare class AdminModeController {
    storage: BotStorage;
    runner: BotRunner;
    setupPin(pin: string): void;
    login(pin: string): boolean;
    configure(input: {
        botToken: string;
        adminTelegramIds: string[];
        privateKeyPem: string;
        publicKeyPem: string;
        activeKeyId: string;
    }): void;
    startBot(): void;
    stopBot(): void;
    status(): {
        connected: boolean;
        polling: boolean;
        lastUpdateTimestamp: string;
        currentUpdateOffset: number;
        totalPendingRequests: number;
        totalApprovedRequests: number;
        totalDeniedRequests: number;
        totalIssuedLicenses: number;
        totalRevokedRecords: number;
    };
}
