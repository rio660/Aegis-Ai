export class JournalService {
    entries = [];
    add(text, tags = []) { const e = { id: crypto.randomUUID(), text, tags, createdAt: new Date().toISOString() }; this.entries.push(e); return e; }
    list() { return this.entries; }
}
