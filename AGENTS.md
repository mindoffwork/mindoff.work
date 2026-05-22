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
- mindoff.work — Next.js 16, App Router, TypeScript, Tailwind.
- Static export (`output: 'export'`) → GitHub Pages (`root` → build → `gh-pages`).
- Content: MDX via `@next/mdx` + `gray-matter`. No CMS, no contentlayer, no database.
- Config file: `next.config.mjs` (ESM required for remark/rehype plugins).
- Rendering: server-first. `'use client'` only when interaction requires it.
- Images: `next/image` with `unoptimized: true`. Pre-optimise with sharp at build.
- `params` in dynamic routes is a Promise — always `await params` before use.
- `dynamicParams = false` on every dynamic route.

## 3) Structure
- `src/app/*` — routes, layouts, metadata, page server components.
- `src/components/*` — reusable UI primitives.
- `src/lib/*` — utilities, adapters, constants.
- `src/lib/content.ts` — all content reading functions (fs + gray-matter).
- `src/lib/types.ts` — WorkshopPost, NotePost types.
- `src/styles/*` — globals, CSS variables, tokens.
- `src/content/workshop/` — workshop MDX files.
- `src/content/notes/` — notes MDX files (type: essay | snap).
- `public/images/*` — static assets.
- `mdx-components.tsx` — required at project root for App Router MDX.

## 4) Content Schema
Frontmatter is YAML parsed by gray-matter. Slug derived from filename, never in frontmatter.

**workshop:** `title, date, tags[], type: software|hardware, summary, cover?, github?, status: active|archived`
**notes:** `title, date, tags[], type: essay|snap, summary, cover?`
**gallery:** `title, collection: travel|ui|graphic, date, images[]` *(planned — not yet built)*

## 5) Stable Surface
Route paths, SEO metadata contract, design tokens, content schemas.
Add redirects before removing any stable route.

## 6) Invariants
- Semantic HTML, keyboard support, visible focus states.
- CSS variables for all tokens. No hardcoded values anywhere.
- No layout shift on initial load.
- Composable small components with clear props.
- Responsive on every UI change.

## 7) Validation
```bash
npm run lint && npm run build
```
Full build required if routes, layout, data flow, or config changed.

## 8) Commits
`:gitmoji_code: <Verb> <short description>`

## 9) Update Policy
Any change to behavior, routes, tokens, schemas, or tooling updates this file in the same changeset. Remove stale text immediately.