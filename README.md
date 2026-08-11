# On The TableTop

Board game night always comes down to the same questions: who's coming, what do they own, and what can we actually play with this many people? On The TableTop was built to solve that!
The app's core feature, "Start a Party," takes the guesswork out of game night - just list who's attending, and the app cross-references everyone's collections and each game's player count to surface exactly which games are playable given who's in the room. Users can create an account to catalog their game collection and connect with friends to browse each other's libraries. 
Future features include filtering by playtime and genre for more targeted results and a home page dashboard presenting users with trending games and friend activity.

## Key Features

- Track personal game collection using built-in and custom lists
- Comprehensive database integration to find and catalog games
- Add friends and browse their collections
- Plan a party based on who's attending and instantly see which games are available
- Filter results by player count, playtime, genre, or other criteria

## Technical Details
- Reactive front-end implemented with Next.js  and React
- Integrated with Supabase for authentication, database management, and BaaS including custom TypeScript and PostgreSQL functions for server-side logic
- Deployed and hosted using Vercel
- Custom UI using MUI 3 component library - designed to be intuitive and attractive

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- MUI and shadcn/ui components
- Supabase (Auth + Database + BaaS)
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

Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true)

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

## Screenshots

**Landing Page**
![Login page](public/pictures/Login%20Page.png)
**Board Games Seach Page**
![Game search](public/pictures/Game%20Search%20Page.png)
*Start a Party Pagee**
![Party planner](public/pictures/Party%20Page.png)

View more screenshots in the [public/pictures](public/pictures) folder.