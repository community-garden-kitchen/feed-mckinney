Source code for the [Feed McKinney](https://feedmckinney.org) website.

## Development

```
pnpm install
pnpm dev
```

```
open http://localhost:8788
```

During a commit, the Husky pre-commit hooks will automatically use Prettier to format all changed files.

As branches are added to GitHub, the Cloudflare/GitHub CI will automatically create preview builds.

## Deploying to Production

As pull requests are merged into the `main` branch, the Cloudflare/GitHub CI will automatically create a production build and deploy it. No other actions are required.

## General Information

The `resources.ts` file contains all of the community resources.

All other text in this site is based on the `translations.ts` file. Any text viewed by the user should be added to this file rather than hard coded in `components` or `pages`.
