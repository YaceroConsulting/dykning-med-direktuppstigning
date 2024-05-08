# Dykning med direktuppstigning

[![Build and deploy](https://github.com/YaceroConsulting/dykning-med-direktuppstigning/actions/workflows/build-deploy.yml/badge.svg)](https://github.com/YaceroConsulting/dykning-med-direktuppstigning/actions/workflows/build-deploy.yml)

This template leverages [Remix SPA Mode](https://remix.run/docs/en/main/future/spa-mode) and the [Remix Vite Plugin](https://remix.run/docs/en/main/future/vite) to build your app as a Single-Page Application using [Client Data](https://remix.run/docs/en/main/guides/client-data) for all of your data loads and mutations.

Frontpage Haiku generated with the help of [PartyRock](https://partyrock.aws/u/partyrock/jAJQ4WYAS/Haiku-Creator)

## Roadmap

-   [x] Övning av gruppbeteckning efter dykning med direktuppstigning med maximal expositionstid samt
-   [ ] Övning av upprepade dyk med direktuppstigning med direktuppstigning
-   [ ] Övning av upprepade dyk med olika djup (_multi-level diving_)

## Data

All data values are stored in JSON files. The data is extracted from the Swedish Navy's diving tables.
The filenames below are described by the Swedish description from the original source table U.S. Navy Diving Manual (USN rev 6)

-   `expositionstid.json` - _Maximal expositionstid samt gruppbeteckning efter dykning med direktuppstigning_. Före ytintervall.
-   `ytintervall.json` - _Ytintervall för upprepade dyk med direktuppstigning_
-   `dekompression.json` - _Gruppbetckning efter ytintervall_

## Development

You can develop your SPA app just like you would a normal Remix app, via:

```shellscript
npm run dev
```

## Production

When you are ready to build a production version of your app, `npm run build` will generate your assets and an `index.html` for the SPA.

```shellscript
npm run build
```

### Deployment

This application is deployed to GitHub Pages.

## Learn more

To learn more about the technologies used in this site template, see the following resources:

-   [Remix](https://remix.run/docs/en/main/future/spa-mode) - SPA Mode
-   [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
-   [Headless UI](https://headlessui.dev) - the official Headless UI documentation
-   [React](https://react.dev) - the official React documentation
-   [clsx](https://github.com/lukeed/clsx) - the GitHub repo for the `clsx` helper
-   [Diver icons created by Skyclick](https://www.flaticon.com/free-icons/diver) - Flaticon
