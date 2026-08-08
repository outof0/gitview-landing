# GitView landing

Static marketing site for [GitView](https://github.com/outof0/gitview), published at [gitview.dev](https://gitview.dev).

The landing site is intentionally separate from the extension repository. Product releases and website deployments can move independently.

## Stack

- Astro static-site generation
- React + TypeScript for interactive UI
- Tailwind CSS with the source brand kit in `brand/`
- Playwright browser smoke tests

Astro prerenders the complete page to `dist/index.html` and then hydrates the React UI. The site does not require SSR, a Node server, or Cloudflare Pages Functions.

## Local development

Requires Node 22.12+ and pnpm 9.12.0.

```bash
pnpm install
pnpm dev
```

Run the complete release gate:

```bash
pnpm exec playwright install chromium
pnpm run ci
```

The gate covers linting, Astro/TypeScript checks, the production build, static artifact checks, production dependency audit, and browser tests.

## Cloudflare Pages

GitHub Actions owns the production deployment. After the release gate passes on `main`, CI deploys the exact tested `dist` artifact through Wrangler. Pull requests never deploy production.

Create a `production` environment, restrict it to the `main` branch, and add these values under **Settings → Environments → production**:

| Type | Name | Value |
|---|---|---|
| Environment secret | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |
| Environment secret | `CLOUDFLARE_API_TOKEN` | Custom token with **Account / Cloudflare Pages / Edit** permission |

On its first authenticated run, CI creates the `gitview-landing` Pages project with `main` as the production branch. Later pushes reuse that project. The checked-in `.nvmrc` selects Node 22.16.0, and Wrangler is pinned in the workflow. No adapter or Pages Function is required.

After the first `*.pages.dev` deployment succeeds, add both `gitview.dev` and `www.gitview.dev` under **Custom domains**. Cloudflare provisions the DNS records and TLS certificate; the checked-in `_redirects` file sends `www` to the apex domain.

## Release metadata

URLs, version, GitHub Release download, Marketplace state, and public contact details live in `src/site.ts`. Until the Marketplace listing exists, the primary call to action downloads the published VSIX. Set `marketplaceLive` to `true` and update the primary URL/label when the listing is public.

## Security and licensing

This repository is MIT licensed. See [SECURITY.md](SECURITY.md) for private vulnerability reporting and [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

Brand usage lives in `brand/docs/brand-guidelines.md`. Files under `public/brand/` are the web-ready subset copied into the production artifact.
