# Cradle & Care — Ionic Angular (Standalone) App

A native-ready mobile port of the **Cradle & Care** baby-essentials storefront (original static HTML/CSS/JS site is kept in `original-reference/` for comparison), rebuilt as an **Ionic 8 + Angular 18 standalone** app.

## What's replicated

- **Brand look**: cream/plum/coral/sage/butter palette, Fraunces + Plus Jakarta Sans fonts, pill buttons, scallop divider motif — all ported into `src/theme/variables.scss` and `src/global.scss` as Ionic CSS variables.
- **Shop**: category filter chips + product grid, identical product catalog (`src/app/data/products.ts`), add-to-cart, wishlist heart toggle.
- **Cart**: quantity stepper, subtotal, empty state, checkout entry point.
- **Checkout**: 3-step flow (Shipping → Payment → Review) as a modal, with the same validation rules as the original (email regex, 5-digit ZIP, Luhn card check, MM/YY expiry check, CVV, input masking for phone/card/expiry), card vs. PayPal-demo payment methods, and an order confirmation screen.
- **Account**: login/signup (SHA-256 password hashing via Web Crypto, same as the original), profile editing with phone/ZIP formatting + validation, and order history.
- **Orders**: order list with day-based status simulation (Placed → Processing → Shipped → Delivered) and a tracking-timeline detail modal.
- **Notifications**: starter notifications, unread badge, mark-as-read / mark-all-read — presented as a modal from the header bell icon.
- **Newsletter + contact forms**: same inline validation and success-message behavior as the original.

## What's different (mobile-app adaptation)

- Navigation is a 5-tab bottom bar (**Home / Shop / Wishlist / Cart / Account**) instead of one long scrolling page with side drawers — this matches native app conventions instead of a marketing site.
- The original's hand-drawn inline SVG product icons were swapped for tinted Ionicons for speed; colors/backgrounds still follow the brand palette.
- Cart state is in-memory only (not persisted), matching the original site's behavior. Wishlist, notifications, the logged-in user, and order history persist to `localStorage`, also matching the original.

## Admin panel

A separate, self-contained admin section lives at `/admin`, with its own 5-tab bottom bar in a darker (plum) theme so it reads clearly as "admin mode" while still using the same design system. Reach it from **Account → "Switch to admin panel"** in the customer-facing app (this is a demo shortcut, not a real auth-gated role — there's no backend here).

- **Dashboard**: total revenue, order count, average order value, stock alerts, a 7-day revenue bar chart, and a top-selling-products breakdown — all computed live from `OrderService` and `ProductService`.
- **Customers**: searchable customer list (seeded demo data) with a detail view showing lifetime spend, order history, and an active/blocked toggle.
- **Catalog**: full CRUD on the product catalog (add, edit, delete) via a form modal — category, price, stock, icon, and description are all editable. Changes persist to `localStorage` and immediately reflect in the customer-facing Shop tab.
- **Orders**: every order across all customers, filterable by status, with a one-tap "advance to next status" action and the same tracking-timeline detail modal customers see.
- **Inventory**: stock levels for every product with +/- adjusters, a one-tap "Restock (+25)" action, and low-stock / out-of-stock alerts. The Shop tab reacts to this in real time — a product hitting 0 stock shows "Sold out" and disables Add to Cart.

The product catalog, customers, and orders are all backed by reactive services (`ProductService`, `CustomerService`, `OrderService`) so the admin panel and the customer-facing app share one source of truth.

## Getting started

```bash
npm install
npm start          # ng serve — opens at http://localhost:4200
```

Or with the Ionic CLI (if you have `@ionic/cli` installed globally):

```bash
npm install
ionic serve
```

### Running as a native app (optional)

```bash
npm install
npx cap add ios       # or: npx cap add android
npm run build
npx cap sync
npx cap open ios      # or: npx cap open android
```

## Project structure

```
src/app/
  models/            Product, Order, User, Customer, Notification interfaces
  data/              Product catalog, category filters, customer seed data, icon/tint map
  services/          Cart, Wishlist, Notification, Auth, Order, Product, Customer, Toast (signal-based)
  tabs/              Customer-facing bottom tab bar + routes
  pages/             home, shop, wishlist, cart, account
  components/        product-card, checkout-modal, order-detail-modal, notifications-modal
  admin/             Admin panel: its own tab bar + dashboard, customers, catalog, orders, inventory pages
src/theme/variables.scss   Brand palette mapped to Ionic CSS variables
src/global.scss            Shared utility classes (fields, empty states, scallop divider)
original-reference/        The original static HTML/CSS/JS this app is based on
```

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Cradle & Care Ionic Angular app"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

`node_modules`, `www`, `.angular`, and any `ios`/`android` platform folders are already excluded via `.gitignore`.

## Notes / next steps

- Run `npm install` once to pull in Angular, Ionic, and Capacitor packages (not included in this download to keep it small).
- Checkout and login are fully client-side demos — no backend, no real payment processing.
- If you add a real backend, the natural seams are `AuthService`, `OrderService`, and the checkout modal's `placeOrder()` call.
