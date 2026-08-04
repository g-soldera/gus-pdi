# Coding Conventions

**Analysis Date:** 2026-07-26

## Naming Patterns

**Files:**
- React components: `PascalCase.tsx`
- Type definitions: `camelCase.ts` or `kebab-case.ts` (often mapped to internal structure)
- Data files: `camelCase.ts`

**Functions:**
- Event handlers: `handle[EventName]` (e.g., `handleSkillClick`)
- Components: `PascalCase`

**Variables:**
- Standard: `camelCase`

**Types:**
- Interfaces: `PascalCase`
- Unions/Types: `PascalCase` (e.g., `SkillLevel`, `Status`)

## Code Style

**Formatting:**
- Implicitly enforced via IDE (no specific config files detected).

**Linting:**
- Standard ESLint patterns assumed for TypeScript.

## Import Organization

**Path Aliases:**
- `@/*`: Mapped to `src/*` (e.g., `@/data/pdiData`)

## Error Handling

**Patterns:**
- Minimal explicit error handling observed in core logic.
- Reliance on React state management to control UI flow.

## Logging

**Framework:** none

**Patterns:**
- No logging detected.

## Comments

**When to Comment:**
- Business rules and justifications (e.g., `completionJustification` in `MilestoneObjective`).

## Function Design

**Size:** Small, focused React components.

**Parameters:** Props-based, often grouped into objects (e.g., `info: PersonalInfo`).

**Return Values:** React elements (`JSX.Element`).

## Module Design

**Exports:** Named exports preferred.

**Barrel Files:** Not explicitly observed, but imports follow path aliases (`@/types/pdi`).

---

*Convention analysis: 2026-07-26*
