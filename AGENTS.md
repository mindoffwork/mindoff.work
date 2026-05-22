# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->
## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 1) Prompt Contract
```
Task: <one sentence>
Scope: <routes/components/lib/files>
Constraints: <compat/perf/accessibility/seo>
Done-When: <observable acceptance>
```
One request, one outcome. Smallest safe change when unsure.

## 2) Project
- mindoff.work — Next.js 14, App Router, TypeScript, Tailwind.
- Static export (`output: 'export'`) → GitHub Pages (`root` → build → `gh-pages`).
- Content: MDX in `src/content/` via contentlayer. No CMS, no database.
- Rendering: server-first. `'use client'` only when interaction requires it.
- Images: `next/image` with `unoptimized: true`. Pre-optimise with sharp at build.

## 3) Structure
- `src/app/*` — routes, layouts, metadata, page server components.
- `src/components/*` — reusable UI primitives.
- `src/lib/*` — utilities, adapters, constants.
- `src/styles/*` — globals, CSS variables, tokens.
- `src/content/workshop/` — project MDX pages.
- `src/content/notes/` — field notes MDX (type: essay | snap).
- `src/content/gallery/` — collection metadata + image refs.
- `public/images/*` — static assets.

## 4) Content Schema
**workshop:** `title, slug, date, tags, type: software|hardware, summary, cover, github?, status: active|archived`
**notes:** `title, slug, date, tags, type: essay|snap, summary, cover?`
**gallery:** `title, slug, collection: travel|ui|graphic, date, images: []`

## 5) Stable Surface
Route paths, SEO metadata contract, design tokens, content schemas.
Add redirects before removing any stable route.

## 6) Invariants
- Semantic HTML, keyboard support, visible focus states.
- CSS variables for all tokens. No hardcoded values.
- No layout shift on initial load.
- Composable small components with clear props.
- Responsive on every UI change.

## 7) Validation
```bash
npm run lint && npm run test && npm run build
```
Scope nearest tests first. Full build only if routes/layout/data changed.

## 8) Commits
`:gitmoji_code: <Verb> <short description>`

## 9) Update Policy
Any change to behavior, routes, tokens, schemas, or tooling updates this file in the same changeset. Remove stale text immediately.


