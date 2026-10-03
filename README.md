# Respiratory Research

First milestone of an offline mobile research prototype, built with React Native, Expo SDK 57, TypeScript, Expo Router, and SQLite.

**All displayed respiratory rates, confidence scores, and signal-quality values are simulated. This version does not measure breathing, capture video, diagnose disease, or provide treatment advice.**

## Implemented

Home → optional participant information → 30-second practice timer → simulated result → save → history → details → confirmed deletion. Saved sessions stay in SQLite on the device across restarts. No authentication, backend, analytics, or internet connection is required for the installed app's core flow. Developer builds can add five demo sessions from About.

## Development

Use Node.js 22.13 or later. A GitHub Codespace can provide the development tools without installing them on the user's computer.

```sh
npm install
npm run typecheck
npm test
npx expo start --tunnel
```

Open the QR code in Expo Go on a physical iPhone with matching SDK support. The development server needs internet for the tunnel; the standalone installed app does not need it for measurements and history. This is a mobile project; a web preview is not configured.

## Cloud builds

GitHub Actions checks types, tests core logic, verifies Expo dependencies, and exports the iOS JavaScript bundle. That export is a build check, not an installable iPhone app.

`eas.json` includes preview and production build profiles. A signed iPhone build still requires linking this project to the owner's Expo account, registering the device for internal distribution, and Apple signing access. No Expo project ID, credentials, signing certificates, or secrets are included. Public App Store submission has not been performed.

## Project layout

- `app/`: navigation and screens
- `components/`: accessible shared controls and cards
- `constants/`: interface text, theme, duration, development flag
- `services/measurement/`: analyzer interface, mock analyzer, input validation, session state
- `services/database/`: SQLite initialization, versioned migration, parameterized queries, row conversion
- `types/`, `utils/`, `tests/`: shared data structures, helpers, and logic tests

## Verification on an iPhone

1. Start a practice session with optional information.
2. Cancel a session and verify no record is saved.
3. Complete the timer and confirm the result is labeled simulated.
4. Save it once; repeated taps must not create duplicate records.
5. Open History and inspect the saved details.
6. Restart the app and phone, then verify the record remains.
7. Cancel deletion, then confirm deletion.
8. Test with airplane mode in a standalone build, larger text, and VoiceOver.

## Current limitations

No actual camera preview, video capture, or breathing algorithm yet. No medical validation. Local SQLite is not application-level encrypted; use anonymous IDs and avoid sensitive notes. Physical-device testing is required before milestone 1 can be considered complete. Camera work is milestone 2, after the app shell has been tested on an iPhone. A real analyzer is a later research milestone.
