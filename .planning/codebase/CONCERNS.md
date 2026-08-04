# Codebase Concerns

**Analysis Date:** 2026-07-26

## Tech Debt

**Hardcoded PDI Data:**
- Issue: Application state relies heavily on `src/data/pdiData.ts` which acts as a static configuration file rather than dynamic storage or API-driven data.
- Files: `src/data/pdiData.ts`
- Impact: Requires code rebuilds to update professional profile or progress milestones.
- Fix approach: Transition to a backend API or local JSON file fetching system that allows for easier content management.

**Type Safety:**
- Issue: Extensive use of `any` or loose type definitions within component logic in complex UI components.
- Files: `src/app/components/` components.
- Impact: Potential runtime errors, decreased maintainability as application complexity increases.
- Fix approach: Strictly define interfaces for component props and internal state variables using types defined in `src/types/pdi.ts`.

## Known Bugs

**None identified:**
- Analysis did not uncover active runtime bugs through static analysis.

## Security Considerations

**Client-side Data exposure:**
- Risk: Sensitive professional and personal information is stored within the frontend repository structure.
- Files: `src/data/pdiData.ts`
- Current mitigation: None (assumed public/private repository usage).
- Recommendations: If this repository contains private information, ensure repository access controls are strictly managed or move PDI data to a secure external database.

## Performance Bottlenecks

**Large Component Files:**
- Issue: Some UI components are very large (e.g., `src/app/components/ui/sidebar.tsx` at ~726 lines, `src/data/pdiData.ts` at ~747 lines).
- Files: `src/app/components/ui/`
- Cause: Component overloading and configuration density.
- Improvement path: Decompose large components into smaller, reusable functional units.

## Fragile Areas

**Milestone/Skill Modals:**
- Issue: Modals (`src/app/components/modals/`) rely on conditional logic (`!milestone` / `!skill` returns `null`) which might lead to unexpected UI behavior if data references fail.
- Files: `src/app/components/modals/MilestoneModal.tsx`, `src/app/components/modals/SkillModal.tsx`
- Why fragile: Direct reference-based lookup of entities.
- Safe modification: Improve error handling and display empty state components instead of simple `null` returns.

## Scaling Limits

**Static Data Structure:**
- Limit: Current `Project` and `Milestone` interfaces (defined in `src/types/pdi.ts`) are tailored to static entries.
- Scaling path: Refactor to relational models if moving to a database, specifically to handle many-to-many relationships between Skills, Milestones, and Projects more effectively.

## Test Coverage Gaps

**Unit Testing:**
- What's not tested: No visible unit or integration tests detected in the scanned paths.
- Files: All.
- Risk: High risk of regression when modifying core logic in components.
- Priority: High.

---

*Concerns audit: 2026-07-26*
