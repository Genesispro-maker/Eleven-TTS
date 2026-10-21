# TTS

A simple text-to-speech app built with React and TypeScript using the ElevenLabs API. Enter text, adjust voice settings, and generate audio you can play back in the browser.

## Features

- Generate speech using ElevenLabs' Flash v2.5 model.
- Adjust voice stability and similarity boost.
- Play generated audio directly in the app.
- Handle loading, error, and ready states.
- Manage generated audio URLs to release browser resources.

## Tech Stack

- React
- TypeScript
- ElevenLabs Text-to-Speech API
- Noise.js

## Getting Started

1. Clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your ElevenLabs API key and voice ID in `src/util/keys.ts`.
4. Start the development server:

   ```bash
   npm run dev
   ```

## Configuration

The app uses two values from `src/util/keys.ts`:

- `apikey` — your ElevenLabs API key.
- `voiceId` — the voice you want to generate speech with.

Keep your API key private. For a deployed application, use a backend to protect the key rather than exposing it in client-side code.

## How It Works

The app sends text and voice settings to the ElevenLabs Text-to-Speech API, receives the generated audio as a Blob, and creates a browser object URL for playback.
