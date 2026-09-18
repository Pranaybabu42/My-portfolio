# Pranay Babu Thalluri - AI/ML Engineer Portfolio

This repository contains a responsive, single-page portfolio website for **Pranay Babu Thalluri**, an AI/ML and full-stack engineer.

The site communicates Pranay's professional profile through structured content, interactive project cards, animated transitions, technology-focused visuals, and accessible navigation. It presents experience across Generative AI, LLM/RAG systems, machine learning, backend engineering, frontend development, and MLOps.

## What the website shows

| Section | What is presented |
| --- | --- |
| **Hero** | Name, role, professional positioning, focus areas, profile image, resume action, and social/contact links. |
| **About** | A longer professional summary describing experience building production-ready AI and web applications. |
| **What I Do** | A high-level view of the working approach: building interfaces and services, protecting systems, and connecting AI, APIs, and cloud services. |
| **Skills** | Interactive categories for languages, frontend, AI/ML, backend and APIs, databases, and cloud/DevOps. Categories reveal tools, libraries, and practical notes. |
| **Journey / Evolution** | A visual quote area that reinforces the portfolio narrative and engineering mindset. |
| **History** | Education and career milestones shown as a chronological timeline. |
| **Experience** | Employment history, roles, dates, locations, responsibilities, promotion path, and technology tags. |
| **Projects** | Interactive project cards. Selecting a project opens a modal with its description, impact, stack, repository, demo, and details. |
| **Certificates & Awards** | Certification cards with issuer, year, and imagery, plus professional awards and recognition. |
| **Contact** | Email and professional links for starting a conversation or connecting externally. |
| **Footer** | Closing signature, navigation support, and the scroll-to-top control. |

The navigation highlights the section currently visible on screen. A mobile bottom navigation bar is provided for smaller screens.

## Main features

- React component architecture with reusable layout, UI, section, and effect components.
- Vite development and production build setup.
- Tailwind CSS utilities combined with custom CSS and theme variables.
- Framer Motion and GSAP-powered entrances, scroll effects, hover states, and transitions.
- Three.js / React Three Fiber support for immersive visual elements such as the globe scene.
- Animated neural background, cursor diffusion effect, and initial image-preloading screen.
- Reduced-motion support using `prefers-reduced-motion` and the site's motion control.
- Responsive navigation, skip-to-content link, semantic sections, and ARIA labels.
- Safe image rendering with animated fallback placeholders when an image is unavailable.
- Centralized portfolio content so most updates do not require changing component code.

## Technology stack

- **Frontend:** React 19, React DOM
- **Build tool:** Vite
- **Styling:** Tailwind CSS, Bootstrap, custom CSS, PostCSS, Autoprefixer
- **Animation:** Framer Motion, GSAP
- **3D / graphics:** Three.js, React Three Fiber, Drei, Meshline, Rapier
- **Icons:** Lucide React
- **Quality:** ESLint with React and React Hooks rules

## Project structure

```text
.
|-- assets/                      # Portfolio, certification, technology, and portrait images
|-- public/                      # Public files and Earth texture assets
|-- src/
|   |-- components/
|   |   |-- effects/              # Background and cursor effects
|   |   |-- layout/               # Navbar, footer, social dock, scroll-to-top
|   |   |-- sections/             # Hero, About, Skills, Projects, Experience, etc.
|   |   `-- ui/                   # Reusable buttons, cards, modal, loader, images
|   |-- data/
|   |   |-- profile.js            # Main profile and portfolio content
|   |   `-- portfolio.json        # Experience and structured portfolio data
|   |-- hooks/                    # Scroll spy, image preload, in-view, and motion hooks
|   |-- styles/                   # Shared theme variables
|   |-- App.jsx                   # Page composition and section order
|   |-- App.css                   # App-level styles
|   `-- index.css                 # Global styles and Tailwind entry point
|-- index.html
|-- package.json
|-- tailwind.config.js
`-- vite.config.js
```

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

4. Preview the production build:

```bash
npm run preview
```

Run lint checks with:

```bash
npm run lint
```

## Where to edit content

The main content is stored in:

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

Employment history is loaded from `src/data/portfolio.json`.

## Where to put images

Portraits and project visuals are in `assets/my-images/`. Certification images are in `assets/certifications/`, technology images are in `assets/languages_images/`, and Earth textures are in `public/textures/earth/`.

Use imported image paths from the asset folders in `src/data/profile.js`.

The app already references:

- `/assets/my-images/Dramatic portrait of a young man (1).png`
- `/assets/my-images/Contemplative portrait in shadows.png`

If an image is missing, the `SafeImage` component renders an animated placeholder automatically.

## How to add a new project

1. Open `src/data/profile.js`
2. Add a new item to `projects` with:
	- `id`, `title`, `tags`, `image`, `description`, `impact`, `stack`, `repo`, `demo`, `details`
3. Save; the UI updates automatically.

## Deployment

This is a standard Vite application:

| Platform | Build command | Output directory |
| --- | --- | --- |
| Vercel | `npm run build` | `dist` |
| Netlify | `npm run build` | `dist` |

## Notes for contributors

- Keep content changes in the data files where possible.
- Keep reusable behavior in `src/components/ui`, `src/components/layout`, or `src/hooks`.
- Keep the section IDs in `src/App.jsx` synchronized with navigation and scroll-spy behavior.
- Check responsive and reduced-motion behavior when adding animations.
- Run `npm run lint` and `npm run build` before deploying.

## License

No license file is currently included. Treat the portfolio content and personal assets as project-owned unless a separate license is added.
