export interface JournalEntry {
    id: string;
    tradeId?: string;
    text: string;
    createdAt: string;
    tags: string[];
}
export declare class JournalService {
    private entries;
    add(text: string, tags?: string[]): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        text: string;
        tags: string[];
        createdAt: string;
    };
    list(): JournalEntry[];
}
