# Technology Stack

**Analysis Date:** 2026-07-26

## Languages

**Primary:**
- TypeScript - Primary application code (`src/**/*.ts`, `src/**/*.tsx`)
- HTML/CSS - UI structure and styling (`index.html`, Tailwind classes)

**Secondary:**
- JavaScript/MJS - Build configuration (`postcss.config.mjs`)

## Runtime

**Environment:**
- Node.js (Version unpinned, standard Vite/React environment)
- Browser - Target runtime for the application

**Package Manager:**
- pnpm (Inferred from `pnpm-lock.yaml` and `pnpm-workspace.yaml`)
- npm (Also has `package-lock.json`, possibly transitioned)
- Lockfile: present (`pnpm-lock.yaml`, `package-lock.json`)

## Frameworks

**Core:**
- React 18.3.1 - Core UI framework
- Tailwind CSS 4.1.12 - Utility-first styling framework
- Radix UI - Accessible component primitives (via shadcn/ui)

**Testing:**
- Not detected in standard package.json (no jest, vitest, cypress, etc.)

**Build/Dev:**
- Vite 6.3.5 - Build tool and development server

## Key Dependencies

**Critical:**
- `@radix-ui/react-*` - Extensive use of Radix UI primitives for components
- `lucide-react` 0.487.0 - Icon set
- `clsx` & `tailwind-merge` - Utility for merging tailwind classes

**Infrastructure:**
- `react-hook-form` 7.55.0 - Form state management
- `recharts` 2.15.2 - Charting library
- `date-fns` 3.6.0 - Date manipulation

## Configuration

**Environment:**
- No `.env` files detected
- Data is currently loaded statically from `src/data/pdiData.ts` rather than an API

**Build:**
- `vite.config.ts` - Vite configuration with React and Tailwind plugins, plus `@` path alias to `src`
- `postcss.config.mjs` - PostCSS configuration for Tailwind

## Platform Requirements

**Development:**
- Node.js environment capable of running Vite
- pnpm package manager

**Production:**
- Static file host (Vite build output is standard static HTML/JS/CSS)

---

*Stack analysis: 2026-07-26*
