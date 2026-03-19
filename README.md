# Restaurant Inventory Tracker

A beginner-friendly full-stack portfolio project for tracking restaurant inventory, spotting low-stock risk, and managing daily prep tasks.

This repository is designed to stay small, readable, and practical while still showing real full-stack skills:

- public and protected routes
- authentication with Clerk
- database-backed CRUD with Prisma and PostgreSQL
- user-scoped data
- Zod validation
- reusable UI components
- automated quality checks

## Project Summary

Restaurant Inventory Tracker is a learning-focused portfolio project built to practice how a modern Next.js app works from end to end.

The app helps signed-in users:

1. track inventory items
2. catch low-stock and critical stock issues
3. manage daily prep tasks
4. review a simple dashboard summary

It is intentionally not a full restaurant management platform. The goal is to show strong fundamentals in a clean, beginner-friendly way.

## What Is Already Implemented

### Public App Experience

- public landing page
- shared app shell with header and sidebar
- loading, error, global error, and not-found states
- clear navigation between the main pages

### Authentication and Access Control

- Clerk sign-in and sign-up flows
- protected `dashboard`, `inventory`, and `prep` routes
- user-scoped inventory and prep data
- route protection through the existing proxy setup

### Inventory Features

- database-backed inventory CRUD
- add, edit, and delete inventory items
- search inventory items by name
- filter inventory items by category
- filter inventory items by stock status
- stock status badges for `OK`, `Low Stock`, and `Critical`
- low-stock alert section
- inventory summary cards and empty states
- Zod validation for create and update flows

### Prep Task Features

- database-backed prep task CRUD
- add, edit, and delete prep tasks
- mark tasks complete or open
- filter prep tasks by status
- prep summary cards
- Zod validation for create and update flows

### Dashboard Features

- total inventory items summary
- low stock items summary
- critical items summary
- open prep tasks summary
- low-stock alert section
- beginner-friendly empty dashboard state

### Quality and Release Readiness

- TypeScript
- ESLint
- Vitest + Testing Library
- tests for reusable stock logic and validation
- GitHub Actions CI
- production build support
- beginner-friendly setup and release notes

## Tech Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Prisma
- PostgreSQL
- Clerk
- Zod
- Vitest
- Testing Library
- npm

## Project Structure

```text
app/
  dashboard/
  inventory/
  prep/
  sign-in/
  sign-up/
  error.tsx
  global-error.tsx
  layout.tsx
  loading.tsx
  not-found.tsx
  page.tsx

components/
  inventory/
  layout/
  prep/

lib/
  inventory.ts
  inventory-status.ts
  prep.ts
  prisma.ts
  validations/

prisma/
  migrations/
  schema.prisma
  seed.ts

public/
  screenshots/

tests/
  components/
  lib/
```

## Getting Started

Run all commands from the project root folder.

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

Copy `.env.example` to `.env`, then add your real values.

### 3. Generate the Prisma client

```bash
npm run prisma:generate
```

### 4. Run database migrations

```bash
npm run prisma:migrate -- --name init
```

If you already have the existing migrations and only want to apply them in a deployment environment later, use:

```bash
npm run prisma:migrate:deploy
```

### 5. Optional: seed demo data

If you set `SEED_USER_ID` in `.env`, you can load sample inventory items and prep tasks:

```bash
npm run prisma:seed
```

### 6. Start the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env` file in the project root.

### Required

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`

### Optional

- `SEED_USER_ID`

### What Each Variable Does

- `DATABASE_URL`
  Prisma uses this to connect to your PostgreSQL database.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  Public Clerk key used by the frontend.
- `CLERK_SECRET_KEY`
  Private Clerk key used on the server.
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
  Should match the sign-in route in this project, usually `/sign-in`.
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
  Should match the sign-up route in this project, usually `/sign-up`.
- `SEED_USER_ID`
  Optional Clerk user ID for assigning demo seed data to one signed-in user.

Example:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/restaurant_inventory_tracker?schema=public"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_key"
CLERK_SECRET_KEY="sk_test_your_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
SEED_USER_ID="user_123"
```

## Database Setup

This project uses Prisma with PostgreSQL.

Typical local setup flow:

1. Make sure PostgreSQL is running
2. Add your `DATABASE_URL` to `.env`
3. Generate the Prisma client with `npm run prisma:generate`
4. Apply migrations with `npm run prisma:migrate -- --name init`
5. Optionally seed demo data with `npm run prisma:seed`

Useful Prisma commands:

- `npm run prisma:generate`
- `npm run prisma:migrate -- --name your_migration_name`
- `npm run prisma:migrate:deploy`
- `npm run prisma:studio`
- `npm run prisma:seed`

## Clerk Authentication Setup

You will need a Clerk application for this project.

Beginner-friendly setup checklist:

1. Create a Clerk app in your Clerk dashboard
2. Copy your publishable key and secret key into `.env`
3. Make sure the sign-in route is `/sign-in`
4. Make sure the sign-up route is `/sign-up`
5. Start the app locally and confirm you can sign up and sign in

This repository already includes:

- Clerk provider in the root layout
- sign-in and sign-up route files
- route protection for the protected app sections

## Useful Scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production build
- `npm run lint` - run ESLint
- `npm run test` - run Vitest in interactive mode
- `npm run test:watch` - run tests in watch mode
- `npm run test:run` - run all tests once
- `npm run typecheck` - run TypeScript checks
- `npm run check` - run typecheck, lint, tests, and production build
- `npm run prisma:generate` - generate the Prisma client
- `npm run prisma:migrate -- --name your_migration_name` - create and apply a migration in development
- `npm run prisma:migrate:deploy` - apply existing migrations in deployment
- `npm run prisma:studio` - open Prisma Studio
- `npm run prisma:seed` - seed sample data for one user

