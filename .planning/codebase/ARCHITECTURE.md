# Architecture

**Analysis Date:** 2026-07-26

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                       Entry Point                            │
│                      `src/main.tsx`                          │
├─────────────────────────────────────────────────────────────┤
│                       Application                            │
│                     `src/app/App.tsx`                        │
└────────┬──────────────────────┬──────────────────────┬──────┘
         │                      │                      │
         ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Contexts    │    │   Components    │    │      Utils      │
│ `src/app/       │    │ `src/app/       │    │ `src/app/       │
│  contexts/`     │    │  components/`   │    │  utils/`        │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │                      │                      │
         ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                           Data                              │
│                      `src/data/pdiData.ts`                   │
├─────────────────────────────────────────────────────────────┤
│                          Types                              │
│                      `src/types/pdi.ts`                      │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| App | Root component, orchestrates main sections and modals | `src/app/App.tsx` |
| ThemeContext | Manages light/dark mode state and persistence | `src/app/contexts/ThemeContext.tsx` |
| Data | Contains static content (skills, milestones, etc) | `src/data/pdiData.ts` |
| Types | TypeScript definitions for data structures | `src/types/pdi.ts` |
| UI Components | Shadcn UI library components | `src/app/components/ui/*.tsx` |
| Modals | Detail views for specific entities | `src/app/components/modals/*.tsx` |

## Pattern Overview

**Overall:** Component-Based React Application

**Key Characteristics:**
- **Static Data Driven:** State mostly derives from static data in `src/data/pdiData.ts`.
- **Context for Global State:** Uses React Context (`ThemeContext`) for cross-cutting state like theming.
- **Atomic/Composite UI:** Uses shadcn/ui components in `src/app/components/ui/` combined into complex components in `src/app/components/`.

## Layers

**Core App:**
- Purpose: Orchestration and entry
- Location: `src/main.tsx`, `src/app/App.tsx`
- Contains: React DOM rendering, root component

**Data & Types:**
- Purpose: Application models and static content
- Location: `src/data/`, `src/types/`
- Contains: Static arrays/objects, TypeScript interfaces

**Components:**
- Purpose: Visual representation and local interaction
- Location: `src/app/components/`
- Contains: Functional React components using hooks

## Data Flow

### Primary Request Path

1. App Initialization (`src/main.tsx`)
2. Context Loading (`src/app/contexts/ThemeContext.tsx`)
3. Component Render (`src/app/App.tsx`)
4. Data Ingestion (Imports from `src/data/pdiData.ts`)

**State Management:**
- Application uses simple local state (`useState`) in `App.tsx` for modal visibility.
- Global state for theming via React Context.

## Key Abstractions

**Static Data Model:**
- Purpose: Represents personal development information (skills, milestones, resources).
- Examples: `src/data/pdiData.ts`
- Pattern: Typed constant exports matching `src/types/pdi.ts`.

## Entry Points

**Web Application:**
- Location: `src/main.tsx`
- Triggers: Browser page load.
- Responsibilities: Mounts React application to DOM.

## Architectural Constraints

- **Single Page Application:** Static client-side app, no backend requests currently evident.
- **UI Framework:** Heavily relies on shadcn/ui and Tailwind CSS.

## Cross-Cutting Concerns

**Theming:** Implemented via `ThemeContext` and CSS classes (Tailwind's `dark` class).

---

*Architecture analysis: 2026-07-26*