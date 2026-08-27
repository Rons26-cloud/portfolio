# Xyrons Portfolio

The official portfolio of Xyrons, a creative developer and digital builder focused on modern web applications, mobile products, and interactive digital experiences.

## Highlights

- Responsive bilingual interface in English and Indonesian
- Project case studies with galleries, technology links, and source references
- App Router metadata, Open Graph cards, sitemap, robots policy, and structured data
- Content Security Policy and defensive HTTP headers
- Optimized images, local font delivery, and static project generation

## Tech Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- Motion
- React Icons and Lucide

## Local Development

Requirements: Node.js 20.9 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in a browser.

## Configuration

Create `.env.local` and set the public production origin:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Use the complete HTTPS origin without a trailing slash. Vercel deployments automatically fall back to `VERCEL_PROJECT_PRODUCTION_URL` when the variable is not set. Local builds use `http://localhost:3000` and instruct crawlers not to index the site.

Portfolio content is maintained in:

- `src/data/profile.ts` for identity and profile details
- `src/data/projects.ts` for project case studies
- `src/data/skills.ts` for the technology stack
- `src/data/socials.ts` for verified social profiles
- `src/lib/translations.ts` for English and Indonesian copy

The Xyrons favicon is served through the App Router convention at `src/app/icon.png`.

## Quality Checks

```bash
pnpm typecheck
pnpm lint
pnpm build
```

All checks should pass before deployment. The production build generates the homepage, project routes, Open Graph image, favicon, web manifest, robots file, and sitemap.

## Deployment

Deploy through Vercel or another Next.js-compatible Node.js platform. Configure `NEXT_PUBLIC_SITE_URL` for the canonical production domain, then verify `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and the social preview after deployment.

## License

The source code and visual identity are maintained by Xyrons. Project images, branding, and portfolio content may not be reused without permission.
