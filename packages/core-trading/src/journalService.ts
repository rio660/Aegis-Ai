export interface JournalEntry { id:string; tradeId?:string; text:string; createdAt:string; tags:string[]; }
export class JournalService { private entries:JournalEntry[]=[]; add(text:string,tags:string[]=[]){ const e={id:crypto.randomUUID(),text,tags,createdAt:new Date().toISOString()}; this.entries.push(e); return e;} list(){return this.entries;} }
