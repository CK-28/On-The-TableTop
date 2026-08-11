# On The TableTop

A modern, friendly web app for discovering, sharing, and playing board games with friends. Built with Next.js, TypeScript, Tailwind CSS and Supabase for backend services. This repository showcases a clean component architecture, auth flows, party features, and helpful developer tooling.

## Highlights

- **Authentication & Profiles:** Sign up, login, password reset, and user profiles backed by Supabase.
- **Game Discovery:** Search and browse games with fast, accessible UI components.
- **Party Mode:** Create and manage parties to play with friends — invite, join, and share game lists.
- **Admin Tools:** Add/remove users and games via dedicated components for maintainers.
- **Guided Onboarding:** In-app tutorial steps help new users connect Supabase and fetch data.
- **Production-ready:** TypeScript-first codebase, Tailwind for rapid UI, deployable to Vercel.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Database)
- ESLint + Prettier

## Quick Start — Local Development

Prerequisites:
- Node.js 18+ installed
- npm, yarn, or pnpm

1. Install dependencies

```bash
npm install
# or `pnpm install` / `yarn install`
```

2. Create environment file

Copy a local env file and fill in Supabase keys.

```bash
cp .env.example .env.local
# then edit .env.local and add the values below
```

Minimum env variables this project expects:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key # optional for server-only tasks
```

3. Run the dev server

```bash
npm run dev
# Open http://localhost:3000
```

4. Build and preview production

```bash
npm run build
npm run start
```

## Environment & Deployment

- This project is optimized for deployment on Vercel or any platform that supports Next.js. Ensure environment variables are configured in the hosting dashboard (e.g., Vercel Project > Settings > Environment Variables).
- For Supabase, create a project and add the table schemas required by the app. The app expects auth and basic game/party tables; see `lib/supabase` for client/server usage.

## Project Structure (high-level)

- `app/` — Next.js App Router pages and layouts
- `components/` — Reusable UI and feature components (auth, game lists, party widgets, tutorial)
- `lib/` — Utilities and Supabase client wrappers
- `docs/` — Design notes, research, and images

## Scripts

- `dev` — Run Next.js dev server
- `build` — Create production build
- `start` — Start production server
- `lint` — Run linters (if configured)

Check `package.json` for exact script names.

## Notable Files

- `app/` — Main app entry (routes & layouts)
- `components/` — UI components and feature modules
- `lib/supabase` — Supabase client and server helpers

