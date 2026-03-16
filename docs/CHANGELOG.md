# Changelog

All notable changes to this project are documented in this file.

## 2026-03-16

### Added

- Added `docs/CHANGELOG.md` to track notable project updates and validation results.
- Added `data-slot="navbar-user-online-indicator"` in `src/components/organisms/Navbar.tsx` to align with navbar UI/test contract.

### Changed

- Standardized prediction route/domain naming from legacy `prediccion` to `prediction` across app pages, API routes, constants, navigation, and tests.
- Updated navigation active-state resolution in `src/lib/navigation.ts` so ancestor items can be marked active when a child route is active.
- Updated navbar profile role rendering to uppercase for consistent UI contract (`SYSTEM ADMIN` style).
- Refactored sidebar manual-expansion state initialization in `src/components/organisms/sidebar/SidebarSection.tsx` using a dedicated initializer helper, improving compatibility with React Compiler diagnostics.
- Removed duplicated block from `src/test/app/prediction/PredictionForm.test.tsx` that caused redeclaration conflicts.
- Applied lint/prettier formatting fixes in `src/app/prediction/page.tsx`.

### Validation

- Lint: `bun run lint` completed without reported errors.
- Tests: `bun run test` passed with **265 pass / 0 fail**.
- Additional diagnostic context: React Doctor previously reported **99/100** with one non-blocking warning in `src/components/organisms/Sidebar.tsx` about state derived from prop.