## Demo Flow

If you are showing this project to a recruiter, reviewer, or collaborator, this is the simplest walkthrough:

1. Open the home page
2. Sign up or sign in
3. Go to the Inventory page and add a few items
4. Set one item to a low quantity so low-stock alerts appear
5. Open the Prep page and add a few prep tasks
6. Mark one prep task complete
7. Open the Dashboard page and review the summaries

This gives a quick tour of the main full-stack features without needing a long explanation.

## Final Project Docs

For the last finish-and-share steps, use these supporting guides:

- [Manual QA checklist](./FINAL_QA_CHECKLIST.md)
- [Release checklist](./docs/RELEASE_CHECKLIST.md)
- [Screenshot guide](./docs/SCREENSHOT_GUIDE.md)
- [Deploy guide](./docs/DEPLOY_GUIDE.md)

## Repository Docs

For repository-level guidance and GitHub collaboration support, use:

- [Contributing guide](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)
- [License](./LICENSE)

These documents are meant to help you:

- verify the app before sharing it
- capture clean portfolio screenshots
- prepare the repository for GitHub
- get ready for deployment later

## Manual QA Checklist

Use the full manual QA checklist here:

[FINAL_QA_CHECKLIST.md](./FINAL_QA_CHECKLIST.md)

That checklist covers:

- public home page
- sign up and sign in
- protected routes
- dashboard loading
- inventory create, edit, delete, search, and filter
- low-stock alerts
- prep create, edit, delete, and complete flows
- logout flow
- empty states
- error-state checks

## Screenshots

The repository is ready for real screenshots later.

Add your image files in:

`public/screenshots/`

Suggested filenames:

- `public/screenshots/home.png`
- `public/screenshots/dashboard.png`
- `public/screenshots/inventory.png`
- `public/screenshots/prep.png`

Example markdown once you add real images:

```md
![Home page](./public/screenshots/home.png)
![Dashboard page](./public/screenshots/dashboard.png)
![Inventory page](./public/screenshots/inventory.png)
![Prep page](./public/screenshots/prep.png)
```

Recommended screenshot order for GitHub:

1. Home page
2. Dashboard
3. Inventory
4. Prep

Recommended screenshot tips:

- use the same browser window size for each image
- make sure sample inventory and prep data is visible
- include at least one low-stock example
- avoid screenshots with test or placeholder auth data if possible

## Testing

This project includes a beginner-friendly automated testing setup with:

- Vitest
- Testing Library
- jsdom

Current automated coverage focuses on stable and reusable parts of the app:

- stock status helper logic
- Zod validation schemas
- small reusable inventory UI components

Run the checks locally:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```

## Deployment Readiness Notes

This repository is prepared for deployment, but is not deploying automatically yet.

Before deploying later, make sure you:

- provide real production environment variables
- use a working hosted PostgreSQL database
- confirm Clerk production keys and allowed URLs
- run `npm run prisma:generate`
- apply migrations with `npm run prisma:migrate:deploy`
- run `npm run typecheck`
- run `npm run lint`
- run `npm run test:run`
- run `npm run build`

Important deployment gotchas:

- the app still requires valid Clerk keys
- the app still requires a working PostgreSQL connection
- seed data is optional and should only be used when you want demo content
- there is no browser end-to-end test suite yet

For a step-by-step deployment preparation guide, see:

[docs/DEPLOY_GUIDE.md](./docs/DEPLOY_GUIDE.md)

## Release Checklist

Use this checklist before calling the project release-ready:

- run `npm install`
- create `.env` from `.env.example`
- confirm Clerk keys are set correctly
- confirm `DATABASE_URL` points to a working PostgreSQL database
- run `npm run prisma:generate`
- run `npm run prisma:migrate -- --name init` if needed for local setup
- optionally run `npm run prisma:seed`
- run `npm run typecheck`
- run `npm run lint`
- run `npm run test:run`
- run `npm run build`
- manually verify the home page, inventory page, prep page, and dashboard
- use the manual QA checklist before sharing the project publicly

For a full beginner-friendly version of this checklist, see:

[docs/RELEASE_CHECKLIST.md](./docs/RELEASE_CHECKLIST.md)

## Known Limitations

- no browser end-to-end test suite yet
- no advanced analytics or trend reporting
- no supplier management or admin roles
- no automated deployment pipeline yet
- valid Clerk keys and a working PostgreSQL database are still required

## Future Improvements

Possible future ideas, without changing the current beginner-friendly scope too much:

- richer inventory categories and units
- stronger dashboard trends or activity summaries
- more advanced prep scheduling
- deeper automated test coverage
- real deployment setup on a platform like Vercel

## Portfolio Notes

This project is a strong beginner-friendly full-stack example because it shows:

- authentication
- protected routes
- database-backed CRUD
- user-scoped data
- validation
- reusable UI patterns
- automated quality checks
- practical documentation and release habits

It is intentionally scoped to stay understandable instead of overengineered.

## Closing

Restaurant Inventory Tracker is meant to be a clean portfolio project that demonstrates real full-stack fundamentals in a practical, readable way.

If you are reviewing this repository as an employer or collaborator, the best places to start are:

1. the home page for project context
2. the inventory and prep pages for CRUD workflows
3. the dashboard for summaries
4. the README sections on setup, demo flow, screenshots, and release readiness
5. the docs folder for release, screenshot, and deploy guidance
