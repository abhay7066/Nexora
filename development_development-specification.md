#  Nexora Development Specification

Version: 2.0
Status: Approved
Owner: Nexora

---

# Purpose

This document defines how software is built at Nexora.

It is the engineering standard followed by every developer, designer, and AI assistant.

The objective is consistency.

Regardless of who writes the code, every project should feel like it was built by the same engineering team.

This document takes precedence over personal coding preferences.

---

# Engineering Philosophy

We don't write code to make features work.

We write code that another developer can understand six months later.

Good software should be:

- Predictable
- Maintainable
- Reusable
- Performant
- Accessible
- Scalable

We optimize for long-term quality over short-term speed.

---

# Core Principles

## 1. Readability First

Every line of code should communicate intent.

Good

```jsx
const activeUsers = users.filter(user => user.isActive);
```

Bad

```jsx
const a = users.filter(x => x.a);
```

Use meaningful names.

Avoid unnecessary abbreviations.

If someone needs comments to understand variable names, rename them.

---

## 2. Keep Things Simple

Prefer the simplest solution that solves the problem.

Avoid unnecessary abstractions.

Bad

Creating five custom hooks for a form with three inputs.

Good

Using local state until complexity actually exists.

---

## 3. Single Responsibility Principle

Every file should have one responsibility.

Good

Button.jsx

Only renders a button.

Bad

Button.jsx

- Fetches API
- Opens modal
- Updates global state
- Navigates routes

---

## 4. Reuse Before Creating

Before writing new code ask:

Can I reuse an existing component?

Can I extend an existing utility?

Can I move repeated logic into a hook?

Duplicate code becomes technical debt.

---

# Project Structure

```
src/

assets/

components/
    ui/
    layout/
    common/

pages/

features/

hooks/

services/

context/

constants/

utils/

styles/

routes/

types/
```

---

# Folder Responsibilities

## assets

Images

Videos

Fonts

Icons

Static files

Never store business logic here.

---

## components

Reusable UI.

Components should never directly call APIs.

Categories

components/ui

Basic reusable components.

Examples

Button

Input

Badge

Card

Modal

Tooltip

components/layout

Layout components.

Navbar

Sidebar

Footer

Section

Container

components/common

Shared business components.

Example

ServiceCard

IndustryCard

BlogCard

---

## pages

Represents routes.

Example

Home.jsx

About.jsx

Services.jsx

Portfolio.jsx

Each page should only compose components.

Business logic should live elsewhere.

---

## features

Contains complete business features.

Example

Contact Form

Authentication

Dashboard

Blog

A feature may contain

Components

Hooks

Services

Utilities

Styles

Tests

---

## hooks

Purpose

Share behavior.

Not UI.

Good

useDebounce()

useScrollReveal()

useMediaQuery()

useTheme()

Bad

useHomePage()

unless the logic is reusable.

Hooks should never return JSX.

---

## services

Purpose

API communication.

Responsibilities

Fetch

Update

Delete

Authentication

Never manipulate UI here.

Example

services/

authService.js

blogService.js

contactService.js

---

## utils

Pure helper functions.

Good

formatCurrency()

capitalize()

slugify()

calculateGrowth()

Bad

Functions that update React state.

Functions that render JSX.

---

## constants

Application constants.

Example

API_URL

ROUTES

THEME

COLORS

---

# Component Architecture

Every component belongs to one category.

---

## UI Component

Purpose

Presentation only.

Examples

Button

Input

Card

Avatar

Badge

Rules

✓ No API calls

✓ No routing

✓ Minimal local state

✓ Highly reusable

---

## Layout Component

Purpose

Arrange content.

Examples

Navbar

Footer

Section

Container

Sidebar

Rules

Should never know business logic.

---

## Feature Component

Purpose

Implement business functionality.

Examples

Contact Form

Pricing Calculator

Dashboard Widget

Rules

May use hooks.

May communicate with services.

Should still remain focused.

---

# Component Size

Ideal

50–150 lines

Acceptable

250 lines

Above 250

