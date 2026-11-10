# Paradise Nursery Shopping Application

**Author:** Remas Alqarni  
**GitHub:** remas0988s-create  
**Course:** IBM — Developing Front-End Apps with React

A responsive plant shopping application built with React, Redux Toolkit, React Redux, and Vite. The landing page visibly says **Welcome to Paradise Nursery**, keeps Get Started, and renders the existing local artwork through CSS `background-image: url(...)` with `background-size: cover`. Get Started opens a catalog of **18 plants in 3 categories (6 per category)**, each with a local illustration, name, description, care label, price, and Add to Cart button.

## Run locally

Requires Node.js 20.19+ or 22.12+ (tested with Node 24).

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite.

```bash
npm test         # reducer and user interaction tests
npm run build   # production bundle in dist/
npm run preview # preview the production bundle
```

## Features

- Home page with nursery name, background illustration, About Us, and Get Started.
- Leafy Houseplants, Aromatic Plants, and Succulents & Cacti: six plants each.
- Redux actions `addItem`, `removeItem`, and `updateQuantity`.
- Add to Cart becomes disabled and reads Added to Cart while the plant is in the cart.
- Cart badge counts **all units**, not just distinct plant types.
- Cart rows show plant image, name, unit price, quantity controls, subtotal, and Remove.
- Quantity changes and removal immediately update row subtotals and the order total.
- Decreasing quantity to zero removes the row. Removing a plant enables its Add button again.
- Continue Shopping returns to the catalog and keeps the cart state.
- Checkout displays Coming soon; no payment or order is created.
- Responsive layout, keyboard focus indicators, skip link, descriptive button labels, and live totals.

## Required files and responsibilities

| File | Responsibility |
| --- | --- |
| `README.md` | Project name, overview, setup, tests, and code guide |
| `src/AboutUs.jsx` | Company introduction on the landing page |
| `src/App.css` | Desktop/mobile layout, colors, cards, and cart styling |
| `src/App.jsx` | Page navigation, visible welcome, landing page, and shared components |
| `src/CartSlice.jsx` | Redux cart reducers, actions, and derived selectors |
| `src/ProductList.jsx` | Complete three-category catalog, shared Home/Plants/Cart header, cart icon/count, product cards and addItem |
| `src/CartItem.jsx` | Complete cart page: all rows, quantity controls, removal, grand total, Checkout and Continue Shopping |

Supporting files: `src/main.jsx` supplies the Redux Provider; `src/store.js` creates the store; `src/ProductList.jsx` defines the plant catalog; `src/format.js` formats prices; `src/assets/` contains the original local SVG illustrations. `index.html`, `package.json`, the lockfile, and `vite.config.js` make the project runnable.

## Understand the Redux flow

1. ProductList reads `state.cart.items` with `useSelector`. Clicking Add to Cart calls `dispatch(addItem(plant))`.
2. CartSlice stores each plant once with a quantity. Duplicate dispatches increment its quantity.
3. React Redux rerenders components that read the changed state. The catalog sees the plant ID and disables its Add button.
4. CartItem dispatches `updateQuantity({ id, quantity })` or `removeItem(id)` when its buttons are clicked.
5. `selectCartCount` sums quantities, while `selectCartTotal` sums `price * quantity`. Deriving these values prevents stale totals.

The page name and checkout message use React `useState` because they are local UI state; the shared cart uses Redux.

## Test and review

`tests/cart.test.jsx` checks adding, duplicate handling, quantity changes, totals, removal, zero, unknown IDs, and invalid quantities. `tests/app.test.jsx` tests the real React components through user clicks, including 18 products, navigation, disabled buttons, totals, empty cart, re-adding, and the checkout message. See `TESTING.md` for the recorded validation.

Try this manually:

1. Get Started → add Monstera ($25) and Snake Plant ($18).
2. Open the cart: badge **2**, total **$43**.
3. Increase Monstera: badge **3**, Monstera subtotal **$50**, total **$68**.
4. Decrease Monstera: total **$43**.
5. Remove Snake Plant: badge **1**, total **$25**.
6. Continue Shopping: Snake Plant is enabled, Monstera stays disabled.
7. Remove the final plant: the empty-cart view appears and the badge reads zero.

## Scope and credits

This is a front-end learning project, not a real store. Prices are in USD. Cart state lasts for the current page session; refreshing resets it. No backend, sign-in, payment, shipping, or tax integration is included. The illustrations are original stylized SVG artwork (not plant-identification photographs) and are bundled locally. Optional Google Fonts have system-font fallbacks.

Implementation was prepared with AI assistance and reviewed/tested with Remas's project requirements. Review the code and follow the course's submission and disclosure rules.

Official references: [Redux Toolkit createSlice](https://redux-toolkit.js.org/api/createSlice), [Redux Quick Start](https://redux.js.org/tutorials/quick-start).


## IBM Mark review fixes

The rubric-facing code has been consolidated without duplicate state or duplicate UI. ProductList.jsx contains all 18 plant records grouped into three categories and exports the shared NurseryHeader used once by App. CartItem.jsx is the complete cart screen, with CartRow kept private in the same file. Redux remains the only owner of cart items and quantities. See [REVIEW_REPORT.md](REVIEW_REPORT.md) for the changes and validation.
