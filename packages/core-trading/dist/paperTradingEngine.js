export class PaperTradingEngine {
    trades = [];
    open(t) { if (!t.stopLoss)
        throw new Error('STOP_LOSS_REQUIRED'); const trade = { ...t, id: crypto.randomUUID(), openedAt: new Date().toISOString() }; this.trades.push(trade); return trade; }
    list() { return this.trades; }
}
