# QA Audit

**Date**: 2026-01-08
**Auditor**: QA Role

## Analysis
- **Test Suite**: No test files found in `src/` or `tests/`.
- **Manual Verification**: Relies on `npm run dev` and `npm run preview`.

## Findings
- **Coverage**: 0% automated coverage.
- **Risk**: Moderate. While the site is static, regression testing is manual.

## Recommendations
- **Critical**: Add basic unit tests for `utils/podcast.ts` and `utils/quotes.ts`.
- **Next Step**: Configure Vitest for unit testing.
