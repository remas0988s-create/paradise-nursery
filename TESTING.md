# Validation record

Validated 11 November 2026 (Asia/Riyadh).

## Automated

- `npm test`: 2 test files passed; **17 tests passed**.
- `npm run build`: successful production bundle (Vite 7.3.8).
- Runner: Vitest 4.1.12, jsdom, React Testing Library, user-event; Node 24.22.1.
- No external backend or payment requests are part of the app.

## Browser checks

A real Chromium browser loaded the built production app. Get Started opened the 18-plant catalog. Adding Monstera disabled its Add button and set the cart badge to 1. Adding Snake Plant set it to 2. The cart showed $43.00. Increasing Monstera changed its quantity to 2, its subtotal to $50.00, the badge to 3, and the order total to $68.00. Desktop landing/cart layouts were inspected. Responsive CSS is included; mobile-device visual testing is not claimed.

## Known limits

- Checkout is an explicit Coming soon message, not a transaction.
- Cart state is in memory and resets on refresh.
- Plant artwork is stylized illustration, not botanical photography.
- Tests validate the user-supplied requirements; a separate Coursera rubric was not supplied.
