# Screenshot Guide

Use this guide when you are ready to capture real screenshots for GitHub, your portfolio, or a demo post.

Do not create fake screenshots. Only add real images after the app is running with clean sample data.

## Where To Put Screenshots

Add images inside:

`public/screenshots/`

Suggested filenames:

- `home.png`
- `dashboard.png`
- `inventory.png`
- `prep.png`

That means the final paths will be:

- `public/screenshots/home.png`
- `public/screenshots/dashboard.png`
- `public/screenshots/inventory.png`
- `public/screenshots/prep.png`

## Suggested Screenshot Order

Use this order in the README or GitHub project description:

1. Home page
2. Dashboard
3. Inventory page
4. Prep page

This order gives the clearest story:

1. what the project is
2. what the signed-in overview looks like
3. how inventory management works
4. how prep tracking works

## What To Show In Each Screenshot

### 1. Home Page

Try to show:

- project title
- short project description
- call-to-action buttons
- clean layout and navigation

### 2. Dashboard

Try to show:

- summary cards
- low-stock alert section
- realistic sample data

### 3. Inventory Page

Try to show:

- several inventory items
- search and filters
- stock status badges
- at least one low-stock or critical example

### 4. Prep Page

Try to show:

- several prep tasks
- task status examples
- summary cards
- a mix of open and completed tasks if possible

## Suggested Demo Data Before Capturing

For cleaner screenshots, it helps to have:

- at least 4 to 6 inventory items
- items from different categories
- at least 1 low-stock item
- at least 1 critical item if it looks helpful
- at least 3 prep tasks
- at least 1 completed prep task

## Simple Tips For Clean Screenshots

- use the same browser size for every screenshot
- keep the browser zoom consistent
- avoid crowded or messy data
- use readable sample names like `Tomatoes`, `Olive Oil`, or `Mozzarella`
- avoid screenshots that show sensitive or personal information
- if possible, hide distracting browser tabs or bookmarks
- take screenshots only after the page fully loads

## Before You Save The Images

Quick check:

- does the page look clean?
- is the page title visible?
- does the screenshot help explain the feature?
- is the data readable at GitHub size?

If yes, save the file using the suggested names in `public/screenshots/`.

## README Example

After you add the real files, you can use markdown like this in `README.md`:

```md
![Home page](./public/screenshots/home.png)
![Dashboard page](./public/screenshots/dashboard.png)
![Inventory page](./public/screenshots/inventory.png)
![Prep page](./public/screenshots/prep.png)
```

## What You Still Must Do Manually

- run the app locally
- create clean sample data
- take the screenshots yourself
- save the images with the final filenames
- update the README later if you want the images embedded
