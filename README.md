# Photography portfolio

A responsive photographer’s portfolio built from the requested shadcn Next.js preset. The application lives in `portfolio/`.

```sh
cd portfolio
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. For production, run `pnpm build` then `pnpm start` from the same directory. Set the application root to `portfolio` in your hosting provider.

## Before publishing

The photographer name, biography, location, email, captions, years, and session rates are illustrative. Follow `portfolio/PERSONALIZE.md` to replace them and all eight Unsplash placeholder photographs.

## Verification

From `portfolio/`, run `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm test:e2e`. Browser tests use installed Google Chrome (`channel: chrome`); alternatively install Chrome with `pnpm exec playwright install chrome`. Run the build before the browser tests, which start and stop a production server automatically on port 3107.

Tests cover navigation, image loading, email enquiry links, category filtering, keyboard photo navigation, Escape, focus restoration and trapping, responsive overflow, and automated WCAG A/AA checks. Automated accessibility checks do not replace a full manual accessibility audit.

## Template provenance

Ran the exact requested command:

```sh
pnpm dlx shadcn@latest init --preset b5rR41Mtnc --template next --pointer
```

Selected `portfolio` as the project name because the repository directory already existed. The generated source was committed unchanged as `6c58109` before implementation. Only the generated nested Git metadata was moved outside the repository so the template files are tracked normally in the existing repository.
