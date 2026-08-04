# Codebase Structure

**Analysis Date:** 2026-07-26

## Directory Layout

```
D:/Projects/gus-pdi/
├── src/                  # Main source code directory
│   ├── app/              # Application logic and UI
│   │   ├── components/   # React components
│   │   │   ├── modals/   # Modal components
│   │   │   └── ui/       # shadcn UI components
│   │   ├── contexts/     # React contexts
│   │   └── utils/        # Helper functions
│   ├── data/             # Static application data
│   ├── styles/           # Global stylesheets
│   └── types/            # TypeScript type definitions
└── old/                  # Legacy code backup
```

## Directory Purposes

**`src/app/components/`:**
- Purpose: Core application feature components.
- Contains: Higher-level React components.
- Key files: `App.tsx` (in `src/app/`), `Hero.tsx`, `Skills.tsx`.

**`src/app/components/ui/`:**
- Purpose: Reusable atomic UI elements (shadcn).
- Contains: Buttons, cards, dialogs, etc.
- Key files: `button.tsx`, `dialog.tsx`, `badge.tsx`.

**`src/data/`:**
- Purpose: Application content.
- Contains: Static data definitions.
- Key files: `pdiData.ts`.

**`src/types/`:**
- Purpose: Domain models.
- Contains: TypeScript interfaces and types.
- Key files: `pdi.ts`.

## Key File Locations

**Entry Points:**
- `src/main.tsx`: React DOM mounting point.

**Configuration:**
- `vite.config.ts`: Vite build configuration.
- `package.json`: Project dependencies and scripts.
- `postcss.config.mjs`: PostCSS configuration for Tailwind.

**Core Logic:**
- `src/app/App.tsx`: Main application component.

**Testing:**
- Currently not evident in standard locations.

## Naming Conventions

**Files:**
- React Components: PascalCase (e.g., `ThemeToggle.tsx`).
- Utilities/Data/Types: camelCase or lowercase (e.g., `pdiData.ts`, `pdi.ts`, `helpers.ts`).
- UI Components (shadcn): kebab-case (e.g., `alert-dialog.tsx`).

**Directories:**
- lowercase, plural/categorical (e.g., `components`, `contexts`, `utils`).

## Where to Add New Code

**New Feature Component:**
- Implementation: `src/app/components/`
- Modal related: `src/app/components/modals/`

**New Basic UI Element:**
- Implementation: `src/app/components/ui/`

**New Data or Types:**
- Data updates: `src/data/pdiData.ts`
- Type updates: `src/types/pdi.ts`

**Utilities:**
- Shared helpers: `src/app/utils/`

---

*Structure analysis: 2026-07-26*