import { BotStorage } from './bot-storage.js';
import { ApprovalService } from './approval-service.js';
import { UpdateLoop } from './update-loop.js';
export declare class BotRunner {
    storage: BotStorage;
    approvals: ApprovalService;
    loop?: UpdateLoop;
    constructor(storage?: BotStorage);
    start(token?: string | undefined): void;
    stop(): void;
}
