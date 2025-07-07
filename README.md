# Mini-Commerce

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://mini-commerce-liart.vercel.app/)
![Test Status](https://img.shields.io/badge/tests-3%20passed-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-yellow)

A lightweight e-commerce prototype built with Next.js 14 (App Router) featuring product browsing, cart management, and mock checkout.

![Mini-Commerce Screenshot](/public/Mini-commerce.png)

## Features

### Core Requirements

- **Product Catalogue** - Browse 8+ products with images, prices, and descriptions
- **Product Details** - Full view with "Add to Cart" functionality
- **Persistent Cart** - Manage quantities with Zustand + localStorage
- **Checkout Flow** - Order summary → Confirmation with random order ID

### Enhancements

- ✨ Dark/Light mode toggle
- 🔍 Product search functionality
- 🛒 Toast notifications for cart actions
- 💅 Framer Motion animations
- 📱 Fully responsive design

## Tech Stack

**Mandatory Stack**

- Next.js 14 (App Router)
- React 18
- TypeScript (strict mode)
- Tailwind CSS
- Zustand (state management)
- React Query (data fetching)

**Testing**

- Jest
- React Testing Library
- Playwright (e2e)

## Design Approach

### Layout & Responsiveness

| Breakpoint | Layout        | Features                     |
| ---------- | ------------- | ---------------------------- |
| Mobile     | Single column | Sticky header, compact cards |
| Tablet     | 2-column grid | Larger product images        |
| Desktop    | 3-column grid | Sidebar cart summary         |

### Color System

```js
{
  light: {
    primary: '#4f46e5', // Indigo-600
    background: '#ffffff',
    text: '#111827' // Gray-900
  },
  dark: {
    primary: '#6366f1', // Indigo-500
    background: '#111827',
    text: '#f3f4f6' // Gray-100
  }
}
```