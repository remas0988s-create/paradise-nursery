# Validation record

Validated 11 November 2026 (Asia/Riyadh), after the IBM Mark review changes.

- `npm test`: **3 test files passed; 20 tests passed; 0 failures**.
- `npm run build`: successful production bundle, Vite 7.3.8.
- `git diff --check`: passed before publication.
- Full raw command output: [tests](validation/tests.txt), [build](validation/build.txt).

The reducer tests cover add, duplicate handling, updates, totals, removal, zero, unknown IDs and invalid quantities. The application tests cover the welcome text, Get Started, 18 plants, 3 categories, cart badge, disabled/re-enabled Add buttons, navigation, totals, empty cart and checkout. Review regression tests also render CartItem on its own and confirm it owns the full cart experience, and verify that exactly one shared Home/Plants/Cart header is displayed.

The built app was exercised in Chromium. Computed CSS confirmed a real local background-image URL and cover. Adding Monstera and Snake Plant produced $43 and a badge of 2; increasing Monstera produced $68 and 3; decreasing then removing Snake Plant produced $25 and 1. Checkout showed its demo message. Continue Shopping preserved state and re-enabled the removed plant's Add button.

See [REVIEW_REPORT.md](REVIEW_REPORT.md) for the detailed Arabic report. No new IBM score or mobile-device visual test is claimed. Checkout is a demo; refresh resets the in-memory cart.
