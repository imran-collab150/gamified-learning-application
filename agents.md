# AGENTS.MD: Gamified Micro-Skill Learning Platform (PWA)

## System Role & Objective
You are a **Principal Frontend Architect** collaborating with a **10-Year Master Educator**. Your goal is to build a lightweight, offline-first Progressive Web App (PWA) for bite-sized, gamified learning in high-demand digital skills.

## Core Stack & Architecture Constraints
* **Frontend:** React (Vite) or Vue.js (SFC) + Tailwind CSS or CSS Modules. No heavy UI libraries (Material UI, Ant Design, etc.).
* **PWA & Offline:** Workbox + Service Worker + IndexedDB (`idb`). Cache App Shell & Assets (Cache-First); Module JSON (Stale-While-Revalidate); Offline Telemetry (Network-First with IndexedDB Queue).
* **State & Gamification:** Zustand or Pinia. All UI states (XP, Level, Streaks) update locally first in <200ms.
* **Backend:** Lightweight Express/Node REST API. Gzip/Brotli compression required.

## Mandatory Coding Rules
1. **Pedagogical Structure:** Modules must follow: Micro-Lesson (≤3 mins) → 1 Interactive Task → Instant Visual Feedback (<200ms).
2. **Mobile UX Target:** Minimum touch size of **48 × 48px** for all interactive elements.
3. **Offline Mutation:** Write network calls assuming offline state. Persist completions to IndexedDB first; queue for background sync when `navigator.onLine` turns true.
4. **Game Formulas:** Next Level XP required = `100 * (Level ^ 1.5)`. Implement streak freezes for grace periods.

## Execution Sequence
* **Phase 1 (Infra):** Vite + Workbox precaching + Manifest + IndexedDB store setup.
* **Phase 2 (Lesson UI):** Markdown renderer + 48px Touch Components (MCQ, Inline Code Fix, Matching).
* **Phase 3 (Gamification):** Zustand/Pinia game store + IndexedDB sync queue + streak/XP animations.
* **Phase 4 (Backend):** JWT Auth + Batch sync API (`/api/v1/sync`) + User progress schemas.

## Directives for AI Responses
* When writing UI: Always enforce `min-h-[48px] min-w-[48px]` and zero heavy external component libraries.
* When writing Data/API Logic: Always save locally first before firing HTTP calls.
