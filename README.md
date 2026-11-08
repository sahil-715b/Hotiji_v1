# HOTIJI OUTFIT'S — Men's Fashion & Clothing Retail

> **"STYLE FOR EVERY YOU"**  
> Brand Owner: **Suraj Thakur**  
> Primary WhatsApp Hotline: **+91 88102 06519** | Secondary Contact: **+91 92207 70616**

A premium, modern, responsive e-commerce web application for **HOTIJI OUTFIT'S**. Built with a client-side frontend-only architecture in React, Tailwind CSS, and Lucide icons, inspired by the brand's iconic black-and-white metallic signboard.

---

## Key Features

1. **Brand Identity & Aesthetics**
   - Monochromatic luxury aesthetic (#080808, #FFFFFF, #BFC0C2 silver accents).
   - High-contrast typography pairing Cormorant Garamond / Playfair Display and Plus Jakarta Sans.
   - Distinctive **HJ Monogram** and responsive wordmark.
   - Clean product catalog layout designed for readability.

2. **Full Product Catalog & Filtering (Client-Side)**
   - 18 sample menswear & boys' apparel products across 8 categories (Men's Wear, Boys' Wear, Shirts, Jeans & Trousers, Jackets, Casual Wear, Party Wear, Premium Collection).
   - Multi-criteria real-time filtering: Category, Subcategory, Size (S, M, L, XL, 30, 32, etc.), Price Range slider (up to ₹6,000), Stock availability.
   - Dynamic sorting: Featured, Newest First, Price (Low to High, High to Low), Name (A to Z).
   - Product search matching product names, unique product codes (e.g. `HT001`), descriptions, and colors.

3. **Product Details & Sizing Validation**
   - Multi-image gallery with thumbnail switcher and zoom.
   - Interactive size and color selectors with validation prevents out-of-stock or unselected size checkout.
   - Quantity stepper.
   - Related products recommendation and recently viewed products saved in `localStorage`.
   - Quick-view modal accessible from any card.

4. **Persistent Shopping Cart (`CartContext`)**
   - Cart stored in browser `localStorage` across page reloads.
   - Slide-over Cart Drawer + dedicated `/cart` page.
   - Quantity modification, item removal, and subtotal calculation in INR (₹).
   - Unique item identifier keying (`productId + size + color`).

5. **Direct WhatsApp Order Integration**
   - **No complex payment gateways or backend servers required.**
   - Generates an itemized order message with product names, product codes, selected sizes, colors, quantities, item subtotals, order total, and direct image links.
   - Direct launch via `https://wa.me/918810206519?text=...`.
   - Preserves user cart and informs the customer to tap "Send" in WhatsApp.
   - Quick product inquiry button on product detail pages.

6. **Customer Conveniences**
   - Interactive search modal overlay (`⌘K`).
   - Wishlist management persisted via `localStorage`.
   - Floating WhatsApp contact widget for direct communication with Suraj Thakur.
   - Smooth Back-to-Top button.
   - Toast notifications for cart actions.

---

## Tech Stack

- **React 19**
- **Vite**
- **React Router v7**
- **Tailwind CSS v4**
- **Lucide React** (icons)
- **Local Storage API** (client-side state persistence)

---

## Project Structure

```text
├── index.html
├── metadata.json
├── package.json
├── README.md
├── src/
│   ├── App.jsx                     # Master application & routing
│   ├── main.tsx                    # React DOM entry point
│   ├── index.css                   # Tailwind v4 & typography tokens
│   ├── assets/
│   │   └── images/                 # High-resolution generated menswear assets
│   ├── config/
│   │   └── siteConfig.js           # Brand constants, contacts, navigation
│   ├── context/
│   │   ├── CartContext.jsx         # Persistent shopping cart state
│   │   └── WishlistContext.jsx     # Wishlist and recently viewed state
│   ├── data/
│   │   ├── categories.js           # Category definitions and metadata
│   │   └── products.js             # 18 sample products dataset
│   ├── utils/
│   │   ├── pricing.js              # INR formatting & discount calculators
│   │   ├── storage.js              # Safe LocalStorage operations
│   │   └── whatsapp.js             # WhatsApp order message generator & launcher
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AnnouncementBar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── CategorySection.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── BrandStatement.jsx
│   │   │   └── NewArrivals.jsx
│   │   ├── products/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductFilters.jsx
│   │   │   ├── ProductGallery.jsx
│   │   │   └── ProductQuickView.jsx
│   │   ├── cart/
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── CartSummary.jsx
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── Modal.jsx
│   │       ├── Toast.jsx
│   │       ├── WhatsAppButton.jsx
│   │       ├── SearchModal.jsx
│   │       ├── BackToTop.jsx
│   │       └── HJLogo.jsx
│   └── pages/
│       ├── Home.jsx
│       ├── Shop.jsx
│       ├── ProductDetails.jsx
│       ├── Cart.jsx
│       ├── Wishlist.jsx
│       └── NotFound.jsx
```

---

## Local Development

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Static Production Deployment

Because this is a frontend-only application, it can be deployed to any static hosting provider.

### Build Step
```bash
npm run build
```
This generates the optimized static files in the `dist/` directory.

### Deploy to Vercel
1. Install Vercel CLI (`npm i -g vercel`) or connect the Git repository to Vercel.
2. Deploy command: `vercel`
3. Output directory: `dist`
4. For client-side routing fallback, Vercel automatically honors Single Page App routing when configured, or add `vercel.json`:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

### Deploy to Netlify
1. Connect repository or run `netlify deploy --prod`.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add `public/_redirects`:
   ```text
   /*    /index.html   200
   ```
