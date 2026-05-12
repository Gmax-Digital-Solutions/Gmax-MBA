# Gmax MBA — Free Business School for Founders & Builders

A full-stack Next.js 14 application delivering a structured, free, 36-month MBA program for developers, solo founders, and engineers.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Auth | NextAuth.js v4 (Credentials provider, JWT) |
| Database | Prisma ORM + SQLite (dev) / PostgreSQL (prod) |
| Styling | Tailwind CSS |
| UI | Radix UI primitives + Lucide icons |
| Notifications | react-hot-toast |
| Validation | Zod |
| Language | TypeScript |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                        # Landing page (public)
│   ├── layout.tsx                      # Root layout with providers
│   ├── globals.css
│   ├── api/
│   │   ├── auth/[...nextauth]/         # NextAuth handler
│   │   ├── register/                   # POST /api/register
│   │   ├── progress/                   # GET + POST /api/progress
│   │   ├── notes/                      # GET + POST + DELETE /api/notes
│   │   └── users/me/                   # GET + PATCH /api/users/me
│   ├── auth/
│   │   ├── signin/page.tsx             # Sign in page
│   │   └── signup/page.tsx             # Enrollment page
│   └── dashboard/
│       ├── layout.tsx                  # Protected dashboard shell
│       ├── page.tsx                    # Dashboard home
│       ├── curriculum/page.tsx         # All 4 phases + 12 modules
│       ├── modules/[moduleId]/
│       │   ├── page.tsx                # Server component (data fetch)
│       │   └── client.tsx              # Interactive module view
│       ├── progress/page.tsx           # Progress report + book tracker
│       ├── community/page.tsx          # Enrolled founders directory
│       └── profile/page.tsx            # Edit profile
├── components/
│   ├── providers.tsx                   # SessionProvider wrapper
│   └── dashboard/
│       ├── sidebar.tsx
│       └── topbar.tsx
├── lib/
│   ├── auth.ts                         # NextAuth config
│   ├── db.ts                           # Prisma singleton
│   ├── utils.ts                        # cn(), formatDate(), getInitials()
│   └── data/curriculum.ts              # Full curriculum data (4 phases, 12 modules, 29 books)
└── types/
    └── next-auth.d.ts                  # Extended session types
```

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo>
cd gmax-mba
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-here"   # openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Set up the database

```bash
npx prisma db push        # Creates SQLite DB from schema
npx prisma db seed        # Seeds 5 demo users
```

### 4. Run the dev server

```bash
npm run dev
# Open http://localhost:3000
```

## Deployment (Vercel + PostgreSQL)

### 1. Switch to PostgreSQL

Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. Set Vercel environment variables

```
DATABASE_URL          postgresql://...    (Neon, Supabase, or Vercel Postgres)
NEXTAUTH_SECRET       your-32-char-secret
NEXTAUTH_URL          https://your-domain.com
NEXT_PUBLIC_APP_URL   https://your-domain.com
```

### 3. Deploy

```bash
vercel deploy
npx prisma db push    # Run against production DB
```

## Pages & Routes

| Route | Description | Auth |
|---|---|---|
| `/` | Landing page | Public |
| `/auth/signup` | Enrollment | Public |
| `/auth/signin` | Sign in | Public |
| `/dashboard` | Home with stats & progress | Protected |
| `/dashboard/curriculum` | All phases & modules | Protected |
| `/dashboard/modules/[id]` | Module detail (books, videos, tasks, notes) | Protected |
| `/dashboard/progress` | Full progress report + book tracker | Protected |
| `/dashboard/community` | Directory of enrolled founders | Protected |
| `/dashboard/profile` | Edit profile | Protected |

## Curriculum Structure

- **Phase 1 — Business Foundations** (Months 1–4): Mental models, financial intelligence
- **Phase 2 — Core Business Mastery** (Months 5–14): Strategy, marketing, sales, operations
- **Phase 3 — Advanced Strategy & Leadership** (Months 15–24): Leadership, innovation, negotiation
- **Phase 4 — CEO-Level Mastery** (Months 25–36): Corporate finance, VC/M&A, global economics

## Business Model

The program is **100% free** for users. Monetisation comes through:
1. **Gmax Digital Solutions exposure** — every enrolled founder is a potential agency client
2. **Warm audience** — founders who learn business with you trust you to execute for them
3. **Community leads** — profile pages expose companies; these are warm sales touchpoints
4. **Sponsorships** (optional future) — relevant tools (Notion, Loom, etc.) can sponsor modules
# Gmax-MBA
