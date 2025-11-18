# Pocket Pal - Kanto Companion

## Overview
Pocket Pal is a nostalgic Pokémon companion web application with a retro Game Boy-inspired interface. Built with React, Vite, and Express, it provides an interactive virtual pet experience featuring Generation 1 Pokémon from the Kanto region.

## Project Status
- **Date Setup**: November 18, 2025
- **Status**: Fully configured and running in Replit environment
- **Version**: 0.1.0

## Features
- **Virtual Companion**: Interact with your chosen Pokémon (pet, feed, train)
- **Pokédex**: Browse all 151 Generation 1 Pokémon with detailed stats
- **Stats Tracking**: Monitor HP, XP, friendship, hunger, energy, and mood
- **Evolution System**: Track evolution chains and level requirements
- **Inventory Management**: Manage items like berries and potions
- **Settings**: Customize theme, toggle sound effects, reset game data
- **Retro Design**: Pixel-perfect Game Boy aesthetic with type-based gradient backgrounds

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express.js, Node.js
- **UI Framework**: Tailwind CSS with custom retro styling
- **UI Components**: Radix UI primitives
- **Sprites**: pokesprite-images (authentic Pokemon sprites, ~3.6KB total)
- **State Management**: Custom hooks (useGameState, useStorage)
- **Storage**: Client-side (localStorage/chrome.storage.sync)
- **Type Safety**: TypeScript with Zod validation

## Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   │   ├── tabs/    # Tab content (Pokédex, Items, etc.)
│   │   │   └── ui/      # Reusable UI components
│   │   ├── data/        # Pokémon data (Gen 1)
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and helpers
│   │   └── pages/       # Page components
│   └── index.html       # Entry HTML
├── server/              # Backend Express server
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Storage interface
│   └── vite.ts          # Vite dev server setup
├── shared/              # Shared types and utilities
│   └── schema.ts        # Type definitions and helpers
└── manifest.json        # Chrome extension manifest
```

## Development

### Running the Application
The dev server runs automatically on port 5000:
```bash
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema (if needed)

## Configuration

### Replit Environment
- **Port**: 5000 (frontend and backend)
- **Host**: 0.0.0.0 (configured for Replit proxy)
- **HMR**: Configured for Replit's HTTPS proxy (clientPort: 443)

### TypeScript
- **Target**: ES2022
- **Module**: ESNext
- **Lib**: ES2023, DOM
- **Path Aliases**: 
  - `@/*` → `client/src/*`
  - `@shared/*` → `shared/*`

### Vite Configuration
- Configured for Replit environment with proper host settings
- Includes Replit-specific plugins (cartographer, dev banner, error modal)
- Custom path resolution for client/shared code

## Deployment
Configured for Replit Autoscale deployment:
- **Build**: `npm run build` (compiles Vite + esbuild)
- **Start**: `npm run start` (production server)
- **Type**: Autoscale (stateless web application)

## Chrome Extension
This application can also be used as a Chrome extension. The `manifest.json` file is configured for:
- Manifest V3
- Default popup: `index.html`
- Permissions: `storage`, `<all_urls>`

## Game Mechanics

### Companion Stats
- **Level**: 1-100 (starts at level 5)
- **HP**: Calculated from base stats and level
- **XP**: Cubic growth formula (level³)
- **Friendship**: 0-100 (affects mood)
- **Hunger**: 0-100 (depletes over time)
- **Energy**: 0-100 (affects performance)
- **Mood**: Derived from average of friendship, hunger, and energy

### Interactions
- **Pet**: Gain XP (+10), increase friendship (+5)
- **Feed**: Restore hunger (+30), heal HP (+10), increase friendship (+3)
- **Train**: Gain XP (future feature)

### Type System
18 Pokémon types with custom gradient backgrounds:
- Normal, Fire, Water, Electric, Grass, Ice, Fighting, Poison, Ground
- Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy

## Recent Changes
- **2025-11-18**: Initial setup and sprite optimization
  - Installed dependencies including pokesprite-images
  - Fixed TypeScript configuration for ES2023 and import.meta.dirname
  - Configured Vite for Replit proxy (0.0.0.0:5000, HMR clientPort 443)
  - Simplified storage.ts (removed unused User types)
  - Set up Dev Server workflow
  - Configured deployment for Autoscale
  - **Sprite Optimization**: Replaced oversized sprites with authentic Pokemon sprites
    - UI icons: Direct imports from pokesprite-images npm package (~3.6KB total)
    - Pokemon sprites: External PokeAPI URLs with local fallback
    - Size reduction: 5.6MB → 3.6KB (99.9% reduction)
    - Production-ready with graceful offline fallback

## Notes
- The application uses client-side storage (localStorage) for game state persistence
- Backend is minimal - primarily serves the frontend
- Database is available but not currently used (app is client-side focused)
- Designed for both web and Chrome extension deployment
- All UI sprites are authentic Pokemon sprites from the official pokesprite library
- Pokemon companion sprites use PokeAPI CDN with local fallback for offline support
