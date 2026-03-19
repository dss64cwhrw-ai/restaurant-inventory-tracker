# Release Checklist

Use this checklist when you want to finish the project, prepare screenshots, push it to GitHub, and get ready for deployment.

This guide is intentionally beginner-friendly and practical. You do not need to do every optional item right away.

## 1. Install And Prepare The Project

Run these commands from the project root:

```bash
npm install
npm run prisma:generate
```

Then make sure:

- `.env` exists
- your Clerk keys are filled in
- `DATABASE_URL` points to a working PostgreSQL database

## 2. Run Database Migrations

For local development:

```bash
npm run prisma:migrate -- --name init
```

If you already have the migrations and only need to apply them later in deployment:

```bash
npm run prisma:migrate:deploy
```

Optional demo data:

```bash
npm run prisma:seed
```

Only use seed data if you want sample content for screenshots or demos.

## 3. Run The Quality Checks

Run these commands from the project root:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```

Before calling the project ready, confirm all of these commands pass.

## 4. Run Manual QA

Start the app:

```bash
npm run dev
```

Then use:

[FINAL_QA_CHECKLIST.md](../FINAL_QA_CHECKLIST.md)

Focus on:

- home page
- sign up and sign in
- protected routes
- dashboard
- inventory CRUD and filters
- low-stock alerts
- prep CRUD and complete flow
- logout
- empty states

## 5. Capture Portfolio Screenshots

Use the screenshot guide here:

[SCREENSHOT_GUIDE.md](./SCREENSHOT_GUIDE.md)

At minimum, plan to capture:

- home page
- dashboard
- inventory page
- prep page

Place screenshots in:

`public/screenshots/`

## 6. Final README Check

Open `README.md` and confirm:

- the project summary is accurate
- implemented features match the real app
- setup instructions still make sense
- screenshot and deploy sections are still accurate
- the linked docs open correctly

## 7. Prepare For GitHub

Before pushing publicly:

- make sure `.env` is not committed
- make sure screenshots do not expose private data
- make sure sample text and demo data look clean
- make sure the repository name and README title match

If everything looks good:

```bash
git status
git add .
git commit -m "docs: add final release support guides"
git push
```

## 8. Prepare For Deployment Later

You do not need to deploy right now, but before deployment make sure:

- production environment variables are ready
- PostgreSQL is available in production
- Clerk production keys are ready
- Prisma migrations can be applied
- the app builds locally first

See:

[DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)

## 9. What You Still Must Do Manually

These tasks cannot be finished automatically:

- provide real environment variables
- create or use a real Clerk app
- connect a real PostgreSQL database
- run the manual QA checklist
- take real screenshots
- decide when to push publicly
- decide when and where to deploy

## 10. Optional, Not Required For MVP

These are nice later improvements, but not required to finish this version:

- add a live deployed URL to the README
- add browser end-to-end tests
- improve dashboard analytics
- add richer inventory categories or reporting
