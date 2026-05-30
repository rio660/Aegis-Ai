export interface InternalAlert { id:string; level:'info'|'warning'|'critical'; message:string; createdAt:string; }
export function createAlert(level:InternalAlert['level'], message:string): InternalAlert { return {id:crypto.randomUUID(), level, message, createdAt:new Date().toISOString()}; }
