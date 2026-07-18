# React Development Specification

Version: 2.0
Status: Approved
Owner: Nexora

---

# Purpose

This document defines how React applications are built at Nexora.

It establishes consistent architecture, component composition, state management, routing, performance practices, accessibility standards, and development conventions.

Every React project should follow these guidelines unless a documented project-specific decision overrides them.

The objective is consistency, maintainability, and long-term scalability.

---

# React Philosophy

React is responsible for rendering user interfaces.

Business logic belongs in hooks and services.

Components describe the UI.

Hooks encapsulate reusable behavior.

Services communicate with external systems.

Utilities contain pure framework-independent functions.

Pages compose features.

Features compose reusable components.

Every file should have one clear responsibility.

---

# Composition Philosophy

Prefer composition over configuration.

Build applications from small, reusable components instead of large configurable components.

Small components are easier to:

- Understand
- Test
- Maintain
- Reuse

---

# Technology Stack

## Core

- React 19+
- Vite

## Routing

- React Router v7

## Styling

- Tailwind CSS v4

## Animation

- Motion (Framer Motion)

## Icons

- Lucide React

## UI Components

- shadcn/ui

## Forms

- React Hook Form
- Zod

## API

- Fetch API

Axios may be introduced only when project complexity justifies it.

## Future

- TanStack Query
- Zustand
- TypeScript

---

# Project Structure

```text
src/

assets/

components/
    ui/
    layout/
    common/

features/

pages/

hooks/

services/

context/

utils/

constants/

routes/

styles/

config/

lib/

types/
```

Never create folders without a clear responsibility.

---

# Folder Responsibilities

## components/ui

Reusable presentation components.

Examples

- Button
- Input
- Card
- Badge
- Modal
- Dialog

These components should never contain business logic.

---

## components/layout

Responsible only for page layout.

Examples

- Navbar
- Footer
- Sidebar
- Container
- Section
- Grid

---

## components/common

Reusable business-related components.

Examples

- ServiceCard
- IndustryCard
- ProjectCard
- BlogCard
- TestimonialCard

---

## pages

Represents application routes.

Pages should compose features and layout components.

Avoid placing business logic directly inside pages.

---

## features

Each feature represents one business capability.

Examples

- Contact
- Blog
- Authentication
- Dashboard

A feature may contain:

- Components
- Hooks
- Services
- Types
- Utilities
- Tests

---

## hooks

Hooks encapsulate reusable behavior.

Good examples

- useDebounce()
- useMediaQuery()
- useScrollReveal()
- useTheme()

Hooks should never return JSX.

---

## services

Services communicate with external systems.

Responsibilities

- Fetch data
- Submit data
- Authentication
- API communication

Services should never:

- Render UI
- Navigate
- Display notifications

---

## utils

Pure helper functions.

Examples

- formatDate()
- slugify()
- calculateGrowth()

Utilities should never depend on React.

---

## config

Application configuration.

Examples

- siteConfig
- navigation
- theme
- environment

---

## lib

Wrappers around third-party libraries.

Examples

- axios
- motion
- analytics

---

# Component Architecture

Every component belongs to one category.

---

## UI Component

Purpose

Display reusable interface elements.

Rules

- No API calls
- No routing
- Minimal local state
- Highly reusable

---

## Layout Component

Purpose

Organize page structure.

Rules

Layout only.

No business logic.

---

## Feature Component

Purpose

Implement business functionality.

Examples

- Contact Form
- Pricing Calculator
- Newsletter
- Search

May:

- Use hooks
- Use services
- Manage local state

---

# Component Structure

Preferred order

```jsx
Imports

Component

Hooks

Derived Values

Handlers

Effects

Return JSX

Export
```

Keep component structure consistent across the project.

---

# Props

Pass only the data a component requires.

Passing an entire object is acceptable when the component genuinely represents that entity.

Otherwise, prefer explicit props to reduce coupling.

---

# State Management

Priority

1. Local State

↓

2. Context API

↓

3. Zustand

↓

4. Redux (only when justified)

Avoid introducing global state prematurely.

---

# useState

Use for:

- Form inputs
- Dropdowns
- Tabs
- Modals
- Local UI state

