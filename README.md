# mindoff.work

_A personal website and weblog for projects, notes, and build records._

`mindoff.work` is a static Next.js site built to publish a small body of personal work: project pages, written notes, lightweight snapshots, and supporting policy pages. This repository is public for transparency and exploration.

**Website**: [https://mindoff.work](https://mindoff.work)

## Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- MDX with `@next/mdx` and `gray-matter`
- Static export for GitHub Pages

## Repository Shape

- `src/app/` - routes, layouts, metadata, and page components
- `src/components/` - shared interface components
- `src/content/` - MDX project and note entries
- `src/lib/` - content loading, types, and utilities
- `src/styles/` - global tokens and theme definitions
- `public/` - static images and public assets

## Licensing

This repository uses split licensing:

- Source code is licensed under the [MIT License](./LICENSE).
- Original writing and creator-made open images are licensed under [CC BY 4.0](./LICENSE-content.md), unless stated otherwise.

Third-party assets, trademarks, brand materials, product names, and externally credited work remain excluded unless explicitly licensed.
