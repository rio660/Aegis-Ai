export class RateLimiter {
    maxHits;
    windowMs;
    hits = new Map();
    constructor(maxHits, windowMs) {
        this.maxHits = maxHits;
        this.windowMs = windowMs;
    }
    allow(key, now = Date.now()) { const arr = (this.hits.get(key) ?? []).filter(t => now - t < this.windowMs); if (arr.length >= this.maxHits) {
        this.hits.set(key, arr);
        return false;
    } arr.push(now); this.hits.set(key, arr); return true; }
}
