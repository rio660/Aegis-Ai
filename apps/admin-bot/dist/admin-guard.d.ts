import type { BotStorage } from './bot-storage.js';
export declare function hashAdminPin(pin: string, salt?: any): string;
export declare function verifyAdminPin(pin: string, stored: string): boolean;
export declare function setupAdminPin(storage: BotStorage, pin: string): void;
export declare function loginAdmin(storage: BotStorage, pin: string): boolean;
export declare function isAdminTelegramId(storage: BotStorage, id: string | number): boolean;
