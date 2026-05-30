import { MemoryStorage, type KeyValueStorage } from '@aegis/licensing';
export const secureStorage: KeyValueStorage = typeof localStorage === 'undefined' ? new MemoryStorage() : { getItem:(k)=>localStorage.getItem(k), setItem:(k,v)=>localStorage.setItem(k,v), removeItem:(k)=>localStorage.removeItem(k) };
export const secureStorageWarning = 'If secure native storage is unavailable, encrypted local storage should be used and a security warning shown.';
