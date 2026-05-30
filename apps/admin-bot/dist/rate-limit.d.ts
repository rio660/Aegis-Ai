export declare class RateLimiter {
    private maxHits;
    private windowMs;
    private hits;
    constructor(maxHits: number, windowMs: number);
    allow(key: string, now?: number): boolean;
}