Consider splitting.

---

# Props

Pass only what is required.

Good

```jsx
<UserCard
    name={user.name}
    company={user.company}
/>
```

Avoid

```jsx
<UserCard user={user} />
```

unless the component truly needs the entire object.

---

# State Management

Priority

1. Local State

↓

2. Context

↓

3. Zustand (future)

↓

4. Redux only if justified

Never introduce global state prematurely.

---

# API Layer

Never call fetch directly inside components.

Wrong

```jsx
useEffect(() => {
    fetch(...)
}, [])
```

Correct

```jsx
blogService.getBlogs()
```

Benefits

Centralized

Testable

Reusable

---

# Styling

Primary

Tailwind CSS

Avoid

Large CSS files.

Inline styles.

Random spacing values.

Spacing should follow an 8px grid whenever practical.

---

# Animation

Use Framer Motion.

Every animation must follow motion.md.

Never animate just because you can.

Questions before adding animation

Does it improve usability?

Does it guide attention?

Does it provide feedback?

If not, remove it.

---

# Responsive Design

Design mobile first.

Support

Mobile

Tablet

Laptop

Desktop

Do not hide important content.

Reorganize instead.

---

# Accessibility

Required

Semantic HTML

Keyboard navigation

ARIA labels where needed

Visible focus state

Alt text

Proper heading hierarchy

Accessibility is not optional.

---

# Performance

Images

Use WebP or AVIF.

Lazy load below-the-fold images.

Always define width and height.

Code Splitting

Lazy load routes.

Lazy load heavy components.

Fonts

Limit font families.

Use font-display: swap.

Animation

Animate transform and opacity.

Avoid animating width, height, top, left when possible.

Target

60 FPS.

---

# Forms

Every form must include

Validation

Loading state

Success state

Error state

Helpful messages

Users should never wonder what happened.

---

# Error Handling

Every async request must handle

Loading

Success

Failure

Example

Instead of

"Something went wrong"

Prefer

"We couldn't submit your enquiry. Please try again or contact us directly."

Helpful messages improve trust.

---

# Naming Convention

Components

PascalCase

```
HeroSection.jsx

ServiceCard.jsx
```

Hooks

camelCase starting with use

```
useTheme.js

useDebounce.js
```

Utilities

camelCase

```
formatDate.js

calculateGrowth.js
```

Constants

UPPER_SNAKE_CASE

```
API_URL

MAX_RETRY_COUNT
```

---

# Comments

Avoid obvious comments.

Bad

```jsx
// increment counter

count++;
```

Good

```jsx
// Business rule:
// Trial users cannot access premium reports.
```

Explain decisions.

Not syntax.

---

# Git Commit Standards

Good

```
feat: add homepage hero animation

fix: resolve mobile navigation overflow

refactor: simplify service card layout

style: improve button spacing

docs: update development specification
```

Bad

```
update

fix

done

changes
```

---

# AI Collaboration Rules

When using AI to generate code:

Always

✓ Reuse existing components.

✓ Follow folder structure.

✓ Respect naming conventions.

✓ Keep components small.

✓ Write readable code.

✓ Follow website-specification.md.

✓ Follow design-language.md.

Never

✗ Generate duplicate components.

✗ Add unnecessary libraries.

✗ Ignore accessibility.

✗ Ignore responsiveness.

✗ Introduce dead code.

---

# Code Review Checklist

Before merging any feature ask:

□ Is the code readable?

□ Can anything be simplified?

□ Is logic reusable?

□ Is the component too large?

□ Is accessibility maintained?

□ Is the design consistent?

□ Does it work on mobile?

□ Is performance acceptable?

□ Are animations necessary?

□ Are there console errors?

If any answer is "No", the feature is not ready.

---

# Definition of Done

A feature is complete only if:

✓ Responsive

✓ Accessible

✓ Performant

✓ Matches design specification

✓ Matches motion specification

✓ No console warnings

✓ Clean code

✓ Reusable

✓ Production ready

Working code is not considered finished.

Only production-ready code is complete.