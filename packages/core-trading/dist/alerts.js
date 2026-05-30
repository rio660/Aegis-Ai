export function createAlert(level, message) { return { id: crypto.randomUUID(), level, message, createdAt: new Date().toISOString() }; }
