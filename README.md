# TinyTods — Baby Products E-Commerce Website

A premium, fully responsive e-commerce frontend for the TinyTods baby brand, built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

> Note: this project was written in an offline sandbox without network access, so it has **not** been through a live `npm install` / `npm run build` here. The code has been carefully reviewed by hand (imports, exports, and JSX/brace balance all checked), but please run `npm run build` after installing to catch anything an offline review can't — and let me know if anything needs a fix.

## What's included

- **Pages**: Home, Categories (with search, sort, category filter, mobile filter drawer), Offers, About Us, Contact Us, and a dynamic Product Detail page (`/product/[id]`)
- **Design system**: colors, type scale, radii and shadows derived from your logo, defined centrally in `tailwind.config.ts`
- **Fonts**: Baloo 2 (rounded, playful display font for headings) + Nunito (body), loaded via `next/font/google`
- **MVC-inspired architecture**:
  - `types/` — shared TypeScript interfaces
  - `data/` — mock product/category/offer data (swap for a real API later)
  - `models/` — `Product` and `Category` classes with derived getters (pricing, discount %, formatting)
  - `services/` — the seam between UI and data source; swap the function bodies for real `fetch`/DB calls without touching components
  - `controllers/` — assemble the data each page needs
  - `components/` — organized by `layout/`, `home/`, `product/`, `categories/`, `contact/`, `ui/`
- **Accessibility**: semantic HTML, skip-to-content link, visible focus rings, alt text on all images, `aria-label`/`aria-pressed` on icon-only controls, `prefers-reduced-motion` respected
- **SEO**: per-page metadata (title templates, descriptions, Open Graph) via the App Router `metadata` API

## Product images

Product and category photography currently uses royalty-free Unsplash placeholder images (via `next.config.js` remote image patterns). Swap the URLs in `data/products.ts` and `data/categories.ts` for your own photography whenever you're ready — no other code changes needed.

## Connecting a real backend later

Because all data access flows through `services/`, you can replace the mock-data calls in `productService.ts`, `categoryService.ts`, and `offerService.ts` with real API or database calls, and every page/component will keep working unchanged.
