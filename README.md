# Aegis Trade AI

Aegis Trade AI is a risk-first AI trading assistant for market analysis, risk management, paper trading, journaling, backtesting, performance review, internal alerts, and structured AI explanations. It is not a financial advisor, does not guarantee profit, does not target 100% winrate, does not collect exchange trading API keys, and does not perform real-money auto trading.

Core safety message:

> Winrate 100% tidak realistis dan tidak boleh dijadikan target. Target yang benar adalah disiplin eksekusi, risk management, dan evaluasi performa berbasis data.

## Production architecture

```text
aegis-trade-ai/
├─ apps/
│  ├─ mobile/          # React + TypeScript + Capacitor Android-capable app
│  └─ admin-bot/       # Telegram Bot API long-polling runtime controlled by Admin Mode
├─ packages/
│  ├─ core-trading/    # Indicators, regime, strategies, risk, paper trading, journal, backtest
│  ├─ licensing/       # Device IDs, request codes, Ed25519 licenses, feature gates
│  ├─ shared-types/    # Shared TypeScript contracts
│  ├─ safety/          # Global safety guard and blocked-claim policy
│  └─ ui/              # Reserved for extracted UI components
├─ docs/
├─ scripts/
└─ tests/
```

## Offline Telegram activation model

Aegis Trade AI uses Telegram as an admin-controlled message transport, not as cloud login. No hosting, custom domain, webhook, Telegram Login Widget, NextAuth, server sessions, or browser-only premium checks are required.

Flow:

1. The Android app generates a crypto-secure random device ID on first launch and stores it locally.
2. The app shows an activation request code: `AEGIS-REQ.<payload>.<checksum>`.
3. The user sends the full request code to the official Telegram bot.
4. The owner opens Admin Mode inside Aegis Trade AI, enters the bot token and signing key, and starts long polling.
5. The bot receives request codes through `getUpdates`, stores update offsets, deduplicates updates, and shows pending requests in Admin Mode.
6. Admin approves or denies. Approval signs a device-bound offline license and sends `AEGIS-LIC.<payload>.<signature>` to the user through `sendMessage`.
7. The user pastes the activation key once. The app verifies the signature with bundled public keys, checks device binding, checks app version and expiry, stores the verified license and activation-key hash, and removes/hides the raw key.
8. Future launches verify the stored license locally and skip the activation form while the license is valid.

## Why no webhook or Telegram Login Widget is used

Webhooks require a public HTTPS endpoint and therefore hosting/domain infrastructure. This project intentionally uses Telegram Bot API long polling (`getUpdates`) so Admin Mode can start/stop the bot directly from the app. Telegram Login Widget is not used because activation is based on admin approval and signed offline licenses, not a cloud user session.

## Security notice and limitations

No offline licensing system is uncrackable. This system uses device-bound signed activation keys to prevent casual sharing and unauthorized activation. It does not claim perfect anti-piracy, global online revocation, or the ability to destroy activation keys after they have been sent.

Security controls implemented:

- Ed25519 asymmetric licenses; the user app needs only public verification keys.
- No shared HMAC secret in the user app.
- No Telegram bot token in normal user licensing code.
- No private signing key in user licensing code.
- Activation keys are bound to exactly one locally generated device ID.
- Activation-key hash is stored after redemption; raw activation key is not stored after success.
- Admin Mode PIN is salted and hashed; repeated failed attempts lock Admin Mode.
- Admin bot validates admin Telegram IDs and request status before approval.
- Rate limiting is included for invalid codes and repeated user requests.

Revocation limitation: offline licenses already activated on user devices cannot be force-revoked remotely without a hosted backend. Admin revoke records document revocation and prevent reissue in admin records; a user device can only learn revocation later if a future server/import mechanism is added.

## Creating and running the Telegram bot

1. In Telegram, open BotFather.
2. Create a bot and copy its token.
3. Open Aegis Trade AI → Admin Mode.
4. Create a local admin PIN.
5. Enter the Telegram bot token, admin Telegram ID, private signing key, public signing key, and active key ID.
6. Press **Start Bot**. Polling starts from the stored update offset.
7. If the app closes, polling may stop. Reopen Admin Mode and press **Start Bot** again to resume from the stored offset.

The bot handles `/start`, `/help`, `/status`, activation request codes, invalid messages, and admin-only command validation. Approval and denial messages are sent with Telegram `sendMessage`.

## Signing keypair and key rotation

Generate a local Ed25519 signing keypair:

```bash
npm run generate-license-keypair -- ed25519-2026-05
```

Export only the public key for bundling into the verifier:

```bash
npm run export-public-key -- license-keypair.json
```

Rotate keys:

```bash
npm run rotate-license-keypair
```

Rotation rules:

- License payloads include `keyId`.
- Admin Mode signs new licenses with the active private key.
- User verification supports multiple public key IDs.
- Old licenses remain verifiable while their old public key remains bundled.
- Never share the bot token or private signing key.

## One-time device-bound activation key behavior

- One approved request generates one activation key.
- A key is cryptographically bound to the request device ID and device hash.
- The same key fails on another device with `DEVICE_MISMATCH`.
- The same key is not processed twice locally after redemption.
- If app data is cleared or the app is reinstalled, the local device ID and stored license are lost; the user must request activation again.
- If the license expires, licensed features lock.

## Feature gating

Without a valid license, the app shows demo/safety screens and blocks full analysis, AI analysis, paper trading, journal, backtesting, performance review, alerts, and export. With a valid license, features unlock according to license feature flags. Safety guards remain active with or without a license.

Plans: `DEMO`, `BASIC`, `PRO`, `LIFETIME`.

## Trading safety rules

Allowed decisions are `NEED_MORE_DATA`, `NEED_FRESH_DATA`, `WAIT`, `NO_TRADE`, `CANDIDATE_BUY`, `CANDIDATE_SELL`, `HOLD`, and `EXIT`. The app never uses “BUY NOW” or “SELL NOW”. Every trade must have a stop loss and invalidation level; missing stop loss returns `NO_TRADE`. Risk/reward below 1.5 returns `WAIT` or `NO_TRADE`. All-in, martingale, revenge trading, over-leverage, no-stop-loss claims, and guaranteed-profit claims are blocked.

Blocked response:

> Klaim ini tidak realistis dan berbahaya. Aplikasi ini hanya membantu analisis, simulasi, dan risk management.

## Android build

This repository is Android-capable through Capacitor in `apps/mobile/capacitor.config.ts`.

Typical build steps after dependencies are available:

```bash
npm install
npm run build
npx cap add android --prefix apps/mobile
npx cap sync android --prefix apps/mobile
npx cap open android --prefix apps/mobile
```

## Admin backup

Admin storage contains bot token, admin Telegram IDs, signing keys, pending requests, issued licenses, denied requests, revoked records, update offset, and audit logs. Backups must be encrypted before export and protected like production secrets. Never share plaintext backups.

## Development commands

```bash
npm run typecheck
npm test
npm run build
```

If a restricted package registry blocks dependency installation, TypeScript can still be checked with a globally available `tsc -b --pretty false`, but Vitest and Vite require installed dependencies.
