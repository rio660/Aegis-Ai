export type Plan = 'DEMO' | 'BASIC' | 'PRO' | 'LIFETIME';
export type LicenseFeature = 'market_dashboard' | 'ai_analysis' | 'paper_trading' | 'journal' | 'backtesting' | 'performance_review' | 'alerts' | 'export_data';
export const ALL_FEATURES: LicenseFeature[] = ['market_dashboard','ai_analysis','paper_trading','journal','backtesting','performance_review','alerts','export_data'];
export type LicenseStatus = 'ACTIVE' | 'MISSING' | 'INVALID_FORMAT' | 'INVALID_SIGNATURE' | 'EXPIRED' | 'DEVICE_MISMATCH' | 'APP_VERSION_NOT_ALLOWED' | 'FEATURE_NOT_ALLOWED' | 'REVOKED_LOCAL' | 'TAMPERED_STORAGE';
export type RequestStatus = 'PENDING' | 'APPROVED' | 'DENIED' | 'ISSUED' | 'REISSUED' | 'REVOKED_LOCAL_RECORD' | 'EXPIRED';
export type TradingDecision = 'NEED_MORE_DATA' | 'NEED_FRESH_DATA' | 'WAIT' | 'NO_TRADE' | 'CANDIDATE_BUY' | 'CANDIDATE_SELL' | 'HOLD' | 'EXIT';
export type DataStatus = 'LIVE' | 'DELAYED' | 'STALE' | 'MOCK' | 'ERROR';
export interface ActivationRequestPayload { type:'AEGIS_ACTIVATION_REQUEST'; requestId:string; deviceId:string; deviceHash:string; appVersion:string; platform:'android'|'ios'|'web'|'desktop'; createdAt:string; nonce:string; }
export interface LicensePayload { type:'AEGIS_LICENSE'; licenseId:string; requestId:string; deviceId:string; deviceHash:string; telegramUserId:string; telegramUsername:string|null; plan:Plan; features:LicenseFeature[]; maxDevices:1; activationLimit:1; issuedAt:string; expiresAt:string|null; activationNonce:string; keyId:string; appVersionMin:string; appVersionMax:string|null; }
export interface StoredLicense { licensePayload: LicensePayload; licenseSignature: string; activationKeyHash: string; activatedAt: string; deviceId: string; licenseStatus: LicenseStatus; featureFlags: LicenseFeature[]; localActivationAuditLog: AuditLogEntry[]; }
export interface AuditLogEntry { id:string; at:string; action:string; actor?:string; detail:Record<string, unknown>; }
export interface ApprovalRequestRecord { request:ActivationRequestPayload; telegramUserId:string; telegramUsername:string|null; status:RequestStatus; receivedAt:string; invalidCount?:number; }
export interface IssuedLicenseRecord { license:LicensePayload; activationKeyHash:string; status:'ISSUED'|'REISSUED'|'REVOKED_LOCAL_RECORD'; issuedAt:string; telegramUserId:string; }
export interface RevokedLicenseRecord { licenseId:string; telegramUserId:string; deviceHash:string; revokedAt:string; reason:string; adminTelegramId:string; }
