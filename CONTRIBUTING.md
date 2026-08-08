# Contributing

Thanks for helping improve the GitView website.

## Setup

Use Node.js `22.16.0` and pnpm `9.12.0`:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Before opening a pull request

```bash
pnpm run ci
```

Keep product claims traceable to the extension repository. Do not add analytics,
cookies, remote fonts, or a new external service without documenting the privacy
and security impact.

Use Conventional Commits and keep unrelated changes out of the same pull request.
