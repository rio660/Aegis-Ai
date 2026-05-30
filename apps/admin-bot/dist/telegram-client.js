export class TelegramClient {
    token;
    fetcher;
    constructor(token, fetcher = fetch) {
        this.token = token;
        this.fetcher = fetcher;
    }
    url(method) { return `https://api.telegram.org/bot${this.token}/${method}`; }
    async getUpdates(offset, timeout = 25) { const res = await this.fetcher(this.url('getUpdates'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ offset, timeout, allowed_updates: ['message', 'callback_query'] }) }); if (!res.ok)
        throw new Error(`Telegram getUpdates failed ${res.status}`); const json = await res.json(); return json.result; }
    async sendMessage(chatId, text) { const res = await this.fetcher(this.url('sendMessage'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text }) }); if (!res.ok)
        throw new Error(`Telegram sendMessage failed ${res.status}`); }
    async testToken() { const res = await this.fetcher(this.url('getMe')); return res.ok; }
}
