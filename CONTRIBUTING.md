# Contributing

Thanks for your interest in contributing to Restaurant Inventory Tracker.

This project is intentionally beginner-friendly, so small, safe, readable improvements are preferred.

## 1. Clone The Repository

```bash
git clone <your-repo-url>
cd restaurant-inventory-tracker
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Set Up The Environment

Copy `.env.example` to `.env` and add your real values.

At minimum, you will need:

- `DATABASE_URL`
- Clerk keys

Then generate Prisma client:

```bash
npm run prisma:generate
```

If needed for local setup, run migrations:

```bash
npm run prisma:migrate -- --name init
```

## 4. Run The Project Locally

```bash
npm run dev
```

Open:

[http://localhost:3000](http://localhost:3000)

## 5. Run Quality Checks

Before opening a pull request, run:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```

## 6. Create A Branch

Create a small focused branch for your change:

```bash
git checkout -b codex/your-change-name
```

## 7. Make Small Safe Changes

Please try to keep contributions:

- beginner-friendly
- small in scope
- easy to read
- low-risk

Please avoid:

- large rewrites
- major architecture changes
- unrelated cleanup in many files
- new major product features unless discussed first

## 8. Open A Pull Request

When your change is ready:

```bash
git status
git add .
git commit -m "your clear commit message"
git push
```

Then open a pull request and include:

- what you changed
- why you changed it
- how you tested it

## 9. Good Contribution Ideas

Good fit examples:

- small UI polish
- accessibility improvements
- beginner-friendly documentation fixes
- test improvements for existing behavior
- safe bug fixes
