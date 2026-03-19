# Deploy Guide

Use this guide when you are ready to deploy the project later. This file does not deploy anything automatically. It only helps you prepare.

This guide stays high-level on purpose so it remains beginner-friendly.

## 1. What You Need Before Deployment

Before deploying, make sure you have:

- a working production database
- a Clerk app ready for production
- all required environment variables
- a successful local build
- existing Prisma migrations ready to apply

## 2. Required Environment Variables

At minimum, you will need:

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`

Optional:

- `SEED_USER_ID`

In production, you usually do not need seed data unless you want demo content.

## 3. Database And Prisma Notes

This project uses Prisma with PostgreSQL.

Before deployment:

- make sure your production PostgreSQL database exists
- make sure `DATABASE_URL` points to the production database
- make sure Prisma client generation works
- make sure the existing migrations are ready

Useful commands:

```bash
npm run prisma:generate
npm run prisma:migrate:deploy
```

Important:

- do not rely only on local database data
- make sure the deployed app can connect to the real database

## 4. Clerk Notes

Before deployment:

- create or configure your Clerk production app
- add the correct production Clerk keys
- confirm your allowed URLs and redirect URLs are correct
- make sure sign-in and sign-up still use the expected routes:
  - `/sign-in`
  - `/sign-up`

If Clerk environment variables are missing or incorrect, authentication will not work after deployment.

## 5. High-Level Vercel Deployment Flow

One simple beginner-friendly deployment path is Vercel.

High-level flow:

1. Push the repository to GitHub
2. Import the project into Vercel
3. Add the required environment variables in Vercel
4. Connect the production PostgreSQL database
5. Run Prisma migration deployment if needed
6. Deploy the app
7. Open the deployed URL and test the main flows

## 6. Pre-Deployment Checklist

Before deploying, run these locally from the project root:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```

Also confirm:

- `README.md` is up to date
- screenshots are optional but ready if you want them
- the manual QA checklist has been reviewed

## 7. What To Verify After Deployment

After deployment, manually verify:

- the home page loads
- sign up works
- sign in works
- protected routes are protected
- dashboard loads
- inventory CRUD works
- low-stock alerts still appear correctly
- prep task CRUD works
- logout works

It is a good idea to reuse:

[FINAL_QA_CHECKLIST.md](../FINAL_QA_CHECKLIST.md)

## 8. Common Beginner Gotchas

- missing environment variables
- wrong Clerk production keys
- wrong database connection string
- forgetting to apply Prisma migrations
- testing only the home page and not the protected app pages

## 9. What You Still Must Do Manually

These steps still require your own decisions:

- choose your deployment platform
- create the production database
- set the production environment variables
- configure Clerk production settings
- run manual checks after deployment

## 10. Not Required For MVP

These are useful later, but not required for this project version:

- automated deployment pipelines
- advanced monitoring
- analytics
- admin roles
- browser end-to-end deployment checks