Avoid storing duplicated state.

---

# useEffect

useEffect exists to synchronize React with systems outside React.

Use it for:

- API requests
- Timers
- Browser APIs
- Event listeners
- Third-party integrations

Avoid using useEffect for:

- Filtering arrays
- Sorting
- Formatting
- Derived values
- Updating state from state

If no external system is involved, you probably don't need useEffect.

---

# Rendering

Trust React's default rendering behavior.

Do not optimize prematurely.

Introduce:

- React.memo
- useMemo
- useCallback

only after profiling demonstrates a real performance issue.

Readable code is preferred over unnecessary optimization.

---

# Context API

Use Context for:

- Theme
- Authentication
- Language
- User Preferences

Avoid using Context as a global state manager.

---

# API Layer

Components should never call fetch directly.

Services should:

- Fetch data
- Transform responses when necessary
- Throw meaningful errors

Components decide how the data is presented.

---

# Styling

Primary

Tailwind CSS v4

Guidelines

- Prefer utility classes
- Build reusable UI components
- Keep custom CSS minimal
- Follow the Design Language

Use CSS only for:

- Global styles
- Complex animations
- Third-party overrides

---

# Routing

Each page should have its own route.

Group related routes logically.

Use nested layouts when appropriate.

Protect authenticated routes.

---

# Forms

Every form must include:

- Validation
- Loading state
- Success state
- Error state
- Disabled submit button during submission

Validate on the client before making API requests.

---

# Error Handling

Every asynchronous operation must handle:

- Loading
- Success
- Failure

Provide meaningful error messages that help users recover.

---

# Animation

Use Motion (Framer Motion).

Animation should:

- Guide attention
- Explain relationships
- Provide feedback
- Improve perceived quality

Never animate purely for decoration.

Follow `motion-language.md`.

---

# Performance

Prefer:

- Lazy-loaded routes
- Code splitting
- Optimized images
- Deferred heavy components

Avoid:

- Premature memoization
- Unnecessary React.memo
- Excessive useMemo
- Excessive useCallback

Measure performance before optimizing.

---

# Accessibility

Every feature must support:

- Semantic HTML
- Keyboard navigation
- Screen readers
- Visible focus states
- Accessible forms
- Alt text
- Proper heading hierarchy
- Reduced-motion preferences

Accessibility is a requirement, not an enhancement.

---

# Naming Convention

## Components

PascalCase

```
HeroSection.jsx
ServiceCard.jsx
```

## Hooks

```
useTheme.js
useScrollReveal.js
```

## Services

```
blogService.js
authService.js
```

## Utilities

```
formatDate.js
slugify.js
```

## Constants

```
API_URL
MAX_RETRY_COUNT
```

---

# React Anti-Patterns

Never

❌ Fetch directly inside UI components

❌ Create components larger than 300 lines without justification

❌ Duplicate state

❌ Deep prop drilling

❌ Massive Context providers

❌ Premature optimization

❌ Copy components instead of reusing them

❌ Disable ESLint to silence problems

❌ Mix business logic with presentation

---

# AI Collaboration Rules

When AI generates React code:

Always

✓ Read the existing project before generating code

✓ Follow the established architecture

✓ Reuse existing components

✓ Keep components focused

✓ Respect accessibility

✓ Build mobile-first

✓ Follow the Design Language

✓ Explain architectural decisions when requested

Never

✗ Generate duplicate components

✗ Add unnecessary dependencies

✗ Ignore project conventions

✗ Over-engineer simple solutions

---

# Code Review Checklist

Before merging:

□ Folder structure follows standards

□ Naming conventions are respected

□ Components are reusable

□ Business logic is separated

□ API layer is isolated

□ Responsive across devices

□ Accessible

□ Performance is acceptable

□ No duplicated logic

□ No console warnings or errors

□ Production ready

---

# Definition of Done

A React feature is complete only when it is:

✓ Functional

✓ Responsive

✓ Accessible

✓ Maintainable

✓ Cleanly architected

✓ Uses reusable components where appropriate

✓ Performance verified

✓ Free from console warnings and errors

✓ Consistent with the Design Language

✓ Ready for production

Working code is not considered finished.

Only production-ready code is complete.