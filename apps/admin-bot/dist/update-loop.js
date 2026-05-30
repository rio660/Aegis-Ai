export class UpdateLoop {
    client;
    storage;
    router;
    stopped = true;
    constructor(client, storage, router) {
        this.client = client;
        this.storage = storage;
        this.router = router;
    }
    start() { this.stopped = false; void this.loop(); }
    stop() { this.stopped = true; }
    isRunning() { return !this.stopped; }
    async loop() { while (!this.stopped) {
        try {
            const updates = await this.client.getUpdates(this.storage.updateOffset, 25);
            for (const u of updates)
                await this.process(u);
        }
        catch {
            await new Promise(r => setTimeout(r, 1500));
        }
    } }
    async process(update) { if (this.storage.processedUpdates.has(update.update_id))
        return; this.storage.processedUpdates.add(update.update_id); this.storage.setOffset(update.update_id + 1); if (update.message)
        await this.router.handleMessage(update.message); }
}
