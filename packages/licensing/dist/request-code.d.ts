import type { ActivationRequestPayload } from '@aegis/shared-types';
export declare function getRequestCodeChecksum(payloadB64: string): string;
export declare function createRequestCode(input: {
    deviceId: string;
    appVersion: string;
    platform: ActivationRequestPayload['platform'];
    requestId?: string;
    createdAt?: string;
}): string;
export declare function parseRequestCode(code: string): ActivationRequestPayload;
export declare function isRequestCodeExpired(payload: ActivationRequestPayload, now?: Date): boolean;
export declare function validateRequestCode(code: string, now?: Date): ActivationRequestPayload;
