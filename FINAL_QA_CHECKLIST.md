# Final Manual QA Checklist

Use this checklist before sharing the project publicly, recording screenshots, or preparing for deployment.

Run the app locally from the project root:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 1. Public Home Page

- Confirm the home page loads without errors
- Confirm the project title and summary are visible
- Confirm navigation links are visible
- Confirm signed-out users can see `Sign In` and `Sign Up`

## 2. Sign Up

- Open the sign-up page
- Create a test account
- Confirm account creation succeeds
- Confirm you can access protected pages after signing up

## 3. Sign In

- Sign out if needed
- Open the sign-in page
- Sign in with an existing account
- Confirm the session works and the app recognizes you as signed in

## 4. Protected Routes

- While signed out, try to open `/dashboard`
- While signed out, try to open `/inventory`
- While signed out, try to open `/prep`
- Confirm protected routes redirect to sign-in or otherwise block access

## 5. Dashboard

- Sign in
- Open `/dashboard`
- Confirm the page loads without crashing
- Confirm summary cards appear
- Confirm the low-stock alert section appears
- If the account has no data, confirm the empty state is friendly and clear

## 6. Inventory Create

- Open `/inventory`
- Add a new inventory item
- Confirm the item appears in the list after saving
- Confirm the dashboard totals update after refresh or navigation if needed

## 7. Inventory Edit

- Edit an existing inventory item
- Change at least one field
- Save the changes
- Confirm the updated values appear in the table

## 8. Inventory Delete

- Delete an inventory item
- Confirm the delete action works
- Confirm the item is removed from the table

## 9. Inventory Search And Filters

- Add or use multiple items with different names and categories
- Use the search input and confirm matching results appear
- Use the category filter and confirm it narrows the list
- Use the stock status filter and confirm it narrows the list
- Reset filters and confirm all items return

## 10. Low Stock Alerts

- Create or edit an item so its quantity is at or below the threshold
- Confirm the item appears in the low-stock alerts section
- Confirm critical items show the expected status
- Confirm non-low-stock items do not appear in the alert list

## 11. Prep Create

- Open `/prep`
- Add a prep task
- Confirm the task appears in the table after saving

## 12. Prep Edit

- Edit an existing prep task
- Save the changes
- Confirm the updated values appear correctly

## 13. Prep Complete Or Reopen

- Mark a prep task complete
- Confirm the status changes
- Mark the same task open again if needed
- Confirm the status changes back

## 14. Prep Delete

- Delete a prep task
- Confirm the task is removed from the table

## 15. Logout Flow

- While signed in, use the Clerk user menu
- Sign out
- Confirm protected pages are no longer available
- Confirm the signed-out header buttons appear again

## 16. Empty States

- Check a user account with no inventory items
- Confirm the inventory empty state is clear
- Check a user account with no prep tasks
- Confirm the prep empty state is clear
- Check a user account with no data on the dashboard
- Confirm the dashboard empty state is clear

## 17. Error-State Smoke Check

- Try submitting an empty inventory form
- Confirm validation messages appear
- Try submitting an empty prep form
- Confirm validation messages appear
- Confirm the app does not crash during simple invalid input

## 18. Final Readiness Check

- Confirm README sections still match the real app
- Confirm `public/screenshots/` exists for future screenshots
- Confirm environment variables are documented clearly
- Confirm build, lint, test, and typecheck commands are listed in README
- Confirm the app feels ready to demo to another person
