export class BotStorage {
    secrets = { adminTelegramIds: [], failedPinAttempts: 0 };
    requests = new Map();
    issued = new Map();
    denied = new Map();
    revoked = new Map();
    audit = [];
    updateOffset = 0;
    processedUpdates = new Set();
    setOffset(offset) { this.updateOffset = offset; }
    addAudit(action, detail, actor) { this.audit.push({ id: crypto.randomUUID(), at: new Date().toISOString(), action, actor, detail }); }
}
