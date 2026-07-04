# Manas Yadav — Windows 11 Portfolio

A personal portfolio built as a fully interactive Windows 11 desktop simulation — boot sequence, lock screen, draggable/resizable windows, a Start menu, taskbar, and a set of "apps" that double as portfolio sections.

**Live:** [itsdevmanas.xyz](https://itsdevmanas.xyz)

## Features

- **Boot sequence** with a fullscreen prompt (skipped automatically on mobile/tablet)
- **Lock screen** with a live clock and a PIN prompt (any input unlocks it)
- **Desktop** with draggable, resizable, snappable windows (drag to edges to snap/maximize), a Start menu, taskbar, right-click context menu, and Quick Settings
- **Apps**, each a real portfolio section:
  - **About Me** — bio, interests, status
  - **Projects** — real shipped projects, each launched like an `.exe` with a mock install dialog, then either embedded in an iframe or opened externally depending on whether the target can be framed
  - **Skills** — categorized tech stack
  - **Contact** — ways to get in touch
  - **Resume** — embedded PDF viewer, with a Google Docs Viewer fallback on touch devices
  - **Terminal** — a working command-line easter egg
  - **Games** — a folder of real GameDistribution.com HTML5 games, lazy-loaded only when opened
  - **Microsoft Store** — a Library view of the same games
  - **Microsoft Edge** — a mock browser with working Google search and history
  - **Recycle Bin**, **Old Portfolio** (embeds the previous portfolio)
- Fully responsive: falls back to a simplified mobile-friendly layout below the desktop breakpoint

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/) for window drag/resize/snap and UI transitions
- [Tailwind CSS 4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) for iconography

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Deployment

Deployed on [Vercel](https://vercel.com) at [itsdevmanas.xyz](https://itsdevmanas.xyz).
