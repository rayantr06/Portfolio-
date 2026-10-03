# Rayan Terki — Software Portfolio

Public presentation of my software development work, built with Next.js 16 and React 19. The English portfolio uses my professional portrait and describes my personal engineering contributions to six collaborative projects.

## Public presentation

- `/portfolio`: accessible without an account; selected projects, contribution descriptions, technical skills, education and contact links.
- LIDAL Pulse, OuiAgent, Alerte IA, Safar, Let-Data-DZ and Golf Tournament Management.
- Alerte IA is described as a research prototype. No emergency-call data or private repository links are included.
- Responsive layout, keyboard navigation, image alternative text, reduced-motion support and page metadata.

Public content lives in `src/lib/content/profile.js` and `src/lib/content/projectsSeed.js`.

## Run locally

```bash
npm ci
npm run dev
```

Open <http://localhost:3000/portfolio>.

```bash
npm test
npm run lint
npm run build
```

## Static public site

```bash
npm run build:public
```

`scripts/export-public.mjs` publishes the prerendered `/portfolio` document into `docs/`, together with its stylesheet, fonts and portrait. It removes framework scripts and uses relative asset paths, so the single-page presentation can be hosted under a repository path on GitHub Pages. Its links are ordinary anchors and external links; no client JavaScript is needed. Review the exporter if adding interactive client components.

GitHub Pages source: branch `feat/portfolio`, folder `/docs`. Rebuild and commit the generated files when public content changes.

Only the public presentation is hosted statically. The API, database, login and testimonial workflows require the separate Next.js server application.

## Existing course application

The original course application remains in the repository with Redux Toolkit, Axios, Sequelize/SQLite, Zod and Vitest. Its login and registration routes are public. The home page, project routes, testimonial routes and relevant API routes retain their existing proxy authentication checks.

Redux and authentication bootstrap are scoped to those application layouts; the public portfolio does not request an authentication session. The project seed updates the known project descriptions and migrates the old `ramypulse` slug to `lidal-pulse`, retaining the record identity and other stored projects.

The authenticated course application needs its own production configuration and security review before a server deployment. The GitHub Pages presentation does not deploy that application.
