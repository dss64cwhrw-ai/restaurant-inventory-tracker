# Restaurant Inventory Tracker

A beginner-friendly portfolio project built with Next.js, TypeScript, and Tailwind CSS.

## Current Stage

This stage includes:

- a shared app shell
- a left sidebar and top header
- placeholder pages for Home, Dashboard, Inventory, and Prep
- a Prisma schema and PostgreSQL foundation for future database work

This stage does not include:

- authentication
- API routes
- CRUD features
- forms

## Database Setup

Add your PostgreSQL connection string to `.env`.

Then run:

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init_inventory
```

## Run Locally

Run the app from the project root:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
