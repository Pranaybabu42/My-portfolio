# AI/ML Engineer Portfolio (React + Tailwind + Framer Motion)

A premium single-page AI/ML portfolio with:

- Dark matte theme with grey layered panels
- Accent system based on `#E6501B`
- Scroll reveals, micro-interactions, and subtle motion effects
- Cursor diffusion smoke effect
- Hero neural/particle background canvas
- Motion accessibility (`prefers-reduced-motion` + UI toggle)
- Data-driven content (`src/data/profile.js`)
- Image fallback placeholders (no crash on missing images)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Where to edit content

Edit all portfolio content in:

- `src/data/profile.js`

This file controls:

- name, role, summary, links
- skills
- projects
- experience
- education
- publications
- certifications
- testimonials

## Where to put images

Use static image paths in:

- `/public/assets/my-images/...`

The app already references:

- `/assets/my-images/Dramatic portrait of a young man (1).png`
- `/assets/my-images/Contemplative portrait in shadows.png`

If an image is missing, a stylish animated placeholder is rendered automatically.

## How to add a new project

1. Open `src/data/profile.js`
2. Add a new item to `projects` with:
	- `id`, `title`, `tags`, `image`, `description`, `impact`, `stack`, `repo`, `demo`, `details`
3. Save; the UI updates automatically.

## Deploy

### Vercel

1. Push repo to GitHub
2. Import repo in Vercel
3. Framework preset: `Vite`
4. Build command: `npm run build`
5. Output directory: `dist`

### Netlify

1. Push repo to GitHub
2. Import repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

## Notes

- Motion can be reduced using the nav toggle.
- Accent color is centralized via CSS variables in `src/styles/theme.css`.
- Reusable components and hooks live under `src/components` and `src/hooks`.
