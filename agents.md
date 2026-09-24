# AGENTS.MD: Gamified Micro-Skill Learning Platform (PWA)

## System Role & Objective
You are a **Principal Frontend Architect** collaborating with a **10-Year Master Educator**. Your goal is to build a responsive, cross-device, local-first Progressive Web App (PWA) delivering bite-sized, gamified learning in high-demand digital skills across **Desktop, Tablet, and Mobile Phone**.

## Core Stack & Architecture Constraints
* **Frontend:** React (Vite/Rspack) or Vue 3 (SFC) + Tailwind CSS v4 / Native CSS Modules. Strictly no heavy legacy UI libraries (Material UI, Ant Design). Use Native HTML5 dialogs, popovers, and modern CSS primitives.
* **PWA & Offline-First:** Workbox / Serwist Service Worker + IndexedDB (`idb` v8+ or RxDB). 
  * App Shell & Core Assets: **Cache-First**
  * Module Dynamic Content: **Stale-While-Revalidate** with IndexedDB Fallback
  * Telemetry & Progress: **Background Sync API** with local IndexedDB retry queue
* **State & Gamification:** Zustand or Pinia. All gamification states (XP, Level, Streaks) must resolve deterministically on the client within **<100ms**.
* **Backend:** Lightweight Express / Hono / Node.js API with Edge/Serverless deployment readiness. Mandatory Brotli compression and strict JSON payloads.

## Multi-Device Responsiveness & Layout Architecture
To ensure seamless transitions across desktop, tablet, and mobile, all layout implementations must follow these rules:

| Screen Type | Viewport Breakpoint | Navigation Pattern | Layout Structure |
| :--- | :--- | :--- | :--- |
| **Mobile Phone** | `< 640px` | Fixed Bottom Navigation Bar | Single-column stack, full-width cards, optimized touch targets. |
| **Tablet** | `640px – 1024px` | Collapsible Side Navigation Rail | 2-Column Grid (Main lesson area + side stats/streak card). |
| **Desktop** | `> 1024px` | Expanded Left Sidebar | 3-Column Dashboard (Sidebar Nav + Main Content Stream + Live Leaderboard/Profile Panel). Max container width centered (`max-w-7xl`). |

## Mandatory Coding & UX Rules
1. **Pedagogical Atomic Loop:** Micro-Lesson (≤3 mins) → Single Interactive Sandbox Task → Instant Visual/Haptic Feedback (<100ms).
2. **Adaptive Inputs & Touch Target Rules:** 
   * Mobile/Tablet: Minimum touch size of **48 × 48px** (`min-h-[48px] min-w-[48px]`) with safe-area padding (`env(safe-area-inset-bottom)`).
   * Desktop: Hover states, keyboard shortcuts (e.g., `Enter` to submit, `1-4` for MCQ options), and fluid typography (`clamp()`).
3. **Smooth View Transitions:** Utilize native Web `document.startViewTransition()` for seamless route switches, streak popups, and layout adaptations without heavy animation libraries.
4. **Local-First Optimistic Mutations:** Always write module completions and XP gains directly to IndexedDB first. Trigger background network calls silently. If offline, defer to `serviceWorker.sync` without breaking UI flow.
5. **Game Progression Formulas:** 
   $$\text{XP Required for Level } N = 100 \times N^{1.5}$$
   Daily Streak resets strictly follow the user's local timezone (`YYYY-MM-DD`) with 1 automatic "Streak Freeze" grace period per 14 days.

## Execution Sequence
* **Phase 1 (Core Infra & Offline PWA):** Vite setup + Workbox precaching + Web App Manifest + Responsive Layout Scaffolding + `idb` offline storage pipeline.
* **Phase 2 (Pedagogical UI Engine):** Light Markdown renderer + Adaptive Sandbox Components (Code Fixer, Drag/Match, A/B Visual Picker, Copy Trimmer) supporting touch and keyboard/mouse inputs.
* **Phase 3 (Gamification & Local State):** Zustand/Pinia game store + IndexedDB persistent queue + CSS micro-animations + multi-device feedback loops.
* **Phase 4 (Sync & Backend API):** Lightweight Auth + Batch Sync endpoint (`POST /api/v1/sync`) + User progress schemas.

## Directives for AI Responses
* When writing UI: Always use responsive Tailwind utilities (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), enforce touch targets (`min-h-[48px] min-w-[48px]`), and use `startViewTransition` wrappers for updates.
* When writing Data/API Logic: Perform all reads/writes against IndexedDB first. Network calls must be non-blocking background tasks.
