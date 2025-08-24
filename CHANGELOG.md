# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-08-23

### Added

- **Dark Mode:** Implemented a system-wide dark mode, defaulting to on. The theme can be managed through the AppContext.
- **Interactive Timeline:** The timeline component is now fully interactive, with play/pause functionality, playback simulation, and scrubbing.
- **WebSocket Communication:** Added client-side support for WebSocket communication, managed through the AppContext. A basic WebSocket echo server is also included.
- **Linting:** Fixed a critical React Hooks linting error in the PTZControls component and cleaned up other minor warnings.
- Created `CHANGELOG.md` to track changes to the project.
- Created `tailwind.config.ts` to support dark mode.

### Changed

- Updated `README.md` with project-specific information.
- Updated `src/components/PTZControls.tsx` to fix a critical linting error.
- Updated `src/components/Timeline.tsx` to make it interactive and fix a minor linting warning.
- Updated `src/context/AppContext.tsx` to manage dark mode and WebSocket state, and to fix a minor linting warning.
- Updated `package.json` to add a `ws:dev` script.
- Updated `src/app/globals.css` to support dark mode.
- Updated `src/app/page.tsx` to remove hardcoded dark mode classes.
- Updated `src/app/layout.tsx` to apply the theme class.
- Updated `eslint.config.mjs` to ignore the `dist` directory.
- Added `ws` and `@types/ws` as dev dependencies.
- Added `ts-node` as a dev dependency.
- Deleted `jules-scratch` directory.
