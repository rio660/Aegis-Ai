export interface TelegramUpdate {
    update_id: number;
    message?: {
        message_id: number;
        text?: string;
        chat: {
            id: number;
        };
        from?: {
            id: number;
            username?: string;
            is_bot?: boolean;
        };
    };
}
export declare class TelegramClient {
    private token;
    private fetcher;
    constructor(token: string, fetcher?: typeof fetch);
    private url;
    getUpdates(offset: number, timeout?: number): Promise<TelegramUpdate[]>;
    sendMessage(chatId: string | number, text: string): Promise<void>;
    testToken(): Promise<boolean>;
}
