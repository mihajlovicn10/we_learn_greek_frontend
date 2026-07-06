# Design tokens

Defined in `tailwind.config.js` and applied globally via `src/index.css`.

## Colors

| Token | Hex | Usage |
|-------|-----|--------|
| `brand-900` | `#1e3a5f` | Navbar, hero overlays, primary headings |
| `brand-700` | `#1d4ed8` | Primary buttons, links |
| `brand-500` | `#3b82f6` | Focus rings, accents |
| `accent` | `#c45c3e` | Secondary CTAs, highlights |
| `accent-dark` | `#a34a32` | Accent hover |
| `sand` | `#f5f0e8` | Warm page backgrounds (auth, static pages) |
| `olive` | `#5c6b4a` | Secondary badges, subtle accents |
| `surface` | `#ffffff` | Cards, panels |
| `surface-muted` | `#f8fafc` | App background |

## Typography

| Class | Font | Usage |
|-------|------|--------|
| `font-sans` | Inter | Body, UI, forms |
| `font-display` | Literata | Headings, hero text, Greek emphasis |

Loaded in `index.html` via Google Fonts.

## Radii & shadows

| Class | Value |
|-------|--------|
| `rounded-xl` | 1rem |
| `rounded-2xl` | 1.25rem |
| `shadow-card` | Subtle card elevation |
| `shadow-card-hover` | Lifted card on hover |

## Gradients

| Class | Description |
|-------|-------------|
| `bg-gradient-brand` | Aegean → blue (section backgrounds) |
| `bg-gradient-brand-soft` | Lighter blue gradient |
| `bg-gradient-hero-overlay` | Dark overlay for video heroes |

## Layout utilities (`index.css`)

| Class | Description |
|-------|-------------|
| `page-container` | Centered max-width content (`max-w-content`) |
| `section-padding` | Vertical section spacing |
| `gradient-section` | Brand gradient + padding |
| `input-pill-dark` | Dark rounded auth/dictionary inputs |
| `btn-pill-primary` | Full-width brand pill button |

## Layout components (`src/components/layout/`)

| Component | Usage |
|-----------|--------|
| `PageLayout` | Static pages — `title`, `subtitle`, `narrow`, `background` props |
| `Section` | Full-width sections — `variant`: `default`, `sand`, `muted`, `gradient` |
| `AuthLayout` | Login / Register — centered card on `bg-sand` |

```jsx
import { PageLayout, Section, AuthLayout } from '../components/layout';

<PageLayout title="About" narrow>
  <div className="rounded-2xl bg-surface p-8 shadow-card">...</div>
</PageLayout>

<Section variant="gradient" contained={false}>
  <div className="page-container">...</div>
</Section>

<AuthLayout title="Login" footer={...}>...</AuthLayout>
```

## Accessibility

- `:focus-visible` uses `ring-brand-500`
- `prefers-reduced-motion` disables animations/transitions globally

## Usage example

```jsx
<section className="gradient-section">
  <div className="page-container">
    <h1 className="font-display text-4xl text-white">Καλημέρα</h1>
    <button className="mt-4 rounded-full bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark">
      Get started
    </button>
  </div>
</section>
```
