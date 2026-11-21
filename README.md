# EmmyCodes — Fadayomi Emmanuel

Personal portfolio for **Fadayomi Emmanuel**, a software developer and creative technologist. Built with Next.js App Router, TypeScript, Tailwind CSS and GSAP.

## Stack

- Next.js 16 (App Router, Server Components, Server Actions)
- TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger + @gsap/react
- Lucide icons
- Resend (optional, server-side only) for contact delivery

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint
npm run build
npm start
```

## Structure

```
src/
  app/                 Routes, metadata, sitemap, robots, OG image
    projects/          Gallery + [slug] case studies
    actions/contact.ts Server Action for the contact form
  components/
    animation/         Reveal + scroll-driven text primitives
    home/              Hero, About, Selected Works, Skills, Contact
    projects/          Shared project card + placeholder artwork
    providers/         Theme + intro loader context
    site/              Navigation, mobile menu, footer, preloader, cursor
  data/
    projects.ts        Single source of truth for all project content
    site.ts            Brand, navigation, socials, contact details
    skills.ts          Skill groups
  lib/                 GSAP setup, theme tokens helpers, shared types
```

## Content that needs your input

Nothing personal or project-specific is invented. Placeholders are labelled in the UI.

1. **Portrait** — the photograph lives at `public/portrait.jpg` and the hero
   renders it with `next/image`. Replace that file to change it.
2. **Project screenshots** — the cards and case studies render `ProjectVisual`
   placeholders. Set a project's `image` field to a file under `public/` to show
   a real screenshot on the card, cover and screenshots section; `screenshots`
   entries also accept an optional `src`.
3. **Technology stacks** — every project currently has `stack: []`, shown as
   "Stack — to be confirmed". Add verified technologies in
   `src/data/projects.ts`.
4. **Live and repository links** — `liveUrl` and `repoUrl` are `null` for all
   projects and render as "Not provided". Add URLs only when they exist.
5. **Project features** — some features are marked "Pending verification".
   Verify them before moving them into `features`.

## Themes

Light is the default. Theme and accent are stored in `localStorage`
(`emmycodes:theme`, `emmycodes:accent`) and applied before paint by
`src/components/theme-script.tsx` to avoid flashing.

Accents: Violet, Electric Blue, Emerald, Orange, Rose. Tokens live in
`src/app/globals.css`.

## Contact form

The form validates on the client and again in the Server Action, includes a
honeypot, per-IP rate limiting and duplicate-submit protection. It only reports
success after the email provider accepts the message.

To enable delivery:

1. Create a Resend account and verify a sending domain.
2. Copy `.env.example` to `.env.local` and set:
   - `RESEND_API_KEY`
   - `CONTACT_FROM_EMAIL` (verified sender)
   - `CONTACT_TO_EMAIL` (optional; defaults to the address in `src/data/site.ts`)
3. Redeploy with the same variables.

Without these variables the form returns an honest "delivery isn't configured"
message with your email address as a fallback.

## Deployment

Deploy to Vercel, then set `NEXT_PUBLIC_SITE_URL` to the production domain so
metadata, the sitemap and Open Graph URLs are correct. Add the contact
environment variables in the project settings.

## Accessibility & motion

- Semantic landmarks, skip link, visible focus states, labelled form fields
  and descriptive image alternatives.
- `prefers-reduced-motion` is respected by GSAP animations, the preloader and
  the custom cursor. The custom cursor is only enabled for fine pointers.
- Mobile navigation uses a native modal `<dialog>` for focus management and
  Escape support.
