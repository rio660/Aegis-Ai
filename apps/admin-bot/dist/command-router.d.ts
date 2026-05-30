import { ApprovalService } from './approval-service.js';
import type { BotStorage } from './bot-storage.js';
import { RateLimiter } from './rate-limit.js';
export declare class CommandRouter {
    private storage;
    private approvals;
    private send;
    invalidLimiter: RateLimiter;
    requestLimiter: RateLimiter;
    constructor(storage: BotStorage, approvals: ApprovalService, send: (chatId: number | string, text: string) => Promise<void>);
    handleMessage(msg: {
        text?: string;
        chat: {
            id: number;
        };
        from?: {
            id: number;
            username?: string;
        };
    }): Promise<void>;
}
