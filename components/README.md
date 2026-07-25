# Earth Spas component architecture

This directory is the reusable UI foundation for the current decision site and the future public Earth Spas website.

## Public component layers

- `components/ui` contains small reusable primitives and form controls.
- `components/blocks` contains complete content blocks such as growth cards, diagrams and showcases.
- `components/layout` contains page shells and navigation composition.
- `components/pwa` contains install and device-specific behavior.

Import new code through these public index files where possible. Existing root-level components remain temporarily available as compatibility entrypoints while pages are migrated.

## Styling rules

- All custom CSS lives in `app/globals.css`.
- Tailwind utility classes may be used for local spacing and simple layout.
- Reusable blocks use stable prefixed class names, for example `growth-map-*`, `software-flow-*` and `dev-showcase-*`.
- Do not add CSS modules, route-specific CSS files or late override stylesheets.
- Dynamic values may be passed through typed CSS custom properties, but static declarations belong in `app/globals.css`.

## Block contract

A reusable block should:

1. Accept data or read from the shared site model.
2. Remain responsive without page-specific selectors.
3. Support reduced motion.
4. Avoid hardcoded provider credentials, prices or customer data.
5. Use Earth Spas design tokens instead of raw brand colors where practical.

## Registry components

`components.json` configures shadcn and the `@bklit` registry. Registry blocks must be adapted to Earth Spas tokens and reviewed before they are promoted into the reusable `components/blocks` layer.
