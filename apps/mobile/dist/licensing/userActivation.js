import { createRequestCode, getOrCreateDeviceId, verifyActivationKey, verifyStoredLicenseOnLaunch } from '@aegis/licensing';
export async function getActivationRequestCode(storage, appVersion = '1.0.0') { const deviceId = await getOrCreateDeviceId(storage); return createRequestCode({ deviceId, appVersion, platform: 'android' }); }
export async function activateOnce(storage, activationKey, publicKeys, appVersion = '1.0.0') { const deviceId = await getOrCreateDeviceId(storage); return verifyActivationKey({ activationKey, deviceId, appVersion, publicKeys, storage }); }
export async function launchLicenseStatus(storage, publicKeys, appVersion = '1.0.0') { const deviceId = await getOrCreateDeviceId(storage); return verifyStoredLicenseOnLaunch(storage, deviceId, appVersion, publicKeys); }
