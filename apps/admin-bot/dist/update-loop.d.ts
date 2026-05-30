import type { TelegramClient } from './telegram-client.js';
import type { BotStorage } from './bot-storage.js';
import type { CommandRouter } from './command-router.js';
export declare class UpdateLoop {
    private client;
    private storage;
    private router;
    private stopped;
    constructor(client: TelegramClient, storage: BotStorage, router: CommandRouter);
    start(): void;
    stop(): void;
    isRunning(): boolean;
    private loop;
    private process;
}
