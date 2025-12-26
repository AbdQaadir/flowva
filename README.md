# Rewards & Referral App

A web application that allows users to sign up, earn points via referrals, track rewards, and redeem points. Built with TanStack Start, TanStack Router, and Supabase.

## Live Demo

🔗 https://flowva-gules.vercel.app/

## Tech Stack

- **Frontend**: React, TanStack Start, TanStack Router
- **Backend / Auth**: Supabase (Auth, Database, RLS, Triggers)
- **Database**: PostgreSQL (Supabase-managed)
- **Styling**: Tailwind CSS, shadcn/ui
- **Deployment**: Vercel

## Features

- Email/password authentication
- Referral system with unique referral codes
- Automatic profile creation via Supabase triggers
- Points system and referral rewards
- Rewards catalog (locked / coming soon)
- Route-level loading using `beforeLoad`

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/AbdQaadir/flowva.git
cd flowva
```

### 2. Install dependencies

```bash
npm install
# or pnpm install / yarn install
```

### 3. Environment Variables

Create a `.env` file and add:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your_supabase_publishable_or_anon_key
VITE_APP_URL=your_app_url_localhost_or_vercel_url
```

### 4. Supabase Configuration (Managed)

This project uses a pre-configured Supabase instance.
Database schema, RLS policies, and triggers are managed directly in Supabase
and are not recreated locally as part of this repository.

The following are already configured in the hosted environment:

- Email/password authentication enabled
- `profiles` table with RLS enabled
- Trigger on `auth.users` to:
  - Create a profile row on signup
  - Generate a referral code
  - Store `referred_by` if provided
- Trigger to award referral points when a referred user signs up

This approach was chosen to keep the focus on application logic,
data flow, and product behavior rather than infrastructure provisioning.

### 5. Run locally

```bash
npm run dev
```

App will be available at `http://localhost:3000`

## Database Logic Overview

- User profiles are created automatically via a Supabase `auth.users` trigger
- Referral codes are generated on signup and stored on the `profiles` table
- Points are awarded via database triggers when a referred user signs up
- Referral counts and points are derived from persisted data, not client state

## Assumptions & Trade-offs

---

## Assumptions & Trade-offs

> **Route-level loading vs skeletons**
> The app relies on TanStack Router’s `beforeLoad` for all critical data fetching. This ensures routes only render when data is consistent, simplifying loading states. As a trade-off, some user actions trigger a full page loader via `router.invalidate()` instead of granular skeletons.

> **Referral code generation**
> Referral codes are generated server-side using a short, non-identifying prefix combined with randomness to avoid exposing sensitive user data such as full email addresses. This prioritizes privacy over deterministic codes.

> **Database-driven logic**
> Referral rewards and profile creation are handled via Supabase triggers to ensure correctness and prevent client-side manipulation. This increases backend complexity slightly but improves data integrity.

> **Rewards catalog**
> Rewards are currently represented as static configuration data since redemption logic is out of scope. This allows the UI and points system to be demonstrated clearly without overengineering early.
