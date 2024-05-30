# Dykning med direktuppstigning

[![Build and deploy](https://github.com/YaceroConsulting/dykupp/actions/workflows/build-deploy.yml/badge.svg)](https://github.com/YaceroConsulting/dykupp/actions/workflows/build-deploy.yml)

This template leverages [Remix SPA Mode](https://remix.run/docs/en/main/future/spa-mode) and
the [Remix Vite Plugin](https://remix.run/docs/en/main/future/vite) to build your app as a Single-Page Application
using [Client Data](https://remix.run/docs/en/main/guides/client-data) for all of your data loads and mutations.

Frontpage Haiku generated with the help of [PartyRock](https://partyrock.aws/u/partyrock/jAJQ4WYAS/Haiku-Creator)

## Roadmap

-   [x] Övning av gruppbeteckning efter dykning med direktuppstigning med maximal expositionstid samt
-   [x] Övning av upprepade dyk med direktuppstigning med direktuppstigning
-   [ ] Övning av upprepade dyk med olika djup (_multi-level diving_)

## Data

Data values for expositionstime are stored in JSON file. The data is extracted from the Swedish Navy's diving tables.
The file below is described by the Swedish description from the original source table U.S. Navy Diving Manual (USN
rev 6)

-   `expositionstid.json` - _Maximal expositionstid samt gruppbeteckning efter dykning med direktuppstigning_. Före
    ytintervall.
- `app/practice.ts` contains function repeatedDives that have a list of repeated dive questions.

**Repeate dives**

There are two different questions that can be asked for the second dive. 

Ask the student to caclulate the maximum dive time for the second dive from the `maxRemaining` object.
```javascript
{
        ...
        surfaceTime: { hours: 1, minutes: 30, letter: 'J' },
        secondDive: { time: 60, depth: 18, group: 'K' },
        maxRemaining: {
            diveTimeAtDepth: 2,
            consumed: 58,
            maxExposition: 60,
        },
    },
```

Ask the student to provide the maximum exposition time for the group and depth, and the consumed time.
This is because the `maxRemaining` object does not contain the `diveTimeAtDepth` property.
```javascript
{
    ...
    surfaceTime: { hours: 0, minutes: 55, letter: 'E' },
    secondDive: { time: 60, depth: 12, group: 'K' },
    maxRemaining: { consumed: 45, maxRemaining: 118 },
},
```

## Development

You can develop your SPA app just like you would a normal Remix app, via:

```shellscript
npm run dev
```

### Testing and Linting

To run unit tests:

```shellscript
npm run test
```

To format your code:

```shellscript
npm run format
```

To lint your code:

```shellscript
npm run lint
```

## Production

When you are ready to build a production version of your app, `npm run build` will generate your assets and
an `index.html` for the SPA.

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
